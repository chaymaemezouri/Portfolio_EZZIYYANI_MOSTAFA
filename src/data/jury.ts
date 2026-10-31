import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type JuryTab = {
  id: string;
  path: string;
  title: TextValue;
  /** Content filled later by the user. */
  paragraphs: TextValue[];
};

export const juryTabs: JuryTab[] = [
  {
    id: "habilitation",
    path: "habilitation",
    title: l10n(
      "University habilitation jury",
      "Jury pour Habilitation Universitaire",
      "لجنة التأهيل الجامعي",
    ),
    paragraphs: [],
  },
  {
    id: "phd",
    path: "phd",
    title: l10n(
      "PhD thesis defense jury",
      "Jury de soutenance de Thèse PhD",
      "لجنة مناقشة أطروحة الدكتوراه",
    ),
    paragraphs: [],
  },
  {
    id: "recruitment",
    path: "recruitment",
    title: l10n(
      "Recruitment competition jury",
      "Jury de concours de recrutement",
      "لجنة مباريات التوظيف",
    ),
    paragraphs: [],
  },
];
