import fs from "fs";

const cdp = JSON.parse(
  fs.readFileSync(
    "C:/Users/dell/.cursor/browser-logs/cdp-response-Runtime.evaluate-2026-10-07T22-32-09-112Z.json",
    "utf8",
  ),
);

function norm(value) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/…|\.\.\./g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function stem(title) {
  const words = norm(title).split(" ").filter(Boolean);
  if (/…|\.\.\./.test(title) && words.length > 4) words.pop();
  return words.join(" ");
}

const scholarRaw = JSON.parse(cdp.result.value);
const pool = scholarRaw.map((row) => ({ ...row, key: norm(row.title), used: false }));
const oa = JSON.parse(fs.readFileSync(new URL("./openalex-works.json", import.meta.url), "utf8")).results;

function findScholar(title) {
  const n = norm(title);
  const s = stem(title);
  let hits = pool.filter((row) => !row.used && (row.key === n || row.key === s));
  if (!hits.length) {
    hits = pool.filter((row) => {
      if (row.used) return false;
      const shorter = Math.min(row.key.length, s.length);
      const longer = Math.max(row.key.length, s.length);
      if (shorter < 28 || shorter / longer < 0.72) return false;
      return row.key.startsWith(s) || s.startsWith(row.key);
    });
  }
  if (!hits.length) return null;
  hits.sort((a, b) => Math.abs(a.key.length - s.length) - Math.abs(b.key.length - s.length));
  hits[0].used = true;
  return hits[0].href;
}

function findArticle(title) {
  const n = norm(title);
  const s = stem(title);
  const hits = oa.filter((work) => {
    const key = norm(work.title || "");
    if (!key) return false;
    if (key === n || key === s) return true;
    const shorter = Math.min(key.length, s.length);
    const longer = Math.max(key.length, s.length);
    if (shorter < 36 || shorter / longer < 0.8) return false;
    return key.startsWith(s) || s.startsWith(key);
  });
  const titles = [...new Set(hits.map((work) => norm(work.title || "")))];
  if (titles.length !== 1) return null;
  const landing = hits[0].primary_location?.landing_page_url || hits[0].doi || "";
  return landing.startsWith("http") ? landing : null;
}

const sourcePath = new URL("../src/data/listedPublications.ts", import.meta.url);
let source = fs.readFileSync(sourcePath, "utf8");
const blocks = source.match(/\{[\s\S]*?\n  \}/g) || [];
let article = 0;
let scholar = 0;
let none = 0;
const misses = [];

for (const block of blocks) {
  const titleMatch = block.match(/title: "((?:\\.|[^"\\])*)"/);
  if (!titleMatch) continue;
  const title = titleMatch[1].replace(/\\"/g, '"');
  const articleUrl = findArticle(title);
  const scholarUrl = findScholar(title);
  const url = articleUrl || scholarUrl;
  if (articleUrl) article += 1;
  else if (scholarUrl) scholar += 1;
  else {
    none += 1;
    misses.push(title.slice(0, 110));
  }
  if (!url || block.includes("\n    url:")) continue;
  const next = block.replace(/\n  \}$/, `,\n    url: ${JSON.stringify(url)}\n  }`);
  source = source.replace(block, next);
}

fs.writeFileSync(sourcePath, source);
console.log({ blocks: blocks.length, article, scholar, none });
for (const row of misses) console.log("- " + row);
