import { internationalActivities } from "@/data/international";
import { awards } from "@/data/awards";
import { bookEditions, type BookEdition } from "@/data/books";
import { certifications } from "@/data/certifications";
import { conferences } from "@/data/conferences";
import { education } from "@/data/education";
import { leadershipRoles } from "@/data/leadership";
import { publicPosts } from "@/data/posts";
import { profile, profileSections } from "@/data/profile";
import { innovations, type Innovation } from "@/data/innovation";
import { patents, type Patent } from "@/data/patents";
import { projects } from "@/data/projects";
import { listedPublications, type ListedPublication } from "@/data/publications";
import { visionArticles, type VisionArticle } from "@/data/articles";
import { mediaItems } from "@/data/videos";
import type {
  Award,
  Certification,
  Conference,
  Education,
  InternationalActivity,
  LeadershipRole,
  MediaItem,
  ProfileSection,
  PublicPost,
  ResearchProject,
  TextValue,
} from "@/types";
import { useCollection } from "./useCollection";

export type { Innovation, Patent };

export interface GalleryAlbum {
  id: string;
  title?: TextValue;
  description?: TextValue;
  caption?: TextValue;
  date?: string;
  images?: string[];
  image?: string;
}

export type GalleryPhoto = GalleryAlbum;

export type ProfileSectionEntry = ProfileSection & { title?: TextValue };

export const usePublications = () => useCollection<ListedPublication>("publications", listedPublications);
export const useBooks = () => useCollection<BookEdition>("books", bookEditions);
export const useProjects = () => useCollection<ResearchProject>("projects", projects);
export const usePatents = () => useCollection<Patent>("patents", patents);
export const useInnovation = () => useCollection<Innovation>("innovation", innovations);
export const useGallery = () => useCollection<GalleryAlbum>("gallery", []);
export const useVideos = () => useCollection<MediaItem>("videos", mediaItems);
export const useArticles = () => useCollection<VisionArticle>("articles", visionArticles);
export const usePosts = () => useCollection<PublicPost>("posts", publicPosts);
export const useAwards = () => useCollection<Award>("awards", awards);
export const useLeadership = () => useCollection<LeadershipRole>("leadership", leadershipRoles);
export const useCertifications = () => useCollection<Certification>("certifications", certifications);
export const useConferences = () => useCollection<Conference>("conferences", conferences);
export const useEducation = () => useCollection<Education>("education", education);
export const useInternational = () => useCollection<InternationalActivity>("international", internationalActivities);
export const useProfileSections = () => useCollection<ProfileSectionEntry>("profileSections", profileSections);

export function useProfile() {
  const [main] = useCollection<Partial<typeof profile>>("profile", []);
  if (!main) return profile;
  return {
    ...profile,
    introduction: main.introduction || profile.introduction,
    email: main.email || profile.email,
    phone: main.phone || profile.phone,
  };
}
