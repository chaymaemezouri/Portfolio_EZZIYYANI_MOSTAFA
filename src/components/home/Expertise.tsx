import { useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import { expertiseDomains } from "@/data/expertise";
import { Reveal } from "@/components/shared/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

const tones = ["navy", "gold", "gray"] as const;

const arts = [
  "/domains/01.jpg?v=2",
  "/domains/02.jpg?v=2",
  "/domains/03.jpg?v=2",
  "/domains/04.jpg?v=2",
  "/domains/05.jpg?v=2",
  "/domains/06.jpg?v=2",
];

export function ExpertiseNavigator({ page = false }: { page?: boolean }) {
  const { locale, t } = useI18n();
  const [flipped, setFlipped] = useState<string | null>(null);

  function toggle(id: string) {
    setFlipped((current) => (current === id ? null : id));
  }

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
        {expertiseDomains.map((domain, index) => {
          const summary = text(locale, domain.summary);
          const points = domain.points.map((point) => text(locale, point)).filter(Boolean);
          const open = flipped === domain.id;
          const tone = tones[index % tones.length];
          const label = String(index + 1).padStart(2, "0");
          return (
            <article
              key={domain.id}
              id={page ? domain.id : undefined}
              className={`domain-card tone-${tone} anchor-offset${open ? " is-flipped" : ""}`}
            >
              <div className="domain-flip">
                <button
                  type="button"
                  className="domain-face domain-front"
                  style={{ backgroundImage: `url(${arts[index]})` }}
                  aria-expanded={open}
                  tabIndex={open ? -1 : 0}
                  onClick={() => toggle(domain.id)}
                >
                  <span className="domain-index">{label}</span>
                  <span className="domain-title">{t(`expertise.domains.${domain.id}`)}</span>
                  {summary ? <span className="domain-summary">{summary}</span> : null}
                  <span className="domain-turn">
                    {t("expertise.more")}
                    <RotateCw size={14} aria-hidden="true" />
                  </span>
                </button>
                <button
                  type="button"
                  className="domain-face domain-back"
                  aria-expanded={open}
                  tabIndex={open ? 0 : -1}
                  onClick={() => toggle(domain.id)}
                >
                  <span className="domain-index">{label}</span>
                  <span className="domain-title">{t(`expertise.domains.${domain.id}`)}</span>
                  <span className="domain-back-body">
                    {summary ? <span className="domain-summary">{summary}</span> : null}
                    {points.length > 0 ? (
                      <span className="domain-points">
                        {points.map((point) => (
                          <span key={point}>{point}</span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                  <span className="domain-turn">
                    {t("expertise.back")}
                    <RotateCcw size={14} aria-hidden="true" />
                  </span>
                </button>
              </div>
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
