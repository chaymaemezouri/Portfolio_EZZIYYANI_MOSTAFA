import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { researchInterestAxes, researchInterestIntro } from "@/data/researchInterest";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

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
    <>
      <Seo
        title={t("researchInterest.pageTitle")}
        description={t("meta.pages.researchInterest")}
        path={localePath(locale, "research-interest")}
      />
      <header className="container interest-open">
        <p className="eyebrow">{t("researchInterest.eyebrow")}</p>
        <h1 className="page-title">{t("researchInterest.pageTitle")}</h1>
        <div className="interest-intro">
          {researchInterestIntro.map((paragraph) => (
            <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>
          ))}
        </div>
      </header>
      <section className="container interest-layout">
        <aside className="interest-side">
          <h2>{t("researchInterest.axes")}</h2>
          <nav aria-label={t("researchInterest.axes")}>
            {researchInterestAxes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={item.id === selected ? "is-active" : undefined}
                onClick={() => selectAxis(item.id)}
              >
                <span>{index + 1}</span>
                {text(locale, item.shortLabel)}
              </button>
            ))}
          </nav>
        </aside>
        <article className="interest-panel" id={axis?.id}>
          <h2>{axis ? text(locale, axis.title) : ""}</h2>
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
    </>
  );
}
