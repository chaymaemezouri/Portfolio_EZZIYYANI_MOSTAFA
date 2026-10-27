import bcrypt from "bcryptjs";
import type { Context, Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { jwtVerify, SignJWT } from "jose";
import { env } from "./env";

const COOKIE = "ez_admin";
const SESSION_SECONDS = 8 * 60 * 60;
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

const failures = new Map<string, { count: number; until: number }>();

export function clientIp(c: Context) {
  const forwarded = c.req.header("x-real-ip") ?? c.req.header("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const incoming = (c.env as { incoming?: { socket?: { remoteAddress?: string } } } | undefined)?.incoming;
  return incoming?.socket?.remoteAddress?.replace(/^::ffff:/, "") || "unknown";
}

export function isLocked(ip: string) {
  const entry = failures.get(ip);
  return Boolean(entry && entry.until > Date.now());
}

export async function checkCredentials(ip: string, email: string, password: string) {
  const valid =
    email.trim().toLowerCase() === env.adminEmail() && (await bcrypt.compare(password, env.adminPasswordHash()));
  if (valid) {
    failures.delete(ip);
    return true;
  }
  const entry = failures.get(ip) ?? { count: 0, until: 0 };
  entry.count += 1;
  if (entry.count >= MAX_FAILURES) {
    entry.until = Date.now() + LOCK_MS;
    entry.count = 0;
  }
  failures.set(ip, entry);
  return false;
}

export async function openSession(c: Context) {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(env.adminEmail())
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(env.jwtSecret());
  setCookie(c, COOKIE, token, {
    httpOnly: true,
    secure: c.req.url.startsWith("https:"),
    sameSite: "Strict",
    path: "/api",
    maxAge: SESSION_SECONDS,
  });
}

export function closeSession(c: Context) {
  deleteCookie(c, COOKIE, { path: "/api" });
}

export async function sessionEmail(c: Context) {
  const token = getCookie(c, COOKIE);
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, env.jwtSecret(), { algorithms: ["HS256"] });
    return payload.sub === env.adminEmail() ? payload.sub : null;
  } catch {
    return null;
  }
}

export async function requireAdmin(c: Context, next: Next) {
  if (!(await sessionEmail(c))) return c.json({ error: "Non autorisé" }, 401);
  await next();
}
