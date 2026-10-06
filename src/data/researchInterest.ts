import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export interface ResearchInterestAxis {
  id: string;
  shortLabel: TextValue;
  title: TextValue;
  paragraphs: TextValue[];
  bullets?: TextValue[];
  afterBullets?: TextValue[];
  steps?: TextValue[];
}

export const researchInterestIntro = [
  l10n(
    "The volume of digital data produced worldwide keeps growing. This growth raises two issues: scaling data-management approaches and ensuring interoperability. The IBDD-TC team works on these problems by proposing infrastructures suited to massive and heterogeneous data and knowledge. The focus is on data whose structure may be more or less complex, and that may be semantically heterogeneous, uncertain, incomplete and evolving. These data may come from many sources; particular attention is given to data from the web, social networks, or the environment through a sensor network. The IDHMTC team brings complementary skills in databases, distributed systems, artificial intelligence and inference systems, modelling and telecommunications, with shared interests in data and knowledge management.",
    "Le volume des données numériques produites dans le monde est en constante augmentation. Cette forte croissance soulève deux problématiques : le passage à l'échelle des approches de gestion des données et leur interopérabilité. L'équipe IBDD-TC propose de travailler sur ces problèmes en proposant des infrastructures adaptées à la gestion de données et de connaissances massives et hétérogènes. Il s'agit de s'intéresser à des données dont la structure est plus ou moins complexe et qui peuvent être sémantiquement hétérogènes, incertaines, incomplètes et évolutives. Ces données peuvent être issues de sources très variées, et nous considérerons en particulier les données issues du web ou des réseaux sociaux ou l'environnement via un réseau des capteurs. L'équipe IDHMTC rassemble des compétences complémentaires en Bases de Données, Systèmes distribué, Intelligence Artificielle et Systèmes d'Inférence, Modélisation et télécommunication dont les intérêts communs en gestion de données et de connaissances.",
    "يتزايد حجم البيانات الرقمية المنتجة في العالم باستمرار. ويطرح هذا النمو إشكاليتين: توسيع نطاق مقاربات تدبير البيانات وضمان قابلية التشغيل البيني. تقترح فرقة IBDD-TC معالجة هذه المسائل عبر بنى تحتية ملائمة لتدبير البيانات والمعارف الضخمة والمتغايرة. وينصب الاهتمام على بيانات قد تكون بنيتها أكثر أو أقل تعقيداً، وقد تكون متغايرة دلالياً وغير مؤكدة وغير مكتملة ومتغيرة. وقد تأتي هذه البيانات من مصادر متعددة، مع اهتمام خاص ببيانات الويب أو الشبكات الاجتماعية أو البيئة عبر شبكة حساسات. وتجمع فرقة IDHMTC كفاءات متكاملة في قواعد البيانات والأنظمة الموزعة والذكاء الاصطناعي وأنظمة الاستدلال والنمذجة والاتصالات، باهتمام مشترك بتدبير البيانات والمعارف.",
  ),
];

