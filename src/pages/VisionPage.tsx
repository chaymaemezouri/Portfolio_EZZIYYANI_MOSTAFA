import { visionThemes } from "@/data/vision";
import { ArticlesReader } from "@/components/vision/ArticlesReader";
import { StrategicStatement } from "@/components/home/StrategicStatement";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";

export default function VisionPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("vision.title")} description={t("meta.pages.vision")} path={localePath(locale, "vision")} />
      <header className="container vision-open">
        <div>
          <h1 className="page-title">{t("vision.title")}</h1>
        </div>
        <p className="page-lede">{t("vision.subtitle")}</p>
      </header>
      <section className="container vision-doc-wrap">
        <ArticlesReader />
      </section>
      <section className="container vision-board" id="themes">
        {visionThemes.map((theme) => (
          <article className="vision-card" key={theme.id}>
            <h2>{t(`vision.themes.${theme.id}`)}</h2>
            {text(locale, theme.statement) ? <p>{text(locale, theme.statement)}</p> : null}
          </article>
        ))}
      </section>
      <StrategicStatement />
    </>
  );
}
