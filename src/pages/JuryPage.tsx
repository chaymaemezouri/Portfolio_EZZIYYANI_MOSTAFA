import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Download, FileText, Maximize2, X } from "lucide-react";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  const activeType = useMemo(
    () => juryTypes.find((item) => item.path === section) ?? juryTypes[0],
    [section],
  );

  const typeDocs = useMemo(
    () => documents.filter((item) => item.type === activeType.id),
    [documents, activeType.id],
  );

  const selected: JuryDocument | null = useMemo(() => {
    if (!typeDocs.length) return null;
    return typeDocs.find((item) => item.id === selectedId) ?? typeDocs[0];
  }, [typeDocs, selectedId]);

  const photos = selected?.photos?.filter(Boolean) ?? [];

  useLockBody(viewerOpen);

  useEffect(() => {
    setSelectedId(typeDocs[0]?.id ?? null);
    setSlide(0);
    setViewerOpen(false);
  }, [activeType.id]);

  useEffect(() => {
    if (!typeDocs.length) {
      setSelectedId(null);
      return;
    }
    if (!typeDocs.some((item) => item.id === selectedId)) {
      setSelectedId(typeDocs[0].id);
    }
  }, [typeDocs, selectedId]);

  useEffect(() => {
    setSlide(0);
  }, [selected?.id]);

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerOpen]);

  if (!section || !isJuryType(section)) {
    return <Navigate to={localePath(locale, `jury/${juryTypes[0].path}`)} replace />;
  }

  const goSlide = (delta: number) => {
    if (!photos.length) return;
    setSlide((current) => (current + delta + photos.length) % photos.length);
  };

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
        <article className="jury-workspace">
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

          <div className="jury-docs-col">
            <header className="jury-docs-head">
              <h2 dir="auto">{text(locale, activeType.title)}</h2>
              <p>{t("jury.listHint")}</p>
            </header>
            {typeDocs.length ? (
              <ul className="jury-doc-list">
                {typeDocs.map((doc, index) => {
                  const current = doc.id === selected?.id;
                  return (
                    <li key={doc.id}>
                      <button
                        type="button"
                        className={`jury-doc-item${current ? " is-active" : ""}`}
                        aria-current={current ? "true" : undefined}
                        onClick={() => setSelectedId(doc.id)}
                      >
                        <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="jury-doc-item-copy">
                          <span className="jury-doc-item-title" dir="auto">
                            {text(locale, doc.title)}
                          </span>
                          {doc.year ? <span className="jury-doc-item-year">{doc.year}</span> : null}
                        </span>
                        <FileText size={18} className="jury-doc-item-icon" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="articles-empty">{t("jury.pending")}</p>
            )}
          </div>

          <div className="jury-detail">
            <header className="jury-detail-head">
              <div className="jury-detail-copy">
                <p className="science-content-kicker">{t("jury.invitationContent")}</p>
                <h2 dir="auto">
                  {selected ? text(locale, selected.title) : text(locale, activeType.title)}
                </h2>
                {selected?.year ? <p className="articles-year">{selected.year}</p> : null}
                {selected && text(locale, selected.summary) ? (
                  <p className="articles-summary" dir="auto">
                    {text(locale, selected.summary)}
                  </p>
                ) : null}
                {selected?.file ? (
                  <div className="jury-detail-actions">
                    <button type="button" className="articles-download" onClick={() => setViewerOpen(true)}>
                      <Maximize2 size={15} aria-hidden="true" />
                      {t("jury.viewPdf")}
                    </button>
                    <a className="articles-download" href={selected.file} download>
                      <Download size={15} aria-hidden="true" />
                      {t("jury.download")}
                    </a>
                  </div>
                ) : null}
              </div>
              <img
                className="articles-portrait"
                src="/assets/profile/portrait-article.png"
                alt={t("hero.portraitAlt")}
              />
            </header>

            <div className="jury-invitation-panel" aria-label={t("jury.invitationContent")}>
              {selected?.file ? (
                <iframe
                  className="jury-invitation-frame"
                  src={`${selected.file}#view=FitH`}
                  title={text(locale, selected.title)}
                />
              ) : (
                <div className="jury-invitation-empty">
                  <FileText size={28} aria-hidden="true" />
                  <p>{t("jury.selectDocument")}</p>
                </div>
              )}
            </div>

            <div className="jury-slider" aria-label={t("jury.photosSlider")}>
              <div className="jury-slider-head">
                <p className="eyebrow">{t("jury.photosSlider")}</p>
                {photos.length ? (
                  <span>
                    {String(slide + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                  </span>
                ) : null}
              </div>
              {photos.length ? (
                <div className="jury-slider-stage">
                  <button
                    type="button"
                    className="jury-slider-nav is-prev"
                    aria-label={t("jury.prevPhoto")}
                    onClick={() => goSlide(-1)}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <img src={photos[slide]} alt="" />
                  <button
                    type="button"
                    className="jury-slider-nav is-next"
                    aria-label={t("jury.nextPhoto")}
                    onClick={() => goSlide(1)}
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                  <div className="jury-slider-thumbs" role="tablist">
                    {photos.map((photo, index) => (
                      <button
                        key={photo}
                        type="button"
                        className={index === slide ? "is-active" : undefined}
                        aria-label={`${index + 1}`}
                        onClick={() => setSlide(index)}
                      >
                        <img src={photo} alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="articles-empty">{t("jury.noPhotos")}</p>
              )}
            </div>
          </div>
        </article>
      </section>

      {viewerOpen && selected?.file ? (
        <div className="jury-pdf-modal" role="presentation" onClick={() => setViewerOpen(false)}>
          <div
            className="jury-pdf-card"
            role="dialog"
            aria-modal="true"
            aria-label={text(locale, selected.title)}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="jury-pdf-card-head">
              <div>
                <p className="science-content-kicker">{text(locale, activeType.title)}</p>
                <h2 dir="auto">{text(locale, selected.title)}</h2>
              </div>
              <div className="jury-pdf-card-actions">
                <a className="articles-download" href={selected.file} download>
                  <Download size={15} aria-hidden="true" />
                  {t("jury.download")}
                </a>
                <button
                  type="button"
                  className="jury-pdf-close"
                  aria-label={t("common.close")}
                  onClick={() => setViewerOpen(false)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </header>
            <iframe
              className="jury-pdf-frame"
              src={`${selected.file}#view=FitH`}
              title={text(locale, selected.title)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
