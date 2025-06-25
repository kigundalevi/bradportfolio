'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

type Skill = {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'other';
  icon?: string;
};

const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'frontend', icon: '⚛️' },
  { name: 'Next.js', level: 85, category: 'frontend', icon: '▲' },
  { name: 'TypeScript', level: 80, category: 'frontend', icon: '🔷' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend', icon: '🎨' },
  { name: 'JavaScript', level: 90, category: 'frontend', icon: '🟨' },
  { name: 'HTML/CSS', level: 95, category: 'frontend', icon: '🌐' },
  
  // Backend
  { name: 'Node.js', level: 75, category: 'backend', icon: '🟢' },
  { name: 'Express', level: 70, category: 'backend', icon: '🚂' },
  { name: 'GraphQL', level: 65, category: 'backend', icon: '⬢' },
  { name: 'REST APIs', level: 85, category: 'backend', icon: '🔌' },
  { name: 'MongoDB', level: 70, category: 'backend', icon: '🍃' },
  { name: 'PostgreSQL', level: 65, category: 'backend', icon: '🐘' },
  
  // Other
  { name: 'Git', level: 85, category: 'other', icon: '🔄' },
  { name: 'CI/CD', level: 70, category: 'other', icon: '🔄' },
  { name: 'Testing', level: 75, category: 'other', icon: '🧪' },
  { name: 'UI/UX Design', level: 80, category: 'other', icon: '🎯' },
  { name: 'Responsive Design', level: 90, category: 'other', icon: '📱' },
  { name: 'Performance Optimization', level: 75, category: 'other', icon: '⚡' },
];

export function Skills() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies across the full stack development spectrum.
            Here's a breakdown of my technical proficiency.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </div>

          {['frontend', 'backend', 'other'].map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {skillsData
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <motion.div key={skill.name} variants={item}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{skill.icon}</span>
                            <CardTitle className="text-lg">{skill.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Proficiency</span>
                              <span>{skill.level}%</span>
                            </div>
                            <Progress 
                              value={Math.max(0, Math.min(100, skill.level))} 
                              className="h-2" 
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}