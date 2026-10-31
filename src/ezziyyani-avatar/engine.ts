import { academicNarrative } from "@/data/academic";
import { impactMetrics } from "@/data/impact";
import { profile } from "@/data/profile";
import { researchIntro } from "@/data/publications";
import type { Locale } from "@/types";
import { text } from "@/utils/text";
import { avatarKnowledge } from "./knowledge";
import type { AvatarReply, KnowledgeEntry } from "./types";

function norm(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

const STOP = new Set([
  "the", "and", "for", "with", "from", "that", "this", "what", "how", "why", "who",
  "est", "que", "une", "des", "les", "aux", "sur", "par", "avec", "dans", "pour",
  "quel", "quels", "quelle", "quelles", "quoi", "dont", "plus", "votre", "vous",
]);

const SYNONYMS: Record<string, string[]> = {
  digital: ["numerique", "digital"],
  numerique: ["digital", "numerique"],
  transformation: ["transformation", "تحول"],
  intelligence: ["intelligence", "ia", "ai"],
  artificielle: ["artificielle", "ia", "ai"],
  oman: ["oman", "omanais", "sultanate"],
};

function tokens(value: string) {
  const raw = norm(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 4 && !STOP.has(token));
  const expanded = new Set(raw);
  for (const token of raw) {
    for (const extra of SYNONYMS[token] ?? []) expanded.add(extra);
  }
  return [...expanded];
}

function has(query: string, words: string[]) {
  return words.some((word) => {
    const token = norm(word);
    if (token.length <= 3) return new RegExp(`(^|\\s)${token}(\\s|$)`).test(query);
    return query.includes(token);
  });
}

function metric(id: string) {
  return impactMetrics.find((item) => item.id === id)?.display ?? "";
}

function reply(value: string, related?: string): AvatarReply {
  return { text: value, related };
}

function scoreEntry(query: string, entry: KnowledgeEntry) {
  const normalized = norm(query).replace(/[?؟]/g, "").trim();
  const queryTokens = new Set(tokens(normalized));
  if (!normalized || queryTokens.size === 0) return 0;

  let points = 0;
  const questions = [entry.question?.en, entry.question?.fr, entry.question?.ar].filter(Boolean) as string[];
  for (const question of questions) {
    const clean = norm(question).replace(/[?؟]/g, "").trim();
    if (!clean) continue;
    if (normalized === clean || clean.includes(normalized) || normalized.includes(clean)) points += 24;
    const overlap = tokens(clean).filter((token) => queryTokens.has(token) && token.length > 3);
    points += overlap.length * 4;
  }

  for (const word of entry.keywords) {
    const key = norm(word).replace(/[?؟]/g, "");
    if (key.length >= 4 && normalized.includes(key)) points += key.length > 8 ? 3 : 2;
  }
  return points;
}

function fromKnowledge(query: string, locale: Locale) {
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;
  for (const entry of avatarKnowledge) {
    const points = scoreEntry(query, entry);
    if (points > bestScore) {
      best = entry;
      bestScore = points;
    }
  }
  if (!best || bestScore < 6) return null;
  return reply(text(locale, best.answer), best.related);
}

export function answerAvatar(raw: string, locale: Locale, t: (key: string) => string): AvatarReply {
  const query = norm(raw);
  const learned = fromKnowledge(query, locale);
  if (learned) return learned;

  const figure = (id: string) => `${metric(id)} ${t(`impact.${id}`)}`;

  if (
    query.includes("pedagog") ||
    /(^|\s)formation(\s|$|\?)/.test(query) ||
    query.includes("enseignement") ||
    /(^|\s)teaching(\s|$|\?)/.test(query) ||
    /(^|\s)training(\s|$|\?)/.test(query) ||
    query.includes("بيداغوج") ||
    /(^|\s)تكوين(\s|$|\?)/.test(query)
  ) {
    return reply(text(locale, academicNarrative[0]), "teaching");
  }
  if (query.includes("recherche scientifique") || query.includes("scientific research") || query.includes("البحث العلمي")) {
    return reply(text(locale, researchIntro[1]), "research");
  }
  if (has(query, ["orcid"])) return reply("ORCID 0000-0002-8828-4972", "profile");
  if (has(query, ["email", "e-mail", "courriel", "mail", "phone", "telephone", "tel", "contact", "contacter", "بريد", "هاتف", "تواصل"])) {
    return reply(`${profile.email} · ${profile.phone}`, "contact");
  }
  if (has(query, ["publication", "publications", "article", "articles", "paper", "منشور", "منشورات"])) {
    return reply(figure("publications"), "publications");
  }
  if (has(query, ["these", "thesis", "encadrement", "supervision", "أطروح", "رسائل"])) {
    return reply(figure("supervision"), "teaching");
  }
  if (has(query, ["projet", "projets", "project", "projects", "مشاريع", "مشروع"])) {
    return reply(figure("projects"), "projects");
  }
  if (has(query, ["experience", "annees", "years", "1990", "خبرة", "سنوات"])) {
    return reply(`${figure("experience")}. ${t("hero.lead")}`, "profile");
  }
  if (has(query, ["universite", "university", "essaadi", "السعدي"])) {
    return reply(t("hero.facts.professor"), "profile");
  }
  if (has(query, ["consulting", "conseil", "استشارة"])) {
    return reply(`${t("hero.facts.cyber")}. ${t("hero.facts.council")}`, "contact");
  }
  if (has(query, ["qui", "who", "profil", "profile", "الزياني", "ezziyyani", "مصطفى"])) {
    return reply(text(locale, profile.introduction), "profile");
  }
  return reply(t("hero.assistant.fallback"), "contact");
}
