export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  tech: string[];
  bullets: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge?: string;
}
