import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("import_academyskills.json", "utf8"));
const esc = (value) => JSON.stringify(value ?? "");

function l10n(obj) {
  if (!obj) return '""';
  if (typeof obj === "string") return esc(obj);
  return `l10n(${esc(obj.en || obj.fr || "")}, ${esc(obj.fr || "")}, ${esc(obj.ar || "")})`;
}

const teaching = `export type CourseResourceKind = "support" | "ppt" | "td" | "tp" | "project" | "homework";

export type CourseResource = {
  kind: CourseResourceKind;
  title: string;
  href?: string;
};

export type Course = {
  id: string;
  title: string;
  level?: string;
  resources?: CourseResource[];
};

export type Pfe = {
  id: string;
  title: string;
  student?: string;
  year?: string;
  href?: string;
};

export type Visit = {
  id: string;
  title: string;
  place?: string;
  date?: string;
};

export const resourceKinds: CourseResourceKind[] = ["support", "ppt", "td", "tp", "project", "homework"];

export const courses: Course[] = [
${data.courses
  .map(
    (course) => `  {
    id: ${esc(course.id)},
    title: ${esc(course.title)},
    level: ${esc(course.level)},
    resources: [
      {
        kind: "support",
        title: ${esc(course.resources[0].title)},
        href: ${esc(course.resources[0].href)},
      },
    ],
  }`,
  )
  .join(",\n")}
];

export const pfeMaster: Pfe[] = [];

export const pfeLicence: Pfe[] = [];

export const visits: Visit[] = [];
`;

fs.writeFileSync("../src/data/teaching.ts", teaching);

const patents = `import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type Patent = {
  id: string;
  title: TextValue;
  number?: string;
  year?: string;
  inventors?: string;
  office?: string;
  summary?: TextValue;
  href?: string;
  file?: string;
};

export const patents: Patent[] = [
${data.patents
  .map((patent) => {
    const summaryFr = (patent.summary.fr || "")
      .replace(/\nDetail\.\.\.$/, "")
      .replace(/\nDownload : Video of Presentation \.\.\.\.\.\.$/, "")
      .trim();
    const summaryEn = (patent.summary.en || "")
      .replace(/\nDownload : Video of Presentation \.\.\.\.\.\.$/, "")
      .trim();
    return `  {
    id: ${esc(patent.id)},
    title: ${l10n(patent.title)},
    number: ${esc(patent.number)},
    inventors: ${esc(patent.inventors)},
    summary: ${l10n({ fr: summaryFr, en: summaryEn || summaryFr, ar: "" })},
    href: ${esc(patent.href)},
  }`;
  })
  .join(",\n")}
];
`;

fs.writeFileSync("../src/data/patents.ts", patents);

const innovation = `import type { TextValue } from "@/types";
import { l10n } from "@/utils/text";

export type Innovation = {
  id: string;
  title: TextValue;
  summary?: TextValue;
  image?: string;
  href?: string;
};

export const innovations: Innovation[] = [
${data.innovation
  .map(
    (item) => `  {
    id: ${esc(item.id)},
    title: ${l10n(item.title)},
    summary: ${l10n(item.summary)},
    href: ${esc(item.href)},
  }`,
  )
  .join(",\n")}
];
`;

fs.writeFileSync("../src/data/innovation.ts", innovation);

const academic = data.academicProjects
  .map(
    (project) => `  {
    id: ${esc(project.id)},
    title: ${l10n(project.title)},
    year: "",
    category: "research",
    role: ${l10n(project.role)},
    summary: ${l10n(project.summary)},
    organization: "",
    partners: [],
    country: ${l10n(project.country)},
    status: "",
    image: "",
    links: [{ label: "Source", href: ${esc(project.links[0].href)} }],
    featured: false,
  }`,
  )
  .join(",\n");

fs.writeFileSync("_academic_projects.ts.snippet", academic);
console.log("generated teaching, patents, innovation + academic snippet");
