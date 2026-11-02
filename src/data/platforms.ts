import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type PlatformProject = {
  id: string;
  title: TextValue;
  description: TextValue;
  href: string;
  host: string;
};

export const platformProjects: PlatformProject[] = [
  {
    id: "phdflow",
    title: l10n("PhD Flow", "PhD Flow", "PhD Flow"),
    description: l10n(
      "Academic workflow platform for doctoral research and skills tracking.",
      "Plateforme de suivi académique pour la recherche doctorale et les compétences.",
      "منصة أكاديمية لمتابعة البحث والدكتوراه والمهارات.",
    ),
    href: "https://phdflow.academyskills.net/",
    host: "phdflow.academyskills.net",
  },
  {
    id: "ecg-smartdetect",
    title: l10n("ECG-SmartDetect", "ECG-SmartDetect", "ECG-SmartDetect"),
    description: l10n(
      "Intelligent ECG analysis and detection platform.",
      "Plateforme d’analyse et de détection intelligente d’ECG.",
      "منصة ذكية لتحليل وكشف إشارات تخطيط القلب.",
    ),
    href: "https://ecg.academyskills.net/",
    host: "ecg.academyskills.net",
  },
  {
    id: "sign",
    title: l10n("Sign", "Sign", "Sign"),
    description: l10n(
      "Digital signage and interactive signalling platform.",
      "Plateforme de signalétique et d’interaction numérique.",
      "منصة رقمية للتوقيع والتفاعل.",
    ),
    href: "https://sign.academyskills.net/",
    host: "sign.academyskills.net",
  },
  {
    id: "aquavision-ai",
    title: l10n(
      "AquaVision AI — Water Loss Prediction Platform",
      "AquaVision AI — plateforme de prédiction des pertes d’eau",
      "AquaVision AI — منصة التنبؤ بفاقد المياه",
    ),
    description: l10n(
      "Advanced prediction of water losses in canals, pipes and water infrastructures using deep learning.",
      "Prédiction avancée des pertes d’eau dans les canaux, tuyaux et infrastructures hydrauliques grâce au deep learning.",
      "تنبؤ متقدم بفاقد المياه في القنوات والأنابيب والبنى التحتية المائية باستخدام التعلم العميق.",
    ),
    href: "https://mlstudio.academyskills.net",
    host: "mlstudio.academyskills.net",
  },
];
