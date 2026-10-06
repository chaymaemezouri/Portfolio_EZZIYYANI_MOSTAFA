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
}

/** Numbered list for the Publications tab only. */
export const listedPublications: ListedPublication[] = [
  {
    id: "flood-forecasting-2015",
    number: 1,
    year: "2015",
    title: "New Expert System for Short, Medium and Long term Flood Forecasting and Warning",
    authors: "El Mabrouk Marouane, Ezziyyani Mostafa, SADOUQ A. Zouahir, Essaaidi Mohammad",
    venue: "Journal of Theoretical and Applied Information Technology (JATIT), Vol 75, No 1, August 2015.",
    file: "/publications/Publication00.pdf",
  },
  {
    id: "data-extraction-2015",
    number: 2,
    year: "2015",
    title: "Data Extraction for User Profile Management based on behavior",
    authors: "Cherrat Loubna, Ezziyyani Mostafa, EL Mouden Annas, Hassar Mohammed",
    venue: "Network Protocols and Algorithms Journal, ISSN 1943-3581, Vol 10, No 4, Mai 2015.",
  },
  {
    id: "realtime-collaborative-2015",
    number: 3,
    year: "2015",
    title: "Toward a New Approach For Modelling of Real Time Interactive System Based On Collaborative Decisions Network",
    authors: "Soumaya EL MAMOUNE, Ezziyyani Mostafa",
    venue: "Network Protocols and Algorithms Journal, ISSN 1943-3581, Vol 7, No 1, 2015.",
  },
  {
    id: "adaptive-learning-2014-a",
    number: 4,
    year: "2014",
    title: "Adaptive Learning",
    authors: "Soumaya El Mamoune, Mostafa Ezziyani, Marouane El Mabrouk, Loubna Cherrat, Ahmed Hadioui, Omar Kassara",
    venue: "Journal of Emerging Technologies in Web Intelligence, Vol 6, No 1 (2014), 85-88, Feb 2014.",
  },
  {
    id: "flood-dss-2013",
    number: 5,
    year: "2013",
    title: "AN ADAPTIVE INTELLIGENT DECISION SUPPORT SYSTEM FOR REAL-TIME FLOOD FORECASTING",
    authors: "El Mabrouk Marouane, Ezziyyani Mostafa, Kassara Omar, El Mamoune Soumaya, Essaaidi Mohammad, Gaou Salma and Abajja Amal",
    venue: "International Journal of Research in Computer Applications and Robotics (IJRCAR), Vol.1 Issue.7, 14-23, October 2013.",
    file: "/publications/Publication05.pdf",
  },
  {
    id: "adaptive-learning-2014-b",
    number: 6,
    year: "2014",
    title: "Adaptive Learning",
    authors: "Soumaya El Mamoune, Mostafa Ezziyani, Marouane El Mabrouk, Loubna Cherrat, Ahmed Haddioui, Omar Kassara",
    venue: "Journal of Emerging Technologies in Web Intelligence (JETWI), ISSN 1798-0461, Vol 6, No 1 (2014), 85-88, Feb 2014.",
    file: "/publications/Publication06.pdf",
  },
  {
    id: "mediators-combinatorial-2013",
    number: 7,
    year: "2013",
    title: "Optimization Query Process of Mediators Interrogation Based On Combinatorial Storage",
    authors: "L. Cherrat, M. Ezziyyani, M. Essaadi",
    venue: "International Journal of Advanced Computer Science and Applications (IJACSA), Volume 4 Issue 4, April 2013.",
    file: "/publications/Publication07.pdf",
  },
  {
    id: "query-users-profile-2012",
    number: 8,
    year: "2012",
    title: "Query optimization based on users profile",
    authors: "L. Cherrat, M. Ezziyyani, M. Essaadi",
    venue: "IEEE Special issue, Multimedia Computing and Systems International Conference, Page 706 – 712, ISBN: 978-1-4673-1518-0, DOI: 10.1109/ICMCS.2012.6320258, May 2012.",
    file: "/publications/Publication08.pdf",
  },
  {
    id: "event-graphs-2012",
    number: 9,
    year: "2012",
    title: "Research of an event process designed for event & voluminous graphs to compute customized itinerary",
    authors: "O. Kassara, M. Ezziyyani, L. Cherrat, M. Essaadi",
    venue: "Journal of E-Technology, Volume 3, Issue 3, August 2012, Pages 161-167.",
    file: "/publications/Publication09.pdf",
  },
  {
    id: "hybrid-mediator-2011",
    number: 10,
    year: "2011",
    title: "Automatic Generation of Query Order Execution Plan for Hybrid Mediator Applied to Medical Sources",
    authors: "L. Cherrat, M. Ezziyyani, M. Essaadi",
    venue: "International Journal of Information Technology and Network Application (IJITNA), ISSN: 2168-2178, Vol. 1(2):19-2, April 2011.",
    file: "/publications/Publication10.pdf",
  },
  {
    id: "semantic-cache-2008",
    number: 11,
    year: "2008",
    title: "A Quantitative Study to Evaluate the Performance of the Semantic Cache Management Methods",
    authors: "Ezziyyani Mostafa, L. Cherrat, Bennouna Mustapha, Essaaidi Mohammed",
    venue: "IEEE Journal, International Journal on Information and Communication Technologies (IJICT), 10-31, 2008.",
    file: "/publications/Publication11.pdf",
  },
  {
    id: "xml-mediator-2006",
    number: 12,
    year: "2006",
    title: "An Advanced XML Mediator for Heterogeneous Information Systems Based on Application Domain Specification",
    authors: "Mostafa Ezziyani, Mustapha Bennouna and Loubna Cherrat",
    venue: "IEEE Journal, International Journal of Computer Science & Applications Vol. 3, No. 6, June 2006.",
  },
];

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
