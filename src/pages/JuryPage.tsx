import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Gavel, Layers3 } from "lucide-react";
import { juryTabs } from "@/data/jury";
import { Seo } from "@/components/shared/Seo";
import { ResearchHero } from "@/components/research/ResearchHero";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function JuryPage() {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();
  const active = useMemo(
    () => juryTabs.find((tab) => tab.path === section) ?? juryTabs[0],
    [section],
  );

  if (!section || !juryTabs.some((tab) => tab.path === section)) {
    return <Navigate to={localePath(locale, `jury/${juryTabs[0].path}`)} replace />;
  }

  const hasBody = active.paragraphs.length > 0;

  return (
    <div className="science-page">
      <Seo
        title={`${t("nav.jury")} — ${text(locale, active.title)}`}
        description={t("meta.pages.jury")}
        path={localePath(locale, `jury/${active.path}`)}
      />
      <ResearchHero
        eyebrow={t("nav.research")}
        title={t("nav.jury")}
        description={t("jury.intro")}
        variant="interests"
      />
      <section className="container interest-layout">
        <aside className="interest-side">
          <h2>
            <Layers3 size={17} aria-hidden="true" />
            {t("jury.sections")}
            <span>{juryTabs.length}</span>
          </h2>
          <nav aria-label={t("nav.jury")}>
            {juryTabs.map((tab, index) => {
              const current = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={current ? "is-active" : undefined}
                  aria-pressed={current}
                  onClick={() => navigate(localePath(locale, `jury/${tab.path}`))}
                >
                  <span className="axis-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="axis-label">{text(locale, tab.title)}</span>
                  <ArrowRight size={16} className="icon-dir" aria-hidden="true" />
                </button>
              );
            })}
          </nav>
        </aside>
        <article className="interest-panel" aria-live="polite">
          <div className="interest-panel-heading">
            <span className="research-card-icon">
              <Gavel size={26} aria-hidden="true" />
            </span>
            <span>
              {String(juryTabs.findIndex((tab) => tab.id === active.id) + 1).padStart(2, "0")} /{" "}
              {String(juryTabs.length).padStart(2, "0")}
            </span>
          </div>
          <p className="science-content-kicker">{t("nav.jury")}</p>
          <h2>{text(locale, active.title)}</h2>
          {hasBody ? (
            active.paragraphs.map((paragraph) => <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>)
          ) : (
            <p className="interest-pending">{t("jury.pending")}</p>
          )}
        </article>
      </section>
    </div>
  );
}
