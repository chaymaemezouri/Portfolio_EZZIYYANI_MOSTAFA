import { academicNarrative } from "../../src/data/academic";
import { awards } from "../../src/data/awards";
import { expertiseDomains } from "../../src/data/expertise";
import { impactMetrics } from "../../src/data/impact";
import { profile, profileSections } from "../../src/data/profile";
import { projects } from "../../src/data/projects";
import { researchIntro, researchLines } from "../../src/data/publications";
import { courses } from "../../src/data/teaching";
import { visionThemes } from "../../src/data/vision";
import type { Locale } from "../../src/types";
import { text } from "../../src/utils/text";

function pick(locale: Locale, value: Parameters<typeof text>[1]) {
  return text(locale, value).replace(/\s+/g, " ").trim();
}

export function portfolioDigest(locale: Locale) {
  const name = locale === "ar" && profile.nameAr ? profile.nameAr : `${profile.givenName} ${profile.familyName}`;
  const lines: string[] = [
    `${profile.honorific} ${name}`,
    pick(locale, profile.introduction),
    `E-mail: ${profile.email} · Tél: ${profile.phone} · ORCID: 0000-0002-8828-4972 · ${profile.website}`,
    `Chiffres: ${impactMetrics.map((item) => item.display).join(" · ")} (30+ ans, 200+ publications, 350+ encadrements, 10+ projets).`,
  ];

  for (const section of profileSections) {
    for (const paragraph of section.paragraphs) lines.push(pick(locale, paragraph));
    for (const fact of section.facts) {
      const label = typeof fact.label === "string" ? fact.label : pick(locale, fact.label);
      const value = typeof fact.value === "string" ? fact.value : pick(locale, fact.value);
      if (label && value) lines.push(`${label}: ${value}`);
    }
  }

  lines.push("Expertise:");
  for (const domain of expertiseDomains) {
    lines.push(`- ${pick(locale, domain.summary)}`);
  }

  lines.push("Recherche:");
  for (const intro of researchIntro) lines.push(pick(locale, intro));
  for (const line of researchLines) {
    lines.push(`- ${pick(locale, line.label)}: ${pick(locale, line.detail)}`);
  }

  lines.push("Enseignement:");
  for (const item of academicNarrative) lines.push(pick(locale, item));
  lines.push(`Cours: ${courses.map((course) => course.title).join(", ")}.`);

  lines.push("Vision:");
  for (const theme of visionThemes) lines.push(`- ${pick(locale, theme.statement)}`);

  lines.push("Projets et responsabilités:");
  for (const project of projects.slice(0, 12)) {
    const title = pick(locale, project.title);
    const role = pick(locale, project.role);
    const summary = pick(locale, project.summary);
    lines.push(`- ${title}${role ? ` (${role})` : ""}${summary ? `: ${summary}` : ""}`);
  }

  if (awards.length) {
    lines.push("Distinctions:");
    for (const award of awards.slice(0, 8)) {
      lines.push(`- ${award.year ? `${award.year} · ` : ""}${pick(locale, award.title)} — ${pick(locale, award.institution)}`);
    }
  }

  return lines.filter(Boolean).join("\n");
}
