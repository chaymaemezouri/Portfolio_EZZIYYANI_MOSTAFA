import { Seo } from "@/components/shared/Seo";
import { useCollection } from "@/content/useCollection";
import { doctoralStudents as fallbackStudents, type DoctoralStudent } from "@/data/team";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamPage() {
  const { locale, t } = useI18n();
  const doctoralStudents = useCollection<DoctoralStudent>("team", fallbackStudents);

  return (
    <>
      <Seo title={t("nav.team")} description={t("meta.pages.team")} path={localePath(locale, "team")} />
      <section className="container teach-page">
        <header className="teach-head">
          <h1 className="page-title">{t("team.title")}</h1>
          <p className="page-lede">{t("team.lede")}</p>
        </header>

        <ul className="team-grid">
          {doctoralStudents.map((student) => (
            <li key={student.id} className="team-card">
              <div className="team-photo">
                {student.photo ? (
                  <img src={student.photo} alt={student.name} loading="lazy" />
                ) : (
                  <span aria-hidden="true">{initials(student.name)}</span>
                )}
              </div>
              <h2>{student.name}</h2>
              {student.thesis ? (
                <p className="team-thesis" title={student.thesis}>
                  {student.thesis}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
