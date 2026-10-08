import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export interface Position {
  id: string;
  organization: TextValue;
  unit: TextValue;
  role: TextValue;
  from: string;
  to: string;
}

/** Private-sector posts, most recent first, as supplied. */
export const privatePositions: Position[] = [
  {
    id: "scientific-advisory-council",
    organization: l10n(
      "International Scientific Advisory Council",
      "Conseil Consultatif Scientifique International",
      "المجلس الاستشاري العلمي الدولي",
    ),
    unit: l10n(
      "African Center of Excellence",
      "Centre d'Excellence Africain",
      "مركز التميز الإفريقي",
    ),
    role: l10n("President", "Président", "رئيس"),
    from: "2021",
    to: "2022",
  },
  {
    id: "ittf",
    organization: "Innovation and Technology Transfer Foundation",
    unit: "Innovation and Technology Transfer Foundation",
    role: l10n("President", "Président", "رئيس"),
    from: "2020",
    to: "2023",
  },
  {
    id: "china-arab-cooperation",
    organization: l10n(
      "Center for Economic and Trade Cooperation between China Arab Countries",
      "Center for Economic and Trade Cooperation between China Arab Countries",
      "مركز التعاون الاقتصادي والتجاري بين الصين والدول العربية",
    ),
    unit: l10n(
      "Moroccan Center for China Economic and Trade Cooperation",
      "Moroccan Center for China Economic and Trade Cooperation",
      "المركز المغربي للتعاون الاقتصادي والتجاري مع الصين",
    ),
    role: l10n("Coordinator", "Coordinateur", "منسق"),
    from: "2018",
    to: "2023",
  },
  {
    id: "intershipping",
    organization: "Intershipping-SARL",
    unit: "ICT/SI",
    role: l10n("Consulting & Expertise", "Consulting & Expertise", "استشارة وخبرة"),
    from: "2021",
    to: "2022",
  },
  {
    id: "criminal-court",
    organization: l10n("Criminal Court", "La Cour Pénale", "المحكمة الجنائية"),
    unit: l10n("Expert", "Expert", "خبير"),
    role: l10n("Expert", "Expert", "خبير"),
    from: "2015",
    to: "2016",
  },
  {
    id: "belfromagerie",
    organization: "Belfromagerie",
    unit: "ICT",
    role: l10n("Consulting & Expertise", "Consulting & Expertise", "استشارة وخبرة"),
    from: "2016",
    to: "2017",
  },
];

/** Public-sector posts, most recent first, as supplied. */
export const publicPositions: Position[] = [
  {
    id: "fst-tanger",
    organization: l10n("FST Tangier", "FST Tanger", "FST طنجة"),
    unit: l10n(
      "Computer Engineering Department",
      "Département Génie Informatique",
      "قسم الهندسة المعلوماتية",
    ),
    role: l10n("Teacher-Researcher", "Enseignant/Chercheur", "أستاذ / باحث"),
    from: "16/07/1996",
    to: "present",
  },
  {
    id: "barcelona",
    organization: l10n("University of Barcelona", "Université de Barcelone", "جامعة برشلونة"),
    unit: l10n("University of Barcelona", "Université de Barcelone", "جامعة برشلونة"),
    role: l10n("Visiting Professor", "Professeur Visiteur", "أستاذ زائر"),
    from: "2021",
    to: "2021",
  },
  {
    id: "sfax",
    organization: l10n("University of Sfax", "Université de Sfax", "جامعة صفاقس"),
    unit: l10n("University of Sfax", "Université de Sfax", "جامعة صفاقس"),
    role: l10n("Visiting Professor", "Professeur Visiteur", "أستاذ زائر"),
    from: "2019",
    to: "2019",
  },
  {
    id: "djibouti",
    organization: l10n("University of Djibouti", "Université de Djibouti", "جامعة جيبوتي"),
    unit: l10n("Faculty of Sciences", "Faculté des Sciences", "كلية العلوم"),
    role: l10n("Visiting Professor", "Professeur Visiteur", "أستاذ زائر"),
    from: "2018",
    to: "2022",
  },
  {
    id: "uir",
    organization: "UIR",
    unit: l10n(
      "Computer Science Department",
      "Département Informatique et",
      "قسم الإعلاميات",
    ),
    role: l10n("Invited Professor", "Professeur Invité", "أستاذ مدعو"),
    from: "2013",
    to: "2016",
  },
];
