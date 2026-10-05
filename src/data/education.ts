import type { Education } from "@/types";
import { l10n } from "@/utils/text";

export const education: Education[] = [
  {
    id: "doctorat-etat-2006",
    year: "2006",
    degree: l10n(
      "State Doctorate in Heterogeneous Information Systems Engineering",
      "Doctorat d'État en ingénierie des systèmes d'information hétérogènes",
      "دكتوراه الدولة في هندسة نظم المعلومات غير المتجانسة",
    ),
    institution: l10n(
      "Abdelmalek Essaadi University, jointly supervised with Luminy University, Marseille",
      "Université Abdelmalek Essaâdi, en cotutelle avec l'Université de Luminy à Marseille",
      "جامعة عبد المالك السعدي، بتأطير مشترك مع جامعة لوميني بمرسيليا",
    ),
    country: l10n("Morocco · France", "Maroc · France", "المغرب · فرنسا"),
    description: "",
    major: true,
  },
  {
    id: "doctorat-1999",
    year: "1999",
    degree: l10n(
      "Doctorate in Distributed Systems and Web Technologies",
      "Doctorat en systèmes distribués et technologies du web",
      "دكتوراه في الأنظمة الموزعة وتقنيات الويب",
    ),
    institution: l10n(
      "Mohammed V University, Rabat, in partnership with ENSEEIHT, Toulouse",
      "Université Mohammed V de Rabat, en partenariat avec l'ENSEEIHT de Toulouse",
      "جامعة محمد الخامس بالرباط، بالشراكة مع المدرسة الوطنية العليا للإلكترونيات والتكنولوجيا بتولوز (ENSEEIHT)",
    ),
    country: l10n("Morocco · France", "Maroc · France", "المغرب · فرنسا"),
    description: "",
    major: true,
  },
  {
    id: "desa-1996",
    year: "1996",
    degree: l10n(
      "DESA in Software Engineering and Programming",
      "DESA en génie logiciel et programmation",
      "ماجستير (DESA) في هندسة البرمجيات والبرمجة",
    ),
    institution: l10n(
      "Mohammed V University, Rabat",
      "Université Mohammed V de Rabat",
      "جامعة محمد الخامس بالرباط",
    ),
    country: l10n("Morocco", "Maroc", "المغرب"),
    description: "",
  },
  {
    id: "licence-1994",
    year: "1994",
    degree: l10n(
      "Bachelor's degree in Computer Science",
      "Licence en informatique",
      "الإجازة في علوم الحاسوب",
    ),
    institution: l10n(
      "Mohammed V University, Rabat",
      "Université Mohammed V de Rabat",
      "جامعة محمد الخامس بالرباط",
    ),
    country: l10n("Morocco", "Maroc", "المغرب"),
    description: "",
  },
];
