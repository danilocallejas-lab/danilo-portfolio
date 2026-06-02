import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { archiveProjects } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Additional work from Danilo Callejas's current portfolio, kept as a lighter side room off the main gallery.",
};

function ArchiveProjectAction({ href }: { href?: string }) {
  const className =
    "inline-flex items-center rounded-full bg-foreground px-4 py-2 text-[0.9rem] text-background transition-opacity hover:opacity-[0.82]";

  if (!href) {
    return (
      <span className="inline-flex items-center rounded-full bg-[var(--surface-strong)] px-4 py-2 text-[0.9rem] text-foreground">
        Archive reference
      </span>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        Open case study
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      Open project
    </a>
  );
}

export default function ArchivePage() {
  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="sr-only">Archive</h1>
        <section className="auto-fit-grid">
          {archiveProjects.map((project) => (
            <article
              key={project.title}
              className="group @container/archive-card"
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

                <div className="space-y-4">
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
                  <ArchiveProjectAction href={project.href} />
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
