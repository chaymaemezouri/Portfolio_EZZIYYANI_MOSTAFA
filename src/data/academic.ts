import type { AcademicStat, SupervisionItem, SupervisionLevel, TextValue } from "@/types";
import { l10n } from "@/utils/text";

/** The CV gives one combined figure, not a separate count for each degree level. */
export const academicStats: AcademicStat[] = [
  { id: "total", value: null, display: "350+" },
  { id: "doctoral", value: null },
  { id: "masters", value: null },
];

export const supervision: SupervisionItem[] = [];

export const academicNarrative: TextValue[] = [
  l10n(
    "He founded a research school built on broad innovation and has supervised more than 350 doctoral theses, master's dissertations and strategic projects.",
    "Il a fondé une école de recherche tournée vers l'innovation et a encadré plus de 350 thèses de doctorat, mémoires de master et projets stratégiques.",
    "أسّس مدرسة بحثية قائمة على الابتكار، وأشرف على أكثر من 350 أطروحة دكتوراه ورسالة ماجستير ومشروعاً استراتيجياً.",
  ),
  l10n(
    "That supervision has trained generations of researchers and engineers who now hold leadership posts in major technology companies and institutions in Morocco and abroad.",
    "Cet encadrement a formé des générations de chercheurs et d'ingénieurs qui occupent aujourd'hui des postes de direction dans de grandes entreprises et institutions technologiques au Maroc et à l'étranger.",
    "وقد خرّج هذا التأطير أجيالاً من الباحثين والمهندسين الذين يتبوأون مناصب قيادية في كبرى الشركات والمؤسسات التقنية داخل المغرب وخارجه.",
  ),
];

export const supervisionLevels: SupervisionLevel[] = [
  "doctoral",
  "master",
  "engineering",
  "mentorship",
];
