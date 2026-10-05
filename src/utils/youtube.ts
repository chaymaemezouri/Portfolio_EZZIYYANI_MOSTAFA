export function youtubeId(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? "";
}

export function youtubeThumb(url: string): string {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : "";
}

export function youtubeEmbed(url: string): string {
  const id = youtubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : "";
}

export function mediaEmbed(url: string): string {
  const youtube = youtubeEmbed(url);
  if (youtube) return youtube;
  if (!url || !/facebook\.com|fb\.watch/i.test(url)) return "";
  const href = url.split("&__")[0];
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false&width=1280`;
}
