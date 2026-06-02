"use client";

import Image from "next/image";
import { GalleryLink } from "@/components/gallery-link";
import {
  archiveProjects,
  type ArchiveProject,
  type FeaturedProject,
} from "@/lib/site-content";

type GalleryHomeProps = {
  intro: {
    title: string;
    statement: string;
    summary: string;
    instruction: string;
  };
  projects: FeaturedProject[];
};

function SectionRule() {
  return <div className="h-px w-full bg-[rgba(17,17,15,0.08)]" />;
}

function getArchiveAnchorId(project: Pick<ArchiveProject, "title">) {
  return `archive-${project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function ProjectIndexNavRow({
  href,
  project,
  titleClassName,
}: {
  href: string;
  project: Pick<
    FeaturedProject | ArchiveProject,
    "title" | "company" | "category" | "year"
  >;
  titleClassName: string;
}) {
  return (
    <a
      href={href}
      className="group grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3"
    >
      <div className="space-y-1">
        <p className={titleClassName}>{project.title}</p>
        <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          {project.company} / {project.category}
        </p>
      </div>
      <p className="pt-0.5 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
        {project.year}
      </p>
    </a>
  );
}

function ProjectPreview({
  project,
}: {
  project: FeaturedProject;
}) {
  const supportingImage = project.sections[0]?.image;

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_12rem]">
      <GalleryLink href={`/work/${project.slug}`} className="group block">
        <div className="overflow-hidden rounded-[22px] border border-[rgba(17,17,15,0.08)] bg-[rgba(248,248,246,0.88)] p-3 shadow-[var(--shadow-soft)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,#faf9f6_0%,#f3f1ec_100%)]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 38vw"
              className={`${project.cover.imageClassName ?? "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
            />
          </div>
        </div>
      </GalleryLink>

      {supportingImage ? (
        <GalleryLink href={`/work/${project.slug}`} className="group block">
          <div className="overflow-hidden rounded-[20px] border border-[rgba(17,17,15,0.08)] bg-[rgba(248,248,246,0.88)] p-2 shadow-[var(--shadow-soft)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#faf9f6_0%,#f3f1ec_100%)]">
              <Image
                src={supportingImage.src}
                alt={supportingImage.alt}
                fill
                sizes="(max-width: 1024px) 45vw, 12rem"
                className={`${supportingImage.imageClassName ?? "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
              />
            </div>
          </div>
        </GalleryLink>
      ) : null}
    </div>
  );
}

export function GalleryHome({ intro, projects }: GalleryHomeProps) {
  return (
    <div id="top" className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[120rem]">
        <div className="grid gap-10 lg:grid-cols-[21rem_minmax(0,1fr)] lg:gap-14">
          <aside className="space-y-7 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="editorial-eyebrow">Work</p>
                <h1 className="font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.9] tracking-[-0.055em] text-foreground">
                  {intro.title}
                </h1>
              </div>
              <p className="text-[0.98rem] leading-7 text-foreground">
                {intro.statement}
              </p>
              <p className="text-[0.92rem] leading-7 text-[var(--muted)]">
                {intro.summary}
              </p>
              <p className="text-[0.74rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                {intro.instruction}
              </p>
            </div>

            <SectionRule />

            <div className="space-y-3">
              <p className="editorial-eyebrow">Selected Work</p>
              <nav className="divide-y divide-[rgba(17,17,15,0.08)] border-y border-[rgba(17,17,15,0.08)]">
                {projects.map((project) => (
                  <ProjectIndexNavRow
                    key={project.slug}
                    href={`#${project.slug}`}
                    project={project}
                    titleClassName="font-display text-[1.34rem] leading-[0.95] tracking-[-0.04em] text-foreground transition-colors group-hover:text-[var(--link-hover)]"
                  />
                ))}
              </nav>
            </div>

            <div className="space-y-3">
              <p className="editorial-eyebrow">Archive</p>
              <nav className="divide-y divide-[rgba(17,17,15,0.08)] border-y border-[rgba(17,17,15,0.08)]">
                {archiveProjects.map((project) => (
                  <ProjectIndexNavRow
                    key={project.title}
                    href={`#${getArchiveAnchorId(project)}`}
                    project={project}
                    titleClassName="font-display text-[1.2rem] leading-[0.95] tracking-[-0.035em] text-foreground transition-colors group-hover:text-[var(--link-hover)]"
                  />
                ))}
              </nav>
            </div>
          </aside>

          <main className="space-y-9">
            {projects.map((project, index) => (
              <article
                key={project.slug}
                id={project.slug}
                className="scroll-mt-28 space-y-5"
              >
                <SectionRule />

                <div className="grid gap-5 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
                  <div className="space-y-2 xl:pt-1">
                    <p className="editorial-eyebrow">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {project.company}
                    </p>
                    <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {project.year}
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.64fr)_minmax(0,1fr)] lg:items-start">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h2 className="font-display text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.92] tracking-[-0.05em] text-foreground">
                            {project.title}
                          </h2>
                          <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                            {project.company} / {project.category} / {project.year}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <p className="text-[1rem] leading-7 text-foreground">
                            {project.teaser}
                          </p>
                          <p className="max-w-2xl text-[0.94rem] leading-7 text-[var(--muted)]">
                            {project.thesis}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-1">
                          <GalleryLink
                            href={`/work/${project.slug}`}
                            className="inline-flex items-center rounded-full border border-[rgba(17,17,15,0.12)] bg-foreground px-4 py-2.5 text-[0.86rem] text-white"
                          >
                            Open case study
                          </GalleryLink>
                          <a
                            href="#top"
                            className="inline-flex items-center rounded-full border border-[rgba(17,17,15,0.12)] px-4 py-2.5 text-[0.86rem] text-foreground transition-colors hover:border-[var(--border-strong)] hover:text-[var(--link-hover)]"
                          >
                            Back to index
                          </a>
                        </div>
                      </div>

                      <ProjectPreview project={project} />
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <section id="archive" className="space-y-5 pt-2">
              <SectionRule />

              <div className="grid gap-5 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-8">
                <div className="space-y-2 xl:pt-1">
                  <p className="editorial-eyebrow">Archive</p>
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                    05 additional projects
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="space-y-3 pb-2">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.94] tracking-[-0.045em] text-foreground">
                      More work, kept compact.
                    </h2>
                    <p className="max-w-3xl text-[0.96rem] leading-7 text-[var(--muted)]">
                      These projects stay on the homepage as shorter anchors so
                      every row in the left directory has a destination, while
                      the page still keeps its primary focus on the six main case
                      studies.
                    </p>
                  </div>

                  <div className="divide-y divide-[rgba(17,17,15,0.08)] border-y border-[rgba(17,17,15,0.08)]">
                    {archiveProjects.map((project) => (
                      <article
                        key={project.title}
                        id={getArchiveAnchorId(project)}
                        className="scroll-mt-28 py-5"
                      >
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                          <div className="space-y-2">
                            <h3 className="font-display text-[1.9rem] leading-[0.95] tracking-[-0.04em] text-foreground">
                              {project.title}
                            </h3>
                            <p className="text-[0.76rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                              {project.company} / {project.category} / {project.year}
                            </p>
                            <p className="max-w-2xl text-[0.96rem] leading-7 text-[var(--muted)]">
                              {project.summary}
                            </p>
                          </div>

                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center rounded-full border border-[rgba(17,17,15,0.12)] px-4 py-2.5 text-[0.86rem] text-foreground transition-colors hover:border-[var(--border-strong)] hover:text-[var(--link-hover)]"
                            >
                              Open project
                            </a>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-[rgba(17,17,15,0.12)] px-4 py-2.5 text-[0.86rem] text-foreground">
                              Archive reference
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
