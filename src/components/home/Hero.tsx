import { Link } from "react-router-dom";
import { Landmark, Lightbulb, Send, Shield, Users } from "lucide-react";
import { profile } from "@/data/profile";
import { socialById } from "@/data/socialLinks";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { Impact } from "@/components/home/Impact";
import { AvatarMark } from "@/components/shared/AvatarMark";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

const heroPortrait = {
  src: "/assets/profile/portrait-accueil.png",
  width: 779,
  height: 982,
};

const heroSocial = ["facebook", "youtube", "orcid", "linkedin"];

const facts = [
  { id: "professor", Icon: Landmark },
  { id: "transfer", Icon: Lightbulb },
  { id: "council", Icon: Users },
  { id: "cyber", Icon: Shield },
] as const;

export function Hero() {
  const { locale, t } = useI18n();
  const displayName = locale === "ar" && profile.nameAr ? profile.nameAr : null;
  const editionName = displayName ?? `${profile.givenName} ${profile.familyName}`;

  return (
    <div className="hero-bleed">
      <div className="hero-flow" aria-hidden="true" />
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
          <ul className="hero-facts">
            {facts.map(({ id, Icon }) => (
              <li key={id}>
                <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                <span>{t(`hero.facts.${id}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <div className="portrait-frame">
            <div className="portrait-crop">
              <img
                src={heroPortrait.src}
                alt={t("hero.portraitAlt")}
                width={heroPortrait.width}
                height={heroPortrait.height}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="hero-edition">
          <p className="hero-edition-kicker">
            <AvatarMark />
          </p>
          <span className="hero-edition-avatar">
            <img src={heroPortrait.src} alt="" width={128} height={128} />
          </span>
          <h2>{editionName}</h2>
          <p className="hero-edition-text">{t("hero.assistant.greeting")}</p>
          <div className="hero-chips">
            {(["teaching", "science", "technology", "innovation", "strategy", "consulting"] as const).map((id) => (
              <span key={id}>{t(`hero.assistant.prompts.${id}`)}</span>
            ))}
          </div>
          <span className="hero-ask">
            <span>{t("hero.assistant.placeholder")}</span>
            <span className="hero-ask-send" aria-hidden="true">
              <Send size={14} strokeWidth={2} />
            </span>
          </span>
          <span className="hero-edition-open">{t("hero.assistant.open")}</span>
        </div>
        <Impact />
      </section>
    </div>
  );
}
