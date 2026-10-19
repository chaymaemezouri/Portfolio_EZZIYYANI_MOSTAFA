import { l10n } from "@/utils/text";
import type { TextValue } from "@/types";

export type CourseResourceKind = "support" | "ppt" | "td" | "tp" | "project" | "homework";

export type CourseResource = {
  kind: CourseResourceKind;
  title: string;
  href?: string;
};

export type Course = {
  id: string;
  title: string;
  level?: string;
  resources?: CourseResource[];
};

export type Pfe = {
  id: string;
  title: string;
  student?: string;
  year?: string;
  href?: string;
};

export type Visit = {
  id: string;
  title: string;
  place?: string;
  date?: string;
  program?: TextValue;
  summary?: TextValue;
  photos?: string[];
};

export const resourceKinds: CourseResourceKind[] = ["support", "ppt", "td", "tp", "project", "homework"];

export const courses: Course[] = [
  {
    id: "merise",
    title: "Merise",
    level: "Licence / Master",
    resources: [{ kind: "support", title: "Support de cours", href: "/support-cours/merise-cours.doc" }],
  },
  {
    id: "uml",
    title: "UML",
    level: "Licence / Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/uml-ppt.ppt" }],
  },
  {
    id: "bdd",
    title: "Bases de données (BD)",
    level: "Licence",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/bdd-ppt.pptx" }],
  },
  {
    id: "bdda",
    title: "Bases de données avancées",
    level: "Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/bdda-ppt.pptx" }],
  },
  {
    id: "pc",
    title: "Programmation en C",
    level: "Licence",
    resources: [{ kind: "ppt", title: "Support / PPT", href: "/support-cours/pc-cours.ppt" }],
  },
  {
    id: "pcpp",
    title: "Programmation en C++",
    level: "Licence",
    resources: [{ kind: "support", title: "Support de cours", href: "/support-cours/pcpp-cours.doc" }],
  },
  {
    id: "pj",
    title: "Programmation en Java",
    level: "Licence / Master",
    resources: [{ kind: "ppt", title: "POO — Présentation PPT", href: "/support-cours/pj-poo-ppt.ppt" }],
  },
  { id: "pp", title: "Programmation en Python", level: "Licence / Master", resources: [] },
  {
    id: "pr",
    title: "Programmation en R",
    level: "Master",
    resources: [{ kind: "tp", title: "TP — Langage R", href: "/support-cours/pr-tp.pdf" }],
  },
  {
    id: "dm",
    title: "Data Mining",
    level: "Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/dm-ppt.pptx" }],
  },
  {
    id: "ma",
    title: "Machine Learning",
    level: "Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/ma-ppt.pptx" }],
  },
  {
    id: "ia",
    title: "Intelligence Artificielle (IA)",
    level: "Master",
    resources: [{ kind: "tp", title: "TP — Réseaux de neurones (RNN)", href: "/support-cours/ia-tp-rnn.docx" }],
  },
  {
    id: "bi",
    title: "Business Intelligence",
    level: "Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/bi-ppt.pptx" }],
  },
  {
    id: "dw",
    title: "Entrepôt de données (Data Warehouse)",
    level: "Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/dw-ppt.ppt" }],
  },
  {
    id: "access",
    title: "Access",
    level: "Licence",
    resources: [{ kind: "support", title: "Support de cours", href: "/support-cours/access-cours.doc" }],
  },
  {
    id: "ss",
    title: "SQL Server",
    level: "Licence / Master",
    resources: [{ kind: "support", title: "Support de cours", href: "/support-cours/ss-cours.doc" }],
  },
  {
    id: "oracle",
    title: "Oracle",
    level: "Master",
    resources: [{ kind: "ppt", title: "Présentation PPT", href: "/support-cours/oracle-ppt.pptx" }],
  },
];

export const pfeMaster: Pfe[] = [];

export const pfeLicence: Pfe[] = [];

