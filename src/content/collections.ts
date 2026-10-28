export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "image"
  | "file"
  | "select"
  | "checkbox"
  | "l10n"
  | "l10nList"
  | "tags"
  | "images"
  | "list";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  multiline?: boolean;
  help?: string;
  options?: { value: string; label: string }[];
  fields?: Field[];
};

export type Collection = {
  id: string;
  label: string;
  group: string;
  titleField: string;
  singleton?: boolean;
  fields: Field[];
};

export type ItemData = Record<string, unknown>;

export type Item = {
  id: string;
  position: number;
  published: boolean;
  data: ItemData;
  updatedAt?: string;
};

const options = (entries: Record<string, string>) =>
  Object.entries(entries).map(([value, label]) => ({ value, label }));

export const collections: Collection[] = [
  {
    id: "profile",
    label: "Informations générales",
    group: "Profil",
    titleField: "email",
    singleton: true,
    fields: [
      { name: "introduction", label: "Présentation", type: "l10n", multiline: true },
      { name: "email", label: "E-mail", type: "text" },
      { name: "phone", label: "Téléphone", type: "text" },
    ],
  },
  {
    id: "profileSections",
    label: "Sections du profil",
    group: "Profil",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre de la section", type: "l10n", help: "Laisser vide pour garder le titre actuel." },
      { name: "paragraphs", label: "Paragraphes", type: "l10nList" },
      {
        name: "facts",
        label: "Informations clés",
        type: "list",
        fields: [
          { name: "label", label: "Intitulé", type: "l10n", required: true },
          { name: "value", label: "Valeur", type: "l10n", required: true },
        ],
      },
    ],
  },
  {
    id: "education",
    label: "Parcours — Diplômes",
    group: "Profil",
    titleField: "degree",
    fields: [
      { name: "year", label: "Année", type: "text" },
      { name: "degree", label: "Diplôme", type: "l10n", required: true },
      { name: "institution", label: "Établissement", type: "l10n" },
      { name: "country", label: "Pays", type: "l10n" },
      { name: "description", label: "Description", type: "l10n", multiline: true },
      { name: "major", label: "Mettre en avant", type: "checkbox" },
    ],
  },
  {
    id: "publications",
    label: "Publications",
    group: "Recherche",
    titleField: "title",
    fields: [
      { name: "number", label: "Numéro", type: "number" },
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "authors", label: "Auteurs", type: "text" },
      { name: "venue", label: "Revue / conférence", type: "text" },
      { name: "year", label: "Année", type: "text" },
      { name: "url", label: "Lien (DOI, éditeur…)", type: "url" },
      { name: "file", label: "PDF", type: "file" },
    ],
  },
  {
    id: "books",
    label: "Livres — Éditions",
    group: "Recherche",
    titleField: "name",
    fields: [
      { name: "name", label: "Édition", type: "text", required: true },
      { name: "context", label: "Contexte", type: "text" },
      {
        name: "volumes",
        label: "Volumes",
        type: "list",
        fields: [
          { name: "title", label: "Titre", type: "text", required: true },
          { name: "href", label: "Lien", type: "url" },
          { name: "cover", label: "Couverture", type: "image" },
        ],
      },
    ],
  },
  {
    id: "projects",
    label: "Projets",
    group: "Recherche",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        required: true,
        options: options({
          research: "Recherche",
          ai: "Intelligence artificielle",
          transformation: "Transformation numérique",
          innovation: "Innovation",
          transfer: "Transfert de technologie",
          collaboration: "Collaboration",
        }),
      },
      { name: "role", label: "Rôle", type: "l10n" },
      { name: "summary", label: "Résumé", type: "l10n", multiline: true },
      { name: "details", label: "Points clés", type: "l10nList" },
      { name: "organization", label: "Organisation", type: "l10n" },
      { name: "country", label: "Pays", type: "l10n" },
      { name: "year", label: "Année", type: "text" },
      { name: "status", label: "Statut", type: "text" },
      { name: "partners", label: "Partenaires", type: "tags" },
      { name: "image", label: "Image", type: "image" },
      {
        name: "links",
        label: "Liens",
        type: "list",
        fields: [
          { name: "label", label: "Texte", type: "text", required: true },
          { name: "href", label: "Lien", type: "url", required: true },
        ],
      },
      { name: "featured", label: "Mettre en avant", type: "checkbox" },
    ],
  },
  {
    id: "patents",
    label: "Brevets",
    group: "Recherche",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      { name: "number", label: "Numéro de brevet", type: "text" },
      { name: "year", label: "Année", type: "text" },
      { name: "inventors", label: "Inventeurs", type: "text" },
      { name: "office", label: "Office (OMPIC, WIPO…)", type: "text" },
      { name: "summary", label: "Résumé", type: "l10n", multiline: true },
      { name: "image", label: "Illustration", type: "image" },
      { name: "href", label: "Lien (optionnel)", type: "url" },
      { name: "file", label: "Document / vidéo", type: "file" },
    ],
  },
  {
    id: "innovation",
    label: "Projets par thématique",
    group: "Recherche",
    titleField: "title",
    fields: [
      {
        name: "theme",
        label: "Thématique",
        type: "select",
        required: true,
        options: options({
          research: "Research Project",
          ia: "IA Project",
          pfe: "PFE Project",
          master: "Master Project",
          innovation: "Innovation Project",
        }),
      },
      { name: "title", label: "Titre du projet", type: "l10n", required: true },
      { name: "href", label: "Lien du projet", type: "url", help: "URL de la page ou du dépôt du projet." },
      { name: "summary", label: "Description (optionnel)", type: "l10n", multiline: true },
      { name: "image", label: "Image", type: "image" },
      { name: "video", label: "Vidéo", type: "file" },
    ],
  },
  {
    id: "team",
    label: "Équipe — Doctorants",
    group: "Recherche",
    titleField: "name",
    fields: [
      { name: "name", label: "Nom et prénom", type: "text", required: true },
      { name: "year", label: "Année d'inscription", type: "number", required: true },
      { name: "thesis", label: "Intitulé de la thèse", type: "textarea" },
      { name: "photo", label: "Photo", type: "image" },
    ],
  },
  {
    id: "courses",
    label: "Cours",
    group: "Enseignement",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre du cours", type: "text", required: true },
      { name: "level", label: "Niveau / filière", type: "text" },
      {
        name: "resources",
        label: "Ressources",
        type: "list",
        fields: [
          {
            name: "kind",
            label: "Type",
            type: "select",
            required: true,
            options: options({
              support: "Support",
              ppt: "PPT",
              td: "TD",
              tp: "TP",
              project: "Projet",
              homework: "Devoir",
            }),
          },
          { name: "title", label: "Titre", type: "text", required: true },
          { name: "href", label: "Fichier", type: "file" },
        ],
      },
    ],
  },
  {
    id: "pfe",
    label: "PFE",
    group: "Enseignement",
    titleField: "title",
    fields: [
      {
        name: "level",
        label: "Niveau",
        type: "select",
        required: true,
        options: options({ master: "Master", licence: "Licence" }),
      },
      { name: "title", label: "Intitulé", type: "text", required: true },
      { name: "student", label: "Étudiant(s)", type: "text" },
      { name: "year", label: "Année", type: "text" },
      { name: "href", label: "Rapport (PDF)", type: "file" },
    ],
  },
  {
    id: "visits",
    label: "Visites",
    group: "Enseignement",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "place", label: "Lieu", type: "text" },
      { name: "date", label: "Date", type: "text" },
      { name: "program", label: "Programme / filière", type: "l10n" },
      { name: "summary", label: "Compte rendu", type: "l10n", multiline: true },
      { name: "photos", label: "Photos", type: "images" },
    ],
  },
  {
    id: "videos",
    label: "Vidéos",
    group: "Médias",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      {
        name: "youtubeUrl",
        label: "Lien de la vidéo",
        type: "url",
        help: "YouTube (watch?v=…) ou Facebook (reel / videos).",
      },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        required: true,
        options: options({
          keynote: "Keynote",
          conference: "Conférence",
          tv: "Télévision",
          interview: "Interview",
          analysis: "Analyse",
          lecture: "Cours / leçon",
        }),
      },
      { name: "event", label: "Événement", type: "l10n" },
      { name: "date", label: "Date", type: "text" },
      { name: "thumbnail", label: "Miniature", type: "image" },
      { name: "featured", label: "Mettre en avant", type: "checkbox" },
    ],
  },
  {
    id: "posts",
    label: "Publications (actualités)",
    group: "Médias",
    titleField: "text",
    fields: [
      { name: "text", label: "Texte", type: "l10n", multiline: true },
      { name: "images", label: "Images", type: "images" },
      { name: "href", label: "Lien Facebook", type: "url", help: "Ou laisser vide et mettre texte + images." },
      { name: "date", label: "Date", type: "text" },
    ],
  },
  {
    id: "articles",
    label: "Articles — Vision",
    group: "Vision",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      { name: "summary", label: "Résumé", type: "l10n", multiline: true },
      { name: "content", label: "Texte de l’article", type: "l10n", multiline: true, help: "Optionnel si un PDF est joint." },
      { name: "year", label: "Année / période", type: "text" },
      { name: "file", label: "PDF", type: "file" },
    ],
  },
  {
    id: "gallery",
    label: "Galerie",
    group: "Médias",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      { name: "description", label: "Description", type: "l10n", multiline: true },
      { name: "date", label: "Date", type: "text", help: "Ex. octobre 2024" },
      {
        name: "images",
        label: "Photos",
        type: "images",
        required: true,
        help: "Sélectionnez plusieurs images d’un coup. Elles s’affichent en bandeau horizontal.",
      },
    ],
  },
  {
    id: "awards",
    label: "Prix & distinctions",
    group: "Distinctions",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      { name: "institution", label: "Institution", type: "l10n" },
      { name: "metadata", label: "Domaine", type: "l10n" },
      { name: "year", label: "Année", type: "text" },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        required: true,
        options: options({ award: "Prix", distinction: "Distinction" }),
      },
      { name: "major", label: "Mettre en avant", type: "checkbox" },
    ],
  },
  {
    id: "leadership",
    label: "Responsabilités",
    group: "Distinctions",
    titleField: "title",
    fields: [
      { name: "title", label: "Fonction", type: "l10n", required: true },
      { name: "organization", label: "Organisation", type: "l10n" },
      { name: "year", label: "Année", type: "text" },
      { name: "description", label: "Description", type: "l10n", multiline: true },
    ],
  },
  {
    id: "certifications",
    label: "Certifications",
    group: "Distinctions",
    titleField: "title",
    fields: [
      { name: "title", label: "Titre", type: "l10n", required: true },
      { name: "organization", label: "Organisme", type: "l10n" },
      { name: "year", label: "Année", type: "text" },
    ],
  },
  {
    id: "conferences",
    label: "Conférences",
    group: "Distinctions",
    titleField: "conference",
    fields: [
      { name: "conference", label: "Conférence", type: "text", required: true },
      { name: "title", label: "Intitulé complet", type: "text" },
      { name: "role", label: "Rôle", type: "text" },
      { name: "city", label: "Ville", type: "text" },
      { name: "country", label: "Pays", type: "text" },
      { name: "date", label: "Date", type: "text" },
      { name: "year", label: "Année", type: "text" },
      { name: "mediaUrl", label: "Site web", type: "url" },
      { name: "image", label: "Image", type: "image" },
    ],
  },
  {
    id: "international",
    label: "Carte — Points",
    group: "International",
    titleField: "country",
    fields: [
      { name: "country", label: "Pays", type: "l10n", required: true },
      {
        name: "city",
        label: "Ville",
        type: "l10n",
        help: "Optionnel. Utiliser pour plusieurs villes d’un même pays (ex. États-Unis).",
      },
      {
        name: "photos",
        label: "Photos",
        type: "images",
        help: "Petites images affichées au survol ou en maintenant le point sur la carte.",
      },
      {
        name: "x",
        label: "Position X (%)",
        type: "number",
        required: true,
        help: "0 = gauche, 100 = droite. Ex. Maroc ≈ 48.6, Washington ≈ 28.61.",
      },
      {
        name: "y",
        label: "Position Y (%)",
        type: "number",
        required: true,
        help: "0 = haut, 100 = bas. Ex. Maroc ≈ 32.2, Washington ≈ 28.39.",
      },
      {
        name: "region",
        label: "Région",
        type: "select",
        required: true,
        options: options({
          africa: "Afrique",
          europe: "Europe",
          asia: "Asie",
          northAmerica: "Amérique du Nord",
          arabWorld: "Monde arabe",
        }),
      },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        options: options({
          research: "Recherche",
          visit: "Visite",
          conference: "Conférence",
          advisory: "Conseil",
          partnership: "Partenariat",
          project: "Projet",
        }),
      },
      { name: "institution", label: "Institution", type: "l10n" },
      { name: "year", label: "Année", type: "text" },
      { name: "summary", label: "Note", type: "l10n", multiline: true },
    ],
  },
];

