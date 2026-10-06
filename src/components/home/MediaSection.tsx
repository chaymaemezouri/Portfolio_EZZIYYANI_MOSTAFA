import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Play } from "lucide-react";
import { mediaFilters, mediaItems } from "@/data/videos";
import { socialById } from "@/data/socialLinks";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import { mediaEmbed, youtubeId, youtubeThumb } from "@/utils/youtube";
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

const PAGE_SIZE = 4;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function VideoStage({
  items,
  initialId,
  initialFilter = "all",
  onFilter,
}: {
  items: MediaItem[];
  initialId: string;
  initialFilter?: string;
  onFilter?: (filter: string) => void;
}) {
  const { locale, t } = useI18n();
  const [filter, setFilter] = useState(initialFilter);
  const [sort, setSort] = useState<"list" | "title">("list");
  const [page, setPage] = useState(0);
  const [mainId, setMainId] = useState(initialId);
  const [playing, setPlaying] = useState(false);

  const categories = useMemo(() => {
    const present = new Set(items.map((item) => item.category));
    return mediaFilters.filter((item) => item === "all" || present.has(item));
  }, [items]);

  const filtered = useMemo(() => {
    const next = filter === "all" ? items : items.filter((item) => item.category === filter);
    if (sort === "title") {
      return [...next].sort((a, b) => text(locale, a.title).localeCompare(text(locale, b.title), locale));
    }
    return next;
  }, [filter, items, locale, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const slice = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);
  const main = filtered.find((item) => item.id === mainId) ?? filtered[0];
  const index = main ? filtered.findIndex((item) => item.id === main.id) : -1;
  const embedSrc = main ? mediaEmbed(main.youtubeUrl) : "";
  const showPlayer = Boolean(main && playing && main.id === mainId && embedSrc);
  const counter = main ? `${pad(index + 1)} / ${pad(filtered.length)}` : "00 / 00";

  function applyFilter(next: string) {
    setFilter(next);
    setPage(0);
    setPlaying(false);
    onFilter?.(next);
  }

  function open(item: MediaItem, start: boolean) {
    setMainId(item.id);
    setPlaying(start && playable(item));
    const at = filtered.findIndex((entry) => entry.id === item.id);
    if (at >= 0) setPage(Math.floor(at / PAGE_SIZE));
  }

  function step(direction: number) {
    if (!filtered.length || !main) return;
    const at = filtered.findIndex((item) => item.id === main.id);
    const next = filtered[(at + direction + filtered.length) % filtered.length];
    open(next, false);
  }

  return (
    <div className="yt-board">
      <div className="yt-stage">
        <p className="yt-index">{counter}</p>
        {main ? (
          <article className="yt-now">
            <p className="yt-kicker">{t("media.now")}</p>
            <h3>{text(locale, main.title)}</h3>
            <p className="yt-cat">
              <span className="yt-dot" aria-hidden="true" />
              {t(`media.filters.${main.category}`)}
            </p>
          </article>
        ) : (
          <p className="yt-empty">{t("media.empty")}</p>
        )}
        <div className="yt-screen">
          <span className="yt-screen-index">{counter}</span>
          {main ? (
            <div className={`yt-poster${showPlayer ? " is-playing" : ""}`}>
              {showPlayer ? (
                <iframe
                  key={embedSrc}
                  src={embedSrc}
                  title={text(locale, main.title)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="yt-poster-hit" onClick={() => open(main, true)}>
                  <span className="sr-only">{t("media.watch")}</span>
                  {main.thumbnail || youtubeThumb(main.youtubeUrl) ? (
                    <img src={main.thumbnail || youtubeThumb(main.youtubeUrl)} alt="" />
                  ) : (
                    <span className="yt-fallback" />
                  )}
                  {playable(main) ? (
                    <span className="yt-play" aria-hidden="true">
                      <Play size={22} fill="currentColor" />
                    </span>
                  ) : null}
                </button>
              )}
            </div>
          ) : null}
          <div className="yt-step">
            <button type="button" onClick={() => step(-1)} aria-label={t("media.prev")} disabled={!filtered.length}>
              <ChevronUp size={16} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={t("media.next")} disabled={!filtered.length}>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      <aside className="yt-panel">
        <header className="yt-panel-head">
          <h3>{t("media.list")}</h3>
          <span>{filtered.length}/{items.length}</span>
        </header>
        <div className="yt-chips" role="group" aria-label={t("media.list")}>
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} onClick={() => applyFilter(item)}>
              {t(`media.filters.${item}`)}
            </button>
          ))}
        </div>
        <label className="yt-sort">
          <span>{t("media.sort")}</span>
          <select value={sort} onChange={(event) => { setSort(event.target.value as "list" | "title"); setPage(0); }}>
            <option value="list">{t("media.sortList")}</option>
            <option value="title">{t("media.sortTitle")}</option>
          </select>
        </label>
        <ul className="yt-rows">
          {slice.map((item) => {
            const image = item.thumbnail || youtubeThumb(item.youtubeUrl);
            const current = main?.id === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`yt-row${current ? " is-current" : ""}`}
                  aria-current={current ? "true" : undefined}
                  onClick={() => open(item, false)}
                >
                  <span className="yt-row-thumb">
                    {image ? <img src={image} alt="" /> : <span className="yt-fallback" />}
                  </span>
                  <span className="yt-row-copy">
                    <span className="yt-row-cat">{t(`media.filters.${item.category}`)}</span>
                    <span className="yt-row-title">{text(locale, item.title)}</span>
                    {playable(item) ? (
                      <span className="yt-status">
                        <span className="yt-status-dot" aria-hidden="true" />
                        {t("media.available")}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="yt-pager">
          <button type="button" onClick={() => setPage((value) => Math.max(0, Math.min(value, pageCount - 1) - 1))} disabled={safePage === 0} aria-label={t("media.prev")}>
            <ChevronLeft size={16} />
          </button>
          <span>{safePage + 1} / {pageCount}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(pageCount - 1, Math.min(value, pageCount - 1) + 1))} disabled={safePage >= pageCount - 1} aria-label={t("media.next")}>
            <ChevronRight size={16} />
          </button>
        </div>
      </aside>
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

export function VideoLibrary({
  items,
  initialFilter = "all",
  onFilter,
}: {
  items: MediaItem[];
  initialFilter?: string;
  onFilter?: (filter: string) => void;
}) {
  if (items.length === 0) return null;
  const featured = items.find((item) => item.featured) ?? items[0];
  return <VideoStage items={items} initialId={featured.id} initialFilter={initialFilter} onFilter={onFilter} />;
}

export function MediaSection() {
  const { t } = useI18n();
  const channel = socialById("youtube");
  const talks = mediaItems.filter((item) => youtubeId(item.youtubeUrl).length > 0);

  return (
    <section className="band">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">{t("media.title")}</h2>
            <p className="section-text" style={{ marginTop: "0.9rem" }}>{t("media.intro")}</p>
          </div>
        </div>
        <MediaMosaic items={talks} />
        {channel ? (
          <div className="media-foot">
            <ArrowLink to={channel.href}>{t("media.youtube")}</ArrowLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
