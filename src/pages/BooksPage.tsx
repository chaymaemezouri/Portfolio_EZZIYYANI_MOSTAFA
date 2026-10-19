import { BookOpen, ArrowUpRight } from "lucide-react";
import { useBooks } from "@/content/hooks";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function BooksPage() {
  const { locale, t } = useI18n();
  const bookEditions = useBooks();

  return (
    <>
      <Seo title={t("books.pageTitle")} description={t("meta.pages.books")} path={localePath(locale, "books")} />
      <header className="container books-open">
        <p className="eyebrow">{t("books.eyebrow")}</p>
        <h1 className="page-title">{t("books.pageTitle")}</h1>
        <p className="page-lede">{t("books.intro")}</p>
      </header>
      <div className="container books-list">
        {bookEditions.map((edition) => {
          const pendingOnly = edition.volumes.every((item) => !item.href);
          return (
            <section key={edition.id} className="books-edition" aria-labelledby={edition.id}>
              <header>
                <h2 id={edition.id}>{edition.name}</h2>
                {edition.context ? <p className="books-context">{edition.context}</p> : null}
              </header>
              {pendingOnly ? (
                <div className="book-pending">
                  {edition.volumes.map((item, index) => (
                    <article key={index}>
                      <span className="book-cover is-soon">
                        <BookOpen size={26} aria-hidden="true" />
                      </span>
                      <span className="book-body">
                        <span className="book-title">{item.title}</span>
                        <span className="book-soon">{t("books.soon")}</span>
                      </span>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="book-grid">
                  {edition.volumes.map((item, index) => {
                    const body = (
                      <>
                        <span className={`book-cover${item.cover ? "" : " is-soon"}`}>
                          {item.cover ? <img src={item.cover} alt="" /> : <BookOpen size={26} aria-hidden="true" />}
                        </span>
                        <span className="book-body">
                          <span className="book-title">{item.title}</span>
                          {item.href ? (
                            <span className="book-springer">
                              {t("books.springer")}
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </span>
                          ) : (
                            <span className="book-soon">{t("books.soon")}</span>
                          )}
                        </span>
                      </>
                    );
                    if (!item.href) {
                      return (
                        <article key={index} className="book-card">
                          {body}
                        </article>
                      );
                    }
                    return (
                      <a key={index} className="book-card" href={item.href} target="_blank" rel="noreferrer">
                        <span className="sr-only">{t("common.external")}</span>
                        {body}
                      </a>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
