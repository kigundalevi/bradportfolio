'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getProjectBySlug } from '@/lib/projects';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ProjectClient() {
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
          <p className="text-muted-foreground mt-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <Button asChild variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          )}
          
          {project.demoUrl && (
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>

        {project.longDescription && (
          <div className="prose dark:prose-invert max-w-none">
            <h2>Project Details</h2>
            <p>{project.longDescription}</p>
            
            {project.features && project.features.length > 0 && (
              <div className="mt-6">
                <h3>Key Features</h3>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-6">
                <h3>Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
