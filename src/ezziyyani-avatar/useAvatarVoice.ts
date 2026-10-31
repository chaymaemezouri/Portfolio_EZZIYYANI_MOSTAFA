import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/types";
import type { AvatarMessage } from "./types";

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> & { length: number } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecCtor = new () => SpeechRec;

function recognitionCtor(): SpeechRecCtor | null {
  const speech = window as Window & { SpeechRecognition?: SpeechRecCtor; webkitSpeechRecognition?: SpeechRecCtor };
  return speech.SpeechRecognition ?? speech.webkitSpeechRecognition ?? null;
}

function localeTag(locale: Locale) {
  if (locale === "ar") return "ar-MA";
  if (locale === "en") return "en-US";
  return "fr-FR";
}

const FEMALE = /female|woman|femme|zira|hortense|julie|marie|sylvie|denise|linda|susan|hazel|aria|jenny|sonia|amelie|audrey|flo|clara|nathalie/i;
const MALE = /male|\bman\b|homme|david|thomas|paul|henri|guy|george|daniel|mark|richard|ryan|adam|stephane|nicolas|bernard|claude|jerome|pierre/i;

function pickMaleVoice(voices: SpeechSynthesisVoice[], locale: Locale) {
  const prefix = locale === "ar" ? "ar" : locale;
  const sameLang = voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix));
  const pool = sameLang.length ? sameLang : voices;
  const male = pool.find((voice) => MALE.test(voice.name) && !FEMALE.test(voice.name));
  if (male) return male;
  return pool.find((voice) => !FEMALE.test(voice.name)) ?? pool[0] ?? null;
}

export function useAvatarVoice({
  locale,
  messages,
  thinking,
  onAsk,
}: {
  locale: Locale;
  messages: AvatarMessage[];
  thinking: boolean;
  onAsk: (value: string) => void;
}) {
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const lastSpoken = useRef(0);
  const recRef = useRef<SpeechRec | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  const canListen = typeof window !== "undefined" && !!recognitionCtor();

  function stopSpeak() {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function stopListen() {
    recRef.current?.stop();
    recRef.current = null;
    setListening(false);
  }

  function speak(value: string) {
    if (!canSpeak || !value.trim()) return;
    stopListen();
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(value);
    utter.lang = localeTag(locale);
    utter.rate = 0.94;
    utter.pitch = 0.82;
    const voices = voicesRef.current.length ? voicesRef.current : window.speechSynthesis.getVoices();
    voicesRef.current = voices;
    utter.voice = pickMaleVoice(voices, locale);
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  }

  function listen() {
    const Ctor = recognitionCtor();
    if (!Ctor || thinking) return;
    stopSpeak();
    stopListen();
    const rec = new Ctor();
    rec.lang = localeTag(locale);
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const text = result?.[0]?.transcript?.trim() ?? "";
      if (text) onAsk(text);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => {
      recRef.current = null;
      setListening(false);
    };
    recRef.current = rec;
    rec.start();
    setListening(true);
  }

  useEffect(() => {
    if (!canSpeak) return;
    const refresh = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    refresh();
    window.speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", refresh);
  }, [canSpeak]);

  useEffect(() => {
    if (!voiceOn || thinking || !canSpeak) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant" || last.id === 0 || last.id === lastSpoken.current) return;
    lastSpoken.current = last.id;
    speak(last.text);
  }, [canSpeak, locale, messages, thinking, voiceOn]);

  useEffect(() => () => {
    stopSpeak();
    stopListen();
  }, []);

  function toggleVoice() {
    const next = !voiceOn;
    setVoiceOn(next);
    if (!next) stopSpeak();
  }

  function resetVoice() {
    lastSpoken.current = 0;
    stopSpeak();
    stopListen();
  }

  return {
    voiceOn,
    speaking,
    listening,
    canSpeak,
    canListen,
    speak,
    stopSpeak,
    listen,
    stopListen,
    toggleVoice,
    resetVoice,
  };
}
