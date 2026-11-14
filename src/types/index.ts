export type ServiceKey = 'occupational' | 'speech' | 'physical' | 'all';

export type SubmissionStatus = 'new' | 'contacted' | 'scheduled' | 'completed';

export interface ConsultationSubmission {
  id?: string;
  parentName: string;
  childName: string;
  childAge: string;
  serviceType: ServiceKey | string;
  email: string;
  phone: string;
  notes?: string;
  timestamp: string;
  status?: SubmissionStatus;
}

export interface TherapyService {
  id: ServiceKey;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  accentColor: 'sage' | 'terracotta' | 'teal';
  highlights: string[];
  whoItHelps: string[];
  insideSession: string;
  ageRange: string;
  sessionDuration: string;
}

export interface AdditionalSupportProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommendedService: ServiceKey;
}

export interface CareJourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface FamilyTestimonial {
  id: string;
  quote: string;
  author: string;
  relation: string;
  focusTag: string;
  initials: string;
}
