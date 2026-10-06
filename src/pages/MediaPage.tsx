import { useSearchParams } from "react-router-dom";
import { mediaFilters, mediaItems } from "@/data/videos";
import { VideoLibrary } from "@/components/home/MediaSection";
import { PostFeed } from "@/components/media/PostFeed";
import { socialById } from "@/data/socialLinks";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { youtubeId } from "@/utils/youtube";
import type { MediaCategory } from "@/types";

export default function MediaPage() {
  const { locale, t } = useI18n();
  const [params, setParams] = useSearchParams();
  const requested = params.get("filter") ?? "all";
  const filter = mediaFilters.includes(requested as MediaCategory | "all") ? requested : "all";
  const channel = socialById("youtube");
  const talks = mediaItems.filter((item) => youtubeId(item.youtubeUrl).length > 0);

  return (
    <>
      <Seo title={t("media.pageTitle")} description={t("meta.pages.media")} path={localePath(locale, "media")} />
      <header className="container page-hero">
        <h1 className="page-title">{t("media.pageTitle")}</h1>
        <p className="page-lede">{t("media.intro")}</p>
      </header>
      <PostFeed />
      <section className="container" style={{ paddingBottom: "3rem" }}>
        <VideoLibrary
          items={talks}
          initialFilter={filter}
          onFilter={(next) => setParams(next === "all" ? {} : { filter: next })}
        />
        {channel ? (
          <div className="media-foot">
            <ArrowLink to={channel.href}>{t("media.youtube")}</ArrowLink>
          </div>
        ) : null}
      </section>
    </>
  );
}
