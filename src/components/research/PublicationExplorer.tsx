import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { publicationFilters, publications, researchLines } from "@/data/publications";
import { text } from "@/utils/text";
import type { PublicationFilter } from "@/data/publications";
import { useI18n } from "@/i18n/I18nProvider";
import type { Publication } from "@/types";

function Row({ item }: { item: Publication }) {
  const { t } = useI18n();
  return (
    <article className="pub-full">
      <span className="year">{item.year || "—"}</span>
      <div>
        <h3 className="pub-title">{item.title}</h3>
        <div className="pub-actions">
          {item.url ? (
            <a href={item.url} target="_blank" rel="noreferrer">
              {t("research.view")} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : null}
          {item.doi ? (
            <a href={item.doi.startsWith("http") ? item.doi : `https://doi.org/${item.doi}`} target="_blank" rel="noreferrer">
              {t("research.doi")}
            </a>
          ) : null}
          {item.scholarUrl ? (
            <a href={item.scholarUrl} target="_blank" rel="noreferrer">{t("research.scholar")}</a>
          ) : null}
          {item.orcidUrl ? (
            <a href={item.orcidUrl} target="_blank" rel="noreferrer">{t("research.orcid")}</a>
          ) : null}
        </div>
      </div>
      <span className="pub-authors">{item.authors}</span>
      <span className="pub-venue">{item.venue}</span>
      <span className="pub-venue">{item.type}</span>
    </article>
  );
}

export function PublicationExplorer() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PublicationFilter>("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return publications.filter((item) => {
      const matchesFilter = filter === "all" || item.tags.includes(filter);
      const haystack = `${item.title} ${item.authors} ${item.venue} ${item.year}`.toLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [filter, query]);

  if (publications.length === 0) {
    return (
      <div className="record-block">
        {researchLines.map((line) => (
          <article key={line.id} className="activity-row">
            <span />
            <div>
              <h3>{text(locale, line.label)}</h3>
              <p className="timeline-body">{text(locale, line.detail)}</p>
            </div>
          </article>
        ))}
        <p className="timeline-body">
          <a href="https://orcid.org/0000-0002-8828-4972" target="_blank" rel="noreferrer">ORCID 0000-0002-8828-4972</a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <label className="search-field">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">{t("research.searchLabel")}</span>
        <input
          value={query}
          placeholder={t("research.search")}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="filters" role="group" aria-label={t("research.searchLabel")}>
        {publicationFilters.map((item) => (
          <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {t(`research.filters.${item}`)}
          </button>
        ))}
      </div>
      <div className="pub-table-head" aria-hidden="true">
        <span>{t("research.col.year")}</span>
        <span>{t("research.col.title")}</span>
        <span>{t("research.col.authors")}</span>
        <span>{t("research.col.venue")}</span>
        <span>{t("research.col.type")}</span>
      </div>
      {results.length === 0 ? <p className="empty-note">{t("research.empty")}</p> : results.map((item) => <Row key={item.id} item={item} />)}
    </div>
  );
}
