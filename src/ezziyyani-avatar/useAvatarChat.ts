import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { askAvatarApi } from "./askApi";
import { answerAvatar } from "./engine";
import type { AvatarMessage } from "./types";

function storageKey(locale: string) {
  return `ezziyyani-avatar:${locale}`;
}

function welcomeMessage(text: string): AvatarMessage {
  return { id: 0, role: "assistant", text };
}

export function useAvatarChat() {
  const { locale, t } = useI18n();
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<AvatarMessage[]>([welcomeMessage(t("hero.assistant.welcome"))]);
  const timer = useRef<number>(0);
  const ticket = useRef(0);

  useEffect(() => {
    setReady(false);
    const saved = sessionStorage.getItem(storageKey(locale));
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AvatarMessage[];
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed);
          setDraft("");
          setThinking(false);
          setReady(true);
          return;
        }
      } catch {
        sessionStorage.removeItem(storageKey(locale));
      }
    }
    setMessages([welcomeMessage(t("hero.assistant.welcome"))]);
    setDraft("");
    setThinking(false);
    setReady(true);
  }, [locale, t]);

  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(storageKey(locale), JSON.stringify(messages));
  }, [locale, messages, ready]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function ask(value: string) {
    const question = value.trim();
    if (!question || thinking) return;
    const user: AvatarMessage = { id: Date.now(), role: "user", text: question };
    const history = messages.filter((message) => message.id !== 0).slice(-6);
    const currentTicket = ++ticket.current;
    setMessages((current) => [...current, user]);
    setDraft("");
    setThinking(true);
    window.clearTimeout(timer.current);

    void (async () => {
      const remote = await askAvatarApi(question, locale, history);
      if (currentTicket !== ticket.current) return;
      if (remote) {
        setMessages((current) => [
          ...current,
          { id: Date.now() + 1, role: "assistant", text: remote.text, related: remote.related },
        ]);
        setThinking(false);
        return;
      }
      timer.current = window.setTimeout(() => {
        if (currentTicket !== ticket.current) return;
        const reply = answerAvatar(question, locale, t);
        setMessages((current) => [
          ...current,
          { id: Date.now() + 1, role: "assistant", text: reply.text, related: reply.related },
        ]);
        setThinking(false);
      }, 420);
    })();
  }

  function reset() {
    ticket.current += 1;
    window.clearTimeout(timer.current);
    setThinking(false);
    setDraft("");
    setMessages([welcomeMessage(t("hero.assistant.welcome"))]);
    sessionStorage.removeItem(storageKey(locale));
  }

  return { draft, setDraft, messages, thinking, ask, reset };
}
