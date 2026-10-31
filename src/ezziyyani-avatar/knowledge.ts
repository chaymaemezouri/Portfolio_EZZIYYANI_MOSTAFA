import type { KnowledgeEntry } from "./types";

const files = import.meta.glob("./data/*.json", { eager: true });

function isEntry(value: unknown): value is KnowledgeEntry {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<KnowledgeEntry>;
  return (
    typeof item.id === "string" &&
    Array.isArray(item.keywords) &&
    !!item.answer &&
    typeof item.answer === "object" &&
    typeof item.answer.fr === "string" &&
    typeof item.answer.en === "string" &&
    typeof item.answer.ar === "string"
  );
}

function entriesFrom(value: unknown): KnowledgeEntry[] {
  if (Array.isArray(value)) return value.filter(isEntry);
  return isEntry(value) ? [value] : [];
}

export const avatarKnowledge: KnowledgeEntry[] = Object.entries(files).flatMap(([path, module]) => {
  const name = path.split("/").pop() ?? "";
  if (name.startsWith("_")) return [];
  const data = (module as { default: unknown }).default;
  return entriesFrom(data);
});
