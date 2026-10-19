import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { projectOutcomes, projectPractice } from "@/data/projects";
import { useProjects } from "@/content/hooks";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import { ArrowRight, ArrowUpRight, ChevronDown, Layers3, Sparkles } from "lucide-react";
import { ResearchHero } from "@/components/research/ResearchHero";

export default function ProjectsPage() {
  const { locale, t } = useI18n();
  const location = useLocation();
  const projects = useProjects();
  const categories = useMemo(
    () => ["all", ...new Set(projects.map((item) => item.category).filter(Boolean))],
    [projects],
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
    if (window.matchMedia("(max-width: 800px)").matches) {
      document.getElementById("project-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="science-page">
      <Seo title={t("projects.pageTitle")} description={t("meta.pages.projects")} path={localePath(locale, "projects")} />
      <ResearchHero eyebrow={t("projects.intro")} title={t("projects.pageTitle")} description={t("projects.homeLead")} variant="projects" />
      <section className="container project-dossier-wrap">
        <details className="project-approach">
          <summary><span><Sparkles size={18} aria-hidden="true" />{t("projects.intro")}</span><ChevronDown size={18} aria-hidden="true" /></summary>
          <div className="project-approach-copy">
            <p>{text(locale, projectPractice)}</p>
            <p>{text(locale, projectOutcomes)}</p>
          </div>
        </details>
        <div className="science-section-heading project-section-heading">
          <div><p className="eyebrow">{t("projects.categoryLabel")}</p><h2>{t("projects.viewAll")}</h2></div>
          <span className="project-result-count" aria-live="polite"><Layers3 size={16} aria-hidden="true" />{visible.length} / {projects.length}</span>
        </div>
        <div className="project-filters" role="group" aria-label={t("projects.categoryLabel")}>
          {categories.map((id) => (
            <button
              key={id}
              type="button"
              className={filter === id ? "is-on" : undefined}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {id === "all" ? t("projects.filterAll") : t(`projects.categories.${id}`)}<span>{id === "all" ? projects.length : projects.filter((item) => item.category === id).length}</span>
            </button>
          ))}
        </div>
        <div className="project-stage">
          <div className="project-picks">
            {visible.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`project-pick${active?.id === item.id ? " is-on" : ""}`}
                aria-current={active?.id === item.id ? "true" : undefined}
                onClick={() => choose(item.id)}
              >
                <span className="project-pick-num">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="project-pick-kicker">
                    {item.category ? t(`projects.categories.${item.category}`) : t("projects.featured")}
                  </span>
                  <span className="project-pick-title">{text(locale, item.title)}</span>
                </span>
                <ArrowRight className="project-pick-arrow icon-dir" size={19} aria-hidden="true" />
              </button>
            ))}
          </div>
          {active ? (
            <article className="project-panel anchor-offset" id="project-panel" aria-live="polite">
              <div className="project-panel-body" key={active.id}>
                <div className="project-panel-top"><span className="project-detail-icon"><Layers3 size={26} strokeWidth={1.5} aria-hidden="true" /></span><span>{String(visible.indexOf(active) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span></div>
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
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ))}
                  </p>
                ) : null}
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </div>
  );
}
