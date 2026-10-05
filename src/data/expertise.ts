import type { ExpertiseDomain } from "@/types";
import { l10n } from "@/utils/text";

export const expertiseDomains: ExpertiseDomain[] = [
  {
    id: "aiData",
    summary: l10n(
      "Artificial intelligence, predictive and generative AI, data science, big-data analysis and data engineering.",
      "Intelligence artificielle, IA prédictive et générative, science des données, analyse des données massives et ingénierie des données.",
      "الذكاء الاصطناعي التنبؤي والتوليدي، وعلوم البيانات، وتحليل البيانات الضخمة، وهندسة البيانات.",
    ),
    points: [
      l10n(
        "Artificial intelligence and machine learning.",
        "Intelligence artificielle et apprentissage automatique.",
        "الذكاء الاصطناعي والتعلم الآلي.",
      ),
      l10n(
        "Generative artificial intelligence.",
        "Intelligence artificielle générative.",
        "الذكاء الاصطناعي التوليدي.",
      ),
      l10n(
        "Data science and big-data analysis.",
        "Science des données et analyse des données massives.",
        "علوم البيانات وتحليل البيانات الضخمة.",
      ),
      l10n(
        "Data engineering and predictive analysis.",
        "Ingénierie des données et analyse prédictive.",
        "هندسة البيانات والتحليل التنبؤي.",
      ),
      l10n(
        "IBM Certified Big Data Specialist.",
        "IBM Certified Big Data Specialist.",
        "IBM Certified Big Data Specialist.",
      ),
      l10n(
        "Certificate in multi-agent systems and AI applications.",
        "Certificat en systèmes multi-agents et applications de l'IA.",
        "شهادة في الأنظمة متعددة الوكلاء وتطبيقات الذكاء الاصطناعي.",
      ),
      l10n(
        "Published work cited in big-data governance and in predictive and generative artificial intelligence.",
        "Travaux publiés servant de référence en gouvernance des données massives et en intelligence artificielle prédictive et générative.",
        "بحوث منشورة تُعد مراجع في حكامة البيانات الضخمة والذكاء الاصطناعي التنبؤي والتوليدي.",
      ),
    ],
  },
  {
    id: "cyber",
    summary: l10n(
      "Cybersecurity, digital forensics, data protection and the interpretation of digital evidence.",
      "Cybersécurité, investigation numérique, protection des données et interprétation de la preuve numérique.",
      "الأمن السيبراني، والتحليل الجنائي الرقمي، وحماية البيانات، وتفسير الأدلة الرقمية.",
    ),
    points: [
      l10n(
        "Cybersecurity and protection of digital data.",
        "Cybersécurité et protection des données numériques.",
        "الأمن السيبراني وحماية البيانات الرقمية.",
      ),
      l10n(
        "Analysis of information systems and assessment of digital risk.",
        "Analyse des systèmes d'information et étude des risques numériques.",
        "تحليل الأنظمة المعلوماتية ودراسة المخاطر الرقمية.",
      ),
      l10n(
        "Analysis and interpretation of big data and of electronic evidence.",
        "Analyse et interprétation des données massives et des preuves numériques.",
        "تحليل وتفسير البيانات الضخمة والأدلة الرقمية.",
      ),
      l10n(
        "Sworn expert before the criminal courts in cybercrime, cybersecurity and digital evidence.",
        "Expert assermenté auprès des juridictions pénales en cybercriminalité, cybersécurité et preuve numérique.",
        "خبير محلف لدى المحاكم الجنائية في الجرائم الإلكترونية والأمن السيبراني والدليل الرقمي.",
      ),
      l10n(
        "National positioning in post-quantum cryptography, as president of the Moroccan Quantum Computing Cluster.",
        "Positionnement national en cryptographie post-quantique, en qualité de président du Moroccan Quantum Computing Cluster.",
        "تموقع وطني في التشفير المقاوم للحوسبة الكمومية، بصفته رئيساً للتكتل المغربي للحوسبة الكمومية.",
      ),
    ],
  },
  {
    id: "transformation",
    summary: l10n(
      "Digital transformation, digital governance and digital sovereignty.",
      "Transformation numérique, gouvernance numérique et souveraineté numérique.",
      "التحول الرقمي، والحكامة الرقمية، والسيادة الرقمية.",
    ),
    points: [
      l10n(
        "Digital transformation, digital governance and digital sovereignty.",
        "Transformation numérique, gouvernance numérique et souveraineté numérique.",
        "التحول الرقمي والحكامة الرقمية والسيادة الرقمية.",
      ),
      l10n(
        "Design of platforms and intelligent applications, from needs analysis through deployment, evaluation and continuous improvement.",
        "Conception de plateformes et d'applications intelligentes, de l'analyse des besoins jusqu'au déploiement, à l'évaluation et à l'amélioration continue.",
        "تصميم المنصات والتطبيقات الذكية، من تحليل الاحتياجات إلى التشغيل والتقييم والتحسين المستمر.",
      ),
      l10n(
        "Evaluation and review of research, innovation and technology projects submitted for funding.",
        "Évaluation et arbitrage de projets de recherche, d'innovation et de technologie destinés au financement.",
        "تقييم وتحكيم مشاريع البحث والابتكار والتكنولوجيا الموجهة للتمويل.",
      ),
      l10n(
        "Keynote lectures on digital governance, technological sovereignty and generative artificial intelligence.",
        "Conférences inaugurales sur la gouvernance numérique, la souveraineté technologique et l'intelligence artificielle générative.",
        "محاضرات افتتاحية في الحكامة الرقمية والسيادة التكنولوجية والذكاء الاصطناعي التوليدي.",
      ),
      l10n(
        "Author of the strategic framework for digital transformation and artificial intelligence, 2027–2030.",
        "Auteur du cadre stratégique pour la transformation numérique et l'intelligence artificielle, 2027–2030.",
        "معدّ الإطار الاستراتيجي للتحول الرقمي والذكاء الاصطناعي، 2027–2030.",
      ),
      l10n(
        "Scientific and technological diplomacy, and digital sovereignty.",
        "Diplomatie scientifique et technologique, et souveraineté numérique.",
        "الدبلوماسية العلمية والتكنولوجية، والسيادة الرقمية.",
      ),
    ],
  },
  {
    id: "systems",
    summary: l10n(
      "Intelligent systems and environments, the Internet of Things and digital twins.",
      "Systèmes et environnements intelligents, Internet des objets et jumeaux numériques.",
      "الأنظمة والبيئات الذكية، وإنترنت الأشياء، والتوائم الرقمية.",
    ),
    points: [
      l10n(
        "Internet of Things, intelligent environments and intelligent systems.",
        "Internet des objets, environnements et systèmes intelligents.",
        "إنترنت الأشياء والبيئات والأنظمة الذكية.",
      ),
      l10n(
        "Intelligent systems and decision-support systems.",
        "Systèmes intelligents et systèmes d'aide à la décision.",
        "الأنظمة الذكية وأنظمة دعم القرار.",
      ),
      l10n(
        "Digital-twin systems.",
        "Systèmes de jumeaux numériques.",
        "الأنظمة التوأمية الرقمية.",
      ),
      l10n(
        "First place worldwide, ITU, Geneva 2018, in the smart-environment category.",
        "Premier rang mondial, UIT, Genève 2018, dans la catégorie des environnements intelligents.",
        "المرتبة الأولى عالمياً، الاتحاد الدولي للاتصالات، جنيف 2018، في فئة البيئات الذكية.",
      ),
      l10n(
        "General chair of the AI2SD international conference on intelligent systems for sustainable development.",
        "Président général de la conférence internationale AI2SD sur les systèmes intelligents pour le développement durable.",
        "الرئيس العام للمؤتمر الدولي AI2SD حول الأنظمة الذكية للتنمية المستدامة.",
      ),
      l10n(
        "Registered patents in intelligent systems.",
        "Brevets enregistrés dans les systèmes intelligents.",
        "براءات اختراع مسجلة في الأنظمة الذكية.",
      ),
    ],
  },
  {
    id: "infrastructure",
    summary: l10n(
      "Distributed systems, software engineering, databases, data warehouses and cloud computing.",
      "Systèmes distribués, génie logiciel, bases et entrepôts de données, et informatique en nuage.",
      "الأنظمة الموزعة، وهندسة البرمجيات، وقواعد البيانات ومستودعاتها، والحوسبة السحابية.",
    ),
    points: [
      l10n(
        "Distributed systems and systems integration.",
        "Systèmes distribués et intégration des systèmes.",
        "الأنظمة الموزعة وتكامل الأنظمة.",
      ),
      l10n(
        "Databases and data warehouses.",
        "Bases de données et entrepôts de données.",
        "قواعد البيانات ومستودعات البيانات.",
      ),
      l10n(
        "Software engineering, programming and the intelligent web.",
        "Génie logiciel, programmation et web intelligent.",
        "هندسة البرمجيات والبرمجة والويب الذكي.",
      ),
      l10n(
        "Cloud computing.",
        "Informatique en nuage.",
        "الحوسبة السحابية.",
      ),
      l10n(
        "Doctorate in distributed systems and web technologies (1999), and State doctorate in heterogeneous information-systems engineering (2006).",
        "Doctorat en systèmes distribués et technologies du web (1999), et doctorat d'État en ingénierie des systèmes d'information hétérogènes (2006).",
        "دكتوراه في الأنظمة الموزعة وتقنيات الويب (1999)، ودكتوراه الدولة في هندسة نظم المعلومات غير المتجانسة (2006).",
      ),
      l10n(
        "Oracle Database Administration (DBA) professional certificate.",
        "Certificat professionnel Oracle Database Administration (DBA).",
        "شهادة احترافية في إدارة قواعد بيانات أوراكل (DBA).",
      ),
      l10n(
        "ArcGIS certificate in advanced spatial analysis.",
        "Certificat ArcGIS en analyse spatiale avancée.",
        "شهادة ArcGIS في التحليل المجالي المتقدم.",
      ),
    ],
  },
  {
    id: "transfer",
    summary: l10n(
      "Innovation, technology transfer and the valorisation of scientific research.",
      "Innovation, transfert de technologie et valorisation des résultats de la recherche.",
      "الابتكار، ونقل التكنولوجيا، وتثمين نتائج البحث العلمي.",
    ),
    points: [
      l10n(
        "Innovation and technology transfer.",
        "Innovation et transfert de technologie.",
        "الابتكار ونقل التكنولوجيا.",
      ),
      l10n(
        "Valorisation of scientific research results.",
        "Valorisation des résultats de la recherche scientifique.",
        "تثمين نتائج البحث العلمي.",
      ),
      l10n(
        "President of the Innovation and Technology Transfer Organization.",
        "Président de l'Organisation de l'innovation et du transfert de technologie.",
        "رئيس منظمة الابتكار ونقل التكنولوجيا.",
      ),
      l10n(
        "Registered patents in technology and software, and the passage from a research idea to an applicable solution.",
        "Brevets enregistrés en technologies et en logiciels, et passage de l'idée de recherche à une solution applicable.",
        "براءات اختراع مسجلة في التكنولوجيا والبرمجيات، وتحويل الفكرة البحثية إلى حل قابل للتطبيق.",
      ),
      l10n(
        "More than 10 multiparty research projects, with a focus on technology transfer and the localisation of digital knowledge.",
        "Plus de 10 projets de recherche multipartites, centrés sur le transfert de technologie et la localisation du savoir numérique.",
        "أكثر من 10 مشاريع بحثية متعددة الأطراف، مع تركيز على نقل التكنولوجيا وتوطين المعرفة الرقمية.",
      ),
    ],
  },
];
