'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProjectData } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const projectSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  slug: z.string().min(3, {
    message: 'Slug must be at least 3 characters.',
  }).regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  longDescription: z.string().optional(),
  image: z.string().url({
    message: 'Please enter a valid URL for the image.',
  }),
  demoUrl: z.string().url({
    message: 'Please enter a valid URL for the demo.',
  }).optional().or(z.literal('')),
  githubUrl: z.string().url({
    message: 'Please enter a valid URL for the GitHub repository.',
  }).optional().or(z.literal('')),
  tags: z.array(z.string()).min(1, {
    message: 'Please add at least one tag.',
  }),
  features: z.array(z.string()).optional(),
  techStack: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: ProjectData;
  onSave: (project: ProjectData) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTechItem, setNewTechItem] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      ...project,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      tags: project.tags || [],
      features: project.features || [],
      techStack: project.techStack || [],
    } : {
      title: '',
      slug: '',
      description: '',
      longDescription: '',
      image: '',
      demoUrl: '',
      githubUrl: '',
      tags: [],
      features: [],
      techStack: [],
    },
  });

  function onSubmit(values: FormValues) {
    onSave({
      id: project?.id || Date.now().toString(),
      ...values,
      demoUrl: values.demoUrl || undefined,
      githubUrl: values.githubUrl || undefined,
    });
  }

  function addTag() {
    if (newTag.trim() && !form.getValues().tags.includes(newTag.trim())) {
      form.setValue('tags', [...form.getValues().tags, newTag.trim()]);
      setNewTag('');
    }
  }

  function removeTag(tag: string) {
    form.setValue('tags', form.getValues().tags.filter(t => t !== tag));
  }

  function addFeature() {
    if (newFeature.trim() && !form.getValues().features?.includes(newFeature.trim())) {
      form.setValue('features', [...(form.getValues().features || []), newFeature.trim()]);
      setNewFeature('');
    }
  }

  function removeFeature(feature: string) {
    form.setValue('features', form.getValues().features?.filter(f => f !== feature) || []);
  }

  function addTechItem() {
    if (newTechItem.trim() && !form.getValues().techStack?.includes(newTechItem.trim())) {
      form.setValue('techStack', [...(form.getValues().techStack || []), newTechItem.trim()]);
      setNewTechItem('');
    }
  }

  function removeTechItem(item: string) {
    form.setValue('techStack', form.getValues().techStack?.filter(t => t !== item) || []);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Add New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="project-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      Used for the project URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detailed description of the project" 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.getValues().tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="group transition-all"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 group-hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a tag" 
                      value={newTag} 
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag}>Add</Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <FormLabel>Features (optional)</FormLabel>
                  <div className="space-y-2 mb-2">
                    {form.getValues().features?.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between border rounded-md p-2"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a feature" 
                      value={newFeature} 
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature}>Add</Button>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={() => (
                <FormItem>
                  <FormLabel>Technologies Used (optional)</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.getValues().techStack?.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="group transition-all"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechItem(tech)}
                          className="ml-1 group-hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a technology" 
                      value={newTechItem} 
                      onChange={(e) => setNewTechItem(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechItem())}
                    />
                    <Button type="button" onClick={addTechItem}>Add</Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={form.handleSubmit(onSubmit)}>
          {project ? 'Update Project' : 'Add Project'}
        </Button>
      </CardFooter>
    </Card>
  );
}