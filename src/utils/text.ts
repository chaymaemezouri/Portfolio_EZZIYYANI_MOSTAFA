import type { L10n, Locale, TextValue } from "@/types";

export function text(locale: Locale, value: TextValue | undefined | null): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en;
}

export function joinText(
  locale: Locale,
  parts: Array<TextValue | undefined | null>,
  separator = " · ",
): string {
  return parts.map((part) => text(locale, part)).filter(Boolean).join(separator);
}

export function l10n(en: string, fr: string, ar: string): L10n {
  return { en, fr, ar };
}
