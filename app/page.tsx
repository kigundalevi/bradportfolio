import Hero from '@/components/hero';
import { Skills } from '@/components/skills';
import { FeaturedProjects } from '@/components/featured-projects';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </div>
  );
}