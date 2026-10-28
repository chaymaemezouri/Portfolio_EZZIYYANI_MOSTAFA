import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { secureHeaders } from "hono/secure-headers";
import { getCollection, validateItem } from "../../src/content/collections";
import { checkCredentials, clientIp, closeSession, isLocked, openSession, requireAdmin, sessionEmail } from "./auth";
import { createItem, deleteItem, getItem, listAudit, listItems, reorderItems, restoreAudit, updateItem } from "./db";
import { env } from "./env";
import { publishPublicContent } from "./publish";

const MAX_UPLOAD = 25 * 1024 * 1024;
const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/zip": "zip",
};

mkdirSync(env.uploadDir, { recursive: true });
if (env.distDir) mkdirSync(join(env.distDir, "cms"), { recursive: true });
publishPublicContent();

const app = new Hono();

app.use("*", secureHeaders());

app.use(
  "/uploads/*",
  serveStatic({
    root: env.uploadDir,
    rewriteRequestPath: (path) => path.replace(/^\/uploads/, ""),
  }),
);

app.get("/api/health", (c) => c.json({ ok: true }));

app.get("/api/content/:collection", (c) => {
  const collection = getCollection(c.req.param("collection"));
  if (!collection) return c.json({ error: "Collection inconnue" }, 404);
  c.header("Cache-Control", "no-cache");
  return c.json(listItems(collection.id, true).map((item) => ({ id: item.id, ...item.data })));
});

app.post("/api/auth/login", async (c) => {
  const ip = clientIp(c);
  if (isLocked(ip)) return c.json({ error: "Trop de tentatives. Réessayez dans 15 minutes." }, 429);
  const body = (await c.req.json().catch(() => ({}))) as { email?: string; password?: string };
  if (!(await checkCredentials(ip, body.email ?? "", body.password ?? ""))) {
    return c.json({ error: "Identifiants incorrects" }, 401);
  }
  await openSession(c);
  return c.json({ ok: true });
});

app.post("/api/auth/logout", (c) => {
  closeSession(c);
  return c.json({ ok: true });
});

app.get("/api/auth/me", async (c) => {
  const email = await sessionEmail(c);
  return email ? c.json({ email }) : c.json({ error: "Non connecté" }, 401);
});

const admin = new Hono();
admin.use("*", requireAdmin);

admin.get("/audit", (c) => c.json(listAudit()));

admin.post("/audit/:id/restore", (c) => {
  const ok = restoreAudit(Number(c.req.param("id")));
  return ok ? c.json({ ok }) : c.json({ error: "Rien à restaurer" }, 400);
});

admin.post("/upload", bodyLimit({ maxSize: MAX_UPLOAD, onError: (c) => c.json({ error: "Fichier trop lourd (25 Mo max)" }, 413) }), async (c) => {
  const body = await c.req.parseBody();
  const file = body.file;
  if (!(file instanceof File)) return c.json({ error: "Aucun fichier" }, 400);
  const ext = allowedTypes[file.type];
  if (!ext) return c.json({ error: "Type de fichier non autorisé" }, 415);
  const month = new Date().toISOString().slice(0, 7);
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .toLowerCase();
  const name = `${Date.now()}-${base || "fichier"}.${ext}`;
  mkdirSync(join(env.uploadDir, month), { recursive: true });
  await writeFile(join(env.uploadDir, month, name), Buffer.from(await file.arrayBuffer()));
  return c.json({ url: `/uploads/${month}/${name}` });
});

admin.get("/:collection", (c) => {
  const collection = getCollection(c.req.param("collection"));
  if (!collection) return c.json({ error: "Collection inconnue" }, 404);
  return c.json(listItems(collection.id, false));
});

admin.get("/:collection/:id", (c) => {
  const item = getItem(c.req.param("collection"), c.req.param("id"));
  return item ? c.json(item) : c.json({ error: "Introuvable" }, 404);
});

admin.post("/:collection", async (c) => {
  const collection = getCollection(c.req.param("collection"));
  if (!collection) return c.json({ error: "Collection inconnue" }, 404);
  const body = (await c.req.json().catch(() => ({}))) as { data?: unknown; published?: boolean };
  const { data, errors } = validateItem(collection, body.data);
  if (errors.length) return c.json({ error: "Données invalides", details: errors }, 422);
  return c.json(createItem(collection.id, data, body.published ?? true), 201);
});

admin.put("/:collection/:id", async (c) => {
  const collection = getCollection(c.req.param("collection"));
  if (!collection) return c.json({ error: "Collection inconnue" }, 404);
  const body = (await c.req.json().catch(() => ({}))) as { data?: unknown; published?: boolean };
  const { data, errors } = validateItem(collection, body.data);
  if (errors.length) return c.json({ error: "Données invalides", details: errors }, 422);
  const item = updateItem(collection.id, c.req.param("id"), data, body.published ?? true);
  return item ? c.json(item) : c.json({ error: "Introuvable" }, 404);
});

admin.delete("/:collection/:id", (c) => {
  const ok = deleteItem(c.req.param("collection"), c.req.param("id"));
  return ok ? c.json({ ok }) : c.json({ error: "Introuvable" }, 404);
});

admin.post("/:collection/reorder", async (c) => {
  const collection = getCollection(c.req.param("collection"));
  if (!collection) return c.json({ error: "Collection inconnue" }, 404);
  const body = (await c.req.json().catch(() => ({}))) as { ids?: unknown };
  if (!Array.isArray(body.ids) || !body.ids.every((id) => typeof id === "string")) {
    return c.json({ error: "Ordre invalide" }, 400);
  }
  reorderItems(collection.id, body.ids as string[]);
  return c.json({ ok: true });
});

app.route("/api/admin", admin);

if (env.distDir && existsSync(join(env.distDir, "index.html"))) {
  app.use("/*", serveStatic({ root: env.distDir }));
  app.notFound((c) => {
    if (c.req.path.startsWith("/api")) return c.json({ error: "Introuvable" }, 404);
    return c.html(readFileSync(join(env.distDir, "index.html"), "utf8"));
  });
}

serve({ fetch: app.fetch, port: env.port, hostname: env.host }, (info) => {
  console.log(`API ready on http://${info.address}:${info.port}`);
});
