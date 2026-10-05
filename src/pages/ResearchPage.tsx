import { impactMetrics } from "@/data/impact";
import { researchIntro, researchLines } from "@/data/publications";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

const figureOrder = ["publications", "supervision", "projects", "experience"] as const;

export default function ResearchPage() {
  const { locale, t } = useI18n();
  const figures = figureOrder
    .map((id) => impactMetrics.find((metric) => metric.id === id))
    .filter((metric) => metric != null);

  return (
    <>
      <Seo title={t("research.pageTitle")} description={t("meta.pages.research")} path={localePath(locale, "research")} />
      <header className="container research-open">
        <div className="research-lead">
          <div>
            <p className="eyebrow">{t("research.areas")}</p>
            <h1 className="page-title">{t("research.pageTitle")}</h1>
          </div>
          <div className="research-intro">
            {researchIntro.map((paragraph) => (
              <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>
            ))}
          </div>
        </div>
        <dl className="research-figures">
          {figures.map((metric) => (
            <div key={metric.id}>
              <dt>{t(`impact.${metric.id}`)}</dt>
              <dd>{metric.display}</dd>
            </div>
          ))}
        </dl>
      </header>
      <section className="container research-corpus">
        <h2>{t("research.corpus")}</h2>
        <div className="research-board">
          {researchLines.map((line) => (
            <article key={line.id}>
              <h3>{text(locale, line.label)}</h3>
              <p>{text(locale, line.detail)}</p>
            </article>
          ))}
        </div>
        <p className="research-orcid">
          <a href="https://orcid.org/0000-0002-8828-4972" target="_blank" rel="noreferrer">
            ORCID 0000-0002-8828-4972
          </a>
        </p>
      </section>
    </>
  );
}
