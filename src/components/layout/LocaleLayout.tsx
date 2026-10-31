import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/i18n/I18nProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { defaultLocale, isLocale } from "@/utils/locale";

function SkipLink() {
  const { t } = useI18n();
  return (
    <a className="skip-link" href="#main">
      {t("nav.skip")}
    </a>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function LocaleLayout() {
  const { locale } = useParams();
  const { pathname } = useLocation();
  if (!isLocale(locale)) return <Navigate to={`/${defaultLocale}`} replace />;
  const avatarStudio = pathname.endsWith("/avatar");

  return (
    <I18nProvider locale={locale}>
      <div className={`site${avatarStudio ? " is-avatar" : ""}`}>
        <SkipLink />
        <ScrollToTop />
        <Header />
        <main id="main">
          <Outlet />
        </main>
        {avatarStudio ? null : <Footer />}
      </div>
    </I18nProvider>
  );
}
