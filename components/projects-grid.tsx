'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Github, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectData } from '@/lib/projects';

interface ProjectsGridProps {
  projects: ProjectData[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [mounted, setMounted] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {filteredProjects.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No projects match your filter criteria.</p>
          <Button 
            variant="link" 
            onClick={() => setFilteredProjects(projects)}
            className="mt-2"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{project.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                {project.demoUrl && (
                  <Button asChild className="w-full">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      View Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                <div className="flex gap-3 w-full">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/projects/${project.slug}`}>
                      <Info className="mr-2 h-3 w-3" /> Details
                    </Link>
                  </Button>
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-3 w-3" /> Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}