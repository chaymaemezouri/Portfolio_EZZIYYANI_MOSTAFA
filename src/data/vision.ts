import type { StrategicDocument, StrategicPrinciple, VisionTheme } from "@/types";
import { l10n } from "@/utils/text";

export const visionThemes: VisionTheme[] = [
  {
    id: "transformation",
    statement: l10n(
      "The proposed vision moves from digitizing services to re-engineering the digital state, and from launching strategies to delivery, measurement and impact.",
      "La vision proposée passe de la numérisation des services à la réingénierie de l'État numérique, et du lancement des stratégies à la réalisation, à la mesure et à l'impact.",
      "تقترح هذه الوثيقة الانتقال من رقمنة الخدمات إلى إعادة هندسة الدولة الرقمية، ومن منطق إطلاق الاستراتيجيات والمشاريع إلى منطق الإنجاز والقياس والأثر.",
    ),
    image: "",
  },
  {
    id: "aiStrategy",
    statement: l10n(
      "Morocco has entered a new stage through Morocco Digital 2030 and the Morocco AI 2030 roadmap. The next step is a national system for artificial intelligence, not scattered experiments.",
      "Le Maroc est entré dans une nouvelle étape avec Maroc Digital 2030 et la feuille de route Maroc IA 2030. L'étape suivante est une organisation nationale de l'intelligence artificielle, et non des expériences dispersées.",
      "دخل المغرب مرحلة جديدة من خلال استراتيجية «المغرب الرقمي 2030» وخارطة طريق «المغرب للذكاء الاصطناعي 2030». وتتمثل الأولوية في الانتقال من التجارب المتفرقة إلى منظومة وطنية للذكاء الاصطناعي.",
    ),
    image: "",
  },
  {
    id: "sovereignty",
    statement: l10n(
      "Digital sovereignty is not achieved by excluding foreign technology. It is achieved by building the capacity to choose, develop, negotiate and use technology securely.",
      "La souveraineté numérique ne s'obtient pas en excluant la technologie étrangère. Elle s'obtient en construisant la capacité de choisir, de développer, de négocier et d'utiliser la technologie en sécurité.",
      "فالسيادة الرقمية لا تتحقق بمنع التكنولوجيا الأجنبية، وإنما ببناء القدرات التي تمنح الدولة والمجتمع والاقتصاد القدرة على الاختيار والتطوير والتفاوض والاستعمال الآمن للتكنولوجيا.",
    ),
    image: "",
  },
  {
    id: "dataEcosystems",
    statement: l10n(
      "Data is the foundation of the digital economy and of artificial intelligence. It should be treated as a strategic asset that requires governance, investment and protection.",
      "Les données sont le fondement de l'économie numérique et de l'intelligence artificielle. Elles doivent être traitées comme un actif stratégique qui exige gouvernance, investissement et protection.",
      "تشكل البيانات الأساس الذي يقوم عليه الاقتصاد الرقمي والذكاء الاصطناعي. وينبغي الانتقال من التعامل معها باعتبارها مخرجات ثانوية إلى اعتبارها أصلاً استراتيجياً يحتاج إلى حوكمة واستثمار وحماية.",
    ),
    image: "",
  },
  {
    id: "responsibleAi",
    statement: l10n(
      "Artificial intelligence applications should remain subject to transparency, security, data protection and human oversight, especially when decisions can affect citizens' rights.",
      "Les applications de l'intelligence artificielle doivent rester soumises à la transparence, à la sécurité, à la protection des données et à la supervision humaine, surtout lorsque les décisions peuvent affecter les droits des citoyens.",
      "ينبغي أن تخضع تطبيقات الذكاء الاصطناعي دائماً لمبادئ الشفافية والأمن وحماية البيانات والإشراف البشري، خصوصاً عندما يتعلق الأمر بقرارات قد يكون لها أثر مباشر على حقوق المواطنين.",
    ),
    image: "",
  },
  {
    id: "cybersecurity",
    statement: l10n(
      "National digital sovereignty includes cybersecurity, strategic data, digital identity, data centres and the ability to secure infrastructure and continuity of services.",
      "La souveraineté numérique nationale comprend la cybersécurité, les données stratégiques, l'identité numérique, les centres de données et la capacité de sécuriser les infrastructures et la continuité des services.",
      "تشمل السيادة الرقمية البنية التحتية ومراكز البيانات والحوسبة السحابية والهوية الرقمية والبيانات الاستراتيجية والأمن السيبراني والقدرة على تأمين البنيات التحتية وضمان استمرارية الخدمات.",
    ),
    image: "",
  },
  {
    id: "researchInnovation",
    statement: l10n(
      "A national path should connect the university, public administration, enterprise and investors, from a defined national need through applied research, proof of concept, real-world testing, intellectual property and the market.",
      "Un parcours national doit relier l'université, l'administration, l'entreprise et les investisseurs, depuis un besoin national identifié jusqu'au marché, en passant par la recherche appliquée, la preuve de concept, l'expérimentation réelle et la propriété intellectuelle.",
      "ينبغي بناء مسار وطني واضح يربط الجامعة بالإدارة والمقاولة والمستثمر، ابتداءً من تحديد الحاجة الوطنية، مروراً بالبحث التطبيقي وإثبات المفهوم والتجريب في بيئة حقيقية وحماية الملكية الفكرية، وصولاً إلى السوق.",
    ),
    image: "",
  },
  {
    id: "diplomacy",
    statement: l10n(
      "Scientific and technological diplomacy should make universities, research centres, engineers and technology companies part of Morocco's international presence, through joint laboratories, shared projects and the exchange of expertise.",
      "La diplomatie scientifique et technologique doit faire des universités, des centres de recherche, des ingénieurs et des entreprises technologiques une part de la présence internationale du Maroc, par des laboratoires communs, des projets partagés et l'échange d'expertise.",
      "ينبغي تطوير مقاربة وطنية للدبلوماسية العلمية والتكنولوجية تجعل الجامعات ومراكز البحث والمهندسين والمقاولات التكنولوجية جزءاً من الحضور الدولي للمغرب، عبر مختبرات مشتركة ومشاريع مشتركة وتبادل للكفاءات.",
    ),
    image: "",
  },
  {
    id: "knowledgeEconomy",
    statement: l10n(
      "The aim is not only a more digitized Morocco, but a country more able to produce knowledge and technology, serve citizens, compete economically and act with greater technological independence.",
      "L'objectif n'est pas seulement un Maroc plus numérisé, mais un pays plus capable de produire la connaissance et la technologie, de servir les citoyens, de concourir économiquement et d'agir avec une plus grande indépendance technologique.",
      "والغاية النهائية ليست أن يصبح المغرب أكثر رقمنة فحسب، وإنما أن يصبح أكثر قدرة على إنتاج المعرفة والتكنولوجيا، وأكثر كفاءة في خدمة المواطن، وأكثر تنافسية في الاقتصاد، وأكثر استقلالية في التكنولوجيا.",
    ),
    image: "",
  },
];

