import { existsSync } from "node:fs";
import { resolve } from "node:path";

const envFile = resolve(import.meta.dirname, "../.env");
if (existsSync(envFile)) process.loadEnvFile(envFile);

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 8787),
  production: process.env.NODE_ENV === "production",
  databasePath: process.env.DATABASE_PATH ?? resolve(import.meta.dirname, "../data/content.db"),
  uploadDir: process.env.UPLOAD_DIR ?? resolve(import.meta.dirname, "../uploads"),
  adminEmail: () => required("ADMIN_EMAIL").toLowerCase(),
  adminPasswordHash: () => required("ADMIN_PASSWORD_HASH"),
  jwtSecret: () => {
    const secret = required("JWT_SECRET");
    if (secret.length < 32) throw new Error("JWT_SECRET must be at least 32 characters");
    return new TextEncoder().encode(secret);
  },
};
