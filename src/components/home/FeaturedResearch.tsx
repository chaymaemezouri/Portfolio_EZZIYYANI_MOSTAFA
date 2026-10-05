import { ArrowUpRight } from "lucide-react";
import { publications, researchCorpus, researchLines } from "@/data/publications";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Reveal } from "@/components/shared/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import type { Publication } from "@/types";

function CorpusRows() {
  const { locale } = useI18n();
  return (
    <ul className="feature-list">
      {researchLines.map((line) => (
        <li key={line.id} className="pub-row">
          <span>
            <span className="pub-title">{text(locale, line.label)}</span>
            <span className="pub-authors">{text(locale, line.detail)}</span>
          </span>
          <ArrowUpRight className="pub-arrow" size={16} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

function Entry({ item }: { item: Publication }) {
  const { t } = useI18n();
  const href = item.url || item.doi;
  const inner = (
    <>
      <span className="year">{item.year || "—"}</span>
      <span>
        <span className="pub-title">{item.title || "—"}</span>
        {item.authors ? <span className="pub-authors">{item.authors}</span> : null}
      </span>
      <span className="pub-venue">{item.venue || item.type}</span>
      <ArrowUpRight className="pub-arrow" size={16} aria-hidden="true" />
    </>
  );
  if (!href) return <li className="pub-row">{inner}</li>;
  return (
    <li>
      <a className="pub-row" href={href} target="_blank" rel="noreferrer">
        {inner}
        <span className="sr-only">{t("common.external")}</span>
      </a>
    </li>
  );
}

export function FeaturedResearch() {
  const { locale, t } = useI18n();
  const featured = publications.find((item) => item.featured) ?? publications[0];
  const rest = publications.filter((item) => item !== featured).slice(0, 4);

  return (
    <section className="band band-soft research-band">
      <div className="container">
        <div className="research-wrap">
        <Reveal>
          <div className="section-head">
            <div>
              <h2 className="section-title">{t("research.title")}</h2>
            </div>
            <ArrowLink to={localePath(locale, "research")}>{t("research.viewAll")}</ArrowLink>
          </div>
        </Reveal>
        <div className="research-split">
          <article className="feature-tile">
            <img
              className="feature-photo"
              src="/assets/profile/gallery-icea.png"
              alt={t("hero.portraitAlt")}
            />
            <div className="feature-copy">
              <p className="eyebrow">{t("research.featured")}</p>
            </div>
            <div>
              {featured ? (
                <>
                  <h3 className="feature-title">{featured.title}</h3>
                  <p className="feature-meta">
                    {[featured.year, featured.authors, featured.venue].filter(Boolean).join(" · ")}
                  </p>
                  <div className="feature-links">
                    {featured.url ? (
                      <a className="arrow-link" href={featured.url} target="_blank" rel="noreferrer">
                        {t("research.view")}
                      </a>
                    ) : null}
                    {featured.doi ? (
                      <a className="arrow-link" href={featured.doi} target="_blank" rel="noreferrer">
                        {t("research.doi")}
                      </a>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="feature-title">{text(locale, researchCorpus.title)}</h3>
                  <p className="feature-meta">{text(locale, researchCorpus.detail)}</p>
                </>
              )}
            </div>
          </article>
          {rest.length > 0 ? (
            <ul className="feature-list">
              {rest.map((item) => (
                <Entry key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            <CorpusRows />
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
