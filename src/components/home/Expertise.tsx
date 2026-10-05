import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { expertiseDomains } from "@/data/expertise";
import { Reveal } from "@/components/shared/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export function ExpertiseNavigator({ page = false }: { page?: boolean }) {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const [active, setActive] = useState(expertiseDomains[0]?.id ?? "");

  return (
    <div className={page ? "expertise-board page-mode" : "expertise-board"}>
      <Reveal>
        <header className="expertise-head">
          <div>
            <h2 className="section-title">{t("expertise.title")}</h2>
          </div>
          <p className="section-text">{t("expertise.intro")}</p>
        </header>
      </Reveal>
      <div className="domain-grid">
        {expertiseDomains.map((domain) => {
          const summary = text(locale, domain.summary);
          const href = `${localePath(locale, "expertise")}#${domain.id}`;
          const points = domain.points.map((point) => text(locale, point)).filter(Boolean);
          const body = (
            <>
              <span className="domain-title">{t(`expertise.domains.${domain.id}`)}</span>
              {summary ? <span className="domain-summary">{summary}</span> : null}
              {page && points.length > 0 ? (
                <ul className="domain-points">
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : (
                <ArrowRight className="icon-dir domain-go" size={18} aria-hidden="true" />
              )}
            </>
          );
          return (
            <article
              key={domain.id}
              id={page ? domain.id : undefined}
              className={`domain-card anchor-offset${active === domain.id ? " is-active" : ""}`}
            >
              {page ? (
                <div className="domain-card-hit">{body}</div>
              ) : (
                <button
                  type="button"
                  className="domain-card-hit"
                  onMouseEnter={() => setActive(domain.id)}
                  onFocus={() => setActive(domain.id)}
                  onClick={() => navigate(href)}
                >
                  {body}
                </button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function Expertise() {
  return (
    <section className="band">
      <div className="container">
        <ExpertiseNavigator />
      </div>
    </section>
  );
}
