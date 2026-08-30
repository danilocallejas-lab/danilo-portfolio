import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { DemoFrame } from "@/components/portfolio/demo-frame";
import { ProjectDisciplineTags } from "@/components/portfolio/project-discipline-tags";
import {
  FilteredCompanySection,
  FilteredProjectCounterLabel,
  FilteredProjectSlot,
  WorkFilterBar,
  WorkFilterProvider,
  type ProjectFilterItem,
} from "@/components/portfolio/work-filters";
import { WorkView } from "@/components/portfolio/work-view";
import type {
  CaseStudyImage,
  FallbackComponentKey,
  ProjectSection,
} from "@/lib/portfolio-content";
import {
  getPrototypeAllowPreviewEmbed,
  getPrototypeFrameSourceType,
  getPrototypeFrameStatus,
  getPrototypeFrameUrl,
  getPrototypeMetaLabel,
  getPrototypeOpenUrl,
} from "@/lib/portfolio-content";
import { getUsedProjectDisciplineTagOptions } from "@/lib/project-tags";
import { getCaseStudyHref } from "@/lib/prototype-embed-policy";

const companyAnchorIds: Record<string, string> = {
  Opendoor: "opendoor",
  DraftKings: "draftkings",
  Coinbase: "coinbase",
  Dropbox: "dropbox",
};

const zineCompanyClassByCompany: Record<string, string> = {
  Opendoor: "zine-company--opendoor",
  DraftKings: "zine-company--draftkings",
  Coinbase: "zine-company--coinbase",
  Dropbox: "zine-company--dropbox",
};

type CompanyTheme = {
  sectionClassName: string;
  headingClassName: string;
  copyClassName: string;
  metaClassName: string;
};

