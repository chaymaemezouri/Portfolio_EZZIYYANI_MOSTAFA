import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type VisionArticle = {
  id: string;
  title: TextValue;
  summary?: TextValue;
  content?: TextValue;
  year?: string;
  file?: string;
};

export const visionArticles: VisionArticle[] = [
  {
    id: "strategic-framework",
    title: l10n(
      "Strategic framework for digital transformation — filing dossier",
      "Cadre stratégique de la transformation numérique — dossier de dépôt",
      "الإطار الاستراتيجي للتحول الرقمي — ملف الإيداع",
    ),
    year: "2027–2030",
    file: "/articles/strategic-framework-filing.pdf",
  },
  {
    id: "digital-transformation-morocco",
    title: l10n(
      "Digital transformation in Morocco",
      "La transformation numérique au Maroc",
      "التحول الرقمي في المغرب",
    ),
    file: "/articles/digital-transformation-morocco.pdf",
  },
  {
    id: "geotechnological-war",
    title: l10n(
      "From the Cold War to the geotechnological war",
      "De la guerre froide à la guerre géotechnologique",
      "من الحرب الباردة إلى الحرب الجيوتكنولوجية",
    ),
    file: "/articles/geotechnological-war.pdf",
  },
  {
    id: "ministry-for-ai",
    title: l10n(
      "A ministry for artificial intelligence?",
      "Un ministère pour l’intelligence artificielle ?",
      "وزارة للذكاء الاصطناعي؟",
    ),
    file: "/articles/ministry-for-ai.pdf",
  },
];
