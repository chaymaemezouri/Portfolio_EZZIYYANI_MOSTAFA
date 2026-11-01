import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export const juryTypeIds = ["habilitation", "phd", "recruitment"] as const;
export type JuryTypeId = (typeof juryTypeIds)[number];

export type JuryType = {
  id: JuryTypeId;
  path: JuryTypeId;
  title: TextValue;
};

export type JuryDocument = {
  id: string;
  type: JuryTypeId;
  title: TextValue;
  summary?: TextValue;
  year?: string;
  file?: string;
};

export const juryTypes: JuryType[] = [
  {
    id: "habilitation",
    path: "habilitation",
    title: l10n(
      "University habilitation jury",
      "Jury pour Habilitation Universitaire",
      "لجنة التأهيل الجامعي",
    ),
  },
  {
    id: "phd",
    path: "phd",
    title: l10n(
      "PhD thesis defense jury",
      "Jury de soutenance de Thèse PhD",
      "لجنة مناقشة أطروحة الدكتوراه",
    ),
  },
  {
    id: "recruitment",
    path: "recruitment",
    title: l10n(
      "Recruitment competition jury",
      "Jury de concours de recrutement",
      "لجنة مباريات التوظيف",
    ),
  },
];

/** Sample / seeded documents — also manageable via admin. */
export const juryDocuments: JuryDocument[] = [
  {
    id: "phd-soutenance-invitation",
    type: "phd",
    title: l10n(
      "Invitation — Thesis defense",
      "Invitation — Soutenance de thèse",
      "دعوة — مناقشة أطروحة",
    ),
    year: "Exemple",
    file: "/invitation/invitation-soutenance-these.pdf",
  },
  {
    id: "habilitation-rapporteur",
    type: "habilitation",
    title: l10n(
      "Rapporteur invitation — Hayat Sedrati",
      "Invitation rapporteur — Hayat Sedrati",
      "دعوة مقرر — حياة سدراتي",
    ),
    year: "Exemple",
    file: "/invitation/invitation-rapporteur-hayat-sedrati.pdf",
  },
  {
    id: "recruitment-invitation",
    type: "recruitment",
    title: l10n(
      "Invitation — EZZIYYANI Mostafa",
      "Invitation — EZZIYYANI Mostafa",
      "دعوة — عزّياني مصطفى",
    ),
    year: "Exemple",
    file: "/invitation/invitation-ezziyyani-mostafa.pdf",
  },
];
