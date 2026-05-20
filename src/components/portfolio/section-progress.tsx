import type { ProjectSection } from "@/lib/portfolio-content";

function formatIndex(value: number) {
  return value.toString().padStart(2, "0");
}

export function SectionProgress({
  sections,
  activeIndex,
}: {
  sections: readonly ProjectSection[];
  activeIndex: number;
}) {
  const activeSection = sections[activeIndex] ?? sections[0];
  const progressWidth =
    sections.length <= 1 ? 100 : (activeIndex / (sections.length - 1)) * 100;

  return (
    <div className="pointer-events-none absolute bottom-8 left-6 right-6 z-20 hidden items-end justify-between gap-10 xl:flex">
      <div className="min-w-0 space-y-2">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
          {formatIndex(activeIndex + 1)} / {formatIndex(sections.length)}
        </p>
        <div className="min-w-0">
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            {activeSection.company}
          </p>
          <p className="mt-1 truncate text-[0.98rem] tracking-[-0.03em] text-foreground">
            {activeSection.title}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[26rem] space-y-3">
        <div className="h-px w-full bg-[rgba(17,17,15,0.12)]">
          <div
            className="h-px bg-[var(--accent)] transition-[width] duration-300 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            Gallery
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            Project {formatIndex(activeIndex + 1)}
          </span>
        </div>
      </div>
    </div>
  );
}
