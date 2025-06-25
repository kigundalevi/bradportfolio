'use client';

import { useState } from 'react';
import { ProjectForm } from '@/components/project-form';
import { ProjectsList } from '@/components/projects-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProjects } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function AdminPage() {
  const [projects, setProjects] = useState(getProjects());
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  
  return (
    <div className="container py-12 max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>
      
      <Tabs defaultValue="projects">
        <TabsList className="mb-6">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          {isCreating ? (
            <ProjectForm
              onCancel={() => setIsCreating(false)}
              onSave={(project) => {
                // Would integrate with API in real implementation
                setProjects([...projects, project]);
                setIsCreating(false);
              }}
            />
          ) : editingProject ? (
            <ProjectForm
              project={editingProject}
              onCancel={() => setEditingProject(null)}
              onSave={(updatedProject) => {
                // Would integrate with API in real implementation
                setProjects(projects.map(p => 
                  p.id === updatedProject.id ? updatedProject : p
                ));
                setEditingProject(null);
              }}
            />
          ) : (
            <ProjectsList 
              projects={projects} 
              onEdit={setEditingProject} 
              onDelete={(id) => {
                // Would integrate with API in real implementation
                setProjects(projects.filter(p => p.id !== id));
              }} 
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}