import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPanel } from "@/components/portfolio/project-panel";
import {
  getProjectByPrototypeSlug,
  portfolio_sections,
} from "@/lib/portfolio-content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return portfolio_sections.map((project) => ({
    slug: project.prototype.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectByPrototypeSlug(slug);

  if (!project) {
    return {
      title: "Prototype not found",
    };
  }

  return {
    title: `${project.company} ${project.title}`,
    description: project.summary,
  };
}

export default async function PrototypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectByPrototypeSlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectPanel
      project={project}
      is_active
      transition_key={`${project.section_id}-prototype-page`}
    />
  );
}
