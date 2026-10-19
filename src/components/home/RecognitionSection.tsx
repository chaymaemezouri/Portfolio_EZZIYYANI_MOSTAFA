import { useRef } from "react";
import { academicNarrative, academicStats } from "@/data/academic";
import { useBooks, useLeadership } from "@/content/hooks";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { SwipeHint } from "@/components/shared/SwipeHint";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export function RecognitionSection() {
  const { locale, t } = useI18n();
  const booksRef = useRef<HTMLDivElement>(null);
  const bookEditions = useBooks();
  const leadershipRoles = useLeadership();
  const total = academicStats.find((stat) => stat.id === "total");
  const covers = bookEditions.flatMap((edition) =>
    edition.volumes
      .filter((item) => item.cover)
      .map((item, index) => ({ ...item, id: item.id ?? `${edition.id}-${index}`, edition: edition.name })),
  ).slice(0, 6);

  return (
    <section className="band recognition">
      <div className="lead-board">
        <div className="container">
          <div className="section-head recog-head">
            <div>
              <h2 className="section-title">{t("academic.title")}</h2>
              <p className="section-text">{t("academic.intro")}</p>
            </div>
          </div>
          <div className="lead-stage">
            {total?.display ? (
              <div className="lead-figure">
                <strong>{total.display}</strong>
                <span>{t("academic.stats.total")}</span>
              </div>
            ) : null}
            <div className="lead-story">
              {academicNarrative.map((paragraph) => (
                <p key={text(locale, paragraph)}>{text(locale, paragraph)}</p>
              ))}
            </div>
          </div>
          <div className="lead-roles">
            {leadershipRoles.map((role, index) => (
              <article key={role.id}>
                <span className="lead-num">{index + 1}</span>
                {role.year ? <span className="lead-year">{role.year}</span> : null}
                <h3>{text(locale, role.title)}</h3>
                <p>{text(locale, role.organization)}</p>
                {text(locale, role.description) ? <p className="lead-detail">{text(locale, role.description)}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section-head recog-head recog-awards">
          <div>
            <h2 className="section-title">{t("books.pageTitle")}</h2>
            <p className="section-text">{t("books.intro")}</p>
          </div>
          <ArrowLink to={localePath(locale, "books")}>{t("books.explore")}</ArrowLink>
        </div>
        <div className="swipe-row">
          <SwipeHint scroller={booksRef} />
          <div className="home-books" ref={booksRef}>
          {covers.map((item) => (
            <a key={item.id} href={item.href} target="_blank" rel="noreferrer">
              <img src={item.cover} alt="" />
              <span className="sr-only">{t("common.external")}</span>
              <span>{item.edition}</span>
              <span className="home-book-title">{item.title}</span>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
