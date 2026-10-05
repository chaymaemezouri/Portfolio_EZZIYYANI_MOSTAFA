import { internationalActivities, regionIds } from "@/data/international";
import { WorldMap } from "@/components/international/WorldMap";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export function InternationalPresence({ heading = true }: { heading?: boolean }) {
  const { locale, t } = useI18n();
  const hasData = internationalActivities.length > 0;

  return (
    <section className="band intl theme-dark">
      <div className="container">
        {heading ? <div className="intl-head">
          <div>
            <h2 className="section-title">{t("international.homeTitle")}</h2>
          </div>
          <p className="section-text" style={{ color: "var(--on-navy-muted)" }}>
            {t("international.intro")}
          </p>
        </div> : null}
        <WorldMap activities={internationalActivities} />
        <div className="region-grid">
          {regionIds.map((region) => {
            const count = internationalActivities.filter((item) => item.region === region).length;
            return (
              <article key={region} className="region-card">
                <span className="region-name">{t(`international.regions.${region}`)}</span>
                <span className="region-count" aria-label={hasData ? undefined : t("international.pendingCount")}>
                  {hasData ? count : "—"}
                </span>
              </article>
            );
          })}
        </div>
        {heading ? <ArrowLink to={localePath(locale, "international")}>{t("international.explore")}</ArrowLink> : null}
      </div>
    </section>
  );
}
