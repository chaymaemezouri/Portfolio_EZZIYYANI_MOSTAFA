import { useMemo, useState } from "react";
import { BookOpen, Download, ExternalLink, Search, X } from "lucide-react";
import { usePublications } from "@/content/hooks";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { ResearchHero } from "@/components/research/ResearchHero";

export default function PublicationsPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const listedPublications = usePublications();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return listedPublications;
    return listedPublications.filter((item) => {
      const haystack = `${item.title} ${item.authors} ${item.venue} ${item.year}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [listedPublications, query]);

  return (
    <div className="science-page">
      <Seo
        title={t("publications.pageTitle")}
        description={t("meta.pages.publications")}
        path={localePath(locale, "publications")}
      />
      <ResearchHero eyebrow={t("publications.eyebrow")} title={t("publications.pageTitle")} description={t("publications.intro")} variant="publications" />
      <section className="container science-publications" aria-label={t("publications.pageTitle")}>
        <div className="pubs-toolbar">
          <p className="pubs-count" aria-live="polite">
            <BookOpen size={19} aria-hidden="true" />{results.length} <span>{t("publications.countLabel")}</span>
          </p>
          <div className="pubs-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              aria-label={t("publications.searchLabel")}
              value={query}
              placeholder={t("publications.search")}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? <button type="button" onClick={() => setQuery("")} aria-label={t("common.clearSearch")}><X size={15} aria-hidden="true" /></button> : null}
          </div>
        </div>
      <div className="pubs-list">
        {results.length === 0 ? <p className="empty-note">{t("publications.empty")}</p> : null}
        <ol>
          {results.map((item) => (
            <li key={item.id}>
              <span className="pubs-num">{String(item.number).padStart(2, "0")}</span>
              <div className="pubs-body">
                <h2>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h2>
                <p className="pubs-meta">
                  {item.authors ? <span className="pubs-authors">{item.authors}</span> : null}
                  {item.venue ? <span className="pubs-venue">{item.venue}</span> : null}
                  {item.year ? <span className="pubs-year">{item.year}</span> : null}
                </p>
              </div>
              <div className="pubs-actions">
                {item.url ? (
                  <a className="pubs-download" href={item.url} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} aria-hidden="true" />
                    {t("publications.view")}
                  </a>
                ) : null}
                {item.file ? (
                  <a className="pubs-download" href={item.file} download target="_blank" rel="noreferrer">
                    <Download size={15} aria-hidden="true" />
                    {t("publications.download")}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
      </section>
    </div>
  );
}