export const researchInterestAxes: ResearchInterestAxis[] = [
  {
    id: "big-data",
    shortLabel: l10n("Big Data", "Big Data", "البيانات الضخمة"),
    title: l10n(
      "Big data and heterogeneous collaborative distributed information systems",
      "Big data et systèmes d'information distribués hétérogènes et collaboratifs",
      "البيانات الضخمة وأنظمة المعلومات الموزعة المتغايرة والتعاونية",
    ),
    paragraphs: [
      l10n(
        "This axis focuses on the interoperability of heterogeneous systems (hardware, software and human) beyond the original scope of interconnecting software applications. It has become a growing field of investigation for organising enterprise systems (intra and extra) in networks for collaborative value creation, whatever the application domain (industry, health, administration, and so on). The solutions relate to the role of ICT in ensuring an information continuum (interoperability of all models) between these systems and the agents that must be made digitally interactive to secure their cooperation (quality of service). Beyond that, the axis also addresses complexity issues (design, evaluation, simulation) to control behaviour (NP-hard problems of cooperative multi-agent system control), optimisation of data use in space and time, and resilience (adaptability over time) of these systems of systems in the face of the proliferation of digital agents at every level of these organisations.",
        "Cet axe s'intéresse à l'interopérabilité des systèmes hétérogènes (matériels, logiciels et humains) et qui dépasse le cadre originel d'interconnectivité d'applications informatiques et devient un champ d'investigation croissant pour l'organisation de systèmes d'entreprise (intra et extra) en réseaux en vue d'une activité collaborative de création de valeur quelque soit le domaine d'application (industrie, santé, administration, ...). Les solutions sont liées au rôle des TIC pour assurer un continuum d'informations (interopérabilité de l'ensemble des modèles) entre ces systèmes et les agents qu'il faut rendre interactifs numériquement pour assurer leur coopération (qualité de service). Au-delà, cet axe traite aussi des problématiques de la complexité (conception, évaluation, simulation) pour en contrôler le comportement (problèmes NP-difficiles de pilotage coopératif de systèmes multi-agents), l'optimalisation de l'exploitation des données dans l'espace et dans le temps et de résilience (adaptabilité à travers le temps) de ces SoS pour faire face à la prolifération d'agents numériques à tous les niveaux de ces organisations.",
        "يهتم هذا المحور بقابلية التشغيل البيني للأنظمة المتغايرة (المادية والبرمجية والبشرية)، متجاوزاً الإطار الأصلي لربط التطبيقات الحاسوبية، ليصبح مجالاً بحثياً متنامياً لتنظيم أنظمة المؤسسات (داخلها وخارجها) في شبكات من أجل نشاط تعاوني لخلق القيمة، مهما كان مجال التطبيق (الصناعة، الصحة، الإدارة، ...). وترتبط الحلول بدور تكنولوجيا المعلومات والاتصال في ضمان استمرارية المعلومات (قابلية التشغيل البيني لمجمل النماذج) بين هذه الأنظمة والفاعلين الذين يجب جعلهم تفاعليين رقمياً لضمان تعاونهم (جودة الخدمة). وإلى ما هو أبعد من ذلك، يعالج هذا المحور أيضاً إشكاليات التعقيد (التصميم والتقييم والمحاكاة) للتحكم في السلوك (مسائل NP-صعبة للقيادة التعاونية لأنظمة متعددة الفاعلين)، وتحسين استغلال البيانات في المكان والزمان، ومرونة هذه المنظومات المركبة (التكيف عبر الزمن) لمواجهة تكاثر الفاعلين الرقميين على كل مستويات هذه المنظمات.",
      ),
    ],
  },
  {
    id: "data-mining",
    shortLabel: l10n("Data mining", "Datamining", "تنقيب البيانات"),
    title: l10n(
      "Data mining and knowledge processing",
      "Data mining et traitement de connaissances",
      "تنقيب البيانات ومعالجة المعارف",
    ),
    paragraphs: [
      l10n(
        "This axis covers data exploration and knowledge processing linked to problems such as risk analysis, heterogeneous information fusion and knowledge discovery in large databases. The following research sub-domains can be cited:",
        "Cet axe concerne l'exploration de données et traitement de connaissances liés aux problèmes tels que l'analyse du risque, la fusion d'informations hétérogènes et la découverte de connaissances sont abordés dans des bases de données de grande taille. Dont on peut citer les sous domaines de recherche :",
        "يشمل هذا المحور استكشاف البيانات ومعالجة المعارف المرتبطة بمسائل مثل تحليل المخاطر ودمج المعلومات المتغايرة واكتشاف المعارف في قواعد بيانات كبيرة الحجم. ويمكن ذكر مجالات البحث الفرعية الآتية:",
      ),
    ],
    bullets: [
      l10n(
        "Develop a unified theory in data mining",
        "Développer une théorie unifiée en Data mining",
        "تطوير نظرية موحدة في تنقيب البيانات",
      ),
      l10n(
        "Improve access to large volumes of data and to high-speed data streams",
        "Améliorer l'accès à des données volumineuses, et à des flux de données à haute vitesse ;",
        "تحسين النفاذ إلى البيانات الضخمة وتدفقات البيانات عالية السرعة؛",
      ),
      l10n(
        "Classification and decision-making",
        "Classification et prise des décisions",
        "التصنيف واتخاذ القرار",
      ),
      l10n(
        "Exploiting complex knowledge from complex data",
        "Exploitation de connaissances complexes à partir des données complexes ;",
        "استغلال معارف معقدة انطلاقاً من بيانات معقدة؛",
      ),
      l10n(
        "Exploiting data in a network environment",
        "Exploitation de données dans un environnement de réseau ;",
        "استغلال البيانات في بيئة شبكية؛",
      ),
      l10n(
        "Exploiting distributed data and multi-agent data",
        "Exploitation des données distribuées et des données multi-agent ;",
        "استغلال البيانات الموزعة وبيانات الأنظمة متعددة الفاعلين؛",
      ),
      l10n(
        "Security and confidentiality of integrated data",
        "La sécurité et confidentialité des données intégrées ;",
        "أمن وسرية البيانات المدمجة؛",
      ),
    ],
    afterBullets: [
      l10n(
        "More than a domain or a vague theory, Knowledge Discovery from Data (KDD) is above all a framework that specifies the approach for exploiting data, whatever their form, in order to extract knowledge. Five steps are distinguished:",
        "Plus qu'un domaine ou une théorie fumeuse, L'Extraction de Connaissances à partir de Données (ECD) est avant tout un cadre précisant la démarche à suivre pour exploiter les données, quelles que soient leur formes, en vue d'en extraire de la connaissance. On distingue cinq étapes :",
        "أكثر من كونه مجالاً أو نظرية غامضة، يعد استخراج المعارف من البيانات (ECD) إطاراً يوضح المنهج الواجب اتباعه لاستغلال البيانات مهما كانت أشكالها بهدف استخراج المعرفة. ويُميَّز خمس مراحل:",
      ),
    ],
    steps: [
      l10n(
        "Access to data, stored in a structured form (database, tabular files) or unstructured form (text, image, and so on)",
        "accès aux données, stockées sous une forme structurée (base de données, fichiers tabulaires) ou non-structurée (texte, image, etc.)",
        "النفاذ إلى البيانات المخزنة في شكل مهيكل (قاعدة بيانات، ملفات جدولية) أو غير مهيكل (نص، صورة، إلخ)",
      ),
      l10n(
        "Data preparation for processing",
        "la préparation des données, en vue du traitement",
        "تهيئة البيانات تمهيداً للمعالجة",
      ),
      l10n(
        "Use of data-mining techniques from statistics or machine learning",
        "l'utilisation de techniques de fouille de données, issues de la statistique ou de l'apprentissage automatique",
        "استخدام تقنيات تنقيب البيانات المستمدة من الإحصاء أو التعلم الآلي",
      ),
      l10n(
        "Evaluate and validate the extracted knowledge",
        "évaluer et valider les connaissances extraites",
        "تقييم المعارف المستخرجة والتحقق منها",
      ),
      l10n(
        "Deploy the knowledge for effective use",
        "déploiement des connaissances en vue d'une utilisation effective",
        "نشر المعارف بهدف استخدام فعلي",
      ),
    ],
  },
  {
    id: "learning",
    shortLabel: l10n("Learning systems", "Systèmes d'apprentissage", "أنظمة التعلم"),
    title: l10n(
      "Learning systems and automated reasoning",
      "Systèmes d'apprentissage et raisonnement automatique",
      "أنظمة التعلم والاستدلال الآلي",
    ),
    paragraphs: [],
  },
  {
    id: "modelling",
    shortLabel: l10n("Scientific computing", "Calculs scientifiques", "الحساب العلمي"),
    title: l10n(
      "Mathematical modelling and scientific computing",
      "Modélisation mathématique et calcul scientifique",
      "النمذجة الرياضية والحساب العلمي",
    ),
    paragraphs: [
      l10n(
        "The research activity of this axis sits in applied mathematics and its interactions, with the aim of understanding phenomena through modelling, mathematical and numerical analysis, and the definition of efficient algorithms for computer simulation. The Mathematical Modelling and Scientific Computing axis brings together work on symbolic and numerical computation. Its essential objective is to reconcile reliability and efficiency of calculations, and it develops algorithms and implementations for solving various mathematical problems on computers.",
        "Les activité de recherche de cet axe s'inscrit dans le domaine des mathématiques appliquées et de leurs interactions, avec pour objectif la compréhension des phénomènes par la modélisation, l'analyse mathématique et numérique et la définition d'algorithmes efficaces pour la simulation sur ordinateur. L'axe de Modélisation Mathématique et calcul Scientifique regroupe les activités concernant le calcul formel et le calcul numérique. Les activités de recherche de cet axe ont pour objectif essentiel de concilier fiabilité et efficacité des calculs et il développe des algorithmes et des implantations pour la résolution sur ordinateurs de divers problèmes mathématiques.",
        "تندرج أنشطة البحث في هذا المحور ضمن الرياضيات التطبيقية وتفاعلاتها، بهدف فهم الظواهر عبر النمذجة والتحليل الرياضي والعددي وتعريف خوارزميات فعالة للمحاكاة على الحاسوب. ويجمع محور النمذجة الرياضية والحساب العلمي الأنشطة المتعلقة بالحساب الرمزي والعددي. وتهدف أنشطة البحث أساساً إلى التوفيق بين موثوقية الحسابات وفعاليتها، ويطور خوارزميات وتنفيذات لحل مسائل رياضية متنوعة على الحواسيب.",
      ),
      l10n(
        "In this context, the objective is the design and implementation of exact algorithms for solving polynomial systems. Among the application domains are the engineering sciences.",
        "Dans ce contexte, l'objectif est la conception et l'implantation d'algorithmes exacts pour la résolution des systèmes polynomiaux. Parmi les domaines d'application, on peut citer les sciences de l'ingénieur.",
        "في هذا السياق، يتمثل الهدف في تصميم وتنفيذ خوارزميات دقيقة لحل الأنظمة متعددة الحدود. ومن بين مجالات التطبيق علوم الهندسة.",
      ),
    ],
  },
  {
    id: "realtime",
    shortLabel: l10n("Real-time systems", "Système temps réel", "الأنظمة الزمنية الحقيقية"),
    title: l10n(
      "Real-time data processing and communication (sensor networks)",
      "Traitement et communication de données en temps réel (réseau des senseurs)",
      "معالجة البيانات والتواصل في الزمن الحقيقي (شبكة الحساسات)",
    ),
    paragraphs: [
      l10n(
        "This research axis centres on real-time data processing and communication. Data acquired by a sensor or by an interconnected sensor network that feeds itself through an acquisition chain can be processed immediately by a real-time system and finally delivered to the user or stored for later use.",
        "C'est un axe de recherche qui s'articule sur le traitement et communication de données en temps réel, ces données acquis par un capteur ou un réseau de capteurs interconnectés et s'alimentant l'un l'autre par le biais d'une chaine d'acquisition, elles peuvent être traités immédiatement par un système temps réel et, finalement, remises à l'utilisateur ou les stocker pour les utiliser ultérieurement.",
        "هذا محور بحث يتمحور حول معالجة البيانات والتواصل في الزمن الحقيقي؛ هذه البيانات المكتسبة عبر حساس أو شبكة حساسات مترابطة تتغذى بعضها من بعض عبر سلسلة اكتساب يمكن معالجتها فوراً بنظام زمن حقيقي، ثم تسليمها للمستخدم أو تخزينها لاستخدامها لاحقاً.",
      ),
      l10n(
        "The research themes concern algebraic models for communicating and real-time systems. The targeted domains are mobile systems and parallel languages. Researchers in this axis are interested in the specification, validation and application of these theoretical models. A convergence toward a security and dependability approach is also strongly encouraged within the team. The theoretical tools range from process algebra to the semantics of concurrent languages.",
        "Les thèmes de recherche concernent les modèles algébriques pour systèmes communicants et temps réel. Les domaines visés sont les systèmes mobiles et les langages parallèles. Les chercheur de cet axe s'intéressent aussi bien à la spécification, à la validation qu'à l'application de ces modèles théoriques. Une convergence vers une approche sécurité/sûreté de fonctionnement est également fortement incitée au sein de cette équipe. Les outils théoriques manipulés vont de l'algèbre de processus, à la sémantique des langages concurrents.",
        "تتعلق محاور البحث بالنماذج الجبرية للأنظمة التواصلية والزمنية الحقيقية. والمجالات المستهدفة هي الأنظمة المتنقلة واللغات المتوازية. ويهتم باحثو هذا المحور بالتخصيص والتحقق وتطبيق هذه النماذج النظرية. كما يُشجَّع بقوة التقارب نحو مقاربة الأمن/سلامة التشغيل داخل الفريق. وتمتد الأدوات النظرية من جبر العمليات إلى دلالات اللغات المتزامنة.",
      ),
    ],
  },
];
