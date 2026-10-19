import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Download, FileText, Layers3, Lightbulb, ScanLine, X } from "lucide-react";
import { useGallery, useInnovation, usePatents, type GalleryPhoto } from "@/content/hooks";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { joinText, text } from "@/utils/text";
import { ResearchHero } from "@/components/research/ResearchHero";

function isVideoFile(href?: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(href ?? "");
}

function Shell({ id, lede, empty, children, count = 0 }: { id: string; lede: string; empty: boolean; children: ReactNode; count?: number }) {
  const { locale, t } = useI18n();
  if (id === "patents" || id === "innovation") {
    return (
      <div className={`science-page science-showcase science-showcase--${id}`}>
        <Seo title={t(`nav.${id}`)} description={t(`meta.pages.${id}`)} path={localePath(locale, id)} />
        <ResearchHero eyebrow={t("projects.intro")} title={t(`nav.${id}`)} description={lede} variant={id} />
        <section className="container science-collection">
          <div className="science-section-heading project-section-heading">
            <div><p className="eyebrow">{t("nav.research")}</p><h2>{t(`nav.${id}`)}</h2></div>
            <span className="project-result-count"><Layers3 size={16} aria-hidden="true" />{count}</span>
          </div>
          {empty ? <p className="empty-note">{t("teaching.pending")}</p> : children}
        </section>
      </div>
    );
  }
  return (
    <>
      <Seo title={t(`nav.${id}`)} description={t(`meta.pages.${id}`)} path={localePath(locale, id)} />
      <section className="container teach-page">
        <header className="teach-head">
          <h1 className="page-title">{t(`nav.${id}`)}</h1>
          <p className="page-lede">{empty ? t("teaching.pending") : lede}</p>
        </header>
        {empty ? null : children}
      </section>
    </>
  );
}

export function PatentsPage() {
  const { locale, t } = useI18n();
  const patents = usePatents();
  return (
    <Shell id="patents" lede={t("showcase.patentsLede")} empty={patents.length === 0} count={patents.length}>
      <div className="teach-grid showcase-grid">
        {patents.map((item, index) => {
          const meta = joinText(locale, [item.number ? `${t("showcase.number")} ${item.number}` : "", item.office, item.year]);
          const video = isVideoFile(item.file) ? item.file : undefined;
          return (
            <article key={item.id} className="teach-card showcase-card">
              <div className="showcase-card-header"><span><ScanLine size={15} aria-hidden="true" />{t("nav.patents")}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="showcase-visual">
              {video ? (
                <video className="showcase-video" src={video} poster={item.image} controls playsInline preload="metadata" />
              ) : item.image ? (
                <img className="showcase-image" src={item.image} alt="" loading="lazy" />
              ) : <ScanLine size={56} strokeWidth={1} aria-hidden="true" />}
              </div>
              <div className="showcase-card-body">
              <h3>{text(locale, item.title)}</h3>
              {meta ? <p className="teach-meta">{meta}</p> : null}
              {item.inventors ? (
                <p className="showcase-line">
                  <strong>{t("showcase.inventors")} :</strong> {item.inventors}
                </p>
              ) : null}
              {text(locale, item.summary) ? <p className="showcase-text">{text(locale, item.summary)}</p> : null}
              <div className="showcase-links">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {t("showcase.open")} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
                {item.file ? (
                  <a href={item.file} download>
                    {video ? <Download size={14} aria-hidden="true" /> : <FileText size={14} aria-hidden="true" />}
                    {video ? t("showcase.video") : t("showcase.document")}
                  </a>
                ) : null}
              </div>
              </div>
            </article>
          );
        })}
      </div>
    </Shell>
  );
}

export function InnovationPage() {
  const { locale, t } = useI18n();
  const items = useInnovation();
  return (
    <Shell id="innovation" lede={t("showcase.innovationLede")} empty={items.length === 0} count={items.length}>
      <div className="teach-grid showcase-grid">
        {items.map((item, index) => (
          <article key={item.id} className="teach-card showcase-card">
            <div className="showcase-card-header"><span><Lightbulb size={15} aria-hidden="true" />{t("nav.innovation")}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className={`showcase-visual${item.video || item.image ? "" : " showcase-visual--abstract"}`}>
            {item.video ? (
              <video className="showcase-video" src={item.video} poster={item.image} controls playsInline preload="metadata" />
            ) : item.image ? (
              <img className="showcase-image" src={item.image} alt="" loading="lazy" />
            ) : <><Lightbulb size={56} strokeWidth={1} aria-hidden="true" /><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></>}
            </div>
            <div className="showcase-card-body">
            <h3>{text(locale, item.title)}</h3>
            {text(locale, item.summary) ? <p className="showcase-text">{text(locale, item.summary)}</p> : null}
            {item.href || item.video ? (
              <div className="showcase-links">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {t("showcase.open")} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
                {item.video ? (
                  <a href={item.video} download>
                    <Download size={14} aria-hidden="true" /> {t("showcase.video")}
                  </a>
                ) : null}
              </div>
            ) : null}
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}

export function GalleryPage() {
  const { locale, t } = useI18n();
  const photos = useGallery();
  const [open, setOpen] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Shell id="gallery" lede={t("showcase.galleryLede")} empty={photos.length === 0}>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <button key={photo.id} type="button" className="gallery-item" onClick={() => setOpen(photo)}>
            <img src={photo.image} alt={text(locale, photo.caption)} loading="lazy" />
            {text(locale, photo.caption) ? <span>{text(locale, photo.caption)}</span> : null}
          </button>
        ))}
      </div>
      {open ? (
        <div className="gallery-viewer" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button type="button" className="gallery-close" aria-label={t("showcase.close")}>
            <X size={22} />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={open.image} alt={text(locale, open.caption)} />
            {text(locale, open.caption) || open.date ? (
              <figcaption>{joinText(locale, [open.caption, open.date])}</figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}
    </Shell>
  );
}
