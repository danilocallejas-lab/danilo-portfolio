import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ProjectDisciplineTags } from "@/components/portfolio/project-discipline-tags";
import {
  archiveProjects,
  type ArchiveProject,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Additional work from Danilo Callejas's current portfolio, kept as a lighter side room off the main gallery.",
};

const archivePreviewClassName =
  "relative aspect-[16/10] overflow-hidden rounded-[clamp(0.5rem,0.45rem+0.2vw,0.625rem)] bg-[var(--archive-preview-gradient)]";
const archivePlaceholderClassName =
  "aspect-[16/10] rounded-[clamp(0.5rem,0.45rem+0.2vw,0.625rem)] bg-[var(--archive-placeholder-gradient)]";
const visibleArchiveProjects = archiveProjects.filter(
  (project) => project.company !== "Dropbox",
);

function getInternalCaseStudyHref(href?: string) {
  return href?.startsWith("/") ? href : null;
}

function ArchiveProjectPreview({ project }: { project: ArchiveProject }) {
  const preview = project.image ? (
    <div className={archivePreviewClassName}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  ) : (
    <div aria-hidden="true" className={archivePlaceholderClassName} />
  );
  const internalCaseStudyHref = getInternalCaseStudyHref(project.href);

  if (internalCaseStudyHref) {
    return (
      <Link
        href={internalCaseStudyHref}
        aria-label={`Open ${project.title} project detail`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
      >
        {preview}
      </Link>
    );
  }

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} project`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
      >
        {preview}
      </a>
    );
  }

  return preview;
}

function ArchiveProjectTitle({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  const internalCaseStudyHref = getInternalCaseStudyHref(href);

  if (!internalCaseStudyHref) {
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
        >
          <h2 className="project-type-card-title">
            {title}
          </h2>
        </a>
      );
    }

    return (
      <h2 className="project-type-card-title">
        {title}
      </h2>
    );
  }

  return (
    <Link
      href={internalCaseStudyHref}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
    >
      <h2 className="project-type-card-title">
        {title}
      </h2>
    </Link>
  );
}

export default function ArchivePage() {
  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="sr-only">Archive</h1>
        <section className="grid gap-x-[clamp(0.75rem,1.25vw,1.25rem)] gap-y-[clamp(2rem,4vw,4rem)] sm:grid-cols-2 xl:grid-cols-3">
          {visibleArchiveProjects.map((project, index) => (
            <Reveal
              key={project.title}
              as="article"
              className="group @container/archive-card"
              index={index}
            >
              <div className="space-y-4">
                <ArchiveProjectPreview project={project} />
                <ArchiveProjectTitle
                  title={project.title}
                  href={project.href}
                />
                <ProjectDisciplineTags tags={project.discipline_tags} />
              </div>
            </Reveal>
          ))}
        </section>
      </div>
    </div>
  );
}
