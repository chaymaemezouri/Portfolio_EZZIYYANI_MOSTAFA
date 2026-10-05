import { useEffect } from "react";
import { profile } from "@/data/profile";
import { visibleSocialLinks } from "@/data/socialLinks";
import { site } from "@/data/site";
import { locales, localePath } from "@/utils/locale";
import { useI18n } from "@/i18n/I18nProvider";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

interface SeoProps {
  title: string;
  description: string;
  path: string;
}

export function Seo({ title, description, path }: SeoProps) {
  const { locale, t } = useI18n();

  useEffect(() => {
    const siteName = t("meta.siteName");
    const fullTitle = title === siteName ? title : `${title} — ${siteName}`;
    document.title = fullTitle;

    const origin = site.url || window.location.origin;
    const url = `${origin}${path}`;
    const image = `${origin}${profile.portrait}`;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", locale === "fr" ? "fr_FR" : locale === "ar" ? "ar" : "en_US");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    document.head.querySelectorAll('link[data-alt="lang"]').forEach((node) => node.remove());
    locales.forEach((item) => {
      const alternate = document.createElement("link");
      alternate.rel = "alternate";
      alternate.hreflang = item;
      alternate.href = `${origin}${localePath(item, path.split("/").slice(2).join("/"))}`;
      alternate.setAttribute("data-alt", "lang");
      document.head.appendChild(alternate);
    });

    const person = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mostafa Ezziyyani",
      honorificPrefix: "Prof. Dr.",
      email: profile.email,
      telephone: profile.phone,
      url,
      image,
      sameAs: visibleSocialLinks.map((link) => link.href),
    };
    let script = document.getElementById("ld-person");
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-person";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(person);
  }, [title, description, path, locale, t]);

  return null;
}