export const visits: Visit[] = [
  {
    id: "yazaki-1",
    title: "Visite Yazaki",
    place: "Yazaki — Tanger",
    date: "",
    program: l10n(
      "Master’s Program in Artificial Intelligence and Data Science — FSTT",
      "Master Intelligence Artificielle et Science des Données — FSTT",
      "ماستر الذكاء الاصطناعي وعلوم البيانات — الكلية متعددة التخصصات بطنجة",
    ),
    summary: l10n(
      "As part of the activities of the Master’s Program in Artificial Intelligence and Data Science at the Faculty of Sciences and Techniques of Tangier (FSTT), we had the honor of conducting a visit to the multinational company Yazaki. This excellent visit allowed our students to discover the realities of the industrial world, explore the technologies used, and better understand the requirements of the socio-economic sector. Our sincere thanks go to the Yazaki staff for their warm welcome, availability, and the quality of the exchanges. We also extend our deep gratitude to FSTT, particularly to the Dean and the entire administrative staff, for their continuous support, guidance, and commitment to strengthening the university’s openness to its socio-economic environment.",
      "Dans le cadre des activités du Master Intelligence Artificielle et Science des Données de la Faculté des Sciences et Techniques de Tanger (FSTT), nous avons eu l’honneur d’effectuer une visite à l’entreprise multinationale Yazaki. Cette excellente visite a permis à nos étudiants de découvrir les réalités du monde industriel, d’explorer les technologies utilisées et de mieux comprendre les exigences du secteur socio-économique. Nos sincères remerciements vont au personnel de Yazaki pour leur accueil chaleureux, leur disponibilité et la qualité des échanges. Nous adressons également notre profonde gratitude à la FSTT, en particulier au Doyen et à l’ensemble du personnel administratif, pour leur soutien continu, leur accompagnement et leur engagement à renforcer l’ouverture de l’université sur son environnement socio-économique.",
      "في إطار أنشطة ماستر الذكاء الاصطناعي وعلوم البيانات بكلية العلوم والتقنيات بطنجة، تشرفنا بزيارة شركة يازاكي متعددة الجنسيات. أتاحت هذه الزيارة المتميزة لطلبتنا اكتشاف واقع العالم الصناعي واستكشاف التقنيات المستخدمة وفهم متطلبات القطاع السوسيو-اقتصادي بشكل أفضل. نتقدم بخالص الشكر لموظفي يازاكي على حسن الاستقبال والتوفر وجودة التبادل. كما نعرب عن امتناننا العميق لكلية العلوم والتقنيات بطنجة، وخاصة للعميد وكافة الطاقم الإداري، على دعمهم المتواصل وتوجيههم والتزامهم بتعزيز انفتاح الجامعة على محيطها السوسيو-اقتصادي.",
    ),
    photos: [
      "/visits/yazaki/photo-01.jpg",
      "/visits/yazaki/photo-02.jpg",
      "/visits/yazaki/photo-03.jpg",
      "/visits/yazaki/photo-04.png",
      "/visits/yazaki/photo-05.jpg",
      "/visits/yazaki/photo-06.jpg",
      "/visits/yazaki/photo-07.jpg",
      "/visits/yazaki/photo-08.jpg",
      "/visits/yazaki/photo-09.jpg",
      "/visits/yazaki/photo-10.jpg",
    ],
  },
  {
    id: "tanger-med-1",
    title: "Visite Port Med — Tanger",
    place: "Tanger Med Port",
    date: "",
    program: l10n(
      "Master IASD (Artificial Intelligence and Data Science)",
      "Master IASD (Intelligence Artificielle et Science des Données)",
      "ماستر IASD (الذكاء الاصطناعي وعلوم البيانات)",
    ),
    summary: l10n(
      "I am delighted to share the success of the recent visit by my students from the Master IASD (Artificial Intelligence and Data Science) program to the largest international port, Port Med-Tangier. This enriching excursion was a true immersion into the world of digital industry. A big thank you to all the participants for their enthusiasm and commitment. Together, we explored the intricate workings of the digital unit and discovered the latest innovations shaping the future of the port.",
      "Je suis ravi de partager le succès de la récente visite de mes étudiants du Master IASD (Intelligence Artificielle et Science des Données) au plus grand port international, Port Med — Tanger. Cette excursion enrichissante a été une véritable immersion dans le monde de l’industrie numérique. Un grand merci à tous les participants pour leur enthousiasme et leur engagement. Ensemble, nous avons exploré le fonctionnement de l’unité digitale et découvert les dernières innovations qui façonnent l’avenir du port.",
      "يسعدني أن أشارككم نجاح الزيارة الأخيرة لطلبة ماستر IASD (الذكاء الاصطناعي وعلوم البيانات) إلى أكبر ميناء دولي، ميناء طنجة المتوسط. كانت هذه الرحلة الثرية انغماساً حقيقياً في عالم الصناعة الرقمية. شكر كبير لجميع المشاركين على حماسهم والتزامهم. معاً استكشفنا آليات الوحدة الرقمية واكتشفنا أحدث الابتكارات التي تصنع مستقبل الميناء.",
    ),
    photos: [
      "/visits/tanger-med/photo-08.jpg",
      "/visits/tanger-med/photo-07.jpg",
      "/visits/tanger-med/photo-06.jpg",
      "/visits/tanger-med/photo-05.jpg",
      "/visits/tanger-med/photo-01.jpg",
      "/visits/tanger-med/photo-02.png",
      "/visits/tanger-med/photo-03.png",
      "/visits/tanger-med/photo-04.png",
      "/visits/tanger-med/photo-09.jpg",
    ],
  },
];
