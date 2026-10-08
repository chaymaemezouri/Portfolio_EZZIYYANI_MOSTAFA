import { profile } from "@/data/profile";
import { ProfileAssistant } from "@/components/home/ProfileAssistant";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function AvatarPage() {
  const { locale, t } = useI18n();
  const name = locale === "ar" && profile.nameAr ? profile.nameAr : `${profile.givenName} ${profile.familyName}`;

  return (
    <>
      <Seo title={t("nav.avatar")} description={t("meta.pages.avatar")} path={localePath(locale, "avatar")} />
      <section className="container avatar-page">
        <img
          className="avatar-portrait"
          src={profile.portrait}
          alt={t("hero.portraitAlt")}
          width={profile.portraitWidth}
          height={profile.portraitHeight}
        />
        <div className="hero-edition avatar-panel">
          <header className="hero-edition-head">
            <div>
              <p>{t("hero.edition")}</p>
              <h1>{name}</h1>
            </div>
            <img src={profile.portrait} alt="" width={64} height={64} />
          </header>
          <ProfileAssistant />
        </div>
      </section>
    </>
  );
}
