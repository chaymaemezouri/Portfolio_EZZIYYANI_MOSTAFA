import fs from "fs";

const pubs = fs.readFileSync(new URL("../src/data/listedPublications.ts", import.meta.url), "utf8");
const titles = [...pubs.matchAll(/title: "((?:\\.|[^"\\])*)"/g)].map((m) =>
  m[1].replace(/\\"/g, '"'),
);
const oa = JSON.parse(fs.readFileSync(new URL("./openalex-works.json", import.meta.url), "utf8")).results;

function norm(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stem(title) {
  const words = norm(title.replace(/…|\.\.\./g, " ")).split(" ").filter(Boolean);
  if (/…|\.\.\./.test(title) && words.length > 4) words.pop();
  return words.join(" ");
}

let exact = 0;
let prefix = 0;
const misses = [];
const ambig = [];

for (const title of titles) {
  const s = stem(title);
  const n = norm(title);
  const hits = oa.filter((work) => {
    const t = norm(work.title || "");
    return t === n || t.startsWith(s) || (s.length > 40 && s.startsWith(t) && t.length > 40);
  });
  if (hits.length === 1) {
    if (norm(hits[0].title) === n) exact += 1;
    else prefix += 1;
  } else if (hits.length > 1) {
    ambig.push({ title: title.slice(0, 90), n: hits.length, hits: hits.map((h) => h.title.slice(0, 70)) });
  } else {
    misses.push(title.slice(0, 110));
  }
}

console.log({ titles: titles.length, exact, prefix, ambig: ambig.length, none: misses.length });
console.log("AMBIG");
for (const row of ambig) console.log(JSON.stringify(row));
console.log("MISS");
for (const row of misses) console.log("- " + row);
