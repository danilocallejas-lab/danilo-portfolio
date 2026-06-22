"use client";

import type { ReactNode } from "react";
import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DraggableProjectLane } from "@/components/portfolio/draggable-project-lane";
import { cx } from "@/lib/classnames";
import type {
  ProjectDisciplineTagOption,
  ProjectDisciplineTagValue,
} from "@/lib/project-tags";
import {
  getProjectDisciplineTagsFromSearchParams,
  normalizeProjectDisciplineTags,
  projectMatchesDisciplineFilters,
  setProjectDisciplineSearchParams,
} from "@/lib/project-tags";

export type ProjectFilterItem = {
  id: string;
  disciplineTags: readonly ProjectDisciplineTagValue[];
};

type WorkFilterContextValue = {
  activeTags: readonly ProjectDisciplineTagValue[];
  options: readonly ProjectDisciplineTagOption[];
  totalProjects: number;
  visibleProjectCount: number;
  clearTags: () => void;
  toggleTag: (tag: ProjectDisciplineTagValue) => void;
  isProjectVisible: (projectId: string) => boolean;
  getVisibleProjectCount: (projects: readonly ProjectFilterItem[]) => number;
};

const WorkFilterContext = createContext<WorkFilterContextValue | null>(null);

function getTagKey(tags: readonly ProjectDisciplineTagValue[]) {
  return tags.join("|");
}

function parseTagKey(key: string): ProjectDisciplineTagValue[] {
  return key ? (key.split("|") as ProjectDisciplineTagValue[]) : [];
}

function useOptionalWorkFilters() {
  return useContext(WorkFilterContext);
}

function WorkFilterSearchParamSync({
  onActiveTagsChange,
}: {
  onActiveTagsChange: (tags: readonly ProjectDisciplineTagValue[]) => void;
}) {
  const searchParams = useSearchParams();
  const activeTagKey = getTagKey(
    getProjectDisciplineTagsFromSearchParams(searchParams),
  );

  useEffect(() => {
    onActiveTagsChange(parseTagKey(activeTagKey));
  }, [activeTagKey, onActiveTagsChange]);

  return null;
}

