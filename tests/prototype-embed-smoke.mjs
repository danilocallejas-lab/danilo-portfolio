import assert from "node:assert/strict";
import { portfolio_sections } from "../src/lib/portfolio-content.ts";
import {
  getEmbeddedFrameHandle,
  getEmbeddedFrameText,
  loadPlaywright,
  responseBelongsToEmbed,
} from "../scripts/prototype-shared.mjs";

const baseUrl = process.env.PORTFOLIO_BASE_URL ?? "http://localhost:3000";
const { chromium } = await loadPlaywright({
  errorMessage:
    "Playwright is not available. Install it in this workspace or set PLAYWRIGHT_PACKAGE_DIR to a Playwright package directory.",
});

const projectSections = portfolio_sections.filter(
  (section) => section.section_type === "project",
);

const publishedPrototypePages = projectSections
  .filter((section) => section.prototype.status === "published")
  .map((section) => {
    assert.ok(
      section.prototype.embedUrl,
      `${section.section_id} is published but has no embedUrl`,
    );

    return {
      slug: section.prototype.slug,
      iframeUrl: new URL(section.prototype.embedUrl, baseUrl).toString(),
    };
  });

const fallbackPrototypePages = projectSections
  .filter((section) => section.prototype.status !== "published")
  .map((section) => ({
    slug: section.prototype.slug,
    status: section.prototype.status,
  }));

const knownPrototypeHosts = new Set(
  projectSections
    .map((section) => section.prototype.embedUrl ?? section.prototype.openUrl)
    .filter(Boolean)
    .map((url) => new URL(url, baseUrl).host),
);

function projectUrl(slug) {
  return new URL(`/prototypes/${slug}`, baseUrl).toString();
}

function embeddedUrl(path) {
  return new URL(path, baseUrl).toString();
}

function isFramePolicyError(message) {
  return /frame-ancestors|x-frame-options|refused to frame|refused to display/i.test(
    message,
  );
}

function getLifecycleLabel(status) {
  switch (status) {
    case "blocked":
      return "Embed blocked";
    case "planned":
      return "Rebuild planned";
    case "local-preview":
    default:
      return "Local preview";
  }
}

function rectWithin(inner, outer) {
  return (
    inner.x >= outer.x - 0.5 &&
    inner.y >= outer.y - 0.5 &&
    inner.right <= outer.right + 0.5 &&
    inner.bottom <= outer.bottom + 0.5
  );
}

