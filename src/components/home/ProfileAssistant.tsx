import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Send } from "lucide-react";
import { academicNarrative } from "@/data/academic";
import { expertiseDomains } from "@/data/expertise";
import { impactMetrics } from "@/data/impact";
import { profile } from "@/data/profile";
import { researchIntro } from "@/data/publications";
import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/types";
import { text } from "@/utils/text";

type Message = { id: number; role: "user" | "assistant"; text: string };

const prompts = ["teaching", "science", "technology", "innovation", "strategy", "consulting"] as const;

function norm(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function has(query: string, words: string[]) {
  return words.some((word) => {
    const token = norm(word);
    if (token.length <= 3) return new RegExp(`(^|\\s)${token}(\\s|$)`).test(query);
    return query.includes(token);
  });
}

function metric(id: string) {
  return impactMetrics.find((item) => item.id === id)?.display ?? "";
}

function answer(raw: string, locale: Locale, t: (key: string) => string) {
  const query = norm(raw);
  const domain = (id: string) => {
    const item = expertiseDomains.find((entry) => entry.id === id);
    return item ? text(locale, item.summary) : "";
  };
  const figure = (id: string) => `${metric(id)} ${t(`impact.${id}`)}`;

  if (
    query.includes("pedagog") ||
    /(^|\s)formation(\s|$|\?)/.test(query) ||
    query.includes("enseignement") ||
    /(^|\s)teaching(\s|$|\?)/.test(query) ||
    /(^|\s)training(\s|$|\?)/.test(query) ||
    query.includes("بيداغوج") ||
    /(^|\s)تكوين(\s|$|\?)/.test(query)
  ) {
    return text(locale, academicNarrative[0]);
  }
  if (query.includes("recherche scientifique") || query.includes("scientific research") || query.includes("البحث العلمي")) {
    return text(locale, researchIntro[1]);
  }
  if (has(query, ["souverain", "sovereignty", "سيادة", "technologie", "technology", "تكنولوجيا"])) {
    return `${domain("aiData")} ${domain("transformation")}`;
  }
  if (has(query, ["innovation", "ابتكار"])) return domain("transfer");
  if (has(query, ["strateg", "strategy", "استراتيج"])) {
    const item = expertiseDomains.find((entry) => entry.id === "transformation");
    const line = item?.points[4];
    return line ? text(locale, line) : domain("transformation");
  }
  if (has(query, ["consulting", "conseil", "استشارة"])) {
    return `${t("hero.facts.cyber")}. ${t("hero.facts.council")}`;
  }
  if (has(query, ["orcid"])) return "ORCID 0000-0002-8828-4972";
  if (has(query, ["email", "e-mail", "courriel", "mail", "phone", "telephone", "tel", "contact", "contacter", "بريد", "هاتف", "تواصل"])) {
    return `${profile.email} · ${profile.phone}`;
  }
  if (has(query, ["publication", "publications", "article", "articles", "paper", "منشور", "منشورات"])) {
    return figure("publications");
  }
  if (has(query, ["these", "thesis", "encadrement", "supervision", "أطروح", "رسائل"])) {
    return figure("supervision");
  }
  if (has(query, ["projet", "projets", "project", "projects", "مشاريع", "مشروع"])) {
    return figure("projects");
  }
  if (has(query, ["experience", "annees", "years", "1990", "خبرة", "سنوات"])) {
    return `${figure("experience")}. ${t("hero.lead")}`;
  }
  if (has(query, ["universite", "university", "essaadi", "essaadi", "السعدي"])) {
    return t("hero.facts.professor");
  }
  if (has(query, ["cyber", "securite", "forensic", "سيبر"])) return domain("cyber");
  if (has(query, ["transformation", "numerique", "digital", "تحول"])) return domain("transformation");
  if (has(query, ["donnee", "data", "بيانات"])) return domain("aiData");
  if (has(query, ["intelligence", "artificielle", "اصطناع"])) return domain("aiData");
  if (has(query, ["domaine", "domaines", "expertise", "field", "fields", "مجالات"])) {
    return expertiseDomains.map((item) => t(`expertise.domains.${item.id}`)).join(" · ");
  }
  if (has(query, ["qui", "who", "profil", "profile", "الزياني", "ezziyyani", "مصطفى"])) {
    return text(locale, profile.introduction);
  }
  return t("hero.assistant.fallback");
}

export function ProfileAssistant() {
  const { locale, t } = useI18n();
  const inputId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: t("hero.assistant.greeting") },
  ]);

  useEffect(() => {
    setMessages([{ id: 0, role: "assistant", text: t("hero.assistant.greeting") }]);
  }, [locale, t]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  function ask(value: string) {
    const question = value.trim();
    if (!question) return;
    const reply = answer(question, locale, t);
    setMessages((current) => [
      ...current,
      { id: current.length + 1, role: "user", text: question },
      { id: current.length + 2, role: "assistant", text: reply },
    ]);
    setDraft("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(draft);
  }

  return (
    <div className="hero-chat">
      <div className="hero-log" ref={logRef} role="log" aria-live="polite">
        {messages.map((message) => (
          <p key={message.id} className={`hero-msg is-${message.role}`}>
            {message.text}
          </p>
        ))}
      </div>
      <div className="hero-chips">
        {prompts.map((id) => (
          <button key={id} type="button" onClick={() => ask(t(`hero.assistant.prompts.${id}`))}>
            {t(`hero.assistant.prompts.${id}`)}
          </button>
        ))}
      </div>
      <form className="hero-ask-form" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor={inputId}>{t("hero.assistant.placeholder")}</label>
        <input
          id={inputId}
          value={draft}
          placeholder={t("hero.assistant.placeholder")}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" aria-label={t("hero.assistant.send")}>
          <Send size={16} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
