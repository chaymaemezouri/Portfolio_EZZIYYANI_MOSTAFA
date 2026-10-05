import type { PublicPost } from "@/types";
import { l10n } from "@/utils/text";

const profileId = "100000364753525";

function facebookPost(storyId: string): PublicPost {
  return {
    id: `fb-${storyId}`,
    date: "",
    text: "",
    images: [],
    href: `https://www.facebook.com/${profileId}/posts/${storyId}`,
  };
}

/**
 * A publication is either a local image plus its text, or a Facebook post URL.
 * Facebook only returns its own frame for a URL: the caption and pictures stay
 * inside that frame. The share link is resolved to the post id first.
 */
export const publicPosts: PublicPost[] = [
  {
    id: "france24-cyber-2026",
    date: "",
    text: l10n(
      "France 24, Nabd France. France facing the rise of cyberattacks. Between digital fragility and national sovereignty: what strategy to protect the digital state? Cybersecurity in France: technical flaws or a structural gap?",
      "France 24, Nabd France. La France face à la montée des cyberattaques. Entre fragilité numérique et souveraineté nationale : quelle stratégie pour protéger l’État numérique ? Cybersécurité en France : failles techniques ou fossé structurel ?",
      "فرانس 24، نبض فرنسا. فرنسا في مواجهة تصاعد الهجمات السيبرانية. بين الهشاشة الرقمية والسيادة الوطنية: أي استراتيجية لحماية الدولة الرقمية؟ الأمن السيبراني في فرنسا: ثغرات تقنية أم فجوة هيكلية؟",
    ),
    images: ["/posts/france24-cyber-2026.jpg"],
    href: "",
  },
  facebookPost("28319246124337501"),
  facebookPost("28312175571711223"),
  facebookPost("28304729405789173"),
  facebookPost("28290137723915008"),
  facebookPost("27866205302974921"),
  facebookPost("27689563413972445"),
  facebookPost("27461059483489507"),
  facebookPost("27400421609553295"),
  facebookPost("27388896260705830"),
  facebookPost("27170561349205990"),
  facebookPost("27170291469232978"),
  facebookPost("27152623730999752"),
  facebookPost("26737827982479331"),
];
