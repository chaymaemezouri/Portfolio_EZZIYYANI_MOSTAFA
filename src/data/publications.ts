import type { Publication, TextValue } from "@/types";
import { l10n } from "@/utils/text";

/** Kept empty so the homepage research section stays on the corpus summary. */
export const publications: Publication[] = [];

export interface ListedPublication {
  id: string;
  number: number;
  year: string;
  title: string;
  authors: string;
  venue: string;
  file?: string;
  url?: string;
}

/** Numbered list for the Publications tab only. Generated from the supplied bibliography. */
export { listedPublications } from "./listedPublications";

/** The CV states the volume and the fields. It does not list individual papers. */
export const researchIntro = [
  l10n(
    "The research record covers more than three decades. Since 1990 it has contributed to the early foundations of intelligent systems, advanced algorithms and software engineering.",
    "L'expérience de recherche couvre plus de trois décennies. Depuis 1990, elle contribue aux premières bases des systèmes intelligents, des algorithmes avancés et de l'ingénierie logicielle.",
    "تمتد الخبرة البحثية لأكثر من ثلاثة عقود. ومنذ سنة 1990 تساهم في وضع اللبنات الأولى للأنظمة الذكية والخوارزميات المتقدمة وهندسة البرمجيات.",
  ),
  l10n(
    "More than 200 papers and studies have appeared in peer-reviewed journals and international conferences. They are used as references in distributed systems, big-data governance, and predictive and generative artificial intelligence.",
    "Plus de 200 articles et études ont paru dans des revues à comité de lecture et des conférences internationales. Ils servent de référence en systèmes distribués, en gouvernance des données massives et en intelligence artificielle prédictive et générative.",
    "يضم الرصيد أكثر من 200 بحث ودراسة في مجلات علمية محكمة ومؤتمرات دولية. وتُعد هذه الأعمال مراجع في الأنظمة الموزعة وحكامة البيانات الضخمة والذكاء الاصطناعي التنبؤي والتوليدي.",
  ),
];

export const researchCorpus = {
  title: l10n(
    "More than 200 papers and studies",
    "Plus de 200 articles et études",
    "أكثر من 200 بحث ودراسة",
  ),
  detail: l10n(
    "Reference work in peer-reviewed journals and international conferences, from the beginning of the digital period in 1990.",
    "Travaux de référence dans des revues à comité de lecture et des conférences internationales, depuis les débuts de l'ère numérique en 1990.",
    "أعمال مرجعية في مجلات محكمة ومؤتمرات دولية، منذ بدايات العصر الرقمي سنة 1990.",
  ),
};

export const researchLines: Array<{ id: string; label: TextValue; detail: TextValue }> = [
  {
    id: "distributed",
    label: l10n("Distributed systems", "Systèmes distribués", "الأنظمة الموزعة"),
    detail: l10n(
      "A core field of the published record, with the 1999 doctorate and later patents on distributed operating systems.",
      "Axe central du corpus publié, avec le doctorat de 1999 et des brevets ultérieurs sur les systèmes d'exploitation distribués.",
      "مجال أساسي في الإنتاج المنشور، مع دكتوراه 1999 وبراءات لاحقة في نظم التشغيل الموزعة.",
    ),
  },
  {
    id: "data",
    label: l10n("Big-data governance", "Gouvernance des données massives", "حكامة البيانات الضخمة"),
    detail: l10n(
      "Published work used as a reference in big-data governance.",
      "Travaux publiés qui servent de référence en gouvernance des données massives.",
      "بحوث منشورة تُعد مراجع في حكامة البيانات الضخمة.",
    ),
  },
  {
    id: "ai",
    label: l10n(
      "Predictive and generative artificial intelligence",
      "Intelligence artificielle prédictive et générative",
      "الذكاء الاصطناعي التنبؤي والتوليدي",
    ),
    detail: l10n(
      "Published work used as a reference in predictive and generative artificial intelligence.",
      "Travaux publiés qui servent de référence en intelligence artificielle prédictive et générative.",
      "بحوث منشورة تُعد مراجع في الذكاء الاصطناعي التنبؤي والتوليدي.",
    ),
  },
  {
    id: "patents",
    label: l10n("Patents", "Brevets", "براءات الاختراع"),
    detail: l10n(
      "Software efficiency of algorithms, distributed operating systems, and secure digital solutions for institutions, industry and education.",
      "Efficacité logicielle des algorithmes, systèmes d'exploitation distribués, et solutions numériques sécurisées pour les institutions, l'industrie et l'éducation.",
      "الكفاءة البرمجية للخوارزميات، ونظم التشغيل الموزعة، والحلول الرقمية الآمنة للمؤسسات والقطاعات الصناعية والتعليمية.",
    ),
  },
  {
    id: "projects",
    label: l10n(
      "Cross-border research projects",
      "Projets de recherche transfrontaliers",
      "مشاريع بحثية عابرة للحدود",
    ),
    detail: l10n(
      "More than 10 strategic projects led or co-led with the European Union, the Ministry of Higher Education and international organisations, with an emphasis on technology transfer.",
      "Plus de 10 projets stratégiques dirigés ou codirigés avec l'Union européenne, le ministère de l'Enseignement supérieur et des organisations internationales, avec un accent sur le transfert de technologie.",
      "أكثر من 10 مشاريع استراتيجية أُديرت أو شارك في إدارتها مع الاتحاد الأوروبي ووزارة التعليم العالي ومنظمات دولية، مع تركيز على نقل التكنولوجيا.",
    ),
  },
  {
    id: "supervision",
    label: l10n("Research supervision", "Encadrement de la recherche", "تأطير البحث"),
    detail: l10n(
      "More than 350 doctoral theses, master's dissertations and strategic projects supervised, within a research school built around innovation.",
      "Plus de 350 thèses de doctorat, mémoires de master et projets stratégiques encadrés, au sein d'une école de recherche fondée sur l'innovation.",
      "الإشراف على أكثر من 350 أطروحة دكتوراه ورسالة ماجستير ومشروعاً استراتيجياً، ضمن مدرسة بحثية قائمة على الابتكار.",
    ),
  },
];

export const publicationFilters = [
  "all",
  "ai",
  "data",
  "cybersecurity",
  "distributed",
  "smart",
  "transformation",
] as const;

export type PublicationFilter = (typeof publicationFilters)[number];
