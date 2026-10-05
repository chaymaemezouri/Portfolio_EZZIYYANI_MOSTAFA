export const navItems = [
  { id: "home", path: "" },
  { id: "profile", path: "profile" },
  { id: "expertise", path: "expertise" },
  { id: "research", path: "research" },
  { id: "projects", path: "projects" },
  { id: "vision", path: "vision" },
  { id: "media", path: "media" },
  { id: "recognition", path: "recognition" },
] as const;

export const footerExplore = ["profile", "expertise", "research", "projects", "vision"] as const;
export const footerAcademic = ["research", "leadership", "recognition"] as const;

export const contactPurposes = [
  "collaboration",
  "partnership",
  "conference",
  "media",
  "consulting",
  "institution",
] as const;
