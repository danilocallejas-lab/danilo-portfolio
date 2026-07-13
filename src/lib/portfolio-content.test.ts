import assert from "node:assert/strict";
import test from "node:test";
import {
  getLocalPrototypeUrl,
  getProjectByPrototypeSlug,
  getPrototypeAllowPreviewEmbed,
  getPrototypeEmbedMode,
  getPrototypeFrameSourceType,
  getPrototypeFrameStatus,
  getPrototypeFrameUrl,
  getRetiredPrototypeDeployment,
  portfolio_sections,
} from "./portfolio-content.ts";

function withEnv(
  values: Record<string, string | undefined>,
  callback: () => void,
) {
  const previous = Object.fromEntries(
    Object.keys(values).map((key) => [key, process.env[key]]),
  );

  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    callback();
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("local prototype URLs use the configured fixed port and path", () => {
  assert.equal(
    getLocalPrototypeUrl({
      workspace: "/tmp/example",
      port: 4202,
      path: "/events/foo?embed=1",
      startCommand: "npm run dev -- --port 4202",
    }),
    "http://localhost:4202/events/foo?embed=1",
  );
});

test("local embed mode is dev-only", () => {
  withEnv(
    {
      NODE_ENV: "development",
      NEXT_PUBLIC_PROTOTYPE_EMBED_MODE: "local",
    },
    () => {
      assert.equal(getPrototypeEmbedMode(), "local");
    },
  );

  withEnv(
    {
      NODE_ENV: "production",
      NEXT_PUBLIC_PROTOTYPE_EMBED_MODE: "local",
    },
    () => {
      assert.equal(getPrototypeEmbedMode(), "public");
    },
  );
});

test("same-origin published prototypes can still use local iframe mode in development", () => {
  const project = getProjectByPrototypeSlug("draftkings-quick-betslip");

  assert.ok(project);
  assert.equal(project.prototype.status, "published");
  assert.equal(
    getPrototypeFrameUrl(project.prototype),
    "/embedded-prototypes/draftkings-quick-betslip/",
  );

  withEnv(
    {
      NODE_ENV: "development",
      NEXT_PUBLIC_PROTOTYPE_EMBED_MODE: "local",
    },
    () => {
      assert.equal(getPrototypeFrameStatus(project.prototype), "published");
      assert.equal(getPrototypeAllowPreviewEmbed(project.prototype), true);
      assert.equal(getPrototypeFrameSourceType(project.prototype), "iframe");
      assert.equal(
        getPrototypeFrameUrl(project.prototype),
        "http://localhost:4202/",
      );
    },
  );
});

test("Opendoor Agent Led Offers is a same-origin published iframe", () => {
  const project = getProjectByPrototypeSlug(
    "opendoor-agent-led-offers-tooling-platform",
  );

  assert.ok(project);
  assert.equal(project.prototype.status, "published");
  assert.equal(
    project.prototype.embedUrl,
    "/embedded-prototypes/opendoor-agent-led-offers-tooling-platform/dashboard?embed=1",
  );
  assert.equal(
    project.prototype.openUrl,
    "/embedded-prototypes/opendoor-agent-led-offers-tooling-platform/dashboard?embed=1",
  );
  assert.equal(getPrototypeAllowPreviewEmbed(project.prototype), true);
  assert.equal(getPrototypeFrameSourceType(project.prototype), "iframe");
  assert.equal(
    getPrototypeFrameUrl(project.prototype),
    "/embedded-prototypes/opendoor-agent-led-offers-tooling-platform/dashboard?embed=1",
  );
  assert.equal(project.prototype.localDev?.port, 4173);
  assert.equal(project.prototype.localDev?.path, "/dashboard?embed=1");
});

test("Dropbox Spaces Tasks is a same-origin published iframe", () => {
  const project = getProjectByPrototypeSlug("dropbox-spaces-tasks");

  assert.ok(project);
  assert.equal(project.prototype.status, "published");
  assert.equal(
    project.prototype.embedUrl,
    "/embedded-prototypes/dropbox-spaces-tasks/",
  );
  assert.equal(
    project.prototype.openUrl,
    "/embedded-prototypes/dropbox-spaces-tasks/",
  );
  assert.equal(getPrototypeAllowPreviewEmbed(project.prototype), true);
  assert.equal(getPrototypeFrameSourceType(project.prototype), "iframe");
  assert.equal(
    getPrototypeFrameUrl(project.prototype),
    "/embedded-prototypes/dropbox-spaces-tasks/",
  );
  assert.equal(project.prototype.localDev?.port, 4401);
  assert.equal(project.prototype.localDev?.path, "/spaces-smartworkspace");
});

test("Dropbox Paper Desktop is a same-origin published iframe", () => {
  const project = getProjectByPrototypeSlug("dropbox-paper-desktop");

  assert.ok(project);
  assert.equal(project.prototype.status, "published");
  assert.equal(
    project.prototype.embedUrl,
    "/embedded-prototypes/dropbox-paper-desktop/",
  );
  assert.equal(
    project.prototype.openUrl,
    "/embedded-prototypes/dropbox-paper-desktop/",
  );
  assert.equal(getPrototypeAllowPreviewEmbed(project.prototype), true);
  assert.equal(getPrototypeFrameSourceType(project.prototype), "iframe");
  assert.equal(
    getPrototypeFrameUrl(project.prototype),
    "/embedded-prototypes/dropbox-paper-desktop/",
  );
  assert.equal(project.prototype.localDev?.port, 4402);
  assert.equal(project.prototype.localDev?.path, "/paper-desktop");
});

test("Dropbox Paper Marketing Page is a same-origin published iframe", () => {
  const project = getProjectByPrototypeSlug("dropbox-paper-marketing-page");

  assert.ok(project);
  assert.equal(project.prototype.status, "published");
  assert.equal(
    project.prototype.embedUrl,
    "/embedded-prototypes/dropbox-paper-marketing-page/",
  );
  assert.equal(
    project.prototype.openUrl,
    "/embedded-prototypes/dropbox-paper-marketing-page/",
  );
  assert.equal(getPrototypeAllowPreviewEmbed(project.prototype), true);
  assert.equal(getPrototypeFrameSourceType(project.prototype), "iframe");
  assert.equal(
    getPrototypeFrameUrl(project.prototype),
    "/embedded-prototypes/dropbox-paper-marketing-page/",
  );
  assert.equal(project.prototype.localDev?.port, 4403);
  assert.equal(project.prototype.localDev?.path, "/");
});

test("Dropbox Paper Templates is a same-origin published iframe", () => {
  const project = getProjectByPrototypeSlug("dropbox-paper-templates");

  assert.ok(project);
  assert.equal(project.prototype.status, "published");
  assert.equal(
    project.prototype.embedUrl,
    "/embedded-prototypes/dropbox-paper-templates/",
  );
  assert.equal(
    project.prototype.openUrl,
    "/embedded-prototypes/dropbox-paper-templates/",
  );
  assert.equal(getPrototypeAllowPreviewEmbed(project.prototype), true);
  assert.equal(getPrototypeFrameSourceType(project.prototype), "iframe");
  assert.equal(
    getPrototypeFrameUrl(project.prototype),
    "/embedded-prototypes/dropbox-paper-templates/",
  );
  assert.equal(project.prototype.localDev?.port, 4404);
  assert.equal(project.prototype.localDev?.path, "/");
});

test("Dropbox prototypes use the unscaled embed frame baseline", () => {
  for (const slug of [
    "dropbox-spaces-tasks",
    "dropbox-paper-desktop",
    "dropbox-paper-marketing-page",
    "dropbox-paper-templates",
  ]) {
    const project = getProjectByPrototypeSlug(slug);

    assert.ok(project);
    assert.equal(project.prototype.frameScale, null, slug);
  }
});

test("retired standalone deployments are metadata only", () => {
  const project = getProjectByPrototypeSlug("draftkings-quick-betslip");

  assert.ok(project);
  assert.equal(
    project.prototype.embedUrl,
    "/embedded-prototypes/draftkings-quick-betslip/",
  );
  assert.doesNotMatch(project.prototype.embedUrl ?? "", /vercel\.app/);
  assert.equal(
    getRetiredPrototypeDeployment(project.prototype.slug)?.formerVercelProject,
    "draftkings-quick-betslip",
  );
});

test("prototype frame surfaces inherit from company", () => {
  const expectedSurfaceByCompany = {
    Opendoor: "opendoor",
    Dropbox: "dropbox",
    DraftKings: "draftkings",
    Coinbase: "coinbase",
  } as const;

  for (const section of portfolio_sections) {
    if (section.section_type !== "project") {
      continue;
    }

    assert.equal(
      section.prototype.frameSurface,
      expectedSurfaceByCompany[
        section.company as keyof typeof expectedSurfaceByCompany
      ],
      section.section_id,
    );
  }
});

test("DraftKings Global Switcher uses the DraftKings frame surface", () => {
  const project = getProjectByPrototypeSlug("draftkings-global-switcher");

  assert.ok(project);
  assert.equal(project.prototype.frameSurface, "draftkings");
});

test("DraftKings Global Switcher is the first visible DraftKings project", () => {
  const firstVisibleDraftKingsProject = portfolio_sections.find(
    (section) =>
      section.section_type === "project" &&
      section.company === "DraftKings" &&
      section.show_on_homepage,
  );

  assert.equal(
    firstVisibleDraftKingsProject?.section_id,
    "draftkings-global-switcher",
  );
});
