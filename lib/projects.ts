// Define the project data type
export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  features?: string[];
  techStack?: string[];
}

// Sample project data
const projectsData: ProjectData[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout.',
    longDescription: 'This e-commerce platform was built with React and Next.js, featuring a clean and responsive design. It includes advanced features like product filtering, search, cart management, and secure checkout integration with Stripe. The admin panel allows for easy product management and order tracking.',
    image: '/images/projects/elegantdrop.png',
    demoUrl: 'https://elegantdrop.netlify.app',
    githubUrl: 'https://github.com/vosoloBradley',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'E-Commerce'],
    features: [
      'Responsive design for all devices',
      'Product filtering and search',
      'Shopping cart with persistent storage',
      'Secure checkout with Stripe',
      'Admin panel for product management'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'PostgreSQL']
  },
  {
    id: '2',
    title: 'Electric Ware',
    slug: 'electric-ware',
    description: 'An e-commerce platform for electronic devices, featuring product browsing, cart functionality, and secure checkout.',
    longDescription: 'Electric Ware is a modern e-commerce solution for electronics, built with React, TypeScript, and Node.js. The platform offers a seamless shopping experience with features like product filtering, detailed product pages, shopping cart management, and secure payment processing. The responsive design ensures optimal performance across all devices.',
    image: '/images/projects/electricware.png',
    demoUrl: 'https://electricware.netlify.app',
    githubUrl: 'https://github.com/vosoloBradley',
    tags: ['React', 'TypeScript', 'Node.js', 'Full Stack'],
    features: [
      'Drag-and-drop task organization',
      'Custom tags and categories',
      'Team collaboration tools',
      'Real-time updates',
      'Progress tracking and reporting'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io']
  },
  {
    id: '3',
    title: 'Vibetubes',
    slug: 'vibetubes',
    description: 'A modern music streaming platform that brings your favorite tunes to life with an intuitive interface and personalized playlists.',
    longDescription: 'Vibetubes is a sleek music streaming application that offers a vast library of songs across various genres. Built with modern web technologies, it provides users with a seamless listening experience, personalized recommendations, and the ability to create and share playlists. The platform features high-quality audio streaming, artist profiles, and a responsive design that works perfectly on all devices.',
    image: '/images/projects/vibetube.png',
    demoUrl: 'https://vibetubes.netlify.app',
    githubUrl: 'https://github.com/vosoloBradley',
    tags: ['React', 'TypeScript', 'Redux', 'Music Streaming'],
    features: [
      'Stream high-quality music from a vast library',
      'Create and manage personalized playlists',
      'Discover new music with smart recommendations',
      'Follow your favorite artists and friends',
      'Download songs for offline listening'
    ],
    techStack: ['React', 'TypeScript', 'Redux', 'Node.js', 'MongoDB', 'AWS S3']
  },
  {
    id: '4',
    title: 'Adrian Law Firm',
    slug: 'adrian-lawfirm',
    description: 'A professional law firm website offering expert legal services with a focus on client-centered representation and successful case outcomes.',
    longDescription: 'Adrian Law Firm is a modern, responsive website designed to establish trust and provide easy access to legal services. The platform showcases the firm\'s expertise, attorney profiles, practice areas, and client testimonials. It features an intuitive contact form, blog section for legal insights, and secure client portal for case management. The clean, professional design reflects the firm\'s commitment to excellence and accessibility in legal representation.',
    image: '/images/projects/adrian.png',
    demoUrl: 'https://adrianlawfirm.netlify.app',
    githubUrl: 'https://github.com/vosoloBradley',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Legal Tech'],
    features: [
      'Responsive, professional design optimized for all devices',
      'Attorney profiles and practice area details',
      'Secure client portal for case management',
      'Blog section for legal insights and updates',
      'Contact form with secure message encryption'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'NextAuth']
  },
  {
    id: '5',
    title: 'Recipe Finder',
    slug: 'recipe-finder',
    description: 'A culinary application to discover recipes based on available ingredients, dietary restrictions, and preferences.',
    longDescription: 'The Recipe Finder app helps users discover new recipes based on ingredients they already have, dietary restrictions, and personal preferences. It includes meal planning features, nutrition information, user reviews, and a favorites system. The app uses a combination of API data and user-generated content.',
    image: '/images/projects/recipehub.png',
    demoUrl: 'https://recipehub-eta.vercel.app/',
    githubUrl: 'https://github.com/vosoloBradley',
    tags: ['JavaScript', 'API', 'CSS', 'Front-end'],
    features: [
      'Recipe search by ingredients',
      'Dietary filters and preferences',
      'Meal planning calendar',
      'Nutrition information',
      'User reviews and ratings'
    ],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Recipe API', 'LocalStorage']
  },
  {
    id: '6',
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    description: 'A modern and responsive portfolio website to showcase my skills, projects, and professional experience.',
    longDescription: 'This portfolio website was designed to showcase my web development skills, projects, and professional experience. It features a clean, modern design with responsive layouts, smooth animations, and accessibility features. The site includes project showcases, a skills section, contact form, and downloadable resume.',
    image: '/images/projects/portfolio.png',
    demoUrl: 'https://vosoloportfolio.netlify.app',
    githubUrl: 'https://github.com/vosoloBradley',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Front-end'],
    features: [
      'Responsive design for all devices',
      'Project showcase with filtering',
      'Skills and experience sections',
      'Contact form with validation',
      'Dark/light theme toggle'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  }
];

// Function to get all projects
export function getProjects(): ProjectData[] {
  return projectsData;
}

// Function to get a project by slug
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((project) => project.slug === slug);
}

// Function to add a new project
export function addProject(project: ProjectData): ProjectData[] {
  projectsData.push(project);
  return projectsData;
}

// Function to update a project
export function updateProject(updatedProject: ProjectData): ProjectData[] {
  const index = projectsData.findIndex((project) => project.id === updatedProject.id);
  if (index !== -1) {
    projectsData[index] = updatedProject;
  }
  return projectsData;
}

// Function to delete a project
export function deleteProject(id: string): ProjectData[] {
  const index = projectsData.findIndex((project) => project.id === id);
  if (index !== -1) {
    projectsData.splice(index, 1);
  }
  return projectsData;
}