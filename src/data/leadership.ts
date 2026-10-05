import type { LeadershipRole } from "@/types";
import { l10n } from "@/utils/text";

export const leadershipRoles: LeadershipRole[] = [
  {
    id: "uae-professor",
    title: l10n(
      "Full Professor of Higher Education",
      "Professeur de l'enseignement supérieur",
      "أستاذ التعليم العالي",
    ),
    organization: l10n(
      "Abdelmalek Essaadi University",
      "Université Abdelmalek Essaâdi",
      "جامعة عبد المالك السعدي",
    ),
    year: "1996",
    description: l10n(
      "Researcher at the university since 1996.",
      "Chercheur à l'université depuis 1996.",
      "باحث بالجامعة منذ 1996.",
    ),
  },
  {
    id: "ifft",
    title: l10n("President", "Président", "رئيس"),
    organization: l10n(
      "Innovation and Technology Transfer Organization (IFFT)",
      "Organisation de l'innovation et du transfert de technologie (IFFT)",
      "منظمة الابتكار ونقل التكنولوجيا (IFFT)",
    ),
    year: "",
    description: l10n(
      "Bridging the university with the financial and industrial sectors.",
      "Relier l'université aux secteurs financier et industriel.",
      "تجسير الفجوة بين الجامعة والقطاعين المالي والصناعي.",
    ),
  },
  {
    id: "quantum",
    title: l10n(
      "President, Director General and co-founder",
      "Président, directeur général et cofondateur",
      "رئيس ومدير عام ومؤسس مشارك",
    ),
    organization: l10n(
      "Moroccan Quantum Computing Cluster",
      "Moroccan Quantum Computing Cluster",
      "التكتل المغربي للحوسبة الكمومية",
    ),
    year: "",
    description: l10n(
      "Quantum computing, quantum artificial intelligence and post-quantum cryptography.",
      "Informatique quantique, intelligence artificielle quantique et cryptographie post-quantique.",
      "الحوسبة الكمومية، والذكاء الاصطناعي الكمومي، والتشفير المقاوم للحوسبة الكمومية.",
    ),
  },
  {
    id: "ai2sd",
    title: l10n("General Chair", "Président général", "الرئيس العام"),
    organization: l10n(
      "AI2SD — International Conference on Intelligent Systems for Sustainable Development",
      "AI2SD — Conférence internationale sur les systèmes intelligents pour le développement durable",
      "AI2SD — المؤتمر الدولي للأنظمة الذكية للتنمية المستدامة",
    ),
    year: "",
    description: "",
  },
  {
    id: "djibouti-council",
    title: l10n(
      "President of the Advisory Council",
      "Président du conseil consultatif",
      "رئيس المجلس الاستشاري",
    ),
    organization: l10n(
      "Center of Excellence for African Research, Djibouti",
      "Centre d'excellence pour la recherche africaine, Djibouti",
      "مركز التميز للبحث الإفريقي، جيبوتي",
    ),
    year: "",
    description: "",
  },
  {
    id: "arab-council",
    title: l10n("Member", "Membre", "عضو"),
    organization: l10n(
      "Arab Advisory Council for Scientific Research and Innovation",
      "Conseil consultatif arabe de la recherche scientifique et de l'innovation",
      "المجلس الاستشاري العربي للبحث العلمي والابتكار",
    ),
    year: "",
    description: "",
  },
  {
    id: "sworn-expert",
    title: l10n(
      "Sworn expert before the criminal courts",
      "Expert assermenté auprès des juridictions pénales",
      "خبير محلف لدى المحاكم الجنائية",
    ),
    organization: l10n(
      "Cybercrime, cybersecurity and digital evidence",
      "Cybercriminalité, cybersécurité et preuve numérique",
      "الجرائم الإلكترونية والأمن السيبراني والأدلة الرقمية",
    ),
    year: "",
    description: "",
  },
];
