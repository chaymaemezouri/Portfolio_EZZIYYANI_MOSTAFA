import type { Profile, ProfileSection } from "@/types";
import { l10n } from "@/utils/text";

export const profile: Profile = {
  honorific: "Prof. Dr.",
  honorificAr: "البروفيسور الدكتور",
  givenName: "Mostafa",
  familyName: "Ezziyyani",
  nameAr: "مصطفى الزياني",
  introduction: l10n(
    "Full professor at Abdelmalek Essaadi University and international expert in artificial intelligence, digital transformation, data science, cybersecurity, and data analysis and protection. President of the Innovation and Technology Transfer Organization and member of the Arab Advisory Council for Scientific Research. His research experience covers more than three decades, from the beginning of the digital era in 1990.",
    "Professeur de l'enseignement supérieur à l'Université Abdelmalek Essaâdi et expert international en intelligence artificielle, transformation numérique, science des données, cybersécurité, et analyse et protection des données. Président de l'Organisation de l'innovation et du transfert de technologie et membre du Conseil consultatif arabe de la recherche scientifique. Son expérience de recherche couvre plus de trois décennies, depuis les débuts de l'ère numérique en 1990.",
    "خبير دولي في الذكاء الاصطناعي والرقمنة وعلوم البيانات والأمن السيبراني وتحليل وحماية البيانات. أستاذ التعليم العالي بجامعة عبد المالك السعدي، ورئيس منظمة الابتكار ونقل التكنولوجيا، وعضو المجلس الاستشاري العربي للبحث العلمي. تمتد خبرته البحثية لأكثر من ثلاثة عقود، منذ بدايات العصر الرقمي سنة 1990.",
  ),
  portrait: "/assets/profile/portrait.png",
  portraitWidth: 484,
  portraitHeight: 448,
  email: "mezzyani@uae.ac.ma",
  phone: "+212 661630301",
  website: "https://www.ezziyani.com",
};