export function getCollection(id: string) {
  return collections.find((item) => item.id === id);
}

const locales = ["en", "fr", "ar"] as const;
const linkPattern = /^(https?:\/\/|\/|mailto:)/;

function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "number":
      return undefined;
    case "checkbox":
      return false;
    case "list":
    case "l10nList":
    case "tags":
    case "images":
      return [];
    default:
      return "";
  }
}

function cleanText(value: unknown, path: string, errors: string[]) {
  const text = String(value ?? "").trim();
  if (text.length > 10000) errors.push(`${path} : texte trop long`);
  return text;
}

function cleanL10n(value: unknown, path: string, errors: string[]): unknown {
  if (typeof value === "string" || typeof value === "number") return cleanText(value, path, errors);
  if (!value || typeof value !== "object") return "";
  const source = value as Record<string, unknown>;
  const output: Record<string, string> = {};
  for (const locale of locales) output[locale] = cleanText(source[locale], path, errors);
  return locales.some((locale) => output[locale]) ? output : "";
}

function isBlank(value: unknown) {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value as Record<string, unknown>).every((entry) => !String(entry ?? "").trim());
  }
  return false;
}

function cleanLink(value: unknown, path: string, errors: string[]) {
  const text = String(value).trim();
  if (text && !linkPattern.test(text)) errors.push(`${path} : lien invalide`);
  return text;
}

