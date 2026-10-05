import { useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { mediaItems } from "@/data/videos";
import { socialById } from "@/data/socialLinks";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import { mediaEmbed, youtubeThumb } from "@/utils/youtube";
import type { MediaItem } from "@/types";

const specimenIds = ["keynote", "conference", "interview"] as const;

function Tile({
  href,
  onPlay,
  art,
  kicker,
  title,
  image,
  featured = false,
  label,
  className = "",
  playing = false,
  embedSrc = "",
}: {
  href: string;
  onPlay?: () => void;
  art: number;
  kicker: string;
  title: string;
  image?: string;
  featured?: boolean;
  label: string;
  className?: string;
  playing?: boolean;
  embedSrc?: string;
}) {
  const external = href.startsWith("http");
  const canOpen = Boolean(onPlay) || external || Boolean(href);
  const tileClass = `video-tile${featured ? " media-feature" : ""}${className ? ` ${className}` : ""}`;
  if (playing && embedSrc) {
    return (
      <div className={`${tileClass} is-playing`} data-art={art}>
        <span className="video-thumb">
          <iframe
            className="tile-player"
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </span>
        <span className="video-meta">
          <span className="video-kicker">{kicker}</span>
          <span className="video-title">{title}</span>
        </span>
      </div>
    );
  }
  const body = (
    <>
      <span className="video-thumb">
        {image ? <img src={image} alt="" /> : <span className="video-art" />}
        {canOpen ? (
          <span className="play-btn" aria-hidden="true">
            <Play size={featured ? 18 : 14} fill="currentColor" />
          </span>
        ) : null}
      </span>
      <span className="video-meta">
        <span className="video-kicker">{kicker}</span>
        <span className="video-title">{title}</span>
      </span>
    </>
  );
  if (onPlay) {
    return (
      <button type="button" className={tileClass} data-art={art} onClick={onPlay}>
        <span className="sr-only">{label}</span>
        {body}
      </button>
    );
  }
  if (!href) {
    return (
      <div className={tileClass} data-art={art}>
        {body}
      </div>
    );
  }
  if (external) {
    return (
      <a className={tileClass} data-art={art} href={href} target="_blank" rel="noreferrer">
        <span className="sr-only">{label}</span>
        {body}
      </a>
    );
  }
  return (
    <Link className={tileClass} data-art={art} to={href}>
      {body}
    </Link>
  );
}

function playable(item: MediaItem): boolean {
  return mediaEmbed(item.youtubeUrl).length > 0;
}

function VideoStage({
  items,
  initialId,
}: {
  items: MediaItem[];
  initialId: string;
}) {
  const { locale, t } = useI18n();
  const [mainId, setMainId] = useState(initialId);
  const [playing, setPlaying] = useState(false);
  const main = items.find((item) => item.id === mainId) ?? items.find((item) => item.id === initialId) ?? items[0];
  const rest = items.filter((item) => item.id !== main.id);
  const embedSrc = mediaEmbed(main.youtubeUrl);
  const showPlayer = playing && main.id === mainId && embedSrc.length > 0;

  function choose(item: MediaItem) {
    setMainId(item.id);
    setPlaying(playable(item));
  }

  return (
    <div className="video-stage">
      <div className="media-mosaic">
        <Tile
          key={main.id}
          featured
          art={1}
          href=""
          onPlay={() => choose(main)}
          playing={showPlayer}
          embedSrc={showPlayer ? embedSrc : ""}
          kicker={text(locale, main.event) || t(`media.filters.${main.category}`)}
          title={text(locale, main.title)}
          image={main.thumbnail || youtubeThumb(main.youtubeUrl)}
          label={text(locale, main.title)}
        />
        <div className="media-side">
          {rest.map((item, index) => (
            <Tile
              key={item.id}
              className="is-compact"
              art={index + 2}
              href=""
              onPlay={() => choose(item)}
              kicker={text(locale, item.event) || t(`media.filters.${item.category}`)}
              title={text(locale, item.title)}
              image={item.thumbnail || youtubeThumb(item.youtubeUrl)}
              label={text(locale, item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MediaMosaic({ items }: { items: MediaItem[] }) {
  const { locale, t } = useI18n();
  const channel = socialById("youtube");

  if (items.length === 0) {
    return (
      <div className="media-mosaic">
        <Tile
          featured
          art={1}
          href={channel?.href ?? localePath(locale, "media")}
          kicker={t("media.channel")}
          title="YouTube"
          label={t("media.youtube")}
        />
        {specimenIds.slice(0, 2).map((id, index) => (
          <Tile
            key={id}
            art={index + 2}
            href={`${localePath(locale, "media")}?filter=${id}`}
            kicker={t("media.format")}
            title={t(`media.filters.${id}`)}
            label={t(`media.filters.${id}`)}
          />
        ))}
      </div>
    );
  }

  const featured = items.find((item) => item.featured) ?? items[0];
  return <VideoStage items={items} initialId={featured.id} />;
}

export function VideoLibrary({ items }: { items: MediaItem[] }) {
  if (items.length === 0) return null;
  return <VideoStage items={items} initialId={items[0].id} />;
}

export function MediaSection() {
  const { t } = useI18n();
  const channel = socialById("youtube");

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">{t("media.title")}</h2>
            <p className="section-text" style={{ marginTop: "0.9rem" }}>{t("media.intro")}</p>
          </div>
        </div>
        <MediaMosaic items={mediaItems} />
        {channel ? (
          <div className="media-foot">
            <ArrowLink to={channel.href}>{t("media.youtube")}</ArrowLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
