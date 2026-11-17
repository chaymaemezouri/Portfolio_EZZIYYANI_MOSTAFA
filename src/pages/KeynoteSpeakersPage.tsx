import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Maximize2,
  Presentation,
  X,
} from "lucide-react";
import { isPdfPresentation, keynoteYears, type KeynoteTalk } from "@/data/keynotes";
import { Seo } from "@/components/shared/Seo";
import { useKeynotes } from "@/content/hooks";
import { useLockBody } from "@/hooks/useLockBody";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function KeynoteSpeakersPage() {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const { year } = useParams<{ year?: string }>();
  const talks = useKeynotes();
  const years = useMemo(() => keynoteYears(talks), [talks]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewer, setViewer] = useState<"invitation" | "presentation" | null>(null);
  const [slide, setSlide] = useState(0);

  const activeYear = year && years.includes(year) ? year : years[0];

  const yearTalks = useMemo(
    () => talks.filter((item) => String(item.year) === activeYear),
    [talks, activeYear],
  );

  const selected: KeynoteTalk | null = useMemo(() => {
    if (!yearTalks.length) return null;
    return yearTalks.find((item) => item.id === selectedId) ?? yearTalks[0];
  }, [yearTalks, selectedId]);

  const photos = selected?.photos?.filter(Boolean) ?? [];
  const presentationIsPdf = isPdfPresentation(selected?.presentation);
  const modalFile =
    viewer === "invitation"
      ? selected?.invitation
      : viewer === "presentation" && presentationIsPdf
        ? selected?.presentation
        : undefined;

  useLockBody(Boolean(modalFile));

  useEffect(() => {
    setSelectedId(yearTalks[0]?.id ?? null);
    setSlide(0);
    setViewer(null);
  }, [activeYear]);

  useEffect(() => {
    if (!yearTalks.length) {
      setSelectedId(null);
      return;
    }
    if (!yearTalks.some((item) => item.id === selectedId)) {
      setSelectedId(yearTalks[0].id);
    }
  }, [yearTalks, selectedId]);

  useEffect(() => {
    setSlide(0);
  }, [selected?.id]);

  useEffect(() => {
    if (!modalFile) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewer(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalFile]);

  if (!years.length) {
    return (
      <>
        <Seo
          title={t("nav.keynotes")}
          description={t("meta.pages.keynotes")}
          path={localePath(locale, "keynote-speakers")}
        />
        <header className="container vision-open">
          <div>
            <h1 className="page-title">{t("nav.keynotes")}</h1>
          </div>
          <p className="page-lede">{t("keynotes.intro")}</p>
        </header>
        <section className="container vision-doc-wrap">
          <p className="articles-empty">{t("keynotes.pending")}</p>
        </section>
      </>
    );
  }

  if (!year || !years.includes(year)) {
    return <Navigate to={localePath(locale, `keynote-speakers/${years[0]}`)} replace />;
  }

  const goSlide = (delta: number) => {
    if (!photos.length) return;
    setSlide((current) => (current + delta + photos.length) % photos.length);
  };

  return (
    <>
      <Seo
        title={`${t("nav.keynotes")} — ${activeYear}`}
        description={t("meta.pages.keynotes")}
        path={localePath(locale, `keynote-speakers/${activeYear}`)}
      />
      <header className="container vision-open">
        <div>
          <h1 className="page-title">{t("nav.keynotes")}</h1>
        </div>
        <p className="page-lede">{t("keynotes.intro")}</p>
      </header>

      <section className="container vision-doc-wrap">
        <article className="jury-workspace">
          <aside className="articles-nav" aria-label={t("keynotes.years")}>
            <p className="eyebrow">{t("keynotes.years")}</p>
            <ul>
              {years.map((item, index) => {
                const current = item === activeYear;
                return (
                  <li key={item}>
                    <button
                      type="button"
                      className={current ? "is-active" : undefined}
                      aria-current={current ? "true" : undefined}
                      onClick={() => navigate(localePath(locale, `keynote-speakers/${item}`))}
                    >
                      <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="articles-nav-title">{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="jury-docs-col">
            <header className="jury-docs-head">
              <h2>{activeYear}</h2>
              <p>{t("keynotes.listHint")}</p>
            </header>
            {yearTalks.length ? (
              <ul className="jury-doc-list">
                {yearTalks.map((talk, index) => {
                  const current = talk.id === selected?.id;
                  return (
                    <li key={talk.id}>
                      <button
                        type="button"
                        className={`jury-doc-item${current ? " is-active" : ""}`}
                        aria-current={current ? "true" : undefined}
                        onClick={() => setSelectedId(talk.id)}
                      >
                        <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="jury-doc-item-copy">
                          <span className="jury-doc-item-title" dir="auto">
                            {text(locale, talk.title)}
                          </span>
                          {text(locale, talk.event) ? (
                            <span className="jury-doc-item-year">{text(locale, talk.event)}</span>
                          ) : (
                            <span className="jury-doc-item-year">{talk.year}</span>
                          )}
                        </span>
                        <FileText size={18} className="jury-doc-item-icon" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="articles-empty">{t("keynotes.pendingYear")}</p>
            )}
          </div>

          <div className="jury-detail keynote-detail">
            <header className="jury-detail-head">
              <div className="jury-detail-copy">
                <p className="science-content-kicker">{t("keynotes.invitationContent")}</p>
                <h2 dir="auto">{selected ? text(locale, selected.title) : activeYear}</h2>
                {selected && text(locale, selected.event) ? (
                  <p className="articles-year">{text(locale, selected.event)}</p>
                ) : null}
                {selected && text(locale, selected.summary) ? (
                  <p className="articles-summary" dir="auto">
                    {text(locale, selected.summary)}
                  </p>
                ) : null}
                {selected?.invitation ? (
                  <div className="jury-detail-actions">
                    <button type="button" className="articles-download" onClick={() => setViewer("invitation")}>
                      <Maximize2 size={15} aria-hidden="true" />
                      {t("keynotes.viewInvitation")}
                    </button>
                    <a className="articles-download" href={selected.invitation} download>
                      <Download size={15} aria-hidden="true" />
                      {t("keynotes.downloadInvitation")}
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

            <div className="jury-invitation-panel" aria-label={t("keynotes.invitationContent")}>
              {selected?.invitation ? (
                <iframe
                  className="jury-invitation-frame"
                  src={`${selected.invitation}#view=FitH`}
                  title={text(locale, selected.title)}
                />
              ) : (
                <div className="jury-invitation-empty">
                  <FileText size={28} aria-hidden="true" />
                  <p>{t("keynotes.selectTalk")}</p>
                </div>
              )}
            </div>

            <div className="keynote-presentation" aria-label={t("keynotes.presentation")}>
              <div className="jury-slider-head">
                <p className="eyebrow">{t("keynotes.presentation")}</p>
              </div>
              {selected?.presentation ? (
                <div className="keynote-presentation-body">
                  <div className="keynote-presentation-copy">
                    <Presentation size={22} aria-hidden="true" />
                    <div>
                      <strong>{t("keynotes.presentationLabel")}</strong>
                      <p>{t("keynotes.presentationHint")}</p>
                    </div>
                  </div>
                  <div className="jury-detail-actions">
                    {presentationIsPdf ? (
                      <button
                        type="button"
                        className="articles-download"
                        onClick={() => setViewer("presentation")}
                      >
                        <Maximize2 size={15} aria-hidden="true" />
                        {t("keynotes.viewPresentation")}
                      </button>
                    ) : null}
                    <a className="articles-download" href={selected.presentation} download>
                      <Download size={15} aria-hidden="true" />
                      {t("keynotes.downloadPresentation")}
                    </a>
                  </div>
                  {presentationIsPdf ? (
                    <iframe
                      className="keynote-presentation-frame"
                      src={`${selected.presentation}#view=FitH`}
                      title={t("keynotes.presentation")}
                    />
                  ) : (
                    <div className="jury-invitation-empty keynote-presentation-empty">
                      <Presentation size={28} aria-hidden="true" />
                      <p>{t("keynotes.pptDownloadOnly")}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="articles-empty">{t("keynotes.noPresentation")}</p>
              )}
            </div>

            <div className="jury-slider" aria-label={t("keynotes.photosSlider")}>
              <div className="jury-slider-head">
                <p className="eyebrow">{t("keynotes.photosSlider")}</p>
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
                    aria-label={t("keynotes.prevPhoto")}
                    onClick={() => goSlide(-1)}
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <img src={photos[slide]} alt="" />
                  <button
                    type="button"
                    className="jury-slider-nav is-next"
                    aria-label={t("keynotes.nextPhoto")}
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
                <p className="articles-empty">{t("keynotes.noPhotos")}</p>
              )}
            </div>
          </div>
        </article>
      </section>

      {modalFile ? (
        <div className="jury-pdf-modal" role="presentation" onClick={() => setViewer(null)}>
          <div
            className="jury-pdf-card"
            role="dialog"
            aria-modal="true"
            aria-label={selected ? text(locale, selected.title) : t("nav.keynotes")}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="jury-pdf-card-head">
              <div>
                <p className="science-content-kicker">
                  {viewer === "presentation" ? t("keynotes.presentation") : t("keynotes.invitationContent")}
                </p>
                <h2 dir="auto">{selected ? text(locale, selected.title) : activeYear}</h2>
              </div>
              <div className="jury-pdf-card-actions">
                <a className="articles-download" href={modalFile} download>
                  <Download size={15} aria-hidden="true" />
                  {t("keynotes.download")}
                </a>
                <button
                  type="button"
                  className="jury-pdf-close"
                  aria-label={t("common.close")}
                  onClick={() => setViewer(null)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </header>
            <iframe className="jury-pdf-frame" src={`${modalFile}#view=FitH`} title={t("nav.keynotes")} />
          </div>
        </div>
      ) : null}
    </>
  );
}