export function WorkFilterProvider({
  projects,
  options,
  children,
}: {
  projects: readonly ProjectFilterItem[];
  options: readonly ProjectDisciplineTagOption[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const availableTags = useMemo(
    () => new Set(options.map((option) => option.value)),
    [options],
  );
  const normalizeActiveTags = useCallback(
    (tags: Iterable<string | null | undefined>) =>
      normalizeProjectDisciplineTags(tags).filter((tag) =>
        availableTags.has(tag),
      ),
    [availableTags],
  );
  const [activeTags, setActiveTags] = useState<ProjectDisciplineTagValue[]>([]);

  const setActiveTagsFromUrl = useCallback(
    (nextTags: readonly ProjectDisciplineTagValue[]) => {
      const normalizedTags = normalizeActiveTags(nextTags);
      const normalizedTagKey = getTagKey(normalizedTags);

      setActiveTags((currentTags) =>
        getTagKey(currentTags) === normalizedTagKey ? currentTags : normalizedTags,
      );
    },
    [normalizeActiveTags],
  );

  const commitActiveTags = useCallback(
    (nextTags: Iterable<string | null | undefined>) => {
      const normalizedTags = normalizeActiveTags(nextTags);
      const params = setProjectDisciplineSearchParams(
        typeof window === "undefined" ? "" : window.location.search,
        normalizedTags,
      );
      const query = params.toString();
      const hash = typeof window === "undefined" ? "" : window.location.hash;

      setActiveTags(normalizedTags);
      router.replace(`${pathname}${query ? `?${query}` : ""}${hash}`, {
        scroll: false,
      });
    },
    [normalizeActiveTags, pathname, router],
  );

  const activeTagSet = useMemo(() => new Set(activeTags), [activeTags]);
  const visibleProjectIds = useMemo(() => {
    return new Set(
      projects
        .filter((project) =>
          projectMatchesDisciplineFilters(project.disciplineTags, activeTags),
        )
        .map((project) => project.id),
    );
  }, [activeTags, projects]);

  const clearTags = useCallback(() => {
    commitActiveTags([]);
  }, [commitActiveTags]);

  const toggleTag = useCallback(
    (tag: ProjectDisciplineTagValue) => {
      if (activeTagSet.has(tag)) {
        commitActiveTags(activeTags.filter((activeTag) => activeTag !== tag));
        return;
      }

      commitActiveTags([...activeTags, tag]);
    },
    [activeTagSet, activeTags, commitActiveTags],
  );

  const isProjectVisible = useCallback(
    (projectId: string) => visibleProjectIds.has(projectId),
    [visibleProjectIds],
  );

  const getVisibleProjectCount = useCallback(
    (projectItems: readonly ProjectFilterItem[]) =>
      projectItems.filter((project) => visibleProjectIds.has(project.id))
        .length,
    [visibleProjectIds],
  );

  const contextValue = useMemo<WorkFilterContextValue>(
    () => ({
      activeTags,
      options,
      totalProjects: projects.length,
      visibleProjectCount: visibleProjectIds.size,
      clearTags,
      toggleTag,
      isProjectVisible,
      getVisibleProjectCount,
    }),
    [
      activeTags,
      clearTags,
      getVisibleProjectCount,
      isProjectVisible,
      options,
      projects.length,
      toggleTag,
      visibleProjectIds.size,
    ],
  );

  return (
    <WorkFilterContext.Provider value={contextValue}>
      <Suspense fallback={null}>
        <WorkFilterSearchParamSync onActiveTagsChange={setActiveTagsFromUrl} />
      </Suspense>
      {children}
    </WorkFilterContext.Provider>
  );
}

function getFilterButtonClassName(isActive: boolean) {
  return cx(
    "tap-target inline-flex items-center gap-2 rounded-[0.5rem] border px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35",
    isActive
      ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
      : "border-[var(--rule)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]",
  );
}

export function WorkFilterBar() {
  const filters = useOptionalWorkFilters();

  if (!filters || !filters.options.length) {
    return null;
  }

  const isAllActive = filters.activeTags.length === 0;

  return (
    <section
      className="page-content px-[var(--page-gutter)] pb-[clamp(2rem,4vw,3.5rem)]"
      data-header-theme-section
    >
      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Project disciplines">
          <button
            type="button"
            aria-pressed={isAllActive}
            className={getFilterButtonClassName(isAllActive)}
            onClick={filters.clearTags}
          >
            All
            <span className="font-mono text-[0.68rem] opacity-70">
              {filters.totalProjects}
            </span>
          </button>

          {filters.options.map((option) => {
            const isActive = filters.activeTags.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                className={getFilterButtonClassName(isActive)}
                onClick={() => filters.toggleTag(option.value)}
              >
                {option.label}
                <span className="font-mono text-[0.68rem] opacity-70">
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>

        <p
          className="shrink-0 pt-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[var(--muted)]"
          aria-live="polite"
        >
          {String(filters.visibleProjectCount).padStart(2, "0")} shown
        </p>
      </div>
    </section>
  );
}

export function FilteredProjectSlot({
  projectId,
  children,
}: {
  projectId: string;
  children: ReactNode;
}) {
  const filters = useOptionalWorkFilters();

  if (filters && !filters.isProjectVisible(projectId)) {
    return null;
  }

  return <>{children}</>;
}

export function FilteredProjectCounterLabel({
  projectId,
  projects,
  suffix,
}: {
  projectId: string;
  projects: readonly ProjectFilterItem[];
  suffix?: string;
}) {
  const filters = useOptionalWorkFilters();
  const visibleProjects = filters
    ? projects.filter((project) => filters.isProjectVisible(project.id))
    : projects;
  const projectIndex = visibleProjects.findIndex(
    (project) => project.id === projectId,
  );
  const safeProjectIndex = projectIndex >= 0 ? projectIndex : 0;
  const counterLabel = `${String(safeProjectIndex + 1).padStart(2, "0")} / ${String(visibleProjects.length).padStart(2, "0")}`;

  return <>{suffix ? `${counterLabel} / ${suffix}` : counterLabel}</>;
}

export function FilteredCompanySection({
  company,
  projects,
  anchorId,
  sectionClassName,
  headingClassName,
  metaClassName,
  children,
}: {
  company: string;
  projects: readonly ProjectFilterItem[];
  anchorId?: string;
  sectionClassName: string;
  headingClassName: string;
  metaClassName: string;
  children: ReactNode;
}) {
  const filters = useOptionalWorkFilters();
  const visibleCount = filters
    ? filters.getVisibleProjectCount(projects)
    : projects.length;

  if (visibleCount === 0) {
    return null;
  }

  return (
    <section
      id={anchorId}
      className={`${sectionClassName} scroll-mt-[calc(var(--page-block-start)+1rem)]`}
      data-header-theme-section
    >
      <div className="page-content px-[var(--page-gutter)] py-[var(--section-gap)]">
        <div
          className="mb-[clamp(1.75rem,3vw,3.75rem)] flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className={`type-h2 font-display ${headingClassName}`}>
            {company}
          </h2>

          <p
            className={`text-[0.72rem] uppercase tracking-[0.16em] ${metaClassName}`}
            aria-live="polite"
          >
            {visibleCount.toString().padStart(2, "0")} selected projects
          </p>
        </div>

        <DraggableProjectLane>{children}</DraggableProjectLane>
      </div>
    </section>
  );
}
