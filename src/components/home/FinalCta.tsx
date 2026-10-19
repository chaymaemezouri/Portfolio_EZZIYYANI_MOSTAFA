import { useEffect, useRef } from "react";
import { SwipeHint } from "@/components/shared/SwipeHint";
import { usePosts } from "@/content/hooks";
import { useI18n } from "@/i18n/I18nProvider";
import { facebookPostEmbed, isFacebookUrl } from "@/utils/facebook";
import { text } from "@/utils/text";

export function FinalCta() {
  const { dir, locale, t } = useI18n();
  const publicPosts = usePosts();
  const scroller = useRef<HTMLDivElement>(null);
  const posts = publicPosts.filter(
    (post) => post.images.length > 0 || Boolean(text(locale, post.text)) || isFacebookUrl(post.href),
  );

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };
    const onMessage = (event: MessageEvent) => {
      if (!String(event.origin).includes("facebook.com")) return;
      const frames = el.querySelectorAll<HTMLIFrameElement>(".fb-post");
      const frame = [...frames].find((node) => node.contentWindow === event.source);
      if (!frame) return;
      const raw = event.data;
      let height = 0;
      if (typeof raw === "number") height = raw;
      else if (typeof raw === "string") {
        try {
          const parsed = JSON.parse(raw) as { height?: number };
          height = Number(parsed.height) || 0;
        } catch {
          const match = raw.match(/height["']?\s*[:=]\s*(\d+)/);
          height = match ? Number(match[1]) : 0;
        }
      } else if (raw && typeof raw === "object" && "height" in raw) {
        height = Number((raw as { height?: number }).height) || 0;
      }
      if (height > 240 && height < 5000) frame.style.height = `${Math.ceil(height)}px`;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("message", onMessage);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="home-posts" aria-label={t("media.posts")}>
      <div className="container">
        <div className="section-head home-posts-head">
          <div>
            <p className="eyebrow">{t("media.posts")}</p>
            <h2 className="section-title">{t("media.posts")}</h2>
          </div>
        </div>
        <div className="swipe-row">
          <SwipeHint scroller={scroller} />
          <div className="home-posts-scroller" ref={scroller}>
          {posts.map((post) => {
            const caption = text(locale, post.text);
            const embedded = post.images.length === 0 && isFacebookUrl(post.href);
            if (embedded) {
              return (
                <article key={post.id} className="home-post" dir={dir}>
                  <iframe
                    className="fb-post"
                    src={facebookPostEmbed(post.href, 420)}
                    title={t("media.posts")}
                    scrolling="no"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </article>
              );
            }
            return (
              <article key={post.id} className="home-post" dir={dir}>
                {post.images.length > 0 ? (
                  <div className="post-images">
                    {post.images.map((src) => (
                      <img key={src} src={src} alt="" />
                    ))}
                  </div>
                ) : null}
                {caption ? <p className="post-text">{caption}</p> : null}
              </article>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
