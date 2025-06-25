import { getProjects } from '@/lib/projects';
import ProjectClient from './project-client';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage() {
  return <ProjectClient />;
}