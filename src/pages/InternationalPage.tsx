import { ArticlesReader } from "@/components/vision/ArticlesReader";
import { InternationalPresence } from "@/components/home/InternationalPresence";
import { Seo } from "@/components/shared/Seo";
import { useMissions } from "@/content/hooks";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function InternationalPage() {
  const { locale, t } = useI18n();
  const missions = useMissions();

  return (
    <>
      <Seo
        title={t("nav.collaboration")}
        description={t("meta.pages.international")}
        path={localePath(locale, "international")}
      />
      <header className="container vision-open">
        <div>
          <h1 className="page-title">{t("nav.collaboration")}</h1>
        </div>
        <p className="page-lede">{t("international.subtitle")}</p>
      </header>
      <section className="container vision-doc-wrap">
        <ArticlesReader
          items={missions}
          labels={{
            list: t("international.documents"),
            download: t("international.download"),
            empty: t("international.noDocuments"),
            select: t("international.selectDocument"),
          }}
        />
      </section>
      <InternationalPresence heading={false} showRegions={false} />
    </>
  );
}
