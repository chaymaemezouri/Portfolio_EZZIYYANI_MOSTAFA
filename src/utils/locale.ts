import type { Locale } from "@/types";

export const locales: Locale[] = ["en", "fr", "ar"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fr" || value === "ar";
}

export function localePath(locale: string, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}`;
}
