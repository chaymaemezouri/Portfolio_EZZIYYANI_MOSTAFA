import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import type { Item, ItemData } from "../../src/content/collections";
import { env } from "./env";

function afterChange() {
  void import("./publish")
    .then((module) => module.publishPublicContent())
    .catch(() => undefined);
}

mkdirSync(dirname(env.databasePath), { recursive: true });

export const db = new Database(env.databasePath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT NOT NULL,
    collection TEXT NOT NULL,
    data TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (collection, id)
  );
  CREATE INDEX IF NOT EXISTS items_collection ON items (collection, position);
  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at TEXT NOT NULL,
    action TEXT NOT NULL,
    collection TEXT NOT NULL,
    item_id TEXT NOT NULL,
    before TEXT,
    after TEXT
  );
`);

type Row = {
  id: string;
  collection: string;
  data: string;
  position: number;
  published: number;
  updated_at: string;
};

function toItem(row: Row): Item {
  return {
    id: row.id,
    position: row.position,
    published: row.published === 1,
    data: JSON.parse(row.data) as ItemData,
    updatedAt: row.updated_at,
  };
}

const now = () => new Date().toISOString();

export function listItems(collection: string, onlyPublished: boolean) {
  const rows = db
    .prepare(
      `SELECT * FROM items WHERE collection = ? ${onlyPublished ? "AND published = 1" : ""} ORDER BY position, created_at`,
    )
    .all(collection) as Row[];
  return rows.map(toItem);
}

export function getItem(collection: string, id: string) {
  const row = db.prepare("SELECT * FROM items WHERE collection = ? AND id = ?").get(collection, id) as Row | undefined;
  return row ? toItem(row) : undefined;
}

function log(action: string, collection: string, id: string, before?: Item, after?: Item) {
  db.prepare("INSERT INTO audit_log (at, action, collection, item_id, before, after) VALUES (?, ?, ?, ?, ?, ?)").run(
    now(),
    action,
    collection,
    id,
    before ? JSON.stringify(before) : null,
    after ? JSON.stringify(after) : null,
  );
}

export function createItem(collection: string, data: ItemData, published: boolean, id: string = crypto.randomUUID()) {
  const { next } = db
    .prepare("SELECT COALESCE(MAX(position), -1) + 1 AS next FROM items WHERE collection = ?")
    .get(collection) as { next: number };
  const stamp = now();
  db.prepare(
    "INSERT INTO items (id, collection, data, position, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(id, collection, JSON.stringify(data), next, published ? 1 : 0, stamp, stamp);
  const item = getItem(collection, id)!;
  log("create", collection, id, undefined, item);
  afterChange();
  return item;
}

export function updateItem(collection: string, id: string, data: ItemData, published: boolean) {
  const before = getItem(collection, id);
  if (!before) return undefined;
  db.prepare("UPDATE items SET data = ?, published = ?, updated_at = ? WHERE collection = ? AND id = ?").run(
    JSON.stringify(data),
    published ? 1 : 0,
    now(),
    collection,
    id,
  );
  const after = getItem(collection, id)!;
  log("update", collection, id, before, after);
  afterChange();
  return after;
}

export function deleteItem(collection: string, id: string) {
  const before = getItem(collection, id);
  if (!before) return false;
  db.prepare("DELETE FROM items WHERE collection = ? AND id = ?").run(collection, id);
  log("delete", collection, id, before);
  afterChange();
  return true;
}

export const reorderItems = db.transaction((collection: string, ids: string[]) => {
  const update = db.prepare("UPDATE items SET position = ? WHERE collection = ? AND id = ?");
  ids.forEach((id, index) => update.run(index, collection, id));
  log("reorder", collection, "*");
  afterChange();
});

type AuditRow = {
  id: number;
  at: string;
  action: string;
  collection: string;
  item_id: string;
  before: string | null;
  after: string | null;
};

export function listAudit(limit = 100) {
  return (db.prepare("SELECT * FROM audit_log ORDER BY id DESC LIMIT ?").all(limit) as AuditRow[]).map((row) => ({
    id: row.id,
    at: row.at,
    action: row.action,
    collection: row.collection,
    itemId: row.item_id,
    title: titleOf(row.after ?? row.before),
    canRestore: Boolean(row.before),
  }));
}

function titleOf(json: string | null) {
  if (!json) return "";
  const item = JSON.parse(json) as Item;
  for (const entry of Object.values(item.data)) {
    const text =
      typeof entry === "string"
        ? entry
        : entry && typeof entry === "object" && !Array.isArray(entry)
          ? String((entry as Record<string, unknown>).fr || (entry as Record<string, unknown>).en || "")
          : "";
    if (text.trim()) return text.trim().slice(0, 120);
  }
  return "";
}

export const restoreAudit = db.transaction((auditId: number) => {
  const row = db.prepare("SELECT * FROM audit_log WHERE id = ?").get(auditId) as AuditRow | undefined;
  if (!row?.before) return false;
  const snapshot = JSON.parse(row.before) as Item;
  const current = getItem(row.collection, row.item_id);
  if (current) {
    updateItem(row.collection, row.item_id, snapshot.data, snapshot.published);
  } else {
    createItem(row.collection, snapshot.data, snapshot.published, row.item_id);
  }
  return true;
});
