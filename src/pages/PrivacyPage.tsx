import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function PrivacyPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("privacy.title")} description={t("meta.pages.privacy")} path={localePath(locale, "privacy")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("privacy.title")}</h1>
        <p className="page-lede">{t("privacy.body")}</p>
      </header>
    </>
  );
}
