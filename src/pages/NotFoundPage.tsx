import { Link } from "react-router-dom";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function NotFoundPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("notFound.title")} description={t("notFound.body")} path={localePath(locale, "404")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("notFound.title")}</h1>
        <p className="page-lede">{t("notFound.body")}</p>
        <Link className="btn btn-primary" to={localePath(locale)} style={{ marginTop: "1.5rem" }}>
          {t("notFound.back")}
        </Link>
      </header>
    </>
  );
}
