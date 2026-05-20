import Image from "next/image";
import Link from "next/link";
import type { FeaturedProject } from "@/lib/site-content";

const zineCompanyClassByCompany: Record<string, string> = {
  Opendoor: "zine-company--opendoor",
  DraftKings: "zine-company--draftkings",
  Coinbase: "zine-company--coinbase",
  Dropbox: "zine-company--dropbox",
};

export function CaseStudyPage({ project }: { project: FeaturedProject }) {
  const zineCompanyClassName = zineCompanyClassByCompany[project.company] ?? "";

  return (
    <article
      className={`page-shell zine-company ${zineCompanyClassName}`}
      data-header-theme-section
    >
      <div className="page-content space-y-[var(--section-gap)]">
        <div className="space-y-5">
          <Link
            href="/"
            className="tap-target editorial-link inline-flex items-center text-[0.92rem] text-[var(--muted)]"
          >
            Back to gallery
          </Link>
          <div className="@container/work-hero">
            <div className="grid gap-8 @6xl/work-hero:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] @6xl/work-hero:items-end">
              <div className="space-y-5">
                <p className="editorial-eyebrow">{project.era}</p>
                <div className="space-y-3">
                  <h1 className="type-h1 font-display text-foreground">
                    {project.title}
                  </h1>
                  <p className="text-[0.92rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {project.company} / {project.category} / {project.year}
                  </p>
                </div>
                <p className="max-w-2xl text-[1.28rem] leading-8 text-foreground sm:text-[1.48rem] sm:leading-9">
                  {project.thesis}
                </p>
              </div>

              <div
                className={`view-transition-target relative overflow-hidden rounded-[var(--frame-radius)] border border-[var(--border)] shadow-[var(--shadow)] ${
                  project.cover.frameClassName ?? "aspect-[16/10]"
                }`}
                style={{ viewTransitionName: `project-image-${project.slug}` }}
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 56vw"
                  className={project.cover.imageClassName ?? "object-cover"}
                />
              </div>
            </div>
          </div>
        </div>

        <section className="surface-panel @container/work-overview grid gap-10 p-[var(--panel-padding-lg)] @5xl/work-overview:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-4">
            <p className="editorial-eyebrow">Overview</p>
            <p className="max-w-4xl text-[1.06rem] leading-8 text-[var(--muted)]">
              {project.overview}
            </p>
          </div>

          <dl className="auto-fit-grid text-[0.96rem] text-[var(--muted)] @5xl/work-overview:grid-cols-1">
            <div>
              <dt className="editorial-eyebrow mb-2">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="editorial-eyebrow mb-2">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="editorial-eyebrow mb-2">Collaborators</dt>
              <dd>{project.collaborators.join(", ")}</dd>
            </div>
          </dl>
        </section>

        <section className="auto-fit-grid">
          <div className="surface-card p-[var(--panel-padding)]">
            <p className="editorial-eyebrow mb-4">Problem</p>
            <p className="text-[1rem] leading-7 text-[var(--muted)]">
              {project.problem}
            </p>
          </div>

          <div className="surface-card p-[var(--panel-padding)]">
            <p className="editorial-eyebrow mb-4">Constraints</p>
            <ul className="space-y-3 text-[1rem] leading-7 text-[var(--muted)]">
              {project.constraints.map((constraint) => (
                <li key={constraint}>• {constraint}</li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-[var(--panel-padding)]">
            <p className="editorial-eyebrow mb-4">Design Strategy</p>
            <p className="text-[1rem] leading-7 text-[var(--muted)]">
              {project.designStrategy}
            </p>
          </div>
        </section>

        <section className="space-y-16">
          {project.sections.map((section, index) => (
            <div key={section.title} className="@container/work-section">
              <div className="grid gap-8 @6xl/work-section:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] @6xl/work-section:items-center">
                <div className={index % 2 === 1 ? "@6xl/work-section:order-2" : ""}>
                  <div className="space-y-4">
                    <p className="editorial-eyebrow">
                      Focus {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="type-h2 font-display text-foreground">
                      {section.title}
                    </h2>
                    <p className="text-[1.05rem] leading-8 text-foreground">
                      {section.summary}
                    </p>
                    <p className="text-[0.98rem] leading-7 text-[var(--muted)]">
                      {section.caption}
                    </p>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "@6xl/work-section:order-1" : ""}>
                  <div
                    className={`relative overflow-hidden rounded-[var(--frame-radius)] border border-[var(--border)] shadow-[var(--shadow-soft)] ${
                      section.image.frameClassName ?? "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 56vw"
                      className={section.image.imageClassName ?? "object-cover"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="surface-panel @container/work-outcomes grid gap-6 p-[var(--panel-padding-lg)] @6xl/work-outcomes:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-4">
            <p className="editorial-eyebrow">Outcomes</p>
            <ul className="space-y-3 text-[1rem] leading-7 text-[var(--muted)]">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>• {outcome}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="editorial-eyebrow">Reflection</p>
            <p className="text-[1rem] leading-7 text-[var(--muted)]">
              {project.reflection}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
