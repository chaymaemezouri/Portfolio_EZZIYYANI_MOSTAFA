import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mostafa-ezziyyani/",
  },
  {
    id: "orcid",
    label: "ORCID",
    href: "https://orcid.org/0000-0002-8828-4972",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@mostafa.ezziyyani",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/mostafa.ezziyyani.7",
  },
];

export const visibleSocialLinks = socialLinks.filter((link) => link.href.length > 0);

export function socialById(id: string): SocialLink | undefined {
  return visibleSocialLinks.find((link) => link.id === id);
}
