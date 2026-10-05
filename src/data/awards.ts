import type { Award } from "@/types";
import { l10n } from "@/utils/text";

export const awards: Award[] = [
  {
    id: "itu-geneva-2018",
    year: "2018",
    title: l10n(
      "First place worldwide, Smart Environment",
      "Première place mondiale, environnement intelligent",
      "المرتبة الأولى عالمياً في البيئات والأنظمة الذكية",
    ),
    institution: l10n(
      "International Telecommunication Union (United Nations), Geneva",
      "Union internationale des télécommunications (Nations unies), Genève",
      "الاتحاد الدولي للاتصالات التابع للأمم المتحدة، جنيف",
    ),
    metadata: l10n("Smart Environment", "Smart Environment", "Smart Environment"),
    category: "award",
    major: true,
  },
  {
    id: "international-laurels",
    year: "",
    title: l10n(
      "Dozens of awards and honorary shields",
      "Des dizaines de prix et de distinctions",
      "عشرات الجوائز والدروع التكريمية",
    ),
    institution: l10n(
      "Universities and research institutions in Europe, Asia and the Arab world",
      "Universités et institutions de recherche en Europe, en Asie et dans le monde arabe",
      "جامعات ومؤسسات بحثية في أوروبا وآسيا والعالم العربي",
    ),
    metadata: l10n(
      "High-performance computing algorithms and digital integration",
      "Algorithmes de calcul haute performance et intégration numérique",
      "خوارزميات الحوسبة عالية الأداء والتكامل الرقمي",
    ),
    category: "distinction",
  },
];

export const awardCategories = [
  "award",
  "distinction",
  "leadership",
  "role",
  "certification",
] as const;
