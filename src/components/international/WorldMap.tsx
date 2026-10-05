import { useMemo, useState } from "react";
import { worldLandPath } from "@/assets/world-land";
import type { InternationalActivity } from "@/types";
import { activityConnections } from "@/data/international";
import { useI18n } from "@/i18n/I18nProvider";
import { joinText, text } from "@/utils/text";

export function WorldMap({ activities }: { activities: InternationalActivity[] }) {
  const { locale, t } = useI18n();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activities.find((item) => item.id === activeId) ?? null;

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

  return (
    <div className="map-wrap">
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
        {activities.map((activity) => (
          <button
            key={activity.id}
            type="button"
            className="map-node"
            style={{ left: `${activity.x}%`, top: `${activity.y}%` }}
            aria-label={joinText(locale, [activity.city || activity.country, activity.institution], " ")}
            onMouseEnter={() => setActiveId(activity.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(activity.id)}
            onBlur={() => setActiveId(null)}
          />
        ))}
        {active ? (
          <div className="map-tip" style={{ left: `${active.x}%`, top: `${active.y}%` }}>
            <strong>{text(locale, active.country)}</strong>
            <span>{joinText(locale, [active.city, active.institution])}</span>
            <span>{t(`international.categories.${active.category}`)}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
