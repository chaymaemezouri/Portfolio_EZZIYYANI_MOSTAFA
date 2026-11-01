import type { VisionArticle } from "@/data/articles";
import { l10n } from "@/utils/text";

/** Mission & collaboration documents — invitations / PDF dossiers. */
export type MissionDocument = VisionArticle;

export const missionDocuments: MissionDocument[] = [
  {
    id: "rapporteur-hayat-sedrati",
    title: l10n(
      "Rapporteur invitation — Hayat Sedrati",
      "Invitation rapporteur — Hayat Sedrati",
      "دعوة مقرر — حياة سدراتي",
    ),
    file: "/invitation/invitation-rapporteur-hayat-sedrati.pdf",
  },
  {
    id: "soutenance-these",
    title: l10n(
      "Invitation — Thesis defense",
      "Invitation — Soutenance de thèse",
      "دعوة — مناقشة أطروحة",
    ),
    file: "/invitation/invitation-soutenance-these.pdf",
  },
  {
    id: "ezziyyani-mohammed",
    title: l10n(
      "Invitation — EZZIYYANI Mohammed",
      "Invitation — EZZIYYANI Mohammed",
      "دعوة — عزّياني محمد",
    ),
    file: "/invitation/invitation-ezziyyani-mohammed.pdf",
  },
  {
    id: "ezziyyani-mostafa",
    title: l10n(
      "Invitation — EZZIYYANI Mostafa",
      "Invitation — EZZIYYANI Mostafa",
      "دعوة — عزّياني مصطفى",
    ),
    file: "/invitation/invitation-ezziyyani-mostafa.pdf",
  },
  {
    id: "ezziyyani-mostafa-alt",
    title: l10n(
      "Invitation — EZZIYYANI Mostafa (document)",
      "Invitation — EZZIYYANI Mostafa (document)",
      "دعوة — عزّياني مصطفى (وثيقة)",
    ),
    file: "/invitation/invitation-ezziyyani-mostafa-alt.pdf",
  },
  {
    id: "invitation-generale",
    title: l10n("Invitation", "Invitation", "دعوة"),
    file: "/invitation/invitation.pdf",
  },
];
