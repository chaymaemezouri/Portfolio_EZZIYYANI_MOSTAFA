import { researchIntro, researchLines } from "@/data/publications";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import { ArrowUpRight, BrainCircuit, Database, Globe2, GraduationCap, Network, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import { ResearchHero } from "@/components/research/ResearchHero";

const lineIcons = [Network, Database, BrainCircuit, ScanLine, Globe2, GraduationCap];
const linePaths = ["research-interest", "research-interest", "research-interest", "patents", "projects", "team"];

export default function ResearchPage() {
  const { locale, t } = useI18n();

  return (
    <div className="science-page">
      <Seo title={t("research.pageTitle")} description={t("meta.pages.research")} path={localePath(locale, "research")} />
      <ResearchHero eyebrow={t("research.areas")} title={t("research.pageTitle")} description={text(locale, researchIntro[0])} />
      <section className="container research-corpus">
        <div className="science-section-heading">
          <div><p className="eyebrow">{t("research.areas")}</p><h2>{t("research.corpus")}</h2></div>
          <p>{text(locale, researchIntro[1])}</p>
        </div>
        <div className="research-board">
          {researchLines.map((line, index) => {
            const Icon = lineIcons[index % lineIcons.length];
            return (
            <article key={line.id}>
              <div className="research-card-top"><span className="research-card-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3><Link to={localePath(locale, linePaths[index])}>{text(locale, line.label)}<ArrowUpRight size={21} aria-hidden="true" /></Link></h3>
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
