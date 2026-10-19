import { Link, useLocation } from "react-router-dom";
import { footerAcademic, footerExplore } from "@/data/navigation";
import { useProfile } from "@/content/hooks";
import { visibleSocialLinks } from "@/data/socialLinks";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath, locales, swapLocale } from "@/utils/locale";

function footerPath(locale: string, id: string): string {
  if (id === "leadership") return `${localePath(locale, "recognition")}#leadership`;
  return localePath(locale, id);
}

export function Footer() {
  const { locale, t } = useI18n();
  const profile = useProfile();
  const { pathname } = useLocation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer theme-dark">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-name latin">
            {profile.honorific} {profile.givenName} {profile.familyName}
          </p>
          <p className="footer-role">
            {t("hero.role1")} · {t("hero.role2")} · {t("hero.role3")}
          </p>
        </div>
        <div className="footer-col">
          <h2>{t("footer.explore")}</h2>
          {footerExplore.map((id) => (
            <Link key={id} to={localePath(locale, id)}>
              {t(`nav.${id}`)}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h2>{t("footer.academic")}</h2>
          {footerAcademic.map((id) => (
            <Link key={id} to={footerPath(locale, id)}>
              {t(`nav.${id}`)}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h2>{t("footer.connect")}</h2>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          {visibleSocialLinks.map((link) => (
            <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <span className="sr-only"> {t("common.external")}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-base">
        <p>
          © {year} {profile.honorific} {profile.givenName} {profile.familyName}. {t("footer.rights")}
        </p>
        <div className="lang-switch" role="group" aria-label={t("common.language")}>
          {locales.map((item) => (
            <Link
              key={item}
              to={swapLocale(pathname, item)}
              hrefLang={item}
              lang={item}
              aria-current={item === locale ? "true" : undefined}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
        <Link to={localePath(locale, "privacy")}>{t("footer.privacy")}</Link>
      </div>
    </footer>
  );
}
