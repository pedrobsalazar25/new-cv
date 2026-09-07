export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  year: string;
  location?: string;
  client?: string;
  image: string;
  liveUrl?: string;
  faviconUrl?: string;
  galleryImages?: string[];
  description: string;
  story?: string;
  medium: string;
  dimensions?: string;
  featured?: boolean;
  gridSpan?: string;
  aspectRatio?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  iconUrl?: string;
  category: 'cs-dev' | 'ai-data' | 'marketing-ads' | 'seo-analytics' | 'business-security';
}

export interface ClientPartner {
  name: string;
  logoText: string;
  category: string;
}

export type WorkCategory = 
  | 'development' 
  | 'design' 
  | 'consultation' 
  | 'maintenance' 
  | 'art-mural' 
  | 'admin' 
  | 'other';

export interface TimeLog {
  id: string;
  taskName: string;
  projectName?: string;
  projectId?: string;
  category: WorkCategory;
  startTime: string; // ISO string
  endTime?: string; // ISO string
  durationSeconds: number; // in seconds
  hourlyRate?: number; // e.g. 85 ($)
  billable: boolean;
  isBilled?: boolean;
  notes?: string;
  createdAt: string;
}

export interface ActiveTimerState {
  isRunning: boolean;
  startTime: string | null; // ISO string
  taskName: string;
  projectName: string;
  projectId?: string;
  category: WorkCategory;
  hourlyRate?: number;
  billable: boolean;
  accumulatedSeconds: number;
}
