import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { mediaFilters, mediaItems } from "@/data/videos";
import { VideoLibrary } from "@/components/home/MediaSection";
import { PostFeed } from "@/components/media/PostFeed";
import { socialById } from "@/data/socialLinks";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import type { MediaCategory } from "@/types";

export default function MediaPage() {
  const { locale, t } = useI18n();
  const [params, setParams] = useSearchParams();
  const requested = params.get("filter") ?? "all";
  const filter = mediaFilters.includes(requested as MediaCategory | "all") ? requested : "all";
  const channel = socialById("youtube");

  const visible = useMemo(() => {
    if (filter === "all") return mediaItems;
    return mediaItems.filter((item) => item.category === filter);
  }, [filter]);

  return (
    <>
      <Seo title={t("media.pageTitle")} description={t("meta.pages.media")} path={localePath(locale, "media")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("media.pageTitle")}</h1>
        <p className="page-lede">{t("media.intro")}</p>
        <div className="filters" role="group" aria-label={t("media.pageTitle")}>
          {mediaFilters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setParams(item === "all" ? {} : { filter: item })}
            >
              {t(`media.filters.${item}`)}
            </button>
          ))}
        </div>
      </header>
      <PostFeed />
      <section className="container" style={{ paddingBottom: "3rem" }}>
        <p className="micro">{t("media.featured")}</p>
        <VideoLibrary items={visible} />
        {channel ? (
          <div className="media-foot">
            <ArrowLink to={channel.href}>{t("media.youtube")}</ArrowLink>
          </div>
        ) : null}
      </section>
    </>
  );
}
