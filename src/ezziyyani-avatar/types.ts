import type { L10n } from "@/types";

export type AvatarRole = "user" | "assistant";

export type AvatarMessage = {
  id: number;
  role: AvatarRole;
  text: string;
  related?: string;
};

export type AvatarReply = {
  text: string;
  related?: string;
};

export type KnowledgeEntry = {
  id: string;
  source?: string;
  keywords: string[];
  question?: L10n;
  answer: L10n;
  related?: string;
};

export type AvatarTopic = {
  id: "teaching" | "science" | "technology" | "innovation" | "strategy" | "consulting" | "ai" | "oman";
  related: string;
};

export const avatarTopics: readonly AvatarTopic[] = [
  { id: "ai", related: "expertise" },
  { id: "strategy", related: "vision" },
  { id: "oman", related: "international" },
  { id: "teaching", related: "teaching" },
  { id: "science", related: "research" },
  { id: "technology", related: "expertise" },
  { id: "innovation", related: "innovation" },
  { id: "consulting", related: "contact" },
];