async function assertOverlayMasked(page, { name, url, overlaySelectors }) {
  await page.goto(url, { waitUntil: "networkidle" });

  const result = await page.evaluate((selectors) => {
    const screen = document.querySelector('[data-prototype-screen="true"]');
    const screenRect = screen?.getBoundingClientRect();
    const screenStyle = screen ? getComputedStyle(screen) : null;
    const toRect = (rect) =>
      rect
        ? {
            bottom: rect.bottom,
            height: rect.height,
            right: rect.right,
            width: rect.width,
            x: rect.x,
            y: rect.y,
          }
        : null;

    return {
      screen: toRect(screenRect),
      screenStyles: screenStyle
        ? {
            clipPath: screenStyle.clipPath,
            contain: screenStyle.contain,
            isolation: screenStyle.isolation,
            overflow: screenStyle.overflow,
          }
        : null,
      overlays: selectors.map((selector) => {
        const element = document.querySelector(selector);
        return {
          selector,
          rect: toRect(element?.getBoundingClientRect()),
        };
      }),
    };
  }, overlaySelectors);

  assert.ok(result.screen, `${name} should expose a prototype screen mask`);
  assert.equal(
    result.screenStyles?.overflow,
    "clip",
    `${name} screen should use overflow: clip`,
  );
  assert.match(
    result.screenStyles?.clipPath ?? "",
    /inset\(0px round/i,
    `${name} screen should use a rounded clip-path`,
  );
  assert.equal(
    result.screenStyles?.contain,
    "paint",
    `${name} screen should contain paint for transformed overlays`,
  );
  assert.equal(
    result.screenStyles?.isolation,
    "isolate",
    `${name} screen should isolate overlay stacking`,
  );

  for (const overlay of result.overlays) {
    assert.ok(
      overlay.rect,
      `${name} should render overlay ${overlay.selector}`,
    );
    assert.equal(
      rectWithin(overlay.rect, result.screen),
      true,
      `${name} overlay ${overlay.selector} should stay inside the phone screen`,
    );
  }
}

const browser = await chromium.launch();
const page = await browser.newPage();
const frameErrors = [];
const prototypeResponses = [];

page.on("console", (message) => {
  const text = message.text();

  if (isFramePolicyError(text)) {
    frameErrors.push(text);
  }
});

page.on("response", (response) => {
  let host;

  try {
    host = new URL(response.url()).host;
  } catch {
    return;
  }

  if (!knownPrototypeHosts.has(host)) {
    return;
  }

  prototypeResponses.push({
    host,
    status: response.status(),
    url: response.url(),
    headers: response.headers(),
  });
});

try {
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const homeInsightsRailCard = page
    .locator("article")
    .filter({ has: page.getByRole("heading", { name: "Home Insights" }) })
    .first();

  await homeInsightsRailCard.waitFor({ state: "attached", timeout: 15000 });

  assert.equal(
    await homeInsightsRailCard
      .getByText("Loading home insights prototype", { exact: false })
      .count(),
    0,
    "Home Insights rail card should not show a stuck loading overlay on the homepage",
  );

  for (const { slug, iframeUrl } of publishedPrototypePages) {
    const responseStart = prototypeResponses.length;

    await page.goto(projectUrl(slug), { waitUntil: "networkidle" });

    const iframeHandle = await getEmbeddedFrameHandle(page, iframeUrl, {
      baseUrl,
    });

    const frameText = await getEmbeddedFrameText(iframeHandle, iframeUrl);
    assert.doesNotMatch(
      frameText,
      /403:\s*Forbidden|Error:\s*Forbidden/i,
      `${slug} iframe should load real prototype content, not a Vercel 403 page`,
    );
    assert.doesNotMatch(
      frameText,
      /^\s*Not found\s*$/i,
      `${slug} iframe should load real prototype content, not a plain Not found page`,
    );
    assert.doesNotMatch(
      frameText,
      /^\s*404\b|This page could not be found/i,
      `${slug} iframe should load real prototype content, not a 404 page`,
    );

    if (slug === "draftkings-global-switcher") {
      assert.match(
        frameText,
        /NOP @ SAC|NOP Pelicans|SAC Kings|New Orleans Pelicans|Sacramento Kings/i,
        "Global Switcher iframe should render the NOP @ SAC event prototype",
      );
    }

    const deniedResponse = prototypeResponses
      .slice(responseStart)
      .find(
        (response) =>
          responseBelongsToEmbed(response.url, iframeUrl, baseUrl) &&
          (response.status === 403 ||
            response.headers["x-vercel-mitigated"] === "deny"),
      );

    assert.equal(
      deniedResponse,
      undefined,
      `${slug} iframe should not be denied by Vercel protection/firewall`,
    );

    if (slug === "opendoor-home-insights") {
      await page
        .getByText("Loading home insights prototype", { exact: false })
        .waitFor({ state: "hidden", timeout: 20000 });
    }
  }

  for (const { slug, status } of fallbackPrototypePages) {
    await page.goto(projectUrl(slug), { waitUntil: "networkidle" });

    assert.equal(
      await page.locator("iframe").count(),
      0,
      `${slug} should render the curated fallback, not an iframe`,
    );
    await page.getByText(getLifecycleLabel(status)).first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  }

  await assertOverlayMasked(page, {
    name: "DraftKings Global Switcher open sheet",
    overlaySelectors: [
      '[aria-label="Dismiss switcher"]',
      '[aria-label="Global switcher"]',
    ],
    url: embeddedUrl(
      "/embedded-prototypes/draftkings-global-switcher/events/new-orleans-pelicans-at-sacramento-kings?sheet=open&segment=event&sport=nba",
    ),
  });

  await assertOverlayMasked(page, {
    name: "DraftKings Player Props open drawer",
    overlaySelectors: [
      '[data-prototype-overlay="player-stats-backdrop"]',
      '[data-prototype-overlay="player-stats-drawer"]',
    ],
    url: embeddedUrl(
      "/embedded-prototypes/draftkings-player-props-stats-scores/",
    ),
  });

  assert.deepEqual(frameErrors, [], "No browser frame/CSP errors should occur");
} finally {
  await browser.close();
}
