import { leadershipRoles } from "@/data/leadership";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

export function LeadershipList() {
  const { locale, t } = useI18n();
  if (leadershipRoles.length === 0) {
    return <p className="empty-note">{t("leadership.empty")}</p>;
  }
  return (
    <div>
      {leadershipRoles.map((role) => (
        <article key={role.id} className="lead-row">
          <h3>{text(locale, role.title)}</h3>
          <div>
            {text(locale, role.organization) ? <p className="org">{text(locale, role.organization)}</p> : null}
            {role.year ? <p className="year">{role.year}</p> : null}
            {text(locale, role.description) ? <p>{text(locale, role.description)}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
