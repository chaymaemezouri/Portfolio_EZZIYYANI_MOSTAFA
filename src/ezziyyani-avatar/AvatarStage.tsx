import { Link } from "react-router-dom";
import { impactMetrics } from "@/data/impact";
import { profile } from "@/data/profile";
import { AvatarMark } from "@/components/shared/AvatarMark";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

const portrait = {
  src: "/assets/profile/portrait-accueil.png",
  width: 779,
  height: 982,
};

const shortcuts = ["profile", "research", "contact"] as const;

export function AvatarStage() {
  const { locale, t } = useI18n();
  const name = locale === "ar" && profile.nameAr ? profile.nameAr : `${profile.givenName} ${profile.familyName}`;
  const honorific = locale === "ar" && profile.honorificAr ? profile.honorificAr : profile.honorific;

  return (
    <aside className="ez-avatar-stage">
      <div className="ez-avatar-glow" aria-hidden="true" />
      <p className="ez-avatar-kicker">{t("hero.assistant.official")}</p>
      <div className="ez-avatar-figure">
        <div className="ez-avatar-orb">
          <img src={portrait.src} alt={t("hero.portraitAlt")} width={portrait.width} height={portrait.height} />
        </div>
        <div className="ez-avatar-eq" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      </div>
      <div className="ez-avatar-identity">
        <AvatarMark />
        <p className="ez-avatar-honorific">{honorific}</p>
        <h1>{name}</h1>
        <p className="ez-avatar-roles">{t("hero.role1")} · {t("hero.role2")} · {t("hero.role3")}</p>
      </div>
      <ul className="ez-avatar-facts">
        {impactMetrics.map((item) => (
          <li key={item.id}>
            <strong>{item.display}</strong>
            <span>{t(`impact.${item.id}`)}</span>
          </li>
        ))}
      </ul>
      <nav className="ez-avatar-shortcuts" aria-label={t("nav.menu")}>
        {shortcuts.map((id) => (
          <Link key={id} to={localePath(locale, id)}>
            {t(`nav.${id}`)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
