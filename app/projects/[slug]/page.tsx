'use client';

import { useParams } from 'next/navigation';
import { getProjects } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getProjectBySlug } from '@/lib/projects';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug as string);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-12 mx-auto px-4">
      <Link href="/projects">
        <Button variant="ghost" className="mb-6">← Back to Projects</Button>
      </Link>
      
      <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
        {project.image && (
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover"
            priority
          />
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {project.demoUrl && (
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </Button>
          )}
          
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Code
              </a>
            </Button>
          )}
        </div>
        
        <Card className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-muted-foreground">{project.description}</p>
            
            {project.longDescription && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <p className="text-muted-foreground">{project.longDescription}</p>
              </div>
            )}
            
            {project.features && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.techStack && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}