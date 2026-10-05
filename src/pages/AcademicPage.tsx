import { academicNarrative, academicStats, supervision } from "@/data/academic";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function AcademicPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("academic.pageTitle")} description={t("meta.pages.academic")} path={localePath(locale, "academic")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("academic.pageTitle")}</h1>
        <p className="page-lede">{t("academic.intro")}</p>
        <div className="stats-row">
          {academicStats.filter((stat) => stat.display || stat.value !== null).map((stat) => (
            <article key={stat.id} className="stat-block">
              <p className="stat-value">
                {stat.display ?? stat.value}
              </p>
              <p className="stat-label">{t(`academic.stats.${stat.id}`)}</p>
            </article>
          ))}
        </div>
      </header>
      <section className="container" style={{ paddingBottom: "var(--section-y)" }}>
        <div className="record-block prose">
          {academicNarrative.map((paragraph, index) => (
            <p key={index}>{text(locale, paragraph)}</p>
          ))}
        </div>
        {supervision.length > 0 ? <div className="record-block">
          <h2>{t("academic.selected")}</h2>
          <table className="sup-table">
            <thead>
              <tr>
                <th>{t("academic.cols.name")}</th>
                <th>{t("academic.cols.title")}</th>
                <th>{t("academic.cols.year")}</th>
                <th>{t("academic.cols.level")}</th>
                <th>{t("academic.cols.institution")}</th>
              </tr>
            </thead>
            <tbody>
              {supervision.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.title}</td>
                  <td>{item.year}</td>
                  <td>{t(`academic.levels.${item.level}`)}</td>
                  <td>{item.institution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : null}
      </section>
    </>
  );
}
