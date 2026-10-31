import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Briefcase, Compass, Copy, Cpu, GraduationCap, Landmark, Lightbulb, Mic, RotateCcw, Send, Sparkles, Square, Volume2, VolumeX } from "lucide-react";
import { AvatarMark } from "@/components/shared/AvatarMark";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { avatarTopics } from "./types";
import { useAvatarChat } from "./useAvatarChat";
import { useAvatarVoice } from "./useAvatarVoice";

const topicIcons = {
  ai: Sparkles,
  oman: Landmark,
  teaching: GraduationCap,
  science: BookOpen,
  technology: Cpu,
  innovation: Lightbulb,
  strategy: Compass,
  consulting: Briefcase,
};

export function AvatarRoom() {
  const { locale, t } = useI18n();
  const { draft, setDraft, messages, thinking, ask, reset } = useAvatarChat();
  const voice = useAvatarVoice({ locale, messages, thinking, onAsk: ask });
  const inputId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, thinking]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(draft);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function onReset() {
    voice.resetVoice();
    reset();
  }

  async function copyMessage(id: number, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1600);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <section className={`ez-avatar-room${voice.speaking ? " is-speaking" : ""}${voice.listening ? " is-listening" : ""}`}>
      <header className="ez-avatar-bar">
        <div>
          <AvatarMark />
          <p>{t("hero.assistant.official")}</p>
        </div>
        <div className="ez-avatar-bar-tools">
          {voice.canSpeak ? (
            <button
              type="button"
              onClick={voice.toggleVoice}
              aria-pressed={voice.voiceOn}
              aria-label={voice.voiceOn ? t("hero.assistant.voiceOn") : t("hero.assistant.voiceOff")}
            >
              {voice.voiceOn ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
              <span>{voice.voiceOn ? t("hero.assistant.voiceOn") : t("hero.assistant.voiceOff")}</span>
            </button>
          ) : null}
          <button type="button" onClick={onReset} aria-label={t("hero.assistant.newChat")}>
            <RotateCcw size={15} aria-hidden="true" />
            <span>{t("hero.assistant.newChat")}</span>
          </button>
        </div>
      </header>

      <div className="ez-avatar-log" ref={logRef} role="log" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`ez-avatar-msg is-${message.role}`}>
            <p className="ez-avatar-msg-meta">
              {message.role === "assistant" ? "EzziyyanIAvatar" : t("hero.assistant.you")}
            </p>
            <p className="ez-avatar-msg-text">{message.text}</p>
            {message.role === "assistant" && message.id !== 0 ? (
              <div className="ez-avatar-msg-actions">
                {voice.canSpeak ? (
                  <button
                    type="button"
                    onClick={() => (voice.speaking ? voice.stopSpeak() : voice.speak(message.text))}
                  >
                    {voice.speaking ? <Square size={13} aria-hidden="true" /> : <Volume2 size={13} aria-hidden="true" />}
                    {voice.speaking ? t("hero.assistant.stopSpeak") : t("hero.assistant.speak")}
                  </button>
                ) : null}
                <button type="button" onClick={() => copyMessage(message.id, message.text)}>
                  <Copy size={13} aria-hidden="true" />
                  {copiedId === message.id ? t("hero.assistant.copied") : t("hero.assistant.copy")}
                </button>
                {message.related ? (
                  <Link to={localePath(locale, message.related)}>
                    {t("hero.assistant.seeAlso")} · {t(`nav.${message.related}`)}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
        {thinking ? (
          <p className="ez-avatar-thinking" aria-live="polite">
            <span />
            <span />
            <span />
            {t("hero.assistant.thinking")}
          </p>
        ) : null}
      </div>

      <div className="ez-avatar-dock">
        <p className="ez-avatar-ask">{t("hero.assistant.topics")}</p>
        <div className="ez-avatar-prompts">
          {avatarTopics.map((topic) => {
            const Icon = topicIcons[topic.id];
            return (
              <button key={topic.id} type="button" disabled={thinking} onClick={() => ask(t(`hero.assistant.prompts.${topic.id}`))}>
                <Icon size={14} aria-hidden="true" />
                {t(`hero.assistant.prompts.${topic.id}`)}
              </button>
            );
          })}
        </div>
        <form className="ez-avatar-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor={inputId}>
            {t("hero.assistant.placeholder")}
          </label>
          <input
            id={inputId}
            ref={inputRef}
            value={draft}
            placeholder={voice.listening ? t("hero.assistant.listening") : t("hero.assistant.placeholder")}
            disabled={thinking}
            onChange={(event) => setDraft(event.target.value)}
          />
          {voice.canListen ? (
            <button
              className={`ez-avatar-mic${voice.listening ? " is-on" : ""}`}
              type="button"
              disabled={thinking}
              aria-pressed={voice.listening}
              aria-label={voice.listening ? t("hero.assistant.listening") : t("hero.assistant.listen")}
              onClick={() => (voice.listening ? voice.stopListen() : voice.listen())}
            >
              <Mic size={16} aria-hidden="true" />
            </button>
          ) : null}
          <button className="ez-avatar-send" type="submit" disabled={thinking || !draft.trim()} aria-label={t("hero.assistant.send")}>
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
