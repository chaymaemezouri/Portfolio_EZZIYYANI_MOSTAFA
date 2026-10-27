export type Locale = "en" | "fr" | "ar";

export interface L10n {
  en: string;
  fr: string;
  ar: string;
}

export type TextValue = string | L10n;

export interface Profile {
  honorific: string;
  givenName: string;
  familyName: string;
  nameAr: string;
  honorificAr: string;
  introduction: TextValue;
  portrait: string;
  portraitWidth: number;
  portraitHeight: number;
  email: string;
  phone: string;
  website: string;
}

export interface ProfileSection {
  id: string;
  paragraphs: TextValue[];
  facts: { label: TextValue; value: TextValue }[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface ImpactMetric {
  id: string;
  value: number | null;
  display?: string;
}

export interface ExpertiseDomain {
  id: string;
  summary: TextValue;
  points: TextValue[];
}

export interface Education {
  id: string;
  year: string;
  degree: TextValue;
  institution: TextValue;
  country: TextValue;
  description: TextValue;
  major?: boolean;
}

export interface Publication {
  id: string;
  year: string;
  title: string;
  authors: string;
  venue: string;
  type: string;
  doi: string;
  url: string;
  scholarUrl: string;
  orcidUrl: string;
  tags: string[];
  featured: boolean;
  abstract: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ResearchProject {
  id: string;
  title: TextValue;
  year: string;
  category: string;
  role: TextValue;
  summary: TextValue;
  organization: TextValue;
  partners: string[];
  country: TextValue;
  status: string;
  image: string;
  links: ProjectLink[];
  featured: boolean;
  details?: TextValue[];
}

export interface StrategicDocument {
  id: string;
  category: TextValue;
  title: TextValue;
  summary: TextValue;
  year: string;
  themes: TextValue[];
  cover: string;
  readUrl: string;
}

export interface VisionTheme {
  id: string;
  statement: TextValue;
  image: string;
}

export interface StrategicPrinciple {
  quote: TextValue;
  reference: TextValue;
}

export type ActivityCategory =
  | "research"
  | "visit"
  | "conference"
  | "advisory"
  | "partnership"
  | "project";

export type RegionId = "africa" | "europe" | "asia" | "northAmerica" | "arabWorld";

export interface InternationalActivity {
  id: string;
  country: TextValue;
  city: TextValue;
  institution: TextValue;
  category: ActivityCategory;
  region: RegionId;
  year: string;
  x: number;
  y: number;
  summary: TextValue;
  photos?: string[];
}

export type MediaCategory =
  | "keynote"
  | "conference"
  | "tv"
  | "interview"
  | "analysis"
  | "lecture";

export interface PublicPost {
  id: string;
  date: string;
  text: TextValue;
  images: string[];
  href: string;
}

export interface MediaItem {
  id: string;
  title: TextValue;
  youtubeUrl: string;
  event: TextValue;
  date: string;
  category: MediaCategory;
  thumbnail: string;
  featured: boolean;
}

export interface Conference {
  id: string;
  year: string;
  conference: string;
  title: string;
  city: string;
  country: string;
  date: string;
  role: string;
  mediaUrl: string;
  image: string;
}

export type AwardCategory = "award" | "distinction" | "leadership" | "role" | "certification";

export interface Award {
  id: string;
  year: string;
  title: TextValue;
  institution: TextValue;
  metadata: TextValue;
  category: AwardCategory;
  major?: boolean;
}

export interface LeadershipRole {
  id: string;
  title: TextValue;
  organization: TextValue;
  year: string;
  description: TextValue;
}

export interface Certification {
  id: string;
  title: TextValue;
  organization: TextValue;
  year: string;
}

export type SupervisionLevel = "doctoral" | "master" | "engineering" | "mentorship";

export interface SupervisionItem {
  id: string;
  name: string;
  title: string;
  year: string;
  level: SupervisionLevel;
  institution: string;
}

export interface AcademicStat {
  id: string;
  value: number | null;
  display?: string;
}
