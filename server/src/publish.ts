import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { collections } from "../../src/content/collections";
import { listItems } from "./db";
import { env } from "./env";

/** Mirror published CMS content into the static site folder so HTTPS works without nginx /api. */
export function publishPublicContent() {
  if (!env.distDir) return;
  const outDir = join(env.distDir, "cms");
  mkdirSync(outDir, { recursive: true });
  for (const collection of collections) {
    const rows = listItems(collection.id, true).map((item) => ({ id: item.id, ...item.data }));
    writeFileSync(join(outDir, `${collection.id}.json`), JSON.stringify(rows));
  }
}
