import { impactMetrics } from "@/data/impact";
import { useI18n } from "@/i18n/I18nProvider";
import { formatMetric } from "@/utils/format";

export function Impact() {
  const { t } = useI18n();

  return (
    <section className="impact" aria-label={t("impact.publications")}>
      <div className="container impact-grid">
        {impactMetrics.map((metric) => (
          <article key={metric.id} className="impact-item">
            <p className="impact-value">
              {metric.display ?? (metric.value === null ? (
                <span aria-label={t("common.pending")}>{formatMetric(metric.value)}</span>
              ) : (
                formatMetric(metric.value)
              ))}
            </p>
            <p className="impact-label">{t(`impact.${metric.id}`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
