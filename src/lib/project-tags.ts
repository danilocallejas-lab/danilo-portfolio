export const PROJECT_DISCIPLINE_SEARCH_PARAM = "discipline";

export const PROJECT_DISCIPLINE_TAGS = [
  { value: "product", label: "Product" },
  { value: "branding-identity", label: "Branding & Identity" },
  { value: "marketing", label: "Marketing" },
  { value: "web-design", label: "Web Design" },
  { value: "art-direction", label: "Art Direction" },
  { value: "internal-tools", label: "Internal Tools" },
  { value: "design-systems", label: "Design Systems" },
] as const;

export type ProjectDisciplineTagValue =
  (typeof PROJECT_DISCIPLINE_TAGS)[number]["value"];

export type ProjectDisciplineTag = {
  value: ProjectDisciplineTagValue;
  label: string;
};

export type ProjectDisciplineTagOption = ProjectDisciplineTag & {
  count: number;
};

type ProjectWithDisciplineTags = {
  discipline_tags: readonly ProjectDisciplineTagValue[];
};

const projectDisciplineTagValues = new Set<string>(
  PROJECT_DISCIPLINE_TAGS.map((tag) => tag.value),
);

export function isProjectDisciplineTagValue(
  value: string,
): value is ProjectDisciplineTagValue {
  return projectDisciplineTagValues.has(value);
}

export function normalizeProjectDisciplineTags(
  values: Iterable<string | null | undefined>,
) {
  const requestedValues = new Set<ProjectDisciplineTagValue>();

  for (const value of values) {
    if (value && isProjectDisciplineTagValue(value)) {
      requestedValues.add(value);
    }
  }

  return PROJECT_DISCIPLINE_TAGS.filter((tag) =>
    requestedValues.has(tag.value),
  ).map((tag) => tag.value);
}

export function getProjectDisciplineTagLabel(
  value: ProjectDisciplineTagValue,
) {
  return (
    PROJECT_DISCIPLINE_TAGS.find((tag) => tag.value === value)?.label ?? value
  );
}

export function getProjectDisciplineTagsFromSearchParams(
  searchParams: Pick<URLSearchParams, "getAll">,
) {
  return normalizeProjectDisciplineTags(
    searchParams.getAll(PROJECT_DISCIPLINE_SEARCH_PARAM),
  );
}

export function setProjectDisciplineSearchParams(
  currentSearchParams: string | URLSearchParams,
  selectedTags: Iterable<string | null | undefined>,
) {
  const params = new URLSearchParams(
    typeof currentSearchParams === "string"
      ? currentSearchParams
      : currentSearchParams.toString(),
  );
  const normalizedTags = normalizeProjectDisciplineTags(selectedTags);

  params.delete(PROJECT_DISCIPLINE_SEARCH_PARAM);

  normalizedTags.forEach((tag) => {
    params.append(PROJECT_DISCIPLINE_SEARCH_PARAM, tag);
  });

  return params;
}

export function projectMatchesDisciplineFilters(
  projectTags: readonly ProjectDisciplineTagValue[],
  activeTags: readonly ProjectDisciplineTagValue[],
) {
  if (!activeTags.length) {
    return true;
  }

  const projectTagSet = new Set(projectTags);

  return activeTags.some((tag) => projectTagSet.has(tag));
}

export function getUsedProjectDisciplineTagOptions(
  projects: readonly ProjectWithDisciplineTags[],
): ProjectDisciplineTagOption[] {
  const countByTag = new Map<ProjectDisciplineTagValue, number>();

  projects.forEach((project) => {
    normalizeProjectDisciplineTags(project.discipline_tags).forEach((tag) => {
      countByTag.set(tag, (countByTag.get(tag) ?? 0) + 1);
    });
  });

  return PROJECT_DISCIPLINE_TAGS.map((tag) => ({
    ...tag,
    count: countByTag.get(tag.value) ?? 0,
  })).filter((tag) => tag.count > 0);
}
