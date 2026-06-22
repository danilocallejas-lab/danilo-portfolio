import {
  getPrototypeFrameUrl,
  portfolio_sections,
} from "../src/lib/portfolio-content.ts";
import { getSupportedPrototypeEmbedOrigins } from "../src/lib/prototype-embed-policy.ts";
import {
  getEmbeddedFrameHandle,
  getEmbeddedFrameText,
  loadPlaywright,
  responseBelongsToEmbed,
} from "./prototype-shared.mjs";

const args = new Set(process.argv.slice(2));
const includeBlocked = args.has("--include-blocked");
const localMode = args.has("--local");
const runBrowser = args.has("--browser");

if (localMode) {
  process.env.NEXT_PUBLIC_PROTOTYPE_EMBED_MODE = "local";
  process.env.NODE_ENV ??= "development";
}

const portfolioBaseUrl =
  process.env.PORTFOLIO_BASE_URL ??
  (localMode
    ? "http://localhost:3000"
    : "https://danilo-callejas-portfolio.vercel.app");
const portfolioOrigin = new URL(portfolioBaseUrl).origin;

const requiredFrameAncestors = getSupportedPrototypeEmbedOrigins();

function projectUrl(slug) {
  return new URL(`/prototypes/${slug}`, portfolioBaseUrl).toString();
}

function resolveEmbedUrl(url) {
  return new URL(url, portfolioBaseUrl).toString();
}

function getProjectSections() {
  return portfolio_sections.filter((section) => {
    if (section.section_type !== "project") {
      return false;
    }

    if (localMode) {
      return Boolean(section.prototype.localDev);
    }

    if (section.prototype.status === "published") {
      return true;
    }

    return includeBlocked && section.prototype.status === "blocked";
  });
}

function getHeadersObject(headers) {
  return Object.fromEntries(headers.entries());
}

function getFrameAncestors(csp) {
  const directive = csp
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith("frame-ancestors "));

  if (!directive) {
    return null;
  }

  return directive.replace(/^frame-ancestors\s+/i, "").trim();
}

async function fetchAuditResponse(url, slug, iframeStyle) {
  const targetOrigin = new URL(url).origin;
  const headers = iframeStyle
    ? {
        referer: projectUrl(slug),
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site":
          targetOrigin === portfolioOrigin ? "same-origin" : "cross-site",
        "user-agent":
          "Mozilla/5.0 PrototypeEmbedAudit/1.0 portfolio-verification",
      }
    : {
        "user-agent":
          "Mozilla/5.0 PrototypeEmbedAudit/1.0 portfolio-verification",
      };

  const response = await fetch(url, {
    headers,
    redirect: "follow",
  });

  return {
    url: response.url,
    status: response.status,
    headers: getHeadersObject(response.headers),
  };
}

function validateHeaders(project, response, label) {
  const failures = [];
  const csp = response.headers["content-security-policy"] ?? "";
  const frameAncestors = getFrameAncestors(csp);
  const xFrameOptions = response.headers["x-frame-options"];
  const mitigated = response.headers["x-vercel-mitigated"];
  const isSameOrigin = new URL(response.url).origin === portfolioOrigin;

  if (response.status !== 200) {
    failures.push(`${label} returned ${response.status}`);
  }

  if (xFrameOptions) {
    failures.push(`${label} returned X-Frame-Options: ${xFrameOptions}`);
  }

  if (localMode || isSameOrigin) {
    return failures.map((message) => `${project.section_id}: ${message}`);
  }

  if (!frameAncestors) {
    failures.push(`${label} did not return frame-ancestors CSP`);
  } else {
    for (const origin of requiredFrameAncestors) {
      if (!frameAncestors.includes(origin)) {
        failures.push(`${label} frame-ancestors missing ${origin}`);
      }
    }
  }

  if (mitigated === "deny") {
    failures.push(`${label} returned x-vercel-mitigated: deny`);
  }

  return failures.map((message) => `${project.section_id}: ${message}`);
}

async function runBrowserAudit(projects) {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const failures = [];
  const responses = [];

  page.on("response", (response) => {
    responses.push({
      url: response.url(),
      status: response.status(),
      headers: response.headers(),
    });
  });

  try {
    for (const project of projects) {
      const embedUrl = getPrototypeFrameUrl(project.prototype);

      if (!embedUrl) {
        failures.push(`${project.section_id}: missing frame URL`);
        continue;
      }

      const resolvedEmbedUrl = resolveEmbedUrl(embedUrl);
      const iframeLabel = new URL(resolvedEmbedUrl).pathname;
      const responseStart = responses.length;

      await page.goto(projectUrl(project.prototype.slug), {
        waitUntil: localMode ? "domcontentloaded" : "networkidle",
      });

      const iframeHandle = await getEmbeddedFrameHandle(
        page,
        resolvedEmbedUrl,
        { baseUrl: portfolioBaseUrl },
      ).catch(() => null);

      if (!iframeHandle) {
        failures.push(
          `${project.section_id}: expected one iframe for ${iframeLabel}`,
        );
        continue;
      }

      const frameText = await getEmbeddedFrameText(
        iframeHandle,
        resolvedEmbedUrl,
      );

      if (/403:\s*Forbidden|Error:\s*Forbidden/i.test(frameText)) {
        failures.push(`${project.section_id}: iframe rendered Vercel 403`);
      }

      const deniedResponse = responses
        .slice(responseStart)
        .find((response) => {
          return (
            responseBelongsToEmbed(
              response.url,
              resolvedEmbedUrl,
              portfolioBaseUrl,
            ) &&
            (response.status === 403 ||
              response.headers["x-vercel-mitigated"] === "deny")
          );
        });

      if (deniedResponse) {
        failures.push(
          `${project.section_id}: browser iframe denied by Vercel (${deniedResponse.status})`,
        );
      }
    }
  } finally {
    await browser.close();
  }

  return failures;
}

async function main() {
  const projects = getProjectSections();
  const failures = [];
  const rows = [];

  for (const project of projects) {
    const embedUrl = getPrototypeFrameUrl(project.prototype);

    if (!embedUrl) {
      failures.push(`${project.section_id}: missing frame URL`);
      continue;
    }

    let directResponse;
    let iframeResponse;
    const resolvedEmbedUrl = resolveEmbedUrl(embedUrl);

    try {
      directResponse = await fetchAuditResponse(
        resolvedEmbedUrl,
        project.prototype.slug,
        false,
      );
      iframeResponse = await fetchAuditResponse(
        resolvedEmbedUrl,
        project.prototype.slug,
        true,
      );
    } catch (error) {
      failures.push(
        `${project.section_id}: could not reach ${embedUrl} (${error.message})`,
      );
      continue;
    }

    failures.push(...validateHeaders(project, directResponse, "direct URL"));
    failures.push(...validateHeaders(project, iframeResponse, "iframe request"));

    rows.push({
      slug: project.prototype.slug,
      status: project.prototype.status,
      mode: localMode ? "local" : "public",
      direct: directResponse.status,
      iframe: iframeResponse.status,
      mitigated:
        iframeResponse.headers["x-vercel-mitigated"] ??
        directResponse.headers["x-vercel-mitigated"] ??
        "",
    });
  }

  if (runBrowser) {
    failures.push(...(await runBrowserAudit(projects)));
  }

  console.table(rows);

  if (failures.length > 0) {
    console.error("\nPrototype embed audit failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `\nPrototype embed audit passed for ${projects.length} prototype(s).`,
  );
}

await main();
