import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/i18n/I18nProvider";
import { useI18n } from "@/i18n/I18nProvider";
import { isLocale } from "@/utils/locale";

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
  if (!isLocale(locale)) return <Navigate to="/en" replace />;

  return (
    <I18nProvider locale={locale}>
      <div className="site">
        <SkipLink />
        <ScrollToTop />
        <Header />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
