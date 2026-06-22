import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study-page";
import { portfolio_sections } from "@/lib/portfolio-content";
import { featuredProjects, getProjectBySlug } from "@/lib/site-content";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: project.title,
    description: project.teaser,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const companyProjects = portfolio_sections.filter(
    (section) => section.company === project.company,
  );

  return <CaseStudyPage project={project} companyProjects={companyProjects} />;
}
