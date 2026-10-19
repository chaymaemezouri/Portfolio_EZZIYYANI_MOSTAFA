import { useEducation } from "@/content/hooks";
import { useI18n } from "@/i18n/I18nProvider";
import { joinText, text } from "@/utils/text";

export function JourneyTimeline() {
  const { locale, t } = useI18n();
  const education = useEducation();
  if (education.length === 0) {
    return (
      <div className="timeline">
        <div className="timeline-item">
          <span className="timeline-year" aria-hidden="true" />
          <span className="timeline-spine" aria-hidden="true" />
          <p className="empty-note">{t("profile.timelineEmpty")}</p>
        </div>
      </div>
    );
  }

  return (
    <ol className="timeline">
      {education.map((item) => (
        <li key={item.id} className={`timeline-item${item.major ? " is-major" : ""}`}>
          <span className="timeline-year">{item.year}</span>
          <span className="timeline-spine" aria-hidden="true" />
          <div>
            <h3 className="timeline-degree">{text(locale, item.degree)}</h3>
            <p className="timeline-meta">{joinText(locale, [item.institution, item.country])}</p>
            {text(locale, item.description) ? <p className="timeline-body">{text(locale, item.description)}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
