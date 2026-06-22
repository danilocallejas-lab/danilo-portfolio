"use client";

import Image from "next/image";
import { ImageArchiveCarousel } from "@/components/image-archive-carousel";
import { Reveal } from "@/components/reveal";
import { DemoFrame } from "@/components/portfolio/demo-frame";
import { ProjectDisciplineTags } from "@/components/portfolio/project-discipline-tags";
import {
  getPrototypeAllowPreviewEmbed,
  getPrototypeFrameSourceType,
  getPrototypeFrameStatus,
  getPrototypeFrameUrl,
  getPrototypeOpenUrl,
  type ProjectSection,
} from "@/lib/portfolio-content";

const demoToneByCompany: Record<
  string,
  "opendoor" | "draftkings" | "coinbase" | "dropbox"
> = {
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

type ProjectMediaSection = NonNullable<
  ProjectSection["case_study_sections"]
>[number];

function ProjectMediaSectionCopy({
  section,
}: {
  section: ProjectMediaSection;
}) {
  return (
    <div className="w-full max-w-full space-y-3 md:max-w-[90%]">
      <h2 className="project-type-card-title">
        {section.title}
      </h2>
      <p className="project-type-body w-full max-w-full">
        {section.summary}
      </p>
    </div>
  );
}

function ProjectMediaSectionVisual({
  section,
}: {
  section: ProjectMediaSection;
}) {
  if (section.presentation === "video-embed") {
    return (
      <div
        className={`relative overflow-hidden rounded-lg ${
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
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${
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
  );
}

function ProjectMediaSections({ project }: { project: ProjectSection }) {
  if (!project.case_study_sections?.length) {
    return null;
  }

  return (
    <section
      className="space-y-[clamp(3rem,7vw,7rem)]"
      aria-label="Project media"
    >
      {project.case_study_sections.map((section, index) => (
        <Reveal
          key={section.title}
          as="article"
          className="@container/project-media-section grid gap-[clamp(1.5rem,4vw,4.5rem)] @5xl/project-media-section:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] @5xl/project-media-section:items-start"
          index={index}
        >
          <ProjectMediaSectionCopy section={section} />
          <ProjectMediaSectionVisual section={section} />
        </Reveal>
      ))}
    </section>
  );
}

export function ProjectPanel({
  project,
  transition_key,
}: {
  project: ProjectSection;
  is_active: boolean;
  transition_key: string;
}) {
  const eyebrowItems = [
    project.company,
    project.time_period,
  ].filter(Boolean);
  const metadataItems = [
    project.product_line,
  ].filter(Boolean);
  const demoTone = demoToneByCompany[project.company];
  const prototypeFrameSource = getPrototypeFrameSourceType(project.prototype);
  const zineCompanyClassName = zineCompanyClassByCompany[project.company] ?? "";
  const hasStructuredProjectMedia = Boolean(project.case_study_sections?.length);

  return (
    <div
      className={`page-shell zine-company ${zineCompanyClassName}`}
      data-header-theme-section
    >
      <div className="page-content @container/project-panel">
        <div className="w-full space-y-[clamp(3rem,6vw,6.5rem)]">
          <Reveal
            as="header"
            className="grid w-full gap-[clamp(1.5rem,4vw,4.5rem)] @5xl/project-panel:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.7fr)] @5xl/project-panel:items-start"
          >
            <div className="w-fit max-w-full space-y-4">
              <ProjectDisciplineTags tags={project.discipline_tags} />
              <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                {eyebrowItems.join(" / ")}
              </p>
              <div className="w-fit max-w-full space-y-3">
                <h1 className="project-type-title">
                  {project.title}
                </h1>
              </div>
              {metadataItems.length ? (
                <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                  {metadataItems.join(" / ")}
                </p>
              ) : null}
            </div>

            <p className="project-type-deck max-w-[var(--copy-measure-wide)] @5xl/project-panel:pt-[clamp(2.1rem,2.8vw,3rem)]">
              {project.summary}
            </p>
          </Reveal>

          <Reveal
            as="section"
            className="min-w-0 space-y-7"
            ariaLabel={`${project.company} ${project.title} prototype`}
            index={1}
          >
            <DemoFrame
              title={`${project.company} ${project.title} prototype`}
              source_type={prototypeFrameSource}
              iframe_url={getPrototypeFrameUrl(project.prototype)}
              poster_image={project.prototype.posterImage}
              frame_surface={project.prototype.frameSurface}
              frame_scale={project.prototype.frameScale}
              prototype_status={getPrototypeFrameStatus(project.prototype)}
              allow_preview_embed={getPrototypeAllowPreviewEmbed(project.prototype)}
              open_prototype_url={getPrototypeOpenUrl(project.prototype)}
              loading_label={project.right_panel.loading_label}
              priority="detail"
              transition_key={transition_key}
              tone={demoTone}
              mount_strategy="eager"
            />
          </Reveal>

          <Reveal
            as="section"
            className="grid gap-[clamp(2.25rem,4vw,4.5rem)] @5xl/project-panel:grid-cols-3"
            index={2}
          >
            <div className="min-w-0 w-full max-w-full space-y-6">
              <div className="w-fit max-w-full space-y-3">
                <p className="project-type-label w-fit max-w-full text-[var(--muted)]">Problem</p>
                <p className="project-type-body w-fit max-w-full">
                  {project.problem}
                </p>
              </div>
            </div>

            <div className="min-w-0 w-full max-w-full space-y-3">
              <p className="project-type-label w-fit max-w-full text-[var(--muted)]">
                Contribution
              </p>
              <ul className="w-fit max-w-full space-y-3">
                {project.what_i_did.map((item) => (
                  <li
                    key={item}
                    className="project-type-body flex w-fit max-w-full gap-3"
                  >
                    <span className="mt-[0.82rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]/55" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 w-full max-w-full space-y-3">
              <p className="project-type-label w-fit max-w-full text-[var(--muted)]">Impact</p>
              <ul className="w-fit max-w-full space-y-3">
                {project.impact_metrics.map((metric) => (
                  <li
                    key={metric}
                    className="project-type-body w-fit max-w-full text-foreground"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {hasStructuredProjectMedia ? (
            <ProjectMediaSections project={project} />
          ) : project.case_study_gallery?.length ? (
            <Reveal
              as="section"
              ariaLabel="Project media"
              index={4}
            >
              <div className="@container/detail-gallery grid gap-4 @4xl/detail-gallery:grid-cols-2">
                {project.case_study_gallery.map((image, index) => (
                  <Reveal
                    key={image.src}
                    as="figure"
                    index={index}
                    className={
                      project.case_study_gallery &&
                      project.case_study_gallery.length >= 3 &&
                      index === 0
                        ? "@4xl/detail-gallery:col-span-2"
                        : undefined
                    }
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[var(--surface-strong)]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 86vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </div>
  );
}
