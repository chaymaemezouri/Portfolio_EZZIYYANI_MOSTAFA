import { ExternalLink } from "lucide-react";
import { strategicDocument } from "@/data/vision";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

export function StrategicDocumentBlock() {
  const { locale, t } = useI18n();
  const document = strategicDocument;

  return (
    <article className="vision-doc">
      <div className="vision-doc-copy">
        <p className="eyebrow">{text(locale, document?.category) || t("vision.document")}</p>
        <p className="vision-year">{document?.year || "—"}</p>
        <h2>{text(locale, document?.title) || "—"}</h2>
        {text(locale, document?.summary) ? <p className="section-text">{text(locale, document.summary)}</p> : null}
        <div className="doc-actions">
          {document?.readUrl ? (
            <a className="btn btn-primary" href={document.readUrl} target="_blank" rel="noreferrer">
              {t("vision.read")} <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : null}
          <a className="btn btn-ghost" href="#themes">
            {t("vision.explore")}
          </a>
        </div>
      </div>
      {document && document.themes.length > 0 ? (
        <ol className="vision-shifts">
          {document.themes.map((theme) => (
            <li key={text(locale, theme)}>{text(locale, theme)}</li>
          ))}
        </ol>
      ) : null}
    </article>
  );
}
