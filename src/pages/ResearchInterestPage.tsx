import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { researchInterestAxes, researchInterestIntro } from "@/data/researchInterest";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import { ArrowRight, BrainCircuit, ChevronDown, Layers3 } from "lucide-react";
import { ResearchHero } from "@/components/research/ResearchHero";

export default function ResearchInterestPage() {
  const { locale, t } = useI18n();
  const [params, setParams] = useSearchParams();
  const requested = params.get("axis") ?? "";
  const activeId = useMemo(() => {
    if (researchInterestAxes.some((axis) => axis.id === requested)) return requested;
    return researchInterestAxes[0]?.id ?? "";
  }, [requested]);
  const [selected, setSelected] = useState(activeId);

  useEffect(() => {
    setSelected(activeId);
  }, [activeId]);

  const axis = researchInterestAxes.find((item) => item.id === selected) ?? researchInterestAxes[0];
  const hasBody =
    Boolean(axis?.paragraphs.length) ||
    Boolean(axis?.bullets?.length) ||
    Boolean(axis?.afterBullets?.length) ||
    Boolean(axis?.steps?.length);

  const selectAxis = (id: string) => {
    setSelected(id);
    setParams(id === researchInterestAxes[0]?.id ? {} : { axis: id }, { replace: true });
  };

  return (
    <div className="science-page">
      <Seo
        title={t("researchInterest.pageTitle")}
        description={t("meta.pages.researchInterest")}
        path={localePath(locale, "research-interest")}
      />
      <ResearchHero eyebrow={t("researchInterest.eyebrow")} title={t("researchInterest.pageTitle")} description={t("researchInterest.intro")} variant="interests" />
      <div className="container science-interest-intro">
        <details className="project-approach">
          <summary><span><BrainCircuit size={18} aria-hidden="true" />{t("researchInterest.approach")}</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="project-approach-copy interest-approach-copy">
            {researchInterestIntro.map((paragraph) => <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>)}
          </div>
        </details>
      </div>
      <section className="container interest-layout">
        <aside className="interest-side">
          <h2><Layers3 size={17} aria-hidden="true" />{t("researchInterest.axes")}<span>{researchInterestAxes.length}</span></h2>
          <nav aria-label={t("researchInterest.axes")}>
            {researchInterestAxes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={item.id === selected ? "is-active" : undefined}
                aria-pressed={item.id === selected}
                aria-controls="research-axis-panel"
                onClick={() => selectAxis(item.id)}
              >
                <span className="axis-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="axis-label">{text(locale, item.shortLabel)}</span>
                <ArrowRight size={16} className="icon-dir" aria-hidden="true" />
              </button>
            ))}
          </nav>
        </aside>
        <article className="interest-panel" id="research-axis-panel" aria-live="polite" aria-labelledby="research-axis-title">
          <div className="interest-panel-heading"><span className="research-card-icon"><BrainCircuit size={26} aria-hidden="true" /></span><span>{String(researchInterestAxes.findIndex((item) => item.id === selected) + 1).padStart(2, "0")} / {String(researchInterestAxes.length).padStart(2, "0")}</span></div>
          <p className="science-content-kicker">{t("researchInterest.eyebrow")}</p>
          <h2 id="research-axis-title">{axis ? text(locale, axis.title) : ""}</h2>
          {hasBody ? (
            <>
              {axis?.paragraphs.map((paragraph) => (
                <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>
              ))}
              {axis?.bullets?.length ? (
                <ul className="interest-bullets">
                  {axis.bullets.map((item) => (
                    <li key={text(locale, item)}>{text(locale, item)}</li>
                  ))}
                </ul>
              ) : null}
              {axis?.afterBullets?.map((paragraph) => (
                <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>
              ))}
              {axis?.steps?.length ? (
                <ol className="interest-steps">
                  {axis.steps.map((item) => (
                    <li key={text(locale, item)}>{text(locale, item)}</li>
                  ))}
                </ol>
              ) : null}
            </>
          ) : (
            <p className="interest-pending">{t("researchInterest.pending")}</p>
          )}
        </article>
      </section>
    </div>
  );
}