function cleanValue(field: Field, value: unknown, path: string, errors: string[]): unknown {
  if (isBlank(value) || (Array.isArray(value) && value.length === 0)) {
    if (field.required) errors.push(`${path} : champ obligatoire`);
    return emptyValue(field);
  }
  switch (field.type) {
    case "number": {
      const number = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(number)) errors.push(`${path} : nombre invalide`);
      return number;
    }
    case "checkbox":
      return value === true || value === "true" || value === "on";
    case "select": {
      const text = String(value);
      if (!field.options?.some((option) => option.value === text)) errors.push(`${path} : valeur non autorisée`);
      return text;
    }
    case "l10n":
      return cleanL10n(value, path, errors);
    case "l10nList":
      return Array.isArray(value)
        ? value.map((entry) => cleanL10n(entry, path, errors)).filter((entry) => !isBlank(entry))
        : [];
    case "tags":
      return (Array.isArray(value) ? value : String(value).split("\n"))
        .map((entry) => cleanText(entry, path, errors))
        .filter(Boolean);
    case "images":
      return Array.isArray(value) ? value.map((entry) => cleanLink(entry, path, errors)).filter(Boolean) : [];
    case "list": {
      if (!Array.isArray(value)) {
        errors.push(`${path} : liste invalide`);
        return [];
      }
      return value.map((entry, index) => cleanData(field.fields ?? [], entry, `${path}[${index + 1}]`, errors));
    }
    case "image":
    case "file":
    case "url":
      return cleanLink(value, path, errors);
    default:
      return cleanText(value, path, errors);
  }
}

function cleanData(fields: Field[], input: unknown, prefix: string, errors: string[]): ItemData {
  const source = input && typeof input === "object" ? (input as ItemData) : {};
  const output: ItemData = {};
  for (const field of fields) {
    const value = cleanValue(field, source[field.name], prefix ? `${prefix} ${field.label}` : field.label, errors);
    if (value !== undefined) output[field.name] = value;
  }
  return output;
}

export function validateItem(collection: Collection, input: unknown) {
  const errors: string[] = [];
  const data = cleanData(collection.fields, input, "", errors);
  return { data, errors };
}
