"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { DemoFrame } from "@/components/portfolio/demo-frame";
import {
  getPrototypeAllowPreviewEmbed,
  getPrototypeFrameSourceType,
  getPrototypeFrameStatus,
  getPrototypeFrameUrl,
  getPrototypeOpenUrl,
  getProjectCounterLabel,
  getPrototypeMetaLabel,
  type ProjectSection,
} from "@/lib/portfolio-content";

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

const frameVariants: Variants = {
  inactive: {
    opacity: 0.9,
    y: 14,
    scale: 0.992,
  },
  active: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.34,
      ease: easeCurve,
    },
  },
};

const textVariants: Variants = {
  inactive: {
    opacity: 0.78,
    y: 10,
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      delay: 0.08,
      ease: easeCurve,
    },
  },
};

export function ProjectPanel({
  project,
  is_active,
  transition_key,
}: {
  project: ProjectSection;
  is_active: boolean;
  transition_key: string;
}) {
  const metadataItems = [project.role, project.time_period, project.product_line].filter(
    Boolean,
  );
  const projectCounterLabel = getProjectCounterLabel(project);
  const prototypeMetaLabel = getPrototypeMetaLabel(project, projectCounterLabel);
  const demoTone = demoToneByCompany[project.company];
  const prototypeFrameSource = getPrototypeFrameSourceType(project.prototype);
  const zineCompanyClassName = zineCompanyClassByCompany[project.company] ?? "";

  return (
    <div
      className={`page-shell zine-company ${zineCompanyClassName}`}
      data-header-theme-section
    >
      <div className="page-content @container/project-panel">
        <div className="grid w-full gap-[var(--section-gap)] @6xl/project-panel:grid-cols-[minmax(0,0.74fr)_minmax(0,1.16fr)]">
          <motion.div
            variants={textVariants}
            initial={false}
            animate={is_active ? "active" : "inactive"}
            className="flex flex-col justify-between gap-8 @6xl/project-panel:border-r @6xl/project-panel:border-[var(--rule)] @6xl/project-panel:pr-8"
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="editorial-eyebrow">{project.company}</p>
                <div className="space-y-3">
                  <h1 className="type-h1 font-display text-foreground">
                    {project.title}
                  </h1>
                  <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {metadataItems.join(" / ")}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="max-w-[var(--copy-measure-wide)] text-[clamp(1.08rem,1rem+0.48vw,1.34rem)] leading-8 text-foreground">
                    {project.summary}
                  </p>
                  <p className="max-w-[var(--copy-measure-wide)] text-[0.98rem] leading-7 text-[var(--muted)]">
                    {project.problem}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Contribution
                </p>
                <ul className="space-y-3">
                  {project.what_i_did.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.92rem] leading-6 text-[var(--muted)]">
                      <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]/55" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="auto-fit-grid">
                {project.impact_metrics.map((metric) => (
                  <div key={metric} className="border-t border-[var(--rule)] pt-4">
                    <p className="text-[0.74rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      Impact
                    </p>
                    <p className="mt-3 text-[0.92rem] leading-6 text-foreground">{metric}</p>
                  </div>
                ))}
              </div>

              {project.left_panel.why_it_mattered ? (
                <div className="border-t border-[var(--rule)] pt-4">
                  <p className="text-[0.74rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                    Why it mattered
                  </p>
                  <p className="mt-3 text-[0.92rem] leading-7 text-[var(--muted)]">
                    {project.left_panel.why_it_mattered}
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            variants={frameVariants}
            initial={false}
            animate={is_active ? "active" : "inactive"}
            className="min-w-0 @6xl/project-panel:pl-2"
          >
            <div className="space-y-5">
              <DemoFrame
                title={`${project.company} ${project.title} prototype`}
                source_type={prototypeFrameSource}
                iframe_url={getPrototypeFrameUrl(project.prototype)}
                poster_image={project.prototype.posterImage}
                frame_surface={project.prototype.frameSurface}
                prototype_status={getPrototypeFrameStatus(project.prototype)}
                allow_preview_embed={getPrototypeAllowPreviewEmbed(project.prototype)}
                meta_label={prototypeMetaLabel}
                open_prototype_url={getPrototypeOpenUrl(project.prototype)}
                loading_label={project.right_panel.loading_label}
                priority="detail"
                transition_key={transition_key}
                tone={demoTone}
                mount_strategy="eager"
              />

              {project.case_study_gallery?.length ? (
                <section className="space-y-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                    Selected frames
                  </p>
                  <div className="@container/detail-gallery grid gap-4 sm:gap-5 @4xl/detail-gallery:grid-cols-2">
                    {project.case_study_gallery.map((image, index) => (
                      <div
                        key={image.src}
                        className={
                          project.case_study_gallery && project.case_study_gallery.length >= 3 && index === 0
                            ? "@4xl/detail-gallery:col-span-2"
                            : ""
                        }
                      >
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--frame-radius)] border border-[var(--rule)] bg-[var(--surface-strong)] shadow-[var(--shadow-soft)]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 1024px) 92vw, 56vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
