export type NavLeaf = { id: string; path: string };
export type NavItem = NavLeaf & { children?: readonly NavLeaf[] };

export const navItems: readonly NavItem[] = [
  { id: "home", path: "" },
  { id: "profile", path: "profile" },
  { id: "vision", path: "vision" },
  { id: "expertise", path: "expertise" },
  {
    id: "research",
    path: "research",
    children: [
      { id: "researchInterest", path: "research-interest" },
      { id: "publications", path: "publications" },
      { id: "projects", path: "projects" },
      { id: "patents", path: "patents" },
      { id: "innovation", path: "innovation" },
      { id: "team", path: "team" },
    ],
  },
  { id: "teaching", path: "teaching" },
  { id: "collaboration", path: "international" },
  { id: "media", path: "media" },
  { id: "gallery", path: "gallery" },
];

export const footerExplore = ["profile", "expertise", "research", "projects", "vision"] as const;
export const footerAcademic = ["research", "books", "leadership", "recognition"] as const;

export const contactPurposes = [
  "collaboration",
  "partnership",
  "conference",
  "media",
  "consulting",
  "institution",
] as const;
