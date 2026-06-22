import Image from "next/image";
import Link from "next/link";
import { ImageArchiveCarousel } from "@/components/image-archive-carousel";
import { Reveal } from "@/components/reveal";
import { ProjectDisciplineTags } from "@/components/portfolio/project-discipline-tags";
import type {
  CaseStudyImage,
  ProjectSection as PortfolioProjectSection,
} from "@/lib/portfolio-content";
import { getCaseStudyHref } from "@/lib/prototype-embed-policy";
import type { FeaturedProject } from "@/lib/site-content";

const zineCompanyClassByCompany: Record<string, string> = {
  Opendoor: "zine-company--opendoor",
  DraftKings: "zine-company--draftkings",
  Coinbase: "zine-company--coinbase",
  Dropbox: "zine-company--dropbox",
};

function getPortfolioProjectImage(
  project: PortfolioProjectSection,
): CaseStudyImage {
  return (
    project.prototype.posterImage ??
    project.case_study_gallery?.[0] ?? {
      src: "/images/prototype-placeholder.svg",
      alt: `${project.company} ${project.title} preview.`,
    }
  );
}

function CompanyProjectList({
  projects,
}: {
  projects: readonly PortfolioProjectSection[];
}) {
  return (
    <section
      className="space-y-[clamp(3rem,7vw,7rem)]"
      aria-label="Company projects"
    >
      {projects.map((project, index) => {
        const image = getPortfolioProjectImage(project);
        const detailHref = getCaseStudyHref(project.prototype.slug);

        return (
          <Reveal
            key={project.section_id}
            as="article"
            className="@container/company-project space-y-6"
            index={index}
          >
            <div className="grid gap-6 @5xl/company-project:grid-cols-[minmax(0,0.85fr)_minmax(18rem,1fr)] @5xl/company-project:items-start">
              <div className="w-fit max-w-full space-y-4">
                <ProjectDisciplineTags tags={project.discipline_tags} />
                <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                  Project {String(index + 1).padStart(2, "0")}
                </p>
                <Link
                  href={detailHref}
                  aria-label={`Open ${project.title} project detail`}
                  className="block w-fit max-w-full space-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
                >
                  <div className="w-fit max-w-full space-y-3">
                    <h2 className="project-type-card-title">
                      {project.title}
                    </h2>
                    <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                      {project.company} / {project.time_period}
                    </p>
                  </div>
                  <p className="project-type-body-strong w-fit max-w-full">
                    {project.summary}
                  </p>
                  <p className="project-type-body w-fit max-w-full">
                    {project.left_panel.why_it_mattered ?? project.problem}
                  </p>
                </Link>
              </div>

              <Link
                href={detailHref}
                aria-label={`Open ${project.title} project detail`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
              >
                <div className="relative overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            </div>

            <ul className="project-type-body grid w-fit max-w-full gap-3 @5xl/company-project:grid-cols-3">
              {project.impact_metrics.map((metric) => (
                <li key={metric} className="w-fit max-w-full">
                  {metric}
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </section>
  );
}

type EditorialSection = FeaturedProject["sections"][number];

function EditorialSectionCopy({
  section,
}: {
  section: EditorialSection;
}) {
  if (section.copyPresentation === "none") {
    return null;
  }

  return (
    <div className="w-full max-w-full space-y-3 md:max-w-[90%]">
      <h2 className="project-type-card-title">{section.title}</h2>
      {section.copyPresentation === "title-only" ? null : (
        <p className="project-type-body w-full max-w-full">
          {section.summary}
        </p>
      )}
    </div>
  );
}

function EditorialSectionMedia({
  section,
  isImageArchive,
  loadImmediately = false,
}: {
  section: EditorialSection;
  isImageArchive: boolean;
  loadImmediately?: boolean;
}) {
  if (section.presentation === "video-embed") {
    return (
      <div
        className={`relative overflow-hidden ${
          section.frameClassName ?? "aspect-video bg-black"
        }`}
      >
        <iframe
          src={section.embedUrl}
          title={section.embedTitle}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
    );
  }

  if (section.presentation === "carousel") {
    return (
      <ImageArchiveCarousel
        label={section.title}
        slides={section.slides ?? [section.image]}
        unframed
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        section.image.frameClassName ?? "aspect-[16/10]"
      }`}
    >
      <Image
        src={section.image.src}
        alt={section.image.alt}
        fill
        loading={loadImmediately ? "eager" : undefined}
        sizes={
          isImageArchive
            ? "(max-width: 1024px) 92vw, 86vw"
            : "(max-width: 1024px) 92vw, 58vw"
        }
        className={section.image.imageClassName ?? "object-cover"}
      />
    </div>
  );
}

function EditorialImageGallery({ project }: { project: FeaturedProject }) {
  if (!project.sections.length) {
    return null;
  }

  const isImageArchive = project.detailPresentation === "image-archive";
  const renderMediaImmediately = Boolean(project.renderMediaImmediately);

  if (!isImageArchive) {
    return (
      <section
        className="space-y-[clamp(3rem,7vw,7rem)]"
        aria-label={`${project.title} project sections`}
      >
        {project.sections.map((section, index) => {
          const shouldRenderCopy = section.copyPresentation !== "none";

          return (
            <Reveal
              key={section.title}
              as="article"
              skipAnimation={renderMediaImmediately}
              className={
                shouldRenderCopy
                  ? "@container/work-section grid gap-[clamp(1.5rem,4vw,4.5rem)] @5xl/work-section:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] @5xl/work-section:items-start"
                  : ""
              }
              index={index}
            >
              {shouldRenderCopy ? (
                <EditorialSectionCopy section={section} />
              ) : null}
              <EditorialSectionMedia
                section={section}
                isImageArchive={isImageArchive}
                loadImmediately={renderMediaImmediately}
              />
            </Reveal>
          );
        })}
      </section>
    );
  }

  return (
    <section
      className="space-y-[clamp(1.5rem,3vw,3rem)]"
      aria-label={`${project.title} image gallery`}
    >
      {project.sections.map((section, index) => {
        return (
          <Reveal
            key={section.title}
            as="figure"
            index={index}
            skipAnimation={renderMediaImmediately}
          >
            <EditorialSectionMedia
              section={section}
              isImageArchive={isImageArchive}
              loadImmediately={renderMediaImmediately}
            />
          </Reveal>
        );
      })}
    </section>
  );
}

export function CaseStudyPage({
  project,
  companyProjects = [],
}: {
  project: FeaturedProject;
  companyProjects?: readonly PortfolioProjectSection[];
}) {
  const zineCompanyClassName = zineCompanyClassByCompany[project.company] ?? "";
  const hasCompanyProjects = companyProjects.length > 0;
  const isImageArchive = project.detailPresentation === "image-archive";
  const isOverviewOnly =
    !isImageArchive && project.detailContentPresentation !== "full";
  const shouldRenderProjectMedia =
    project.sections.length > 0 &&
    (!hasCompanyProjects || Boolean(project.showProjectMedia));

  return (
    <article
      className={`page-shell zine-company ${zineCompanyClassName}`}
      data-header-theme-section
    >
      <div className="@container/work-page page-content">
        <div className="w-full space-y-[clamp(3rem,6vw,6.5rem)]">
          <Reveal
            as="header"
            className="grid w-full gap-[clamp(1.5rem,4vw,4.5rem)] @5xl/work-page:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.7fr)] @5xl/work-page:items-start"
          >
            <div className="w-fit max-w-full space-y-5">
              {!isOverviewOnly ? (
                <ProjectDisciplineTags tags={project.discipline_tags} />
              ) : null}
              <div className="w-fit max-w-full space-y-3">
                <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                  {isOverviewOnly
                    ? `${project.company} / ${project.year}`
                    : `${project.company} / ${project.category} / ${project.year}`}
                </p>
                <h1 className="project-type-title">
                  {project.title}
                </h1>
              </div>
            </div>

            <div className="w-fit max-w-[var(--copy-measure-wide)] space-y-5 @5xl/work-page:pt-[clamp(2.1rem,2.8vw,3rem)]">
              <p className="project-type-deck">
                {project.thesis}
              </p>
              {isOverviewOnly ? (
                <ProjectDisciplineTags
                  tags={project.discipline_tags}
                  className="gap-2"
                  itemClassName="min-h-7 px-2.5 py-1.5 text-[0.72rem]"
                />
              ) : null}
            </div>
          </Reveal>

          <Reveal as="section" ariaLabel={`${project.title} cover`} index={1}>
            <div
              className={`view-transition-target relative overflow-hidden ${
                project.cover.frameClassName ?? "aspect-[16/10]"
              }`}
              style={{ viewTransitionName: `project-image-${project.slug}` }}
            >
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 86vw"
                className={project.cover.imageClassName ?? "object-cover"}
              />
            </div>
          </Reveal>

          {!isImageArchive ? (
            <>
              <Reveal
                as="section"
                className={
                  isOverviewOnly
                    ? "w-full max-w-full space-y-4"
                    : "w-fit max-w-[var(--copy-measure-wide)] space-y-4"
                }
                index={2}
              >
                {!isOverviewOnly ? (
                  <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                    Overview
                  </p>
                ) : null}
                <p
                  className={
                    isOverviewOnly
                      ? "project-type-overview w-full max-w-full"
                      : "project-type-body-loose w-fit max-w-full"
                  }
                >
                  {project.overview}
                </p>
              </Reveal>

              {!isOverviewOnly ? (
                <>
                  <Reveal
                    as="section"
                    className="grid gap-[clamp(2.25rem,4vw,4.5rem)] @5xl/work-page:grid-cols-3"
                    index={3}
                  >
                    <div className="min-w-0 w-full max-w-full space-y-3">
                      <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                        Problem
                      </p>
                      <p className="project-type-body w-fit max-w-full">
                        {project.problem}
                      </p>
                    </div>

                    <div className="min-w-0 w-full max-w-full space-y-3">
                      <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                        Constraints
                      </p>
                      <ul className="project-type-body w-fit max-w-full space-y-3">
                        {project.constraints.map((constraint) => (
                          <li key={constraint} className="w-fit max-w-full">
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="min-w-0 w-full max-w-full space-y-3">
                      <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                        Design Strategy
                      </p>
                      <p className="project-type-body w-fit max-w-full">
                        {project.designStrategy}
                      </p>
                    </div>
                  </Reveal>

                  <Reveal
                    as="section"
                    className="grid gap-[clamp(2.25rem,4vw,4.5rem)] @5xl/work-page:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.7fr)]"
                    index={4}
                  >
                    <div className="w-fit max-w-full space-y-4">
                      <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                        Outcomes
                      </p>
                      <ul className="project-type-body w-fit max-w-full space-y-3">
                        {project.outcomes.map((outcome) => (
                          <li key={outcome} className="w-fit max-w-full">
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-fit max-w-[var(--copy-measure-wide)] space-y-4">
                      <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                        Reflection
                      </p>
                      <p className="project-type-body w-fit max-w-full">
                        {project.reflection}
                      </p>
                    </div>
                  </Reveal>
                </>
              ) : null}
            </>
          ) : null}

          {shouldRenderProjectMedia ? (
            <EditorialImageGallery project={project} />
          ) : null}

          {hasCompanyProjects ? (
            <CompanyProjectList projects={companyProjects} />
          ) : shouldRenderProjectMedia ? null : (
            <EditorialImageGallery project={project} />
          )}
        </div>
      </div>
    </article>
  );
}