export const profileSections: ProfileSection[] = [
  {
    id: "overview",
    paragraphs: [
      l10n(
        "Prof. Mostafa Ezziyyani is an international reference in the founding and steering of digital and technological transformation in Morocco, and across Africa and the Arab world. His work connects information security, digital sovereignty and a competitive knowledge economy.",
        "Le professeur Mostafa Ezziyyani est une référence internationale dans la fondation et l'orientation de la transformation numérique et technologique au Maroc, ainsi qu'en Afrique et dans le monde arabe. Son travail relie la sécurité de l'information, la souveraineté numérique et une économie de la connaissance compétitive.",
        "يُشَكِّل البروفيسور مصطفى الزياني مرجعية استراتيجية ذات إشعاع دولي، في تأسيس وتوجيه مسار التحول الرقمي والتكنولوجي بالمملكة المغربية، وعلى امتداد القارة الإفريقية والعالم العربي. ويجسد رؤية تربط بين الأمن المعلوماتي، وترسيخ السيادة الرقمية، وبناء اقتصاد معرفي تنافسي ومستدام.",
      ),
      l10n(
        "He has published more than 200 papers and studies, led or co-led more than 10 strategic research projects, and supervised more than 350 doctoral theses, master's dissertations and strategic projects. He holds patents in software efficiency, distributed operating systems and secure digital solutions.",
        "Il a publié plus de 200 articles et études, dirigé ou codirigé plus de 10 projets de recherche stratégiques, et encadré plus de 350 thèses de doctorat, mémoires de master et projets stratégiques. Il est titulaire de brevets portant sur l'efficacité logicielle, les systèmes d'exploitation distribués et les solutions numériques sécurisées.",
        "يزخر رصيده العلمي بنشر أكثر من 200 بحث ودراسة في المجلات العلمية المحكمة والمؤتمرات الدولية، في الأنظمة الموزعة وحكامة البيانات الضخمة والذكاء الاصطناعي التنبؤي والتوليدي. وقد قاد وشارك في إدارة أكثر من 10 مشاريع بحثية استراتيجية، وأشرف على أكثر من 350 أطروحة دكتوراه ورسالة ماجستير ومشروعاً استراتيجياً، وسجّل براءات اختراع في الكفاءة البرمجية للخوارزميات ونظم التشغيل الموزعة والحلول الرقمية الآمنة.",
      ),
    ],
    facts: [
      {
        label: l10n("University", "Université", "الجامعة"),
        value: l10n(
          "Abdelmalek Essaadi University",
          "Université Abdelmalek Essaâdi",
          "جامعة عبد المالك السعدي",
        ),
      },
      {
        label: l10n("At the university since", "À l'université depuis", "بالجامعة منذ"),
        value: "1996",
      },
      { label: l10n("Email", "E-mail", "البريد"), value: "mezzyani@uae.ac.ma" },
      { label: l10n("Phone", "Téléphone", "الهاتف"), value: "+212 661630301" },
      { label: "ORCID", value: "0000-0002-8828-4972" },
      {
        label: l10n("Languages", "Langues", "اللغات"),
        value: l10n(
          "Arabic (native), French (C2), English (C2)",
          "Arabe (langue maternelle), français (C2), anglais (C2)",
          "العربية (اللغة الأم)، الفرنسية (C2)، الإنجليزية (C2)",
        ),
      },
    ],
  },
  {
    id: "leadership",
    paragraphs: [
      l10n(
        "He is President, Director General and co-founder of the Moroccan Quantum Computing Cluster, working on quantum computing, quantum artificial intelligence and post-quantum cryptography. He is General Chair of the International Conference on Intelligent Systems for Sustainable Development (AI2SD).",
        "Il est président, directeur général et cofondateur du Moroccan Quantum Computing Cluster, autour de la informatique quantique, de l'intelligence artificielle quantique et de la cryptographie post-quantique. Il est président général de la conférence internationale AI2SD sur les systèmes intelligents pour le développement durable.",
        "بصفته رئيساً ومديراً عاماً ومؤسساً مشاركاً للتكتل المغربي للحوسبة الكمومية، يقود التموقع في الحوسبة الكمومية والذكاء الاصطناعي الكمومي والتشفير المقاوم للحوسبة الكمومية. ويتولى الرئاسة العامة للمؤتمر الدولي للأنظمة الذكية للتنمية المستدامة (AI2SD).",
      ),
    ],
    facts: [],
  },
  {
    id: "international",
    paragraphs: [
      l10n(
        "His international activity includes academic visits, advisory missions and research cooperation with laboratories and universities in Europe, the United States, Asia, China, the Arab world and Africa. Named partnerships include institutions in China, the United States, France, Belgium, Spain, the Netherlands, Djibouti, Tunisia and the Arab Gulf countries.",
        "Son activité internationale comprend des visites académiques, des missions de conseil et une coopération de recherche avec des laboratoires et des universités en Europe, aux États-Unis, en Asie, en Chine, dans le monde arabe et en Afrique. Les partenariats nommés concernent la Chine, les États-Unis, la France, la Belgique, l'Espagne, les Pays-Bas, Djibouti, la Tunisie et les pays du Golfe arabe.",
        "يرتكز رصيده على زيارات أكاديمية ومهام استشارية وتعاون بحثي مع مختبرات وجامعات في أوروبا والولايات المتحدة وآسيا والصين والعالم العربي والقارة الإفريقية. وقد أقام شراكات مع هيئات في الصين والولايات المتحدة وفرنسا وبلجيكا وإسبانيا وهولندا وجيبوتي وتونس ودول الخليج العربي.",
      ),
    ],
    facts: [],
  },
  {
    id: "advisory",
    paragraphs: [
      l10n(
        "He serves as a sworn expert before the criminal courts in cybercrime, cybersecurity, big-data forensics and the interpretation of digital evidence. His advisory work also covers digital health, digital justice — including the LE PENALATHON initiative — and territorial governance.",
        "Il intervient comme expert assermenté auprès des juridictions pénales pour la cybercriminalité, la cybersécurité, l'analyse forensique des données massives et l'interprétation de la preuve numérique. Son conseil couvre aussi la santé numérique, la justice numérique — dont l'initiative LE PENALATHON — et la gouvernance territoriale.",
        "يعمل خبيراً معتمداً ومحلفاً لدى المحاكم الجنائية في الجرائم الإلكترونية والأمن السيبراني وتحليل البيانات الضخمة وتفسير الأدلة الرقمية. وتشمل خبرته القطاعية الصحة الرقمية، والعدالة الرقمية ومن بينها مبادرة LE PENALATHON، والحكامة الترابية.",
      ),
    ],
    facts: [],
  },
  {
    id: "transfer",
    paragraphs: [
      l10n(
        "As President of the Innovation and Technology Transfer Organization (IFFT), he works to connect the university with the financial and industrial sectors. His record includes patents and the passage from research results to applicable digital solutions.",
        "En tant que président de l'Organisation de l'innovation et du transfert de technologie (IFFT), il relie l'université aux secteurs financier et industriel. Son parcours comprend des brevets et le passage des résultats de recherche à des solutions numériques applicables.",
        "يرأس منظمة الابتكار ونقل التكنولوجيا (IFFT) الموجّهة لتجسير الفجوة بين الجامعة والقطاعين المالي والصناعي. ويشمل رصيده براءات اختراع ونقل نتائج البحث إلى حلول رقمية قابلة للتطبيق.",
      ),
    ],
    facts: [],
  },
  {
    id: "responsibilities",
    paragraphs: [
      l10n(
        "He is a full professor at Abdelmalek Essaadi University, where he has been a researcher since 1996. He also presides over the advisory council of the Center of Excellence for African Research in Djibouti and sits on the Arab Advisory Council for Scientific Research and Innovation.",
        "Il est professeur de l'enseignement supérieur à l'Université Abdelmalek Essaâdi, où il est chercheur depuis 1996. Il préside également le conseil consultatif du Centre d'excellence pour la recherche africaine à Djibouti et siège au Conseil consultatif arabe de la recherche scientifique et de l'innovation.",
        "أستاذ التعليم العالي بجامعة عبد المالك السعدي، وباحث بها منذ 1996. ويرأس المجلس الاستشاري لمركز التميز للبحث الإفريقي في جيبوتي، وهو عضو المجلس الاستشاري العربي للبحث العلمي والابتكار.",
      ),
    ],
    facts: [],
  },
];

export const pullQuote = {
  text: l10n(
    "We think nationally,\nwe innovate in Morocco,\nand we cooperate internationally.",
    "Nous pensons nationalement,\nnous innovons au Maroc,\net nous coopérons à l'international.",
    "نفكر وطنياً،\nنبتكر مغربياً،\nونتعاون دولياً.",
  ),
  source: l10n(
    "Strategic framework for digital transformation and artificial intelligence, 2027–2030",
    "Cadre stratégique pour la transformation numérique et l'intelligence artificielle, 2027–2030",
    "الإطار الاستراتيجي للتحول الرقمي والذكاء الاصطناعي، 2027–2030",
  ),
};
