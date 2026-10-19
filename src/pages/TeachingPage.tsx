import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { useCollection } from "@/content/useCollection";
import {
  courses as fallbackCourses,
  pfeLicence as fallbackLicence,
  pfeMaster as fallbackMaster,
  visits as fallbackVisits,
  type Course,
  type Pfe,
  type Visit,
} from "@/data/teaching";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

function PfeList({ title, items, empty }: { title: string; items: Pfe[]; empty: string }) {
  return (
    <div className="teach-sub">
      <h3>{title}</h3>
      {items.length ? (
        <ul className="teach-list">
          {items.map((item) => (
            <li key={item.id}>
              {item.href ? <a href={item.href} download>{item.title}</a> : item.title}
              {item.student || item.year ? <span>{[item.student, item.year].filter(Boolean).join(" · ")}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="teach-empty">{empty}</p>
      )}
    </div>
  );
}

function VisitCard({
  visit,
  index,
  onOpen,
}: {
  visit: Visit;
  index: number;
  onOpen: (photos: string[], start: number) => void;
}) {
  const { locale, t } = useI18n();
  const photos = visit.photos ?? [];
  const cover = photos[0];
  const mosaic = photos.slice(1, 5);

  return (
    <article className="visit-card">
      <div className="visit-card-media">
        {cover ? (
          <button type="button" className="visit-cover" onClick={() => onOpen(photos, 0)}>
            <img src={cover} alt="" loading="lazy" />
            <span className="visit-index">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ) : (
          <div className="visit-cover is-empty">
            <span className="visit-index">{String(index + 1).padStart(2, "0")}</span>
          </div>
        )}
        {mosaic.length ? (
          <div className="visit-mosaic">
            {mosaic.map((photo, photoIndex) => (
              <button
                key={photo}
                type="button"
                onClick={() => onOpen(photos, photoIndex + 1)}
              >
                <img src={photo} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="visit-card-body">
        <p className="visit-kicker">{[visit.place, visit.date].filter(Boolean).join(" · ")}</p>
        <h3>{visit.title}</h3>
        {text(locale, visit.program) ? <p className="visit-program">{text(locale, visit.program)}</p> : null}
        {text(locale, visit.summary) ? <p className="visit-summary">{text(locale, visit.summary)}</p> : null}
        {photos.length > 1 ? (
          <button type="button" className="visit-gallery-btn" onClick={() => onOpen(photos, 0)}>
            {t("teaching.visitPhotos")} · {photos.length}
          </button>
        ) : null}
      </div>
    </article>
  );
}

function VisitLightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: string[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % photos.length);
      if (event.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange, onClose, photos.length]);

  return (
    <div className="visit-lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" className="visit-lightbox-close" aria-label={t("teaching.visitClose")}>
        <X size={22} />
      </button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={photos[index]} alt="" />
        <figcaption>
          {index + 1} / {photos.length}
        </figcaption>
      </figure>
    </div>
  );
}

export default function TeachingPage() {
  const { locale, t } = useI18n();
  const courses = useCollection<Course>("courses", fallbackCourses);
  const pfe = useCollection<Pfe & { level?: string }>("pfe", [
    ...fallbackMaster.map((item) => ({ ...item, level: "master" })),
    ...fallbackLicence.map((item) => ({ ...item, level: "licence" })),
  ]);
  const visits = useCollection<Visit>("visits", fallbackVisits);
  const pfeMaster = pfe.filter((item) => item.level === "master");
  const pfeLicence = pfe.filter((item) => item.level === "licence");
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null);

  return (
    <>
      <Seo title={t("nav.teaching")} description={t("meta.pages.teaching")} path={localePath(locale, "teaching")} />
      <section className="container teach-page">
        <header className="teach-head">
          <h1 className="page-title">{t("teaching.title")}</h1>
          <p className="page-lede">{t("teaching.lede")}</p>
        </header>

        <section className="teach-block" id="courses">
          <h2><span>01</span>{t("teaching.courses")}</h2>
          <div className="teach-courses">
            {courses.map((course, index) => {
              const files = (course.resources ?? []).filter((item) => item.href);
              const file = files[0];
              const ext = file?.href?.split(".").pop()?.toUpperCase() ?? "";
              return (
                <article key={course.id} className={`teach-course-card${file ? "" : " is-empty"}`}>
                  <header className="teach-course-meta">
                    <span className="teach-course-index">{String(index + 1).padStart(2, "0")}</span>
                    {ext ? <span className="teach-course-format">{ext}</span> : null}
                  </header>
                  <h3>{course.title}</h3>
                  {file ? (
                    <a className="teach-course-cta" href={file.href} download>
                      {t("teaching.accessCourse")}
                      <Download size={15} strokeWidth={2.2} aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="teach-empty">{t("teaching.empty")}</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="teach-block" id="pfe">
          <h2><span>02</span>{t("teaching.pfe")}</h2>
          <div className="teach-grid">
            <PfeList title={t("teaching.pfeMaster")} items={pfeMaster} empty={t("teaching.empty")} />
            <PfeList title={t("teaching.pfeLicence")} items={pfeLicence} empty={t("teaching.empty")} />
          </div>
        </section>

        <section className="teach-block" id="visits">
          <h2><span>03</span>{t("teaching.visits")}</h2>
          <p className="teach-section-lede">{t("teaching.visitsLede")}</p>
          {visits.length ? (
            <div className="visit-stack">
              {visits.map((visit, index) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  index={index}
                  onOpen={(photos, start) => setLightbox({ photos, index: start })}
                />
              ))}
            </div>
          ) : (
            <p className="teach-empty">{t("teaching.empty")}</p>
          )}
        </section>
      </section>
      {lightbox ? (
        <VisitLightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onChange={(index) => setLightbox({ photos: lightbox.photos, index })}
        />
      ) : null}
    </>
  );
}
