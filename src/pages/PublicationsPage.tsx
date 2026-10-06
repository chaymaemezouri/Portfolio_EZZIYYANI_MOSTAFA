import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { listedPublications } from "@/data/publications";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function PublicationsPage() {
  const { locale, t } = useI18n();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return listedPublications;
    return listedPublications.filter((item) => {
      const haystack = `${item.title} ${item.authors} ${item.venue} ${item.year}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

  return (
    <>
      <Seo
        title={t("publications.pageTitle")}
        description={t("meta.pages.publications")}
        path={localePath(locale, "publications")}
      />
      <header className="container pubs-open">
        <p className="eyebrow">{t("publications.eyebrow")}</p>
        <h1 className="page-title">{t("publications.pageTitle")}</h1>
        <p className="page-lede">{t("publications.intro")}</p>
        <label className="pubs-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">{t("publications.searchLabel")}</span>
          <input
            value={query}
            placeholder={t("publications.search")}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </header>
      <section className="container pubs-list">
        {results.length === 0 ? <p className="empty-note">{t("publications.empty")}</p> : null}
        <ol>
          {results.map((item) => (
            <li key={item.id}>
              <span className="pubs-num">{item.number}</span>
              <div className="pubs-body">
                <h2>{item.title}</h2>
                <p className="pubs-authors">{item.authors}</p>
                <p className="pubs-venue">{item.venue}</p>
                {item.file ? (
                  <a className="pubs-download" href={item.file} download target="_blank" rel="noreferrer">
                    <Download size={15} aria-hidden="true" />
                    {t("publications.download")}
                  </a>
                ) : (
                  <span className="pubs-missing">{t("publications.unavailable")}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
