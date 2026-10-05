import { strategicPrinciple } from "@/data/vision";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

export function StrategicStatement() {
  const { locale, t } = useI18n();
  const quote = text(locale, strategicPrinciple.quote).trim();
  const reference = text(locale, strategicPrinciple.reference);
  const lines = (quote || t("vision.headline")).split("\n").filter(Boolean);

  return (
    <section className="vision-close">
      <div className="container">
        <p className="eyebrow">{t("vision.principle")}</p>
        <div className="vision-lines">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        {reference ? <p className="statement-ref">{reference}</p> : null}
      </div>
    </section>
  );
}
