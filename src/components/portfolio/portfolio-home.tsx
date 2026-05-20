import Link from "next/link";
import { DemoFrame } from "@/components/portfolio/demo-frame";
import { DraggableProjectLane } from "@/components/portfolio/draggable-project-lane";
import { ThemeToggle } from "@/components/theme-toggle";
import type { FallbackComponentKey, ProjectSection } from "@/lib/portfolio-content";
import {
  getPrototypeAllowPreviewEmbed,
  getPrototypeFrameSourceType,
  getPrototypeFrameStatus,
  getPrototypeFrameUrl,
  getPrototypeMetaLabel,
  getPrototypeOpenUrl,
} from "@/lib/portfolio-content";
import {
  getCaseStudyHref,
} from "@/lib/prototype-embed-policy";

type CompanyTheme = {
  sectionClassName: string;
  headingClassName: string;
  copyClassName: string;
  metaClassName: string;
};

const companyThemes: Record<string, CompanyTheme> = {
  Opendoor: {
    sectionClassName: "company-row company-row--opendoor zine-company zine-company--opendoor",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
  DraftKings: {
    sectionClassName: "company-row company-row--draftkings zine-company zine-company--draftkings",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
  Coinbase: {
    sectionClassName: "company-row company-row--coinbase zine-company zine-company--coinbase",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
  Dropbox: {
    sectionClassName: "company-row company-row--dropbox zine-company zine-company--dropbox",
    headingClassName: "text-[var(--company-heading)]",
    copyClassName: "text-[var(--company-copy)]",
    metaClassName: "text-[var(--company-meta)]",
  },
};

const fallbackThemeByFamily: Record<FallbackComponentKey, "opendoor" | "draftkings" | "coinbase" | "dropbox"> =
  {
    OpendoorSellerDemo: "opendoor",
    OpendoorHomeInsightsDemo: "opendoor",
    OpendoorToolingDemo: "opendoor",
    DraftKingsSportsbookDemo: "draftkings",
    CoinbasePaymentsDemo: "coinbase",
    DropboxSpacesDemo: "dropbox",
    DropboxPaperDemo: "dropbox",
  };

function getGroupedSections(sections: readonly ProjectSection[]) {
  const groups = new Map<string, ProjectSection[]>();
  const visibleSections = sections.filter((section) => section.show_on_homepage);

  visibleSections.forEach((section) => {
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

function IntroBand() {
  return (
    <section className="bg-[var(--intro-surface)]" data-header-theme-section>
      <div className="page-content px-[var(--page-gutter)] pb-[clamp(1.75rem,3vw,3rem)] pt-[calc(var(--page-block-start)+0.5rem)]">
        <div className="relative flex flex-col gap-6 lg:min-h-[18rem]">
          <div className="max-w-[72rem]">
            <h1 className="type-h1 font-display text-[var(--intro-heading)]">
              Designer currently at Opendoor. Previously at DraftKings, Coinbase,{" "}
              <span className="lg:whitespace-nowrap">and Dropbox.</span>
            </h1>
          </div>

          <div className="sticky top-[calc(var(--header-padding-y)+3rem)] z-40 flex justify-end self-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectRailCard({
  project,
  projectIndex,
  projectTotal,
  theme,
}: {
  project: ProjectSection;
  projectIndex: number;
  projectTotal: number;
  theme: CompanyTheme;
}) {
  const previewAccent = fallbackThemeByFamily[project.prototype.fallbackComponent];
  const counterLabel = `${String(projectIndex + 1).padStart(2, "0")} / ${String(projectTotal).padStart(2, "0")}`;
  const prototypeFrameSource = getPrototypeFrameSourceType(project.prototype);
  const articleClassName = [
    "shrink-0 snap-start",
    prototypeFrameSource === "iframe"
      ? "portfolio-lane-card portfolio-lane-card--hosted"
      : "portfolio-lane-card",
    "@container/project-card",
  ].join(" ");

  return (
    <article className={articleClassName}>
      <div
        className="@4xl/project-card:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] grid items-start gap-6 @4xl/project-card:gap-8"
      >
        <div className="space-y-4 @4xl/project-card:max-w-[16rem]">
          <h3
            className={`type-h3 font-display ${theme.headingClassName}`}
          >
            {project.title}
          </h3>

          <p
            className={`max-w-[var(--copy-measure)] text-[0.98rem] leading-7 @4xl/project-card:max-w-[16rem] ${theme.copyClassName}`}
          >
            {project.left_panel.short_summary}
          </p>

          <Link
            href={getCaseStudyHref(project.prototype.slug)}
            data-lane-ignore-drag="true"
            className={`tap-target editorial-link inline-flex items-center text-[0.72rem] uppercase tracking-[0.16em] ${theme.metaClassName}`}
          >
            Case study
          </Link>
        </div>

        <div className="w-full">
          <DemoFrame
            title={`${project.company} ${project.title} preview`}
            source_type={prototypeFrameSource}
            iframe_url={getPrototypeFrameUrl(project.prototype)}
            poster_image={project.prototype.posterImage}
            frame_surface={project.prototype.frameSurface}
            prototype_status={getPrototypeFrameStatus(project.prototype)}
            allow_preview_embed={getPrototypeAllowPreviewEmbed(project.prototype)}
            meta_label={getPrototypeMetaLabel(project, counterLabel)}
            open_prototype_url={getPrototypeOpenUrl(project.prototype)}
            open_prototype_label="Open prototype"
            loading_label={project.right_panel.loading_label}
            priority="lane"
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
}: {
  company: string;
  projects: readonly ProjectSection[];
}) {
  const theme = companyThemes[company] ?? companyThemes.Dropbox;

  return (
    <section className={theme.sectionClassName} data-header-theme-section>
      <div className="page-content px-[var(--page-gutter)] py-[var(--section-gap)]">
        <div className="mb-[clamp(1.75rem,3vw,3.75rem)] flex flex-wrap items-end justify-between gap-4">
          <h2 className={`type-h2 font-display ${theme.headingClassName}`}>
            {company}
          </h2>

          <div className="flex items-center gap-4">
            <p className={`text-[0.72rem] uppercase tracking-[0.16em] ${theme.metaClassName}`}>
              {projects.length.toString().padStart(2, "0")} selected projects
            </p>
          </div>
        </div>

        <DraggableProjectLane>
          {projects.map((project, index) => (
            <ProjectRailCard
              key={project.section_id}
              project={project}
              projectIndex={index}
              projectTotal={projects.length}
              theme={theme}
            />
          ))}
        </DraggableProjectLane>
      </div>
    </section>
  );
}

export function PortfolioHome({
  sections,
}: {
  sections: readonly ProjectSection[];
}) {
  const groupedSections = getGroupedSections(sections);

  return (
    <div className="bg-[var(--intro-surface)] pb-6 sm:pb-8">
      <IntroBand />
      <div>
        {groupedSections.map(({ company, projects }) => (
          <CompanyProjectBand
            key={company}
            company={company}
            projects={projects}
          />
        ))}
      </div>
    </div>
  );
}
