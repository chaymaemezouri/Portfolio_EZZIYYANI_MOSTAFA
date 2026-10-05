import { awardCategories, awards } from "@/data/awards";
import { certifications } from "@/data/certifications";
import { LeadershipList } from "@/components/recognition/LeadershipList";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { joinText, text } from "@/utils/text";

export default function RecognitionPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("recognition.pageTitle")} description={t("meta.pages.recognition")} path={localePath(locale, "recognition")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("recognition.pageTitle")}</h1>
        <p className="page-lede">{t("recognition.intro")}</p>
      </header>
      <section className="container" style={{ paddingBottom: "2rem" }}>
        {awardCategories.filter((category) => category !== "certification" && awards.some((item) => item.category === category)).map((category) => {
          const items = awards.filter((item) => item.category === category);
          return (
            <div className="record-block" key={category} id={category}>
              <h2>{t(`recognition.categories.${category}`)}</h2>
              {items.length === 0 ? <p className="empty-note">{t("recognition.empty")}</p> : (
                <ol className="archive-list">
                  {items.map((item) => (
                    <li key={item.id}>
                      <span className="archive-year">{item.year || "—"}</span>
                      <span>
                        <span className="archive-title">{text(locale, item.title)}</span>
                        <span className="archive-meta">{joinText(locale, [item.institution, item.metadata])}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          );
        })}
      </section>
      <section className="container record-block" id="leadership" style={{ paddingBottom: "2rem" }}>
        <h2>{t("leadership.title")}</h2>
        <LeadershipList />
      </section>
      <section className="container record-block" id="certification" style={{ paddingBottom: "var(--section-y)" }}>
        <h2>{t("certifications.title")}</h2>
        {certifications.length === 0 ? <p className="empty-note">{t("certifications.empty")}</p> : (
          <ul className="cert-list">
            {certifications.map((item) => (
              <li key={item.id}>
                <span>
                  <strong>{text(locale, item.title)}</strong>
                  <span className="archive-meta">{text(locale, item.organization)}</span>
                </span>
                <span>{item.year}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
