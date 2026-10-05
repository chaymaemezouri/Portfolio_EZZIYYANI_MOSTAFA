import { Link } from "react-router-dom";
import { profile } from "@/data/profile";
import { socialById } from "@/data/socialLinks";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

const heroSocial = ["linkedin", "orcid", "youtube", "facebook"];

export function Hero() {
  const { locale, t } = useI18n();
  const displayName = locale === "ar" && profile.nameAr ? profile.nameAr : null;

  return (
    <div className="hero-bleed">
    <div className="hero-flow" aria-hidden="true">
      <span className="hero-grid" />
      <svg className="hero-net" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M0 210H520" />
        <path d="M980 160H1440" />
      </svg>
    </div>
    <section className="hero container">
      <div className="hero-copy">
        <p className="hero-roles">
          <span>{t("hero.role1")}</span>
          <span>{t("hero.role2")}</span>
          <span>{t("hero.role3")}</span>
        </p>
        {displayName ? (
          <>
            <p className="hero-honorific">{profile.honorificAr}</p>
            <h1 className="hero-name">{displayName}</h1>
          </>
        ) : (
          <>
            <p className="hero-honorific latin">{profile.honorific}</p>
            <h1 className="hero-name latin">
              <span>{profile.givenName}</span>
              <span>{profile.familyName}</span>
            </h1>
          </>
        )}
        <p className="hero-lead">{t("hero.lead")}</p>
        <p className="hero-fields">
          {t("hero.fields")
            .split(/\n|·/)
            .map((part) => part.trim())
            .filter(Boolean)
            .map((field) => (
              <span key={field}>{field}</span>
            ))}
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to={localePath(locale, "profile")}>
            {t("hero.explore")}
          </Link>
          <Link className="btn btn-ghost" to={localePath(locale, "research")}>
            {t("hero.research")}
          </Link>
        </div>
        <div className="hero-social">
          {heroSocial.map((id) => {
            const link = socialById(id);
            if (!link) return null;
            return (
              <a key={id} href={link.href} target="_blank" rel="noreferrer">
                <SocialIcon id={id} />
                {link.label}
                <span className="sr-only"> {t("common.external")}</span>
              </a>
            );
          })}
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame">
          <div className="portrait-crop">
            <img
              src={profile.portrait}
              alt={t("hero.portraitAlt")}
              width={profile.portraitWidth}
              height={profile.portraitHeight}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="portrait-front" aria-hidden="true">
            <span className="pf-corner pf-tl" />
            <span className="pf-corner pf-tr" />
            <span className="pf-corner pf-bl" />
            <span className="pf-corner pf-br" />
            <span className="pf-node" />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
