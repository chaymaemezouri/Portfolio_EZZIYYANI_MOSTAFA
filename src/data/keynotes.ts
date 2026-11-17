import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type KeynoteTalk = {
  id: string;
  /** Conference year used for the left filter, e.g. "2022". */
  year: string;
  title: TextValue;
  summary?: TextValue;
  event?: TextValue;
  /** Invitation PDF. */
  invitation?: string;
  /** Presentation used during the talk (PPT/PPTX/PDF). */
  presentation?: string;
  photos?: string[];
};

/** Sample talks — also manageable via admin CMS. */
export const keynoteTalks: KeynoteTalk[] = [
  {
    id: "keynote-2026-sovereignty",
    year: "2026",
    title: l10n(
      "Keynote — Technological sovereignty and AI governance",
      "Keynote — Souveraineté technologique et gouvernance de l’IA",
      "كلمة رئيسية — السيادة التكنولوجية وحوكمة الذكاء الاصطناعي",
    ),
    event: l10n("International forum 2026", "Forum international 2026", "منتدى دولي 2026"),
    summary: l10n(
      "Example invitation and presentation for a 2026 keynote.",
      "Exemple d’invitation et de présentation pour une keynote 2026.",
      "مثال على دعوة وعرض لكلمة رئيسية سنة 2026.",
    ),
    invitation: "/invitation/invitation-ezziyyani-mostafa.pdf",
    presentation: "/articles/strategic-framework-filing.pdf",
    photos: [
      "/visits/yazaki/photo-08.jpg",
      "/visits/yazaki/photo-09.jpg",
      "/media/spotlight/spotlight-14.jpg",
    ],
  },
  {
    id: "keynote-2025-geotech",
    year: "2025",
    title: l10n(
      "Keynote — From geopolitics to geotechnology",
      "Keynote — De la géopolitique à la géotechnologie",
      "كلمة رئيسية — من الجيوسياسة إلى الجيوتكنولوجيا",
    ),
    event: l10n("Strategic summit 2025", "Sommet stratégique 2025", "قمة استراتيجية 2025"),
    summary: l10n(
      "Example invitation and presentation for a 2025 keynote.",
      "Exemple d’invitation et de présentation pour une keynote 2025.",
      "مثال على دعوة وعرض لكلمة رئيسية سنة 2025.",
    ),
    invitation: "/invitation/invitation-ezziyyani-mostafa-alt.pdf",
    presentation: "/articles/alfaisal-geopolitical-to-geotechnological-war.pdf",
    photos: [
      "/visits/tanger-med/photo-08.jpg",
      "/visits/tanger-med/photo-09.jpg",
      "/media/spotlight/spotlight-09.jpg",
    ],
  },
  {
    id: "keynote-2024-smart",
    year: "2024",
    title: l10n(
      "Keynote — Smart systems and distributed intelligence",
      "Keynote — Systèmes intelligents et intelligence distribuée",
      "كلمة رئيسية — الأنظمة الذكية والذكاء الموزع",
    ),
    event: l10n("AI & Data conference 2024", "Conférence IA & Data 2024", "مؤتمر الذكاء والبيانات 2024"),
    summary: l10n(
      "Example invitation and presentation for a 2024 keynote.",
      "Exemple d’invitation et de présentation pour une keynote 2024.",
      "مثال على دعوة وعرض لكلمة رئيسية سنة 2024.",
    ),
    invitation: "/invitation/invitation.pdf",
    presentation: "/articles/geotechnological-war.pdf",
    photos: [
      "/visits/yazaki/photo-05.jpg",
      "/visits/yazaki/photo-06.jpg",
      "/visits/yazaki/photo-07.jpg",
      "/media/spotlight/spotlight-06.jpg",
    ],
  },
  {
    id: "keynote-2023-data",
    year: "2023",
    title: l10n(
      "Keynote — Big data and digital transformation",
      "Keynote — Big data et transformation numérique",
      "كلمة رئيسية — البيانات الضخمة والتحول الرقمي",
    ),
    event: l10n("Scientific congress 2023", "Congrès scientifique 2023", "مؤتمر علمي 2023"),
    summary: l10n(
      "Example invitation and presentation for a 2023 keynote.",
      "Exemple d’invitation et de présentation pour une keynote 2023.",
      "مثال على دعوة وعرض لكلمة رئيسية سنة 2023.",
    ),
    invitation: "/invitation/invitation-ezziyyani-mohammed.pdf",
    presentation: "/articles/digital-transformation-morocco.pdf",
    photos: [
      "/visits/tanger-med/photo-05.jpg",
      "/visits/yazaki/photo-03.jpg",
      "/visits/yazaki/photo-10.jpg",
      "/media/spotlight/spotlight-03.jpg",
    ],
  },
  {
    id: "keynote-2022-ai2sd",
    year: "2022",
    title: l10n(
      "Keynote — Intelligent systems and data science",
      "Keynote — Systèmes intelligents et science des données",
      "كلمة رئيسية — الأنظمة الذكية وعلوم البيانات",
    ),
    event: l10n("AI2SD 2022", "AI2SD 2022", "AI2SD 2022"),
    summary: l10n(
      "Example invitation and presentation for a 2022 keynote.",
      "Exemple d’invitation et de présentation pour une keynote 2022.",
      "مثال على دعوة وعرض لكلمة رئيسية سنة 2022.",
    ),
    invitation: "/invitation/invitation-soutenance-these.pdf",
    presentation: "/articles/geotechnological-war.pdf",
    photos: [
      "/visits/yazaki/photo-01.jpg",
      "/visits/yazaki/photo-02.jpg",
      "/visits/tanger-med/photo-01.jpg",
      "/media/spotlight/spotlight-03.jpg",
    ],
  },
  {
    id: "keynote-2021-digital",
    year: "2021",
    title: l10n(
      "Keynote — Digital transformation",
      "Keynote — Transformation numérique",
      "كلمة رئيسية — التحول الرقمي",
    ),
    event: l10n("International conference 2021", "Conférence internationale 2021", "مؤتمر دولي 2021"),
    invitation: "/invitation/invitation-rapporteur-hayat-sedrati.pdf",
    presentation: "/articles/digital-transformation-morocco.pdf",
    photos: [
      "/visits/tanger-med/photo-06.jpg",
      "/visits/tanger-med/photo-07.jpg",
      "/media/spotlight/spotlight-06.jpg",
    ],
  },
  {
    id: "keynote-2020-ai",
    year: "2020",
    title: l10n(
      "Keynote — Artificial intelligence applications",
      "Keynote — Applications de l’intelligence artificielle",
      "كلمة رئيسية — تطبيقات الذكاء الاصطناعي",
    ),
    event: l10n("Scientific symposium 2020", "Symposium scientifique 2020", "ندوة علمية 2020"),
    invitation: "/invitation/invitation-ezziyyani-mostafa.pdf",
    presentation: "/articles/ministry-for-ai.pdf",
    photos: [
      "/media/spotlight/spotlight-09.jpg",
      "/media/spotlight/spotlight-14.jpg",
      "/domains/01.jpg",
    ],
  },
];

export function keynoteYears(talks: KeynoteTalk[]): string[] {
  return [...new Set(talks.map((item) => String(item.year)).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
}

export function isPdfPresentation(href?: string) {
  return /\.pdf($|\?)/i.test(href ?? "");
}
