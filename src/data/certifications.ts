import type { Certification } from "@/types";
import { l10n } from "@/utils/text";

export const certifications: Certification[] = [
  {
    id: "ibm-big-data",
    title: l10n(
      "IBM Certified Big Data Specialist",
      "IBM Certified Big Data Specialist",
      "IBM Certified Big Data Specialist",
    ),
    organization: "IBM",
    year: "",
  },
  {
    id: "multi-agent",
    title: l10n(
      "Certificate in Multi-Agent Systems and AI Applications",
      "Certificat en systèmes multi-agents et applications de l'IA",
      "شهادة في الأنظمة متعددة الوكلاء وتطبيقات الذكاء الاصطناعي",
    ),
    organization: "",
    year: "",
  },
  {
    id: "oracle-dba",
    title: l10n(
      "Oracle Database Administration (DBA) Professional Certificate",
      "Certificat professionnel Oracle Database Administration (DBA)",
      "شهادة احترافية في إدارة قواعد بيانات أوراكل (DBA)",
    ),
    organization: "Oracle",
    year: "",
  },
  {
    id: "arcgis",
    title: l10n(
      "ArcGIS Advanced Spatial Analysis Certificate",
      "Certificat ArcGIS en analyse spatiale avancée",
      "شهادة ArcGIS في التحليل المجالي المتقدم",
    ),
    organization: "ArcGIS",
    year: "",
  },
];
