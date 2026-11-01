import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Download, FileText, X } from "lucide-react";
import { juryTypes, type JuryDocument, type JuryTypeId } from "@/data/jury";
import { Seo } from "@/components/shared/Seo";
import { useJury } from "@/content/hooks";
import { useLockBody } from "@/hooks/useLockBody";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

function isJuryType(value: string | undefined): value is JuryTypeId {
  return juryTypes.some((item) => item.path === value);
}

export default function JuryPage() {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();
  const documents = useJury();
  const [activeDoc, setActiveDoc] = useState<JuryDocument | null>(null);

  const activeType = useMemo(
    () => juryTypes.find((item) => item.path === section) ?? juryTypes[0],
    [section],
  );

  const typeDocs = useMemo(
    () => documents.filter((item) => item.type === activeType.id),
    [documents, activeType.id],
  );

  useLockBody(Boolean(activeDoc));

  useEffect(() => {
    setActiveDoc(null);
  }, [activeType.id]);

  useEffect(() => {
    if (!activeDoc) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDoc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeDoc]);

  if (!section || !isJuryType(section)) {
    return <Navigate to={localePath(locale, `jury/${juryTypes[0].path}`)} replace />;
  }

  return (
    <>
      <Seo
        title={`${t("nav.jury")} — ${text(locale, activeType.title)}`}
        description={t("meta.pages.jury")}
        path={localePath(locale, `jury/${activeType.path}`)}
      />
      <header className="container vision-open">
        <div>
          <h1 className="page-title">{t("nav.jury")}</h1>
        </div>
        <p className="page-lede">{t("jury.intro")}</p>
      </header>

      <section className="container vision-doc-wrap">
        <article className="articles-reader">
          <aside className="articles-nav" aria-label={t("jury.sections")}>
            <p className="eyebrow">{t("jury.sections")}</p>
            <ul>
              {juryTypes.map((item, index) => {
                const current = item.id === activeType.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={current ? "is-active" : undefined}
                      aria-current={current ? "true" : undefined}
                      onClick={() => navigate(localePath(locale, `jury/${item.path}`))}
                    >
                      <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="articles-nav-title" dir="auto">
                        {text(locale, item.title)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="articles-pane">
            <header className="articles-pane-head">
              <div className="articles-pane-copy">
                <h2 dir="auto">{text(locale, activeType.title)}</h2>
                <p className="articles-summary">{t("jury.listHint")}</p>
              </div>
              <img
                className="articles-portrait"
                src="/assets/profile/portrait-article.png"
                alt={t("hero.portraitAlt")}
              />
            </header>

            {typeDocs.length ? (
              <ul className="jury-doc-list">
                {typeDocs.map((doc, index) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      className="jury-doc-item"
                      onClick={() => {
                        if (doc.file) setActiveDoc(doc);
                      }}
                      disabled={!doc.file}
                    >
                      <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="jury-doc-item-copy">
                        <span className="jury-doc-item-title" dir="auto">
                          {text(locale, doc.title)}
                        </span>
                        {doc.year ? <span className="jury-doc-item-year">{doc.year}</span> : null}
                        {text(locale, doc.summary) ? (
                          <span className="jury-doc-item-summary" dir="auto">
                            {text(locale, doc.summary)}
                          </span>
                        ) : null}
                      </span>
                      <FileText size={18} className="jury-doc-item-icon" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="articles-empty">{t("jury.pending")}</p>
            )}
          </div>
        </article>
      </section>

      {activeDoc?.file ? (
        <div className="jury-pdf-modal" role="presentation" onClick={() => setActiveDoc(null)}>
          <div
            className="jury-pdf-card"
            role="dialog"
            aria-modal="true"
            aria-label={text(locale, activeDoc.title)}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="jury-pdf-card-head">
              <div>
                <p className="science-content-kicker">{text(locale, activeType.title)}</p>
                <h2 dir="auto">{text(locale, activeDoc.title)}</h2>
              </div>
              <div className="jury-pdf-card-actions">
                <a className="articles-download" href={activeDoc.file} download>
                  <Download size={15} aria-hidden="true" />
                  {t("jury.download")}
                </a>
                <button
                  type="button"
                  className="jury-pdf-close"
                  aria-label={t("common.close")}
                  onClick={() => setActiveDoc(null)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </header>
            <iframe
              className="jury-pdf-frame"
              src={`${activeDoc.file}#view=FitH`}
              title={text(locale, activeDoc.title)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