export const strategicDocument: StrategicDocument = {
  id: "digital-transformation-2027-2030",
  category: l10n("Strategic framework", "Cadre stratégique", "إطار استراتيجي"),
  title: l10n(
    "A national vision and executive strategy for digital transformation and artificial intelligence in the Kingdom of Morocco, 2027–2030",
    "Vision nationale et stratégie exécutive pour la transformation numérique et l'intelligence artificielle au Royaume du Maroc, 2027–2030",
    "رؤية وطنية واستراتيجية تنفيذية للتحول الرقمي والذكاء الاصطناعي بالمملكة المغربية 2027–2030",
  ),
  summary: l10n(
    "From digitization to digital sovereignty, and from artificial intelligence to the knowledge economy.",
    "De la numérisation à la souveraineté numérique, et de l'intelligence artificielle à l'économie de la connaissance.",
    "من الرقمنة إلى السيادة الرقمية، ومن الذكاء الاصطناعي إلى اقتصاد المعرفة.",
  ),
  year: "2027–2030",
  themes: [
    l10n(
      "From digitizing services to re-engineering the digital state",
      "De la numérisation des services à la réingénierie de l'État numérique",
      "من رقمنة الخدمات إلى إعادة هندسة الدولة الرقمية",
    ),
    l10n(
      "From consuming technology to producing knowledge and solutions",
      "De la consommation de technologie à la production de connaissance et de solutions",
      "من استهلاك التكنولوجيا إلى إنتاج المعرفة والحلول",
    ),
    l10n(
      "From using artificial intelligence to a national AI system",
      "De l'usage de l'intelligence artificielle à une organisation nationale de l'IA",
      "من استخدام الذكاء الاصطناعي إلى منظومة وطنية للذكاء الاصطناعي",
    ),
    l10n(
      "From international cooperation to scientific and technological diplomacy",
      "De la coopération internationale à la diplomatie scientifique et technologique",
      "من التعاون الدولي إلى الدبلوماسية العلمية والتكنولوجية",
    ),
  ],
  cover: "",
  readUrl: "",
};

export const strategicPrinciple: StrategicPrinciple = {
  quote: l10n(
    "We think nationally,\nwe innovate in Morocco,\nand we cooperate internationally.",
    "Nous pensons nationalement,\nnous innovons au Maroc,\net nous coopérons à l'international.",
    "نفكر وطنياً،\nنبتكر مغربياً،\nونتعاون دولياً.",
  ),
  reference: l10n(
    "Strategic framework for digital transformation and artificial intelligence, 2027–2030",
    "Cadre stratégique pour la transformation numérique et l'intelligence artificielle, 2027–2030",
    "الإطار الاستراتيجي للتحول الرقمي والذكاء الاصطناعي، 2027–2030",
  ),
};
