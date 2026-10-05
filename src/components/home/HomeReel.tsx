import { useEffect, useRef, useState } from "react";
import videoSrc from "@/assets/videoplayback.mp4";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { useI18n } from "@/i18n/I18nProvider";

const reelPhotos = Array.from(
  { length: 23 },
  (_, index) => `/assets/gallery/reel/reel-${String(index + 1).padStart(2, "0")}.jpg`,
);

const editions = [
  { year: "2025", video: videoSrc, photos: reelPhotos },
  { year: "2024", video: "", photos: [] as string[] },
  { year: "2023", video: "", photos: [] as string[] },
  { year: "2022", video: "", photos: [] as string[] },
];

export function HomeReel() {
  const { t } = useI18n();
  const [year, setYear] = useState(editions[0].year);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const edition = editions.find((item) => item.year === year) ?? editions[0];

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let onScreen = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !onScreen) {
          onScreen = true;
          video.currentTime = 0;
          video.muted = true;
          void video.play().catch(() => {});
          return;
        }
        if (!entry.isIntersecting && onScreen) {
          onScreen = false;
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [edition.video]);

  return (
    <section ref={sectionRef} className="home-reel theme-dark" aria-label={t("media.reelTitle")}>
      <div className="container">
        <div className="section-head reel-head">
          <div>
            <p className="eyebrow">{t("media.reelKicker")}</p>
            <h2 className="section-title">{t("media.reelTitle")}</h2>
          </div>
          <ArrowLink to="https://ai2sd.com/">{t("media.reelSite")}</ArrowLink>
        </div>
        <div className="reel-years" role="tablist" aria-label={t("media.reelTitle")}>
          {editions.map((item) => (
            <button
              key={item.year}
              type="button"
              role="tab"
              aria-selected={item.year === edition.year}
              className={item.year === edition.year ? "is-on" : undefined}
              onClick={() => setYear(item.year)}
            >
              {item.year}
            </button>
          ))}
        </div>
        {edition.video ? (
          <div className="home-reel-stage">
            <video
              ref={videoRef}
              className="home-reel-player"
              src={edition.video}
              muted
              playsInline
              controls
              preload="auto"
            />
            <div className="reel-col" aria-hidden="true">
              <div className="reel-track">
                {[...edition.photos, ...edition.photos].map((src, index) => (
                  <img key={`${src}-${index}`} src={src} alt="" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="reel-pending">
            <strong>AI2SD'{edition.year}</strong>
            <p>{t("media.reelPending")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
