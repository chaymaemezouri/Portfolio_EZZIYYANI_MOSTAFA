import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export const innovationThemes = ["research", "ia", "pfe", "master", "innovation"] as const;
export type InnovationTheme = (typeof innovationThemes)[number];

export type Innovation = {
  id: string;
  title: TextValue;
  theme?: InnovationTheme;
  summary?: TextValue;
  image?: string;
  video?: string;
  href?: string;
};

export const innovations: Innovation[] = [
  {
    id: "3sd",
    title: l10n("3SD", "3SD", "3SD"),
    theme: "innovation",
    summary: l10n(
      "Product developed within the research activities of the laboratory.",
      "Produit issu des activités de recherche du laboratoire.",
      "منتج نابع من أنشطة البحث في المختبر.",
    ),
  },
  {
    id: "pccb",
    title: l10n(
      "Parental Control of Children's Behavior (PCCB)",
      "Parental Control of Children's Behavior (PCCB)",
      "الرقابة الأبوية على سلوك الأطفال (PCCB)",
    ),
    theme: "innovation",
    summary: l10n(
      "Parental control solution focused on children's digital behaviour.",
      "Solution de contrôle parental centrée sur le comportement numérique des enfants.",
      "حل للرقابة الأبوية يركز على السلوك الرقمي للأطفال.",
    ),
  },
  {
    id: "worldtalk",
    title: l10n("WorldTalk", "WorldTalk", "WorldTalk"),
    theme: "innovation",
    summary: l10n(
      "Communication product developed within the research programme.",
      "Produit de communication développé dans le cadre du programme de recherche.",
      "منتج تواصل طُوّر ضمن برنامج البحث.",
    ),
  },
  {
    id: "orchestra",
    title: l10n("Orchestra / e-Ochestra", "Orchestra / e-Ochestra", "Orchestra / e-Ochestra"),
    theme: "innovation",
    summary: l10n(
      "Learning platform for orchestra conducting with a sensor baton and gesture recognition.",
      "Plateforme d’apprentissage de la direction d’orchestre avec bâton à capteurs et reconnaissance de gestes.",
      "منصة لتعلم قيادة الأوركسترا بعصا مزودة بمستشعرات والتعرف على الإيماءات.",
    ),
    image: "/assets/academyskills/patents/brevet-2-orchestra.jpg",
    video: "/assets/Video-orchestra.mp4",
  },
  {
    id: "mds-cp",
    title: l10n(
      "MDS-CP (Mobile Diagnostic System for Collaborative Patients)",
      "MDS-CP (Mobile Diagnostic System for Collaborative Patients)",
      "MDS-CP (نظام تشخيص متنقل للمرضى التعاوني)",
    ),
    theme: "innovation",
    summary: l10n(
      "Medical diagnostic tool for smartphones (Android) that suggests treatments via an expert system and collaborative profiles of users with similar cases.",
      "Outil de diagnostic médical pour smartphone (Android) qui propose des traitements via un système expert et les profils collaboratifs d’utilisateurs ayant eu des cas similaires.",
      "أداة تشخيص طبي للهواتف الذكية (Android) تقترح علاجات عبر نظام خبير وملامح تعاونية لمستخدمين واجهوا حالات مشابهة.",
    ),
  },
  {
    id: "data-analyser",
    title: l10n("Data Analyser", "Data Analyser", "Data Analyser"),
    theme: "innovation",
    summary: l10n(
      "Data analysis product developed within the research activities.",
      "Produit d’analyse de données issu des activités de recherche.",
      "منتج لتحليل البيانات نابع من أنشطة البحث.",
    ),
  },
];
