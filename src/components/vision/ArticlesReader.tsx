import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import type { VisionArticle } from "@/data/articles";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

type Labels = {
  list: string;
  download: string;
  empty: string;
  select: string;
};

type Props = {
  items: VisionArticle[];
  labels: Labels;
};

export function ArticlesReader({ items, labels }: Props) {
  const { locale, t } = useI18n();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) {
      setActiveId("");
      return;
    }
    if (!items.some((item) => item.id === activeId)) {
      setActiveId(items[0].id);
    }
  }, [items, activeId]);

  const active = items.find((item) => item.id === activeId) ?? items[0];
  const body = active ? text(locale, active.content) : "";
  const summary = active ? text(locale, active.summary) : "";

  return (
    <article className="articles-reader">
      <aside className="articles-nav" aria-label={labels.list}>
        <p className="eyebrow">{labels.list}</p>
        {items.length ? (
          <ul>
            {items.map((item, index) => {
              const title = text(locale, item.title);
              const current = item.id === active?.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={current ? "is-active" : undefined}
                    aria-current={current ? "true" : undefined}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="articles-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="articles-nav-title" dir="auto">
                      {title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="articles-empty">{labels.empty}</p>
        )}
      </aside>

      <div className="articles-pane">
        {active ? (
          <>
            <header className="articles-pane-head">
              <div className="articles-pane-copy">
                {active.year ? <p className="articles-year">{active.year}</p> : null}
                <h2 dir="auto">{text(locale, active.title)}</h2>
                {summary ? <p className="articles-summary" dir="auto">{summary}</p> : null}
                {active.file ? (
                  <a className="articles-download" href={active.file} download>
                    <Download size={15} aria-hidden="true" />
                    {labels.download}
                  </a>
                ) : null}
              </div>
              <img
                className="articles-portrait"
                src="/assets/profile/portrait-article.png"
                alt={t("hero.portraitAlt")}
              />
            </header>
            {body ? <div className="articles-body" dir="auto">{body}</div> : null}
            {active.file ? (
              <iframe
                className="articles-frame"
                src={`${active.file}#view=FitH`}
                title={text(locale, active.title)}
              />
            ) : !body ? (
              <p className="articles-empty">{labels.select}</p>
            ) : null}
          </>
        ) : (
          <div className="articles-placeholder">
            <FileText size={28} aria-hidden="true" />
            <p>{labels.empty}</p>
          </div>
        )}
      </div>
    </article>
  );
}
