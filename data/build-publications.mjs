import fs from "fs";

const raw = fs.readFileSync(new URL("./publications-scholar.txt", import.meta.url), "utf8");
const lines = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

const items = [];
let year = "";
const pending = [];
for (const line of lines) {
  if (/^\d{1,3}$/.test(line)) continue;
  if (/^(19|20)\d{2}$/.test(line)) {
    year = line;
    continue;
  }
  pending.push(line);
  if (pending.length < 3) continue;
  const [title, authors, venueLine] = pending.splice(0, 3);
  const venue = venueLine === "—" ? "" : venueLine;
  const prev = items[items.length - 1];
  if (prev && authors === prev.authors && venue === prev.venue && prev.title.endsWith(title)) {
    year = "";
    continue;
  }
  items.push({ year, title, authors, venue });
  year = "";
}
if (pending.length) console.log("LEFTOVER", pending);

const files = [
  { file: "/publications/Publication00.pdf", needle: "expert system for short, medium and long-term flood forecasting" },
  { file: "/publications/Publication05.pdf", needle: "adaptive intelligent decision support system for real-time flood forecasting" },
  { file: "/publications/Publication06.pdf", needle: "adaptive learning" },
  { file: "/publications/Publication07.pdf", needle: "optimization query process of mediators interrogation based on combinatorial storage" },
  { file: "/publications/Publication08.pdf", needle: "query optimization based on users profile" },
  { file: "/publications/Publication09.pdf", needle: "event process designed for event" },
  { file: "/publications/Publication10.pdf", needle: "automatic generation of query order execution plan for hybrid mediator" },
  { file: "/publications/Publication11.pdf", needle: "quantitative study to evaluate the performance of the semantic cache" },
];

function norm(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

for (const item of items) {
  const title = norm(item.title);
  const hit = files.find((entry) => title.includes(norm(entry.needle)) || norm(entry.needle).includes(title));
  if (hit) item.file = hit.file;
}

const extras = [
  {
    year: "2014",
    title: "Adaptive Learning",
    authors: "Soumaya El Mamoune, Mostafa Ezziyani, Marouane El Mabrouk, Loubna Cherrat, Ahmed Haddioui, Omar Kassara",
    venue: "Journal of Emerging Technologies in Web Intelligence (JETWI), ISSN 1798-0461, Vol 6, No 1 (2014), 85-88, Feb 2014.",
    file: "/publications/Publication06.pdf",
  },
  {
    year: "2012",
    title: "Research of an event process designed for event & voluminous graphs to compute customized itinerary",
    authors: "O. Kassara, M. Ezziyyani, L. Cherrat, M. Essaadi",
    venue: "Journal of E-Technology, Volume 3, Issue 3, August 2012, Pages 161-167.",
    file: "/publications/Publication09.pdf",
  },
];

for (const extra of extras) {
  if (!items.some((item) => item.file === extra.file)) items.push(extra);
}

function slug(title, index) {
  const base = norm(title).split(" ").slice(0, 6).join("-") || "item";
  return `${base}-${index + 1}`;
}

const body = items.map((item, index) => {
  const fields = [
    `    id: ${JSON.stringify(slug(item.title, index))},`,
    `    number: ${index + 1},`,
    `    year: ${JSON.stringify(item.year || "")},`,
    `    title: ${JSON.stringify(item.title)},`,
    `    authors: ${JSON.stringify(item.authors)},`,
    `    venue: ${JSON.stringify(item.venue || "")},`,
  ];
  if (item.file) fields.push(`    file: ${JSON.stringify(item.file)},`);
  return `  {\n${fields.join("\n")}\n  }`;
}).join(",\n");

const out = `import type { ListedPublication } from "@/data/publications";

export const listedPublications: ListedPublication[] = [
${body}
];
`;

fs.writeFileSync(new URL("../src/data/listedPublications.ts", import.meta.url), out);
console.log("wrote", items.length);
console.log("with files", items.filter((item) => item.file).length);
console.log("empty venue", items.filter((item) => !item.venue).map((item) => item.title).join("\n"));
