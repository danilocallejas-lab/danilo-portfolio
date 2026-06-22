import assert from "node:assert/strict";
import test from "node:test";
import { portfolio_sections } from "./portfolio-content.ts";
import { archiveProjects, featuredProjects } from "./site-content.ts";
import {
  getProjectDisciplineTagLabel,
  getProjectDisciplineTagsFromSearchParams,
  getUsedProjectDisciplineTagOptions,
  isProjectDisciplineTagValue,
  normalizeProjectDisciplineTags,
  projectMatchesDisciplineFilters,
  setProjectDisciplineSearchParams,
} from "./project-tags.ts";

const visibleProjects = portfolio_sections.filter(
  (section) => section.section_type === "project" && section.show_on_homepage,
);

test("discipline tag registry validates and labels known tags", () => {
  assert.equal(isProjectDisciplineTagValue("product"), true);
  assert.equal(isProjectDisciplineTagValue("branding-identity"), true);
  assert.equal(isProjectDisciplineTagValue("unknown"), false);
  assert.equal(getProjectDisciplineTagLabel("web-design"), "Web Design");
});

test("discipline tag normalization removes duplicates, ignores invalid values, and preserves registry order", () => {
  assert.deepEqual(
    normalizeProjectDisciplineTags([
      "marketing",
      "unknown",
      "product",
      "marketing",
      null,
      undefined,
    ]),
    ["product", "marketing"],
  );
});

test("used discipline options are ordered and counted from visible projects", () => {
  assert.deepEqual(
    getUsedProjectDisciplineTagOptions(visibleProjects).map((option) => [
      option.value,
      option.count,
    ]),
    [
      ["product", 14],
      ["marketing", 2],
      ["web-design", 1],
      ["internal-tools", 1],
    ],
  );
});

test("discipline matching uses OR logic and empty filters show all projects", () => {
  assert.equal(
    visibleProjects.every((project) =>
      projectMatchesDisciplineFilters(project.discipline_tags, []),
    ),
    true,
  );
  assert.deepEqual(
    visibleProjects
      .filter((project) =>
        projectMatchesDisciplineFilters(project.discipline_tags, [
          "marketing",
          "internal-tools",
        ]),
      )
      .map((project) => project.section_id),
    [
      "opendoor-agent-led-offers-tooling-platform",
      "dropbox-paper-marketing-page",
      "dropbox-paper-templates",
    ],
  );
});

test("discipline query params are repeatable and normalized", () => {
  const params = new URLSearchParams(
    "discipline=marketing&discipline=unknown&discipline=product",
  );

  assert.deepEqual(getProjectDisciplineTagsFromSearchParams(params), [
    "product",
    "marketing",
  ]);

  assert.equal(
    setProjectDisciplineSearchParams(
      "foo=bar&discipline=unknown",
      ["marketing", "product", "marketing"],
    ).toString(),
    "foo=bar&discipline=product&discipline=marketing",
  );
});

test("all portfolio projects declare discipline tags", () => {
  for (const project of portfolio_sections) {
    assert.ok(project.discipline_tags.length > 0, project.section_id);
  }
});

test("featured /work projects declare ordered discipline tags", () => {
  for (const project of featuredProjects) {
    assert.ok(project.discipline_tags.length > 0, project.slug);
    assert.deepEqual(
      normalizeProjectDisciplineTags(project.discipline_tags),
      project.discipline_tags,
      project.slug,
    );
  }

  assert.deepEqual(
    getUsedProjectDisciplineTagOptions(featuredProjects).map((option) => [
      option.value,
      option.count,
    ]),
    [
      ["product", 7],
      ["branding-identity", 4],
      ["marketing", 3],
      ["web-design", 2],
      ["art-direction", 4],
      ["internal-tools", 2],
      ["design-systems", 1],
    ],
  );
});

test("archive projects declare ordered discipline tags", () => {
  for (const project of archiveProjects) {
    assert.ok(project.discipline_tags.length > 0, project.title);
    assert.deepEqual(
      normalizeProjectDisciplineTags(project.discipline_tags),
      project.discipline_tags,
      project.title,
    );
  }

  assert.deepEqual(
    getUsedProjectDisciplineTagOptions(archiveProjects).map((option) => [
      option.value,
      option.count,
    ]),
    [
      ["product", 3],
      ["branding-identity", 4],
      ["marketing", 3],
      ["web-design", 2],
      ["art-direction", 4],
      ["internal-tools", 1],
      ["design-systems", 1],
    ],
  );
});
