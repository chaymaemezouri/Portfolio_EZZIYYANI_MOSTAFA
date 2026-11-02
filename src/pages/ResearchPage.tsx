import { researchIntro, researchLines } from "@/data/publications";
import { Seo } from "@/components/shared/Seo";
import { usePlatforms } from "@/content/hooks";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import { ArrowUpRight, BrainCircuit, Database, Globe2, GraduationCap, Network, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";

const lineIcons = [Network, Database, BrainCircuit, ScanLine, Globe2, GraduationCap];
const linePaths = ["research-interest", "research-interest", "research-interest", "patents", "projects", "team"];

export default function ResearchPage() {
  const { locale, t } = useI18n();
  const platforms = usePlatforms();

  return (
    <div className="science-page">
      <Seo title={t("research.pageTitle")} description={t("meta.pages.research")} path={localePath(locale, "research")} />
      <header className="container vision-open">
        <div>
          <h1 className="page-title">{t("research.pageTitle")}</h1>
        </div>
        <p className="page-lede">{text(locale, researchIntro[0])}</p>
      </header>

      <section className="container platform-section">
        <div className="science-section-heading">
          <div>
            <p className="eyebrow">{t("platforms.eyebrow")}</p>
            <h2>{t("platforms.title")}</h2>
          </div>
          <p>{t("platforms.lede")}</p>
        </div>
        <div className="platform-grid">
          {platforms.map((item, index) => (
            <article key={item.id} className="platform-card">
              <div className="platform-card-top">
                <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="platform-host">{item.host}</span>
              </div>
              <h3>{text(locale, item.title)}</h3>
              <p>{text(locale, item.description)}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {t("platforms.open")}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="container research-corpus">
        <div className="science-section-heading">
          <div>
            <p className="eyebrow">{t("research.areas")}</p>
            <h2>{t("research.corpus")}</h2>
          </div>
          <p>{text(locale, researchIntro[1])}</p>
        </div>
        <div className="research-board">
          {researchLines.map((line, index) => {
            const Icon = lineIcons[index % lineIcons.length];
            return (
              <article key={line.id}>
                <div className="research-card-top">
                  <span className="research-card-icon">
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>
                  <Link to={localePath(locale, linePaths[index])}>
                    {text(locale, line.label)}
                    <ArrowUpRight size={21} aria-hidden="true" />
                  </Link>
                </h3>
                <p>{text(locale, line.detail)}</p>
              </article>
            );
          })}
        </div>
        <p className="research-orcid">
          <a href="https://orcid.org/0000-0002-8828-4972" target="_blank" rel="noreferrer">
            ORCID 0000-0002-8828-4972
          </a>
        </p>
      </section>
    </div>
  );
}
