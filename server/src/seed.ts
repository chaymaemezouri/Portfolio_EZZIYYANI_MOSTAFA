import { awards } from "../../src/data/awards";
import { bookEditions } from "../../src/data/books";
import { certifications } from "../../src/data/certifications";
import { conferences } from "../../src/data/conferences";
import { education } from "../../src/data/education";
import { leadershipRoles } from "../../src/data/leadership";
import { listedPublications } from "../../src/data/listedPublications";
import { publicPosts } from "../../src/data/posts";
import { profile, profileSections } from "../../src/data/profile";
import { innovations } from "../../src/data/innovation";
import { patents } from "../../src/data/patents";
import { projects } from "../../src/data/projects";
import { doctoralStudents } from "../../src/data/team";
import { courses, pfeLicence, pfeMaster, visits } from "../../src/data/teaching";
import { visionArticles } from "../../src/data/articles";
import { internationalActivities } from "../../src/data/international";
import { mediaItems } from "../../src/data/videos";
import { getCollection, validateItem, type ItemData } from "../../src/content/collections";
import { createItem, db, listItems } from "./db";

const force = process.argv.includes("--force");
const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7).split(",");

type Row = { id: string; data: ItemData };

function seed(collectionId: string, rows: Row[]) {
  if (only && !only.includes(collectionId)) return;
  const collection = getCollection(collectionId)!;
  if (listItems(collectionId, false).length && !force) {
    console.log(`- ${collectionId}: already has content, skipped (use --force to replace)`);
    return;
  }
  db.prepare("DELETE FROM items WHERE collection = ?").run(collectionId);
  for (const row of rows) {
    const { data, errors } = validateItem(collection, row.data);
    if (errors.length) console.warn(`  ! ${collectionId}/${row.id}: ${errors.join(", ")}`);
    createItem(collectionId, data, true, row.id);
  }
  console.log(`- ${collectionId}: ${rows.length} item(s) imported`);
}

const rows = <T extends { id: string }>(items: T[]): Row[] =>
  items.map(({ id, ...data }) => ({ id, data: data as ItemData }));

seed("profile", [{ id: "main", data: { introduction: profile.introduction, email: profile.email, phone: profile.phone } }]);
seed("profileSections", rows(profileSections));
seed("education", rows(education));
seed("publications", rows(listedPublications));
seed("books", rows(bookEditions));
seed("projects", rows(projects));
seed("patents", rows(patents));
seed("innovation", rows(innovations));
seed("team", rows(doctoralStudents));
seed("courses", rows(courses));
seed("pfe", [
  ...pfeMaster.map(({ id, ...data }) => ({ id, data: { ...data, level: "master" } })),
  ...pfeLicence.map(({ id, ...data }) => ({ id, data: { ...data, level: "licence" } })),
]);
seed("visits", rows(visits));
seed("videos", rows(mediaItems));
seed("articles", rows(visionArticles));
seed("posts", rows(publicPosts));
seed("gallery", []);
seed("awards", rows(awards));
seed("leadership", rows(leadershipRoles));
seed("certifications", rows(certifications));
seed("conferences", rows(conferences));
seed("international", rows(internationalActivities));
