import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { projectOutcomes, projectPractice, projects } from "@/data/projects";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function ProjectsPage() {
  const { locale, t } = useI18n();
  const location = useLocation();
  const categories = useMemo(
    () => ["all", ...new Set(projects.map((item) => item.category).filter(Boolean))],
    [],
  );
  const [filter, setFilter] = useState("all");
  const [activeId, setActiveId] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return projects.some((item) => item.id === hash) ? hash : projects[0]?.id ?? "";
  });

  const visible = projects.filter((item) => filter === "all" || item.category === filter);
  const active = visible.find((item) => item.id === activeId) ?? visible[0];
  const points = (active?.details ?? []).map((point) => text(locale, point)).filter(Boolean);
  const meta = active
    ? [text(locale, active.role), text(locale, active.country), active.year].filter(Boolean)
    : [];

  function choose(id: string) {
    setActiveId(id);
    const next = `${location.pathname}${location.search}#${id}`;
    window.history.replaceState(null, "", next);
    if (window.matchMedia("(max-width: 900px)").matches) {
      document.getElementById("project-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <Seo title={t("projects.pageTitle")} description={t("meta.pages.projects")} path={localePath(locale, "projects")} />
      <header className="project-hero">
        <div className="container">
          <div className="project-hero-head">
            <h1 className="page-title">{t("projects.pageTitle")}</h1>
          </div>
          <div className="project-hero-copy">
            <p>{t("projects.intro")}</p>
            <p>{text(locale, projectPractice)}</p>
            <p>{text(locale, projectOutcomes)}</p>
          </div>
        </div>
      </header>
      <section className="container project-dossier-wrap">
        <div className="project-filters" role="group" aria-label={t("projects.categoryLabel")}>
          {categories.map((id) => (
            <button
              key={id}
              type="button"
              className={filter === id ? "is-on" : undefined}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {id === "all" ? t("projects.filterAll") : t(`projects.categories.${id}`)}
            </button>
          ))}
        </div>
        <div className="project-stage">
          <div className="project-picks">
            {visible.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`project-pick${active?.id === item.id ? " is-on" : ""}`}
                aria-current={active?.id === item.id ? "true" : undefined}
                onClick={() => choose(item.id)}
              >
                <span>
                  <span className="project-pick-kicker">
                    {item.category ? t(`projects.categories.${item.category}`) : t("projects.featured")}
                  </span>
                  <span className="project-pick-title">{text(locale, item.title)}</span>
                </span>
              </button>
            ))}
          </div>
          {active ? (
            <article className="project-panel anchor-offset" id="project-panel" aria-live="polite">
              <div className="project-panel-body" key={active.id}>
                <p className="pd-kicker">
                  {active.category ? t(`projects.categories.${active.category}`) : t("projects.featured")}
                </p>
                <h2 className="pd-title" id={active.id}>{text(locale, active.title)}</h2>
                {meta.length > 0 ? <p className="pd-meta">{meta.join(" · ")}</p> : null}
                {text(locale, active.summary) ? <p className="pd-summary">{text(locale, active.summary)}</p> : null}
                {points.length > 0 ? (
                  <ul className="domain-points">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
                {active.links.length > 0 ? (
                  <p className="pd-links">
                    {active.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </p>
                ) : null}
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}
