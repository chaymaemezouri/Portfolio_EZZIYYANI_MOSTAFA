import { useEffect, useId, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { expertiseDomains } from "@/data/expertise";
import { bookEditions } from "@/data/books";
import { listedPublications, publications } from "@/data/publications";
import { projects } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { useLockBody } from "@/hooks/useLockBody";
import { localePath, locales, swapLocale } from "@/utils/locale";
import { text } from "@/utils/text";

export function Header() {
  const { locale, t } = useI18n();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchId = useId();

  useLockBody(menuOpen || searchOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const openSearch = () => setSearchOpen(true);
    window.addEventListener("open-site-search", openSearch);
    return () => window.removeEventListener("open-site-search", openSearch);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, searchOpen]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const pages = navItems.map((item) => ({
      id: item.id,
      label: t(`nav.${item.id}`),
      to: localePath(locale, item.path),
      kind: t("nav.menu"),
    }));
    const domains = expertiseDomains.map((domain) => ({
      id: domain.id,
      label: t(`expertise.domains.${domain.id}`),
      to: `${localePath(locale, "expertise")}#${domain.id}`,
      kind: t("nav.expertise"),
    }));
    const papers = [
      ...publications
        .filter((item) => item.title)
        .map((item) => ({
          id: item.id,
          label: item.title,
          to: localePath(locale, "publications"),
          kind: t("nav.publications"),
        })),
      ...listedPublications.map((item) => ({
        id: item.id,
        label: item.title,
        to: localePath(locale, "publications"),
        kind: t("nav.publications"),
      })),
    ];
    const books = bookEditions.flatMap((edition) =>
      edition.volumes.map((item) => ({
        id: item.id,
        label: `${edition.name} — ${item.title}`,
        to: localePath(locale, "books"),
        kind: t("nav.books"),
      })),
    );
    const works = projects
      .filter((item) => text(locale, item.title))
      .map((item) => ({
        id: item.id,
        label: text(locale, item.title),
        to: localePath(locale, "projects"),
        kind: t("nav.projects"),
      }));
    return [...pages, ...domains, ...papers, ...books, ...works].filter((item) =>
      needle ? item.label.toLowerCase().includes(needle) : true,
    );
  }, [locale, query, t]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
      <div className="header-inner">
        <Link className="brand" to={localePath(locale)} aria-label={t("meta.siteName")}>
          <span className="monogram" aria-hidden="true">ME</span>
          <span className="brand-name latin">Prof. Mostafa Ezziyyani</span>
        </Link>

        <nav className="nav-desktop" aria-label={t("nav.menu")}>
          {navItems.map((item) => {
            const href = localePath(locale, item.path);
            const current = item.path === "" ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={item.id} to={href} aria-current={current ? "page" : undefined}>
                {t(`nav.${item.id}`)}
              </Link>
            );
          })}
        </nav>

        <div className="header-tools">
          <div className="lang-switch" role="group" aria-label={t("common.language")}>
            {locales.map((item) => (
              <Link
                key={item}
                to={swapLocale(pathname, item)}
                hrefLang={item}
                lang={item}
                aria-current={item === locale ? "true" : undefined}
              >
                {item.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            className="icon-btn header-search"
            type="button"
            aria-label={t("nav.search")}
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} aria-hidden="true" />
          </button>
          <Link className="btn btn-primary header-contact" to={localePath(locale, "contact")}>
            {t("nav.contact")}
          </Link>
          <button
            className="icon-btn menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="nav-overlay" role="dialog" aria-modal="true" aria-label={t("nav.menu")}>
          <nav className="overlay-list">
            {navItems.map((item) => (
              <Link key={item.id} className="overlay-link" to={localePath(locale, item.path)}>
                <span>{t(`nav.${item.id}`)}</span>
              </Link>
            ))}
          </nav>
          <div className="overlay-actions">
            <button className="btn btn-light" type="button" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>
              <Search size={16} aria-hidden="true" />
              {t("nav.search")}
            </button>
            <Link className="btn btn-light" to={localePath(locale, "contact")} onClick={() => setMenuOpen(false)}>
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="search-dialog" role="presentation" onClick={() => setSearchOpen(false)}>
          <div
            className="search-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("search.label")}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="search-row">
              <Search size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor={searchId}>{t("search.label")}</label>
              <input
                id={searchId}
                autoFocus
                value={query}
                placeholder={t("search.placeholder")}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="button" className="icon-btn" aria-label={t("search.close")} onClick={() => setSearchOpen(false)}>
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="search-results">
              {results.length === 0 ? <p className="search-empty">{t("search.empty")}</p> : null}
              {results.slice(0, 8).map((item) => (
                <Link key={`${item.kind}-${item.id}`} to={item.to} onClick={() => setSearchOpen(false)}>
                  {item.label}
                  <span>{item.kind}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
