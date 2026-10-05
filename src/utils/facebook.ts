export function facebookPostEmbed(url: string, width = 500): string {
  const href = url.split("&__")[0];
  return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(href)}&show_text=true&width=${width}`;
}

export function isFacebookUrl(url: string): boolean {
  return /facebook\.com|fb\.watch/i.test(url);
}
