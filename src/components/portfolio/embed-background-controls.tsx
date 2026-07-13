"use client";

import { useMemo, useState } from "react";
import type {
  ProjectSection,
  PrototypeFrameSurface,
} from "@/lib/portfolio-content";
import {
  normalizeEmbedBackgroundColor,
  useEmbedBackgroundOverrides,
} from "@/components/portfolio/embed-background-overrides";

const defaultColorByFrameSurface: Record<PrototypeFrameSurface, string> = {
  opendoor: "#e6ddd3",
  dropbox: "#fff0fa",
  draftkings: "#effbea",
  coinbase: "#ecf3ff",
};

function getProjectDefaultColor(project: ProjectSection) {
  const frameSurface = project.prototype.frameSurface;

  return frameSurface
    ? defaultColorByFrameSurface[frameSurface]
    : defaultColorByFrameSurface.dropbox;
}

function getProjectLabel(project: ProjectSection) {
  return `${project.company} ${project.title}`;
}

export function EmbedBackgroundControls({
  projects,
}: {
  projects: readonly ProjectSection[];
}) {
  const { overrides, setOverride, resetOverride, resetAllOverrides } =
    useEmbedBackgroundOverrides();
  const [draftColors, setDraftColors] = useState<Record<string, string>>({});
  const hasOverrides = useMemo(
    () => Object.keys(overrides).length > 0,
    [overrides],
  );

  const setDraftColor = (projectId: string, color: string) => {
    setDraftColors((currentDraftColors) => ({
      ...currentDraftColors,
      [projectId]: color,
    }));
  };

  const clearDraftColor = (projectId: string) => {
    setDraftColors((currentDraftColors) => {
      const nextDraftColors = { ...currentDraftColors };
      delete nextDraftColors[projectId];

      return nextDraftColors;
    });
  };

  const handleColorInputChange = (projectId: string, color: string) => {
    const normalizedColor = normalizeEmbedBackgroundColor(color);

    if (!normalizedColor) {
      return;
    }

    setOverride(projectId, normalizedColor);
    setDraftColor(projectId, normalizedColor);
  };

  const handleTextInputChange = (projectId: string, color: string) => {
    setDraftColor(projectId, color);

    const normalizedColor = normalizeEmbedBackgroundColor(color);

    if (normalizedColor) {
      setOverride(projectId, normalizedColor);
    }
  };

  const handleTextInputBlur = (projectId: string) => {
    setDraftColors((currentDraftColors) => {
      const draftColor = currentDraftColors[projectId];

      if (draftColor === undefined) {
        return currentDraftColors;
      }

      const normalizedColor = normalizeEmbedBackgroundColor(draftColor);
      const nextDraftColors = { ...currentDraftColors };

      if (normalizedColor) {
        nextDraftColors[projectId] = normalizedColor;
      } else {
        delete nextDraftColors[projectId];
      }

      return nextDraftColors;
    });
  };

  const handleProjectReset = (projectId: string) => {
    resetOverride(projectId);
    clearDraftColor(projectId);
  };

  const handleResetAll = () => {
    resetAllOverrides();
    setDraftColors({});
  };

  if (!projects.length) {
    return null;
  }

  return (
    <section
      className="bg-[var(--intro-surface)]"
      aria-labelledby="embed-background-controls-heading"
      data-header-theme-section
    >
      <div className="page-content px-[var(--page-gutter)] pb-[clamp(1.75rem,3vw,3rem)]">
        <div className="border-y border-[var(--rule)] py-4 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p
                id="embed-background-controls-heading"
                className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]"
              >
                Embed backgrounds
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAll}
              disabled={!hasOverrides}
              className="tap-target rounded-full border border-[var(--rule)] px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:border-[var(--foreground)]/18 hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reset all
            </button>
          </div>

          <div className="mt-4 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {projects.map((project) => {
              const defaultColor = getProjectDefaultColor(project);
              const activeColor =
                overrides[project.section_id] ?? defaultColor;
              const textColor =
                draftColors[project.section_id] ?? activeColor;
              const projectLabel = getProjectLabel(project);

              return (
                <div
                  key={project.section_id}
                  className="grid gap-3 py-3 md:grid-cols-[minmax(0,1fr)_auto_auto_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--foreground)]">
                      {project.title}
                    </p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {project.company}
                    </p>
                  </div>

                  <label className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    <span className="sr-only">{projectLabel} color</span>
                    <input
                      type="color"
                      value={activeColor}
                      onChange={(event) =>
                        handleColorInputChange(
                          project.section_id,
                          event.target.value,
                        )
                      }
                      aria-label={`${projectLabel} color picker`}
                      className="h-9 w-12 cursor-pointer rounded-md border border-[var(--rule)] bg-transparent p-1"
                    />
                  </label>

                  <input
                    type="text"
                    value={textColor}
                    onChange={(event) =>
                      handleTextInputChange(
                        project.section_id,
                        event.target.value,
                      )
                    }
                    onBlur={() => handleTextInputBlur(project.section_id)}
                    aria-label={`${projectLabel} hex color`}
                    inputMode="text"
                    pattern="#?[0-9a-fA-F]{6}"
                    spellCheck={false}
                    autoCapitalize="off"
                    className="h-9 w-full rounded-md border border-[var(--rule)] bg-[var(--surface-card-background)] px-3 font-mono text-xs text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--foreground)]/24 focus:ring-2 focus:ring-[var(--accent)]/20 md:w-28"
                  />

                  <button
                    type="button"
                    onClick={() => handleProjectReset(project.section_id)}
                    disabled={!overrides[project.section_id]}
                    className="tap-target justify-self-start rounded-full border border-[var(--rule)] px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:border-[var(--foreground)]/18 hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40 md:justify-self-end"
                  >
                    Reset
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
