import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type Patent = {
  id: string;
  title: TextValue;
  number?: string;
  year?: string;
  inventors?: string;
  office?: string;
  summary?: TextValue;
  image?: string;
  href?: string;
  file?: string;
};

export const patents: Patent[] = [
  {
    id: "brevet-1",
    title: l10n(
      "Integrated sink with intelligent circuit faucet for water preservation (LIRCI)",
      "Lavabo Intégré avec Robinet à Circuit Intelligent pour la préservation de l’eau (LIRCI)",
      "مغسلة مدمجة بصنبور ذي دائرة ذكية للحفاظ على الماء (LIRCI)",
    ),
    number: "1",
    inventors: "Mostafa Ezziyyani et al.",
    summary: l10n(
      "A multifunctional integrated sink focused on preserving water circulating between the heater and the taps when the desired temperature is not yet reached. Ready to use without modifying the existing network.",
      "Solution pour réduire et économiser la consommation d’eau domestique ou collective (maisons, hôtels, immeubles, usines). Lavabo intégré multifonctions centré sur la préservation de l’eau circulant entre le chauffage et les robinets lorsqu’elle n’atteint pas encore la température souhaitée. Prêt à utiliser sans modification du réseau.",
      "حل لتقليل استهلاك الماء المنزلي أو الجماعي. مغسلة مدمجة متعددة الوظائف تركز على الحفاظ على الماء بين السخان والصنابير قبل بلوغ الحرارة المطلوبة، دون تعديل الشبكة القائمة.",
    ),
    image: "/assets/academyskills/patents/brevet-1.jpg",
    file: "/assets/academyskills/patents/brevet-1-lirci.pdf",
  },
  {
    id: "brevet-2",
    title: l10n(
      "e-Ochestra (Conducting Made Easier)",
      "e-Ochestra (Conducting Made Easier)",
      "e-Ochestra (تسهيل القيادة الأوركسترالية)",
    ),
    number: "2",
    inventors: "Mostafa Ezziyyani et al. — EzzInova",
    summary: l10n(
      "A platform where young musicians and amateurs learn conducting moves with a sensor baton, gesture recognition and a virtual orchestra. Includes feedback via vibrating alarm and a support agent for instrument placement.",
      "Plateforme où jeunes musiciens et amateurs apprennent les gestes de direction avec un bâton à capteurs, reconnaissance de gestes et orchestre virtuel. Retour haptique et agent d’assistance pour le placement des instruments.",
      "منصة يتعلم فيها الموسيقيون الشباب والهواة إيماءات القيادة عبر عصا مزودة بمستشعرات والتعرف على الإيماءات وأوركسترا افتراضية، مع تغذية راجعة ووكيل مساعدة.",
    ),
    image: "/assets/academyskills/patents/brevet-2-orchestra.jpg",
    file: "/assets/Video-orchestra.mp4",
  },
  {
    id: "brevet-3",
    title: l10n(
      "Driving assistance device and method for people with hearing impairment",
      "Dispositif et procédé d’aide à la conduite des véhicules pour des individus ayant une déficience auditive",
      "جهاز وطريقة مساعدة على القيادة للأشخاص ذوي الإعاقة السمعية",
    ),
    number: "3",
    inventors: "Mostafa Ezziyyani et al.",
    summary: l10n(
      "A device and method that help hearing-impaired drivers by displaying useful information through light signals (LEDs) and analogue sensors, without image sensors that could distract attention from the road.",
      "Dispositif et procédé d’aide à la conduite pour conducteurs déficients auditifs : affichage d’informations utiles par signalisations lumineuses (LED) et capteurs analogiques / tout-ou-rien, sans capteurs d’images susceptibles de détourner l’attention de la conduite.",
      "جهاز وطريقة لمساعدة السائقين ذوي الإعاقة السمعية عبر إشارات ضوئية (LED) ومستشعرات تناظرية، دون مستشعرات صور قد تصرف الانتباه عن القيادة.",
    ),
    image: "/assets/academyskills/patents/brevet-3-conduite.jpg",
  },
];
