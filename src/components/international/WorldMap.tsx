import { useMemo, useState } from "react";
import { worldLandPath } from "@/assets/world-land";
import type { InternationalActivity } from "@/types";
import { activityConnections } from "@/data/international";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

function pinEdge(x: number, y: number) {
  return [x > 78 ? "is-east" : x < 18 ? "is-west" : "", y < 22 ? "is-south" : ""].filter(Boolean).join(" ");
}

export function WorldMap({ activities }: { activities: InternationalActivity[] }) {
  const { locale, t } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const routes = useMemo(() => {
    return activityConnections
      .map(([fromId, toId]) => {
        const from = activities.find((item) => item.id === fromId);
        const to = activities.find((item) => item.id === toId);
        if (!from || !to) return null;
        return { from, to, key: `${fromId}-${toId}` };
      })
      .filter((item): item is { from: InternationalActivity; to: InternationalActivity; key: string } => item !== null);
  }, [activities]);

  function closeTip() {
    setActiveId(null);
    setPreview(null);
  }

  return (
    <div
      className="map-wrap"
      onPointerDown={(event) => {
        if (!(event.target as HTMLElement).closest(".map-pin, .map-photo-preview")) closeTip();
      }}
    >
      <svg viewBox="0 0 1000 500" role="img" aria-label={t("international.mapLabel")}>
        <g className="graticule">
          {Array.from({ length: 6 }, (_, index) => (
            <line key={`h-${index}`} x1="0" x2="1000" y1={50 + index * 75} y2={50 + index * 75} />
          ))}
          {Array.from({ length: 9 }, (_, index) => (
            <line key={`v-${index}`} y1="24" y2="476" x1={60 + index * 110} x2={60 + index * 110} />
          ))}
        </g>
        <path className="land" d={worldLandPath} />
        {routes.map((route) => (
          <line
            key={route.key}
            className="map-route"
            x1={(route.from.x / 100) * 1000}
            y1={(route.from.y / 100) * 500}
            x2={(route.to.x / 100) * 1000}
            y2={(route.to.y / 100) * 500}
          />
        ))}
      </svg>
      <div className="map-overlay">
        {activities.map((activity) => {
          const photos = (activity.photos ?? []).filter(Boolean);
          const city = text(locale, activity.city);
          const country = text(locale, activity.country);
          const isActive = activeId === activity.id;
          return (
            <div
              key={activity.id}
              className={["map-pin", isActive ? "is-active" : "", pinEdge(activity.x, activity.y)].filter(Boolean).join(" ")}
              style={{ left: `${activity.x}%`, top: `${activity.y}%` }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActiveId(activity.id);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") closeTip();
              }}
              onPointerDown={() => setActiveId(activity.id)}
            >
              <button
                type="button"
                className="map-node"
                aria-label={[city, country].filter(Boolean).join(", ")}
                onFocus={() => setActiveId(activity.id)}
                onBlur={(event) => {
                  if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) closeTip();
                }}
              />
              {isActive ? (
                <div className="map-tip">
                  <strong>{city || country}</strong>
                  {city ? <span>{country}</span> : null}
                  {photos.length ? (
                    <div className="map-tip-photos">
                      {photos.map((src, index) => (
                        <button
                          key={src}
                          type="button"
                          className="map-tip-photo"
                          aria-label={`${city || country} ${index + 1}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setPreview(src);
                          }}
                        >
                          <img src={src} alt="" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {preview ? (
        <button type="button" className="map-photo-preview" onClick={() => setPreview(null)} aria-label={t("common.close")}>
          <img src={preview} alt="" />
        </button>
      ) : null}
    </div>
  );
}
