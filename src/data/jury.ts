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
  /** Photos of the defense / session (slider). */
  photos?: string[];
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
    photos: [
      "/visits/yazaki/photo-01.jpg",
      "/visits/yazaki/photo-02.jpg",
      "/visits/yazaki/photo-03.jpg",
      "/visits/yazaki/photo-05.jpg",
      "/visits/tanger-med/photo-01.jpg",
      "/visits/tanger-med/photo-06.jpg",
    ],
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
    photos: [
      "/visits/tanger-med/photo-02.png",
      "/visits/tanger-med/photo-03.png",
      "/visits/tanger-med/photo-07.jpg",
      "/media/spotlight/spotlight-03.jpg",
    ],
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
    photos: [
      "/media/spotlight/spotlight-06.jpg",
      "/media/spotlight/spotlight-09.jpg",
      "/media/spotlight/spotlight-14.jpg",
      "/domains/01.jpg",
    ],
  },
];
