import fs from "fs";

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

const source = fs.readFileSync(new URL("../src/data/listedPublications.ts", import.meta.url), "utf8");
const oa = JSON.parse(fs.readFileSync(new URL("./openalex-works.json", import.meta.url), "utf8")).results;
const byUrl = new Map();
for (const work of oa) {
  const landing = work.primary_location?.landing_page_url || work.doi || "";
  if (landing) byUrl.set(landing, work.title);
}

const blocks = source.match(/\{[\s\S]*?\n  \}/g) || [];
let bad = 0;
for (const block of blocks) {
  const title = block.match(/title: "((?:\\.|[^"\\])*)"/)?.[1];
  const url = block.match(/url: "(.*?)"/)?.[1];
  if (!title || !url || url.includes("scholar.google.com")) continue;
  const oaTitle = byUrl.get(url);
  if (!oaTitle) {
    console.log("NO OA", title.slice(0, 80), url);
    continue;
  }
  const a = norm(title);
  const b = norm(oaTitle);
  const shorter = Math.min(a.length, b.length);
  const longer = Math.max(a.length, b.length);
  const prefix = a.startsWith(b) || b.startsWith(a);
  if (!prefix || shorter / longer < 0.9) {
    bad += 1;
    console.log("BAD", shorter / longer.toFixed ? (shorter / longer).toFixed(2) : shorter / longer);
    console.log("  listed:", title.slice(0, 120));
    console.log("  oa    :", oaTitle.slice(0, 120));
    console.log("  url   :", url);
  }
}
console.log("bad", bad);