const companyThemes: Record<string, CompanyTheme> = {
  Opendoor: {
    sectionClassName:
      "company-row company-row--opendoor zine-company zine-company--opendoor",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
  DraftKings: {
    sectionClassName:
      "company-row company-row--draftkings zine-company zine-company--draftkings",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
  Coinbase: {
    sectionClassName:
      "company-row company-row--coinbase zine-company zine-company--coinbase",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
  Dropbox: {
    sectionClassName:
      "company-row company-row--dropbox zine-company zine-company--dropbox",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
};

const fallbackThemeByFamily: Record<
  FallbackComponentKey,
  "opendoor" | "draftkings" | "coinbase" | "dropbox"
> = {
  OpendoorSellerDemo: "opendoor",
  OpendoorHomeInsightsDemo: "opendoor",
  OpendoorToolingDemo: "opendoor",
  DraftKingsSportsbookDemo: "draftkings",
  CoinbasePaymentsDemo: "coinbase",
  DropboxSpacesDemo: "dropbox",
  DropboxPaperDemo: "dropbox",
};

function getVisibleProjects(sections: readonly ProjectSection[]) {
  return sections.filter((section) => section.show_on_homepage);
}

function getGroupedSections(sections: readonly ProjectSection[]) {
  const groups = new Map<string, ProjectSection[]>();

  getVisibleProjects(sections).forEach((section) => {
    const existing = groups.get(section.company);

    if (existing) {
      existing.push(section);
      return;
    }

    groups.set(section.company, [section]);
  });

  return Array.from(groups.entries()).map(([company, projects]) => ({
    company,
    projects,
  }));
}

function getCompanyAnchors(projects: readonly ProjectSection[]) {
  const firstProjectByCompany = new Map<string, string>();

  projects.forEach((project) => {
    if (!firstProjectByCompany.has(project.company)) {
      firstProjectByCompany.set(project.company, project.section_id);
    }
  });

  return firstProjectByCompany;
}

function getProjectPreviewTone(project: ProjectSection) {
  return fallbackThemeByFamily[project.prototype.fallbackComponent];
}

function getProjectPreviewImage(project: ProjectSection): CaseStudyImage | null {
  return project.prototype.posterImage ?? project.case_study_gallery?.[0] ?? null;
}

function getProjectFilterItem(project: ProjectSection): ProjectFilterItem {
  return {
    id: project.section_id,
    disciplineTags: project.discipline_tags,
  };
}

const borderlessProjectFrameIds = new Set([
  "opendoor-home-insights",
  "dropbox-spaces-tasks",
  "dropbox-paper-desktop",
  "dropbox-paper-marketing-page",
  "dropbox-paper-templates",
]);

function getProjectFrameVariant(project: ProjectSection) {
  return borderlessProjectFrameIds.has(project.section_id)
    ? "borderless"
    : "default";
}

const gridPreviewRadiusClassName =
  "rounded-[clamp(0.5rem,0.45rem+0.2vw,0.625rem)]";

function IntroBand() {
  const introCompanyLinkClassName =
    "intro-company-link rounded-sm text-inherit underline decoration-current decoration-1 underline-offset-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/35";

  return (
    <section className="bg-[var(--intro-surface)]" data-header-theme-section>
      <div className="page-content px-[var(--page-gutter)] pb-[clamp(4rem,7vw,7rem)] pt-[calc(var(--page-block-start)+0.5rem)]">
        <div className="relative flex flex-col gap-6">
          <div className="w-full">
            <h1 className="intro-headline type-h1 font-display text-[var(--intro-heading)]">
              Designer currently at{" "}
              <Link
                href="https://joinhandshake.com/"
                target="_blank"
                rel="noreferrer"
                className={introCompanyLinkClassName}
              >
                Handshake
              </Link>
              . Previously at{" "}
              <Link
                href="#opendoor"
                className={`${introCompanyLinkClassName} intro-company-link--opendoor`}
              >
                Opendoor
              </Link>
              ,{" "}
              <Link
                href="#draftkings"
                className={`${introCompanyLinkClassName} intro-company-link--draftkings`}
              >
                DraftKings
              </Link>
              ,{" "}
              <Link
                href="#coinbase"
                className={`${introCompanyLinkClassName} intro-company-link--coinbase`}
              >
                Coinbase
              </Link>
              ,{" "}
              <span className="lg:whitespace-nowrap">
                and{" "}
                <Link
                  href="#dropbox"
                  className={`${introCompanyLinkClassName} intro-company-link--dropbox`}
                >
                  Dropbox
                </Link>
                .
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkGridCard({
  project,
  anchorId,
  index,
}: {
  project: ProjectSection;
  anchorId?: string;
  index: number;
}) {
  const zineCompanyClassName = zineCompanyClassByCompany[project.company] ?? "";
  const prototypeFrameSource = getPrototypeFrameSourceType(project.prototype);
  const detailHref = getCaseStudyHref(project.prototype.slug);

  return (
    <Reveal
      anchorId={anchorId}
      as="article"
      className={`scroll-mt-[calc(var(--page-block-start)+1rem)] zine-company ${zineCompanyClassName}`}
      index={index}
      dataHeaderThemeSection
    >
      <div className="space-y-4">
        <div className="group/grid-preview relative">
          <DemoFrame
            title={`${project.company} ${project.title} preview`}
            source_type={prototypeFrameSource}
            iframe_url={getPrototypeFrameUrl(project.prototype)}
            poster_image={getProjectPreviewImage(project)}
            frame_surface={project.prototype.frameSurface}
            frame_scale={project.prototype.frameScale}
            prototype_status={getPrototypeFrameStatus(project.prototype)}
            allow_preview_embed={getPrototypeAllowPreviewEmbed(project.prototype)}
            loading_label={project.right_panel.loading_label}
            priority="lane"
            frame_variant={getProjectFrameVariant(project)}
            frame_radius="tight"
            interactive={false}
            transition_key={`${project.section_id}-grid-frame`}
            tone={getProjectPreviewTone(project)}
            mount_strategy="visible"
          />
          <Link
            href={detailHref}
            aria-label={`Open ${project.title} project detail`}
            className={`absolute inset-0 z-20 ${gridPreviewRadiusClassName} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35`}
          >
            <span className="sr-only">Open {project.title} project detail</span>
          </Link>
        </div>

        <Link
          href={detailHref}
          className="block space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
        >
          <h2 className="type-h3 font-display text-foreground">
            {project.title}
          </h2>
        </Link>

        <ProjectDisciplineTags tags={project.discipline_tags} />
      </div>
    </Reveal>
  );
}

function ProjectRailCard({
  project,
  projectItems,
  theme,
}: {
  project: ProjectSection;
  projectItems: readonly ProjectFilterItem[];
  theme: CompanyTheme;
}) {
  const previewAccent = getProjectPreviewTone(project);
  const prototypeFrameSource = getPrototypeFrameSourceType(project.prototype);
  const detailHref = getCaseStudyHref(project.prototype.slug);
  const prototypeMetaSuffix = getPrototypeMetaLabel(project, "").replace(
    /^ \/ /,
    "",
  );
  const articleClassName = [
    "shrink-0 snap-start",
    prototypeFrameSource === "iframe"
      ? "portfolio-lane-card portfolio-lane-card--hosted"
      : "portfolio-lane-card",
    "@container/project-card",
  ].join(" ");

  return (
    <article className={articleClassName}>
      <div className="@4xl/project-card:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] grid items-start gap-6 @4xl/project-card:gap-8">
        <div className="space-y-4 @4xl/project-card:max-w-[16rem]">
          <Link
            href={detailHref}
            data-lane-ignore-drag="true"
            className="block space-y-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
          >
            <h3 className={`type-h3 font-display ${theme.headingClassName}`}>
              {project.title}
            </h3>

            <p
              className={`max-w-[var(--copy-measure)] text-[0.98rem] leading-7 @4xl/project-card:max-w-[16rem] ${theme.copyClassName}`}
            >
              {project.left_panel.short_summary}
            </p>
          </Link>

          <ProjectDisciplineTags
            tags={project.discipline_tags}
            className={theme.metaClassName}
          />
        </div>

        <div className="w-full">
          <DemoFrame
            title={`${project.company} ${project.title} preview`}
            source_type={prototypeFrameSource}
            iframe_url={getPrototypeFrameUrl(project.prototype)}
            poster_image={project.prototype.posterImage}
            frame_surface={project.prototype.frameSurface}
            frame_scale={project.prototype.frameScale}
            prototype_status={getPrototypeFrameStatus(project.prototype)}
            allow_preview_embed={getPrototypeAllowPreviewEmbed(project.prototype)}
            meta_label={
              <FilteredProjectCounterLabel
                projectId={project.section_id}
                projects={projectItems}
                suffix={prototypeMetaSuffix}
              />
            }
            open_prototype_url={getPrototypeOpenUrl(project.prototype)}
            open_prototype_label="Open prototype"
            loading_label={project.right_panel.loading_label}
            priority="lane"
            frame_variant={getProjectFrameVariant(project)}
            interactive={prototypeFrameSource === "iframe"}
            transition_key={`${project.section_id}-lane-frame`}
            tone={previewAccent}
            mount_strategy="visible"
          />
        </div>
      </div>
    </article>
  );
}

function CompanyProjectBand({
  company,
  projects,
  anchorId,
}: {
  company: string;
  projects: readonly ProjectSection[];
  anchorId?: string;
}) {
  const theme = companyThemes[company] ?? companyThemes.Dropbox;
  const projectFilterItems = projects.map(getProjectFilterItem);

  return (
    <FilteredCompanySection
      company={company}
      projects={projectFilterItems}
      anchorId={anchorId}
      sectionClassName={theme.sectionClassName}
      headingClassName={theme.headingClassName}
      metaClassName={theme.metaClassName}
    >
      {projects.map((project) => (
        <FilteredProjectSlot
          key={project.section_id}
          projectId={project.section_id}
        >
          <ProjectRailCard
            project={project}
            projectItems={projectFilterItems}
            theme={theme}
          />
        </FilteredProjectSlot>
      ))}
    </FilteredCompanySection>
  );
}

export function PortfolioHome({
  sections,
}: {
  sections: readonly ProjectSection[];
}) {
  const visibleProjects = getVisibleProjects(sections);
  const firstProjectByCompany = getCompanyAnchors(visibleProjects);
  const groupedSections = getGroupedSections(sections);
  const projectFilterItems = visibleProjects.map(getProjectFilterItem);
  const disciplineFilterOptions =
    getUsedProjectDisciplineTagOptions(visibleProjects);

  return (
    <div className="bg-[var(--intro-surface)] pb-6 sm:pb-8">
      <IntroBand />

      <WorkView
        gridView={
          <WorkFilterProvider
            projects={projectFilterItems}
            options={disciplineFilterOptions}
          >
            <WorkFilterBar />
            <section className="page-content px-[var(--page-gutter)] pb-[var(--section-gap)]">
              <div className="work-grid-view grid gap-x-[clamp(0.75rem,1.25vw,1.25rem)] gap-y-[clamp(2rem,4vw,4rem)] sm:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <FilteredProjectSlot
                    key={project.section_id}
                    projectId={project.section_id}
                  >
                    <WorkGridCard
                      project={project}
                      index={index}
                      anchorId={
                        firstProjectByCompany.get(project.company) ===
                        project.section_id
                          ? companyAnchorIds[project.company]
                          : undefined
                      }
                    />
                  </FilteredProjectSlot>
                ))}
              </div>
            </section>
          </WorkFilterProvider>
        }
        listView={
          <div className="work-list-view">
            {groupedSections.map(({ company, projects }) => (
              <CompanyProjectBand
                key={company}
                company={company}
                projects={projects}
                anchorId={companyAnchorIds[company]}
              />
            ))}
          </div>
        }
      />
    </div>
  );
}
