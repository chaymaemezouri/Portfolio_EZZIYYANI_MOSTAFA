import type { Locale } from "@/types";
import type { AvatarMessage, AvatarReply } from "./types";

export async function askAvatarApi(
  question: string,
  locale: Locale,
  history: AvatarMessage[],
): Promise<AvatarReply | null> {
  try {
    const response = await fetch("/api/avatar/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        locale,
        history: history.map((message) => ({ role: message.role, text: message.text })),
      }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { text?: string; related?: string };
    if (typeof data.text !== "string" || !data.text.trim()) return null;
    return {
      text: data.text.trim(),
      related: typeof data.related === "string" ? data.related : undefined,
    };
  } catch {
    return null;
  }
}
