import { academicNarrative, academicStats } from "@/data/academic";
import { awards } from "@/data/awards";
import { leadershipRoles } from "@/data/leadership";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export function RecognitionSection() {
  const { locale, t } = useI18n();
  const total = academicStats.find((stat) => stat.id === "total");

  return (
    <section className="band recognition">
      <div className="container">
        <div className="section-head recog-head">
          <div>
            <h2 className="section-title">{t("academic.title")}</h2>
            <p className="section-text">{t("academic.intro")}</p>
          </div>
        </div>
        <div className="lead-stage">
          {total?.display ? (
            <div className="lead-figure">
              <strong>{total.display}</strong>
              <span>{t("academic.stats.total")}</span>
            </div>
          ) : null}
          <div className="lead-story">
            {academicNarrative.map((paragraph) => (
              <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>
            ))}
          </div>
        </div>
        <div className="lead-roles">
          {leadershipRoles.map((role) => (
            <article key={role.id}>
              {role.year ? <span>{role.year}</span> : null}
              <h3>{text(locale, role.title)}</h3>
              <p>{text(locale, role.organization)}</p>
              {text(locale, role.description) ? <p className="lead-detail">{text(locale, role.description)}</p> : null}
            </article>
          ))}
        </div>

        <div className="section-head recog-head recog-awards">
          <div>
            <h2 className="section-title">{t("recognition.title")}</h2>
            <p className="section-text">{t("recognition.intro")}</p>
          </div>
          <ArrowLink to={localePath(locale, "recognition")}>{t("recognition.explore")}</ArrowLink>
        </div>
        <div className="award-board">
          {awards.map((item) => (
            <article key={item.id}>
              <span>{item.year || "—"}</span>
              <h3>{text(locale, item.title)}</h3>
              <p>{text(locale, item.institution)}</p>
              {text(locale, item.metadata) ? <p className="lead-detail">{text(locale, item.metadata)}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
