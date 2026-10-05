import { ExpertiseNavigator } from "@/components/home/Expertise";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function ExpertisePage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("expertise.title")} description={t("meta.pages.expertise")} path={localePath(locale, "expertise")} />
      <section className="band" style={{ paddingTop: "calc(var(--header-h) + 3.5rem)" }}>
        <div className="container">
          <ExpertiseNavigator page />
        </div>
      </section>
    </>
  );
}
