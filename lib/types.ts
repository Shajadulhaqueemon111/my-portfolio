export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'Dashboard' | 'System';
  featured?: boolean;
  image: string;
  tags: string[];
  features: string[];
  techStack: {
    frontend: string[];
    backend?: string[];
    stateManagement?: string[];
    database?: string[];
  };
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  badge: string;
  skills: {
    name: string;
    level: string;
    icon: string;
    description: string;
    tags: string[];
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface PhilosophyStep {
  step: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
}
