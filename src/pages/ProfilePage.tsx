import { profile, profileSections, pullQuote } from "@/data/profile";
import { JourneyTimeline } from "@/components/profile/JourneyTimeline";
import { Seo } from "@/components/shared/Seo";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { visibleSocialLinks } from "@/data/socialLinks";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function ProfilePage() {
  const { locale, t } = useI18n();
  const name = locale === "ar" && profile.nameAr
    ? profile.nameAr
    : `${profile.givenName} ${profile.familyName}`;
  const sectionPhotos: Record<string, string> = {
    overview: "/assets/profile/gallery-icea.png",
    journey: "/assets/profile/gallery-stage.png",
    leadership: "/assets/profile/gallery-desk.png",
    international: "/assets/profile/gallery-mic.png",
    advisory: "/assets/profile/gallery-congress.jpg",
    transfer: "/assets/profile/gallery-wfstc.jpg",
    responsibilities: "/assets/profile/gallery-chair.jpg",
  };
  const photo = (id: string) => sectionPhotos[id];
  const sectionClass = (id: string) => {
    const order = ["overview", "journey", ...profileSections.slice(1).map((section) => section.id)];
    return order.indexOf(id) % 2 === 1 ? "profile-section is-flip" : "profile-section";
  };

  return (
    <>
      <Seo title={t("profile.pageTitle")} description={t("meta.pages.profile")} path={localePath(locale, "profile")} />
      <section className="profile-band theme-dark">
        <div className="container profile-hero">
          <div className="profile-portrait">
            <img
              src={profile.portrait}
              alt={t("hero.portraitAlt")}
              width={profile.portraitWidth}
              height={profile.portraitHeight}
            />
          </div>
          <div>
            <p className="eyebrow">{t("profile.introLabel")}</p>
            <p className={locale === "ar" ? "hero-honorific" : "hero-honorific latin"}>
              {locale === "ar" ? profile.honorificAr : profile.honorific}
            </p>
            <h1 className={locale === "ar" ? "page-title" : "page-title latin"}>{name}</h1>
            <p className="page-lede">
              {t("hero.fields").split("\n").join(" ")}
            </p>
            {text(locale, profile.introduction) ? <p className="page-lede">{text(locale, profile.introduction)}</p> : null}
            <div className="hero-social">
              {visibleSocialLinks.map((link) => (
                <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
                  <SocialIcon id={link.id} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="container" style={{ paddingBottom: "var(--section-y)" }}>
        <section className={sectionClass("overview")} id="overview">
          <div className="profile-copy">
            <h2>{t("profile.sections.overview")}</h2>
            <div className="prose">
              {profileSections[0]?.paragraphs.map((paragraph, index) => <p key={index}>{text(locale, paragraph)}</p>)}
              {profileSections[0]?.facts.length ? (
                <dl className="fact-list">
                  {profileSections[0].facts.map((fact) => (
                    <div key={text(locale, fact.label)}>
                      <dt>{text(locale, fact.label)}</dt>
                      <dd>{text(locale, fact.value)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {text(locale, pullQuote.text) ? (
                <blockquote className="pull-quote">
                  {text(locale, pullQuote.text)}
                  {text(locale, pullQuote.source) ? <cite>{text(locale, pullQuote.source)}</cite> : null}
                </blockquote>
              ) : null}
              {!profile.introduction && !profileSections[0]?.paragraphs.length ? <p className="empty-note">{t("profile.empty")}</p> : null}
            </div>
          </div>
          {photo("overview") ? (
            <figure className="profile-aside">
              <img src={photo("overview")} alt={t("hero.portraitAlt")} />
            </figure>
          ) : null}
        </section>
        <section className={sectionClass("journey")} id="journey">
          <div className="profile-copy">
            <h2>{t("profile.sections.journey")}</h2>
            <JourneyTimeline />
          </div>
          {photo("journey") ? (
            <figure className="profile-aside">
              <img src={photo("journey")} alt={t("hero.portraitAlt")} />
            </figure>
          ) : null}
        </section>
        {profileSections.slice(1).map((section) => {
          const image = photo(section.id);
          return (
          <section className={sectionClass(section.id)} id={section.id} key={section.id}>
            <div className="profile-copy">
              <h2>{t(`profile.sections.${section.id}`)}</h2>
              <div className="prose">
                {section.paragraphs.map((paragraph, index) => <p key={index}>{text(locale, paragraph)}</p>)}
                {section.facts.length ? (
                  <dl className="fact-list">
                    {section.facts.map((fact) => (
                      <div key={text(locale, fact.label)}>
                        <dt>{text(locale, fact.label)}</dt>
                        <dd>{text(locale, fact.value)}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {!section.paragraphs.length && !section.facts.length ? <p className="empty-note">{t("profile.empty")}</p> : null}
              </div>
            </div>
            {image ? (
              <figure className="profile-aside">
                <img src={image} alt={t("hero.portraitAlt")} />
              </figure>
            ) : null}
          </section>
          );
        })}
      </div>
    </>
  );
}
