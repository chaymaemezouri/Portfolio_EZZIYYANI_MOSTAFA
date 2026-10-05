import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import ar from "@/locales/ar.json";
import type { Locale } from "@/types";

type Dictionary = { [key: string]: string | Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

function lookup(dictionary: Dictionary, key: string): string {
  const value = key.split(".").reduce<string | Dictionary | undefined>((current, part) => {
    if (!current || typeof current === "string") return undefined;
    return current[part];
  }, dictionary);
  return typeof value === "string" ? value : key;
}

interface I18nValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      dir,
      t: (key: string) => lookup(dictionaries[locale], key),
    }),
    [locale, dir],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used within I18nProvider");
  return value;
}
