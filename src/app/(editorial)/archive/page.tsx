import type { Metadata } from "next";
import Image from "next/image";
import { archiveProjects } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Additional work from Danilo Callejas's current portfolio, kept as a lighter side room off the main gallery.",
};

export default function ArchivePage() {
  return (
    <div className="page-shell">
      <div className="page-content space-y-[var(--section-gap)]">
        <section className="surface-panel p-[var(--panel-padding-lg)]">
          <div className="@container/archive-intro grid gap-8 @5xl/archive-intro:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="space-y-4">
              <p className="editorial-eyebrow">Archive</p>
              <h1 className="type-h1 font-display text-foreground">
                Extra rooms, lighter treatment.
              </h1>
              <p className="max-w-3xl text-[1.08rem] leading-8 text-[var(--muted)]">
                The homepage now behaves like a guided gallery walk, so this page
                stays intentionally simpler. These projects still matter, but they
                do not need the same amount of staging to be useful.
              </p>
            </div>

            <div className="rounded-[calc(var(--panel-radius)-0.125rem)] border border-[var(--archive-note-border)] bg-[var(--archive-note-surface)] p-[var(--panel-padding)] text-[var(--archive-note-foreground)] shadow-[var(--shadow-soft)]">
              <p className="editorial-eyebrow text-[var(--archive-note-muted)]">
                Side room note
              </p>
              <p className="mt-4 text-[0.98rem] leading-7 text-[var(--archive-note-foreground)]">
                This page now stays self-contained. The main gallery favors the
                most staged pieces, while this archive keeps the rest of the work
                close at hand without routing back through the old site.
              </p>
            </div>
          </div>
        </section>

        <section className="auto-fit-grid">
          {archiveProjects.map((project) => (
            <article
              key={project.title}
              className="surface-card group @container/archive-card p-[var(--panel-padding)]"
            >
              <div
                className={`grid gap-5 ${
                  project.image
                    ? "@4xl/archive-card:grid-cols-[15rem_minmax(0,1fr)] @4xl/archive-card:items-start"
                    : ""
                }`}
              >
                {project.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--frame-radius)-0.125rem)] border border-[var(--border)] bg-[var(--archive-preview-gradient)]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 92vw, 20rem"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-end rounded-[calc(var(--frame-radius)-0.125rem)] border border-[var(--border)] bg-[var(--archive-placeholder-gradient)] p-5">
                    <p className="type-h3 font-display text-foreground">
                      {project.title}
                    </p>
                  </div>
                )}

                <div className="space-y-4 p-1">
                  <div className="space-y-2">
                    <p className="editorial-eyebrow">
                      {project.company} / {project.category} / {project.year}
                    </p>
                    <h2 className="type-h3 font-display text-foreground">
                      {project.title}
                    </h2>
                  </div>
                  <p className="text-[1rem] leading-7 text-[var(--muted)]">
                    {project.summary}
                  </p>
                  <span className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-[0.9rem] text-foreground">
                    Archive reference
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
