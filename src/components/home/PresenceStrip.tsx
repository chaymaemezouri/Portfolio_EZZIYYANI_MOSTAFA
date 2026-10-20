import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

const pngIndexes = new Set([1, 2, 4, 5, 8, 16, 22, 28, 29]);

const spotlights = Array.from({ length: 29 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  const ext = pngIndexes.has(index + 1) ? "png" : "jpg";
  return {
    id: `spotlight-${n}`,
    src: `/media/spotlight/spotlight-${n}.${ext}`,
  };
});

export function PresenceStrip({ showMediaLink = true }: { showMediaLink?: boolean }) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  const track = useMemo(() => [...spotlights, ...spotlights], []);
  const active = spotlights.find((item) => item.id === open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="presence-strip" aria-label={t("media.spotlightTitle")}>
      <div className="container presence-strip-head">
        <div>
          <p className="eyebrow">{t("media.spotlightKicker")}</p>
          <h2 className="section-title">{t("media.spotlightTitle")}</h2>
        </div>
        {showMediaLink ? (
          <ArrowLink to={localePath(locale, "media")}>{t("media.spotlightView")}</ArrowLink>
        ) : null}
      </div>

      <div className="presence-viewport">
        <div className="presence-track">
          {track.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              type="button"
              className="presence-card"
              onClick={() => setOpen(item.id)}
              aria-label={t("media.spotlightOpen")}
            >
              <img src={item.src} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="presence-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="presence-lightbox-close"
            aria-label={t("showcase.close")}
            onClick={() => setOpen(null)}
          >
            <X size={22} />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt="" />
          </figure>
        </div>
      ) : null}
    </section>
  );
}
