import { cx } from "@/lib/classnames";
import {
  getProjectDisciplineTagLabel,
  type ProjectDisciplineTagValue,
} from "@/lib/project-tags";

export function ProjectDisciplineTags({
  tags,
  className,
  itemClassName,
}: {
  tags: readonly ProjectDisciplineTagValue[];
  className?: string;
  itemClassName?: string;
}) {
  if (!tags.length) {
    return null;
  }

  return (
    <div
      className={cx("flex w-fit max-w-full flex-wrap gap-1.5", className)}
      aria-label="Project disciplines"
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className={cx(
            "inline-flex min-h-6 items-center rounded-[0.375rem] border border-current/15 px-2 py-1 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-current/70",
            itemClassName,
          )}
        >
          {getProjectDisciplineTagLabel(tag)}
        </span>
      ))}
    </div>
  );
}
