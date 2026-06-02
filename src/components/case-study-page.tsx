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
      <div className="@container/work-page page-content">
        <div className="grid gap-[var(--section-gap)] @6xl/work-page:grid-cols-[minmax(18rem,0.36fr)_minmax(0,0.64fr)] @6xl/work-page:items-start">
          <div className="space-y-[var(--section-gap)]">
            <header className="space-y-8">
              <Link
                href="/"
                className="tap-target editorial-link inline-flex items-center text-[0.92rem] text-[var(--muted)]"
              >
                Back to grid
              </Link>

              <div className="space-y-5">
                <p className="editorial-eyebrow">{project.era}</p>
                <div className="space-y-3">
                  <h1 className="type-h1 font-display text-foreground">
                    {project.title}
                  </h1>
                  <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {project.company} / {project.category} / {project.year}
                  </p>
                </div>
                <p className="text-[clamp(1.18rem,1.04rem+0.68vw,1.62rem)] leading-8 text-foreground sm:leading-9">
                  {project.thesis}
                </p>
              </div>

              <dl className="grid gap-5 text-[0.96rem] leading-6 text-[var(--muted)]">
                <div>
                  <dt className="editorial-eyebrow mb-2">Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt className="editorial-eyebrow mb-2">Collaborators</dt>
                  <dd>{project.collaborators.join(", ")}</dd>
                </div>
              </dl>
            </header>

            <section className="space-y-4">
              <p className="editorial-eyebrow">Overview</p>
              <p className="text-[1.06rem] leading-8 text-[var(--muted)]">
                {project.overview}
              </p>
            </section>

            <section className="space-y-4">
              <p className="editorial-eyebrow">Outcomes</p>
              <ul className="space-y-3 text-[0.96rem] leading-7 text-[var(--muted)]">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-8">
              <div className="space-y-3">
                <p className="editorial-eyebrow">Problem</p>
                <p className="text-[1rem] leading-7 text-[var(--muted)]">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-3">
                <p className="editorial-eyebrow">Constraints</p>
                <ul className="space-y-3 text-[1rem] leading-7 text-[var(--muted)]">
                  {project.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="editorial-eyebrow">Design Strategy</p>
                <p className="text-[1rem] leading-7 text-[var(--muted)]">
                  {project.designStrategy}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <p className="editorial-eyebrow">Reflection</p>
              <p className="text-[1.05rem] leading-8 text-[var(--muted)]">
                {project.reflection}
              </p>
            </section>
          </div>

          <div className="space-y-[var(--section-gap)]">
            <div
              className={`view-transition-target relative overflow-hidden rounded-lg bg-[var(--surface-strong)] shadow-[var(--shadow-soft)] ${
                project.cover.frameClassName ?? "aspect-[16/10]"
              }`}
              style={{ viewTransitionName: `project-image-${project.slug}` }}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 58vw"
                className={project.cover.imageClassName ?? "object-cover"}
              />
            </div>

            <section className="space-y-[clamp(3rem,7vw,7rem)]">
              {project.sections.map((section, index) => (
                <div key={section.title} className="space-y-5">
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

                  <div
                    className={`relative overflow-hidden rounded-lg bg-[var(--surface-strong)] shadow-[var(--shadow-soft)] ${
                      section.image.frameClassName ?? "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 58vw"
                      className={section.image.imageClassName ?? "object-cover"}
                    />
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
