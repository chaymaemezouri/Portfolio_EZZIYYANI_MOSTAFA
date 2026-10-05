import { useEffect, useRef } from "react";
import { publicPosts } from "@/data/posts";
import { useI18n } from "@/i18n/I18nProvider";
import { facebookPostEmbed, isFacebookUrl } from "@/utils/facebook";
import { text } from "@/utils/text";

export function PostFeed() {
  const { dir, locale, t } = useI18n();
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
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="container post-section" id="publications">
      <p className="eyebrow">{t("media.posts")}</p>
      <h2 className="section-title">{t("media.posts")}</h2>
      <p className="section-text">{t("media.postsIntro")}</p>
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
              {post.date ? <p className="micro">{post.date}</p> : null}
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
    </section>
  );
}
