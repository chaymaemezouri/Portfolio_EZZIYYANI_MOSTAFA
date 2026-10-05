import { conferences } from "@/data/conferences";
import { internationalActivities, internationalNotes } from "@/data/international";
import { InternationalPresence } from "@/components/home/InternationalPresence";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { joinText, text } from "@/utils/text";
import type { ActivityCategory } from "@/types";

const groups: Array<{ id: string; categories: ActivityCategory[] }> = [
  { id: "collaboration", categories: ["research", "advisory"] },
  { id: "visits", categories: ["visit"] },
  { id: "partnerships", categories: ["partnership"] },
  { id: "missions", categories: ["project"] },
  { id: "conferences", categories: ["conference"] },
];

export default function InternationalPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("international.title")} description={t("meta.pages.international")} path={localePath(locale, "international")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("international.homeTitle")}</h1>
        <p className="page-lede">{t("international.intro")}</p>
      </header>
      <InternationalPresence heading={false} />
      <section className="container" style={{ paddingBottom: "var(--section-y)" }}>
        {groups.map((group) => {
          const items = internationalActivities.filter((item) => group.categories.includes(item.category));
          return (
            <div className="record-block" key={group.id}>
              <h2>{t(`international.sections.${group.id}`)}</h2>
              {group.id === "visits" ? <p className="timeline-body">{text(locale, internationalNotes.visits)}</p> : null}
              {group.id === "missions" ? <p className="timeline-body">{text(locale, internationalNotes.missions)}</p> : null}
              {group.id === "conferences" ? conferences.map((event) => (
                <article key={event.id} className="activity-row">
                  <span>{event.year}</span>
                  <div>
                    <h3>{event.title || event.conference}</h3>
                    <p className="timeline-body">{[event.conference, event.role].filter(Boolean).join(" · ")}</p>
                  </div>
                  <span>{t("international.categories.conference")}</span>
                </article>
              )) : null}
              {items.length === 0 && group.id !== "visits" && group.id !== "missions" && group.id !== "conferences" ? <p className="empty-note">{t("international.empty")}</p> : (
                items.map((item) => (
                  <article key={item.id} className="activity-row">
                    <span>{item.year}</span>
                    <div>
                      <h3>{joinText(locale, [item.institution, item.city, item.country])}</h3>
                      {text(locale, item.summary) ? <p className="timeline-body">{text(locale, item.summary)}</p> : null}
                    </div>
                    <span>{t(`international.categories.${item.category}`)}</span>
                  </article>
                ))
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
