import { ProjectsGrid } from '@/components/projects-grid';
import { ProjectFilters } from '@/components/project-filters';
import { getProjects } from '@/lib/projects';

export const metadata = {
  title: 'Projects | Bradley Vosolo',
  description: 'Explore my web development projects built with React, Next.js, and other modern technologies.',
};

export default function ProjectsPage() {
  const projects = getProjects();
  
  return (
    <div className="container py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground text-lg">
          Explore my latest web development projects. Each project showcases different skills and technologies.
        </p>
      </div>
      
      <div className="mt-8">
        <ProjectFilters />
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}