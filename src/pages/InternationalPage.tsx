import { useInternational } from "@/content/hooks";
import { InternationalPresence } from "@/components/home/InternationalPresence";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function InternationalPage() {
  const { locale, t } = useI18n();
  const internationalActivities = useInternational();
  return (
    <>
      <Seo title={t("international.title")} description={t("meta.pages.international")} path={localePath(locale, "international")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("international.homeTitle")}</h1>
      </header>
      <InternationalPresence heading={false} showRegions={false} />
      <div className="container international-countries">
        <ul className="international-country-list" aria-label={t("international.title")}>
          {[...new Map(internationalActivities.map((item) => [text(locale, item.country), item])).values()].map((item) => (
            <li key={item.id}>{text(locale, item.country)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
