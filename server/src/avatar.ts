import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { env } from "./env";

type Locale = "fr" | "en" | "ar";

type KnowledgeEntry = {
  id: string;
  keywords?: string[];
  question?: Partial<Record<Locale, string>>;
  answer?: Partial<Record<Locale, string>>;
  related?: string;
};

type ChatTurn = { role: "user" | "assistant"; text: string };

const DATA_DIR = resolve(import.meta.dirname, "../../src/ezziyyani-avatar/data");
const STOP = new Set([
  "the", "and", "for", "with", "from", "that", "this", "what", "how", "why", "who",
  "est", "que", "une", "des", "les", "aux", "sur", "par", "avec", "dans", "pour",
  "quel", "quels", "quelle", "quelles", "quoi", "dont", "plus", "votre", "vous",
]);
const SYNONYMS: Record<string, string[]> = {
  digital: ["numerique", "digital"],
  numerique: ["digital", "numerique"],
  transformation: ["transformation"],
  intelligence: ["intelligence", "ia", "ai"],
  artificielle: ["artificielle", "ia", "ai"],
  oman: ["oman", "omanais", "sultanate"],
  professor: ["professeur", "ezziyyani", "mostafa"],
  professeur: ["professor", "ezziyyani", "mostafa"],
};

const PROFILE = `
Prof. Dr. Mostafa Ezziyyani (مصطفى الزياني).
Professeur de l'enseignement supérieur, Université Abdelmalek Essaâdi (depuis 1996).
Expert international : intelligence artificielle, transformation numérique, science des données, cybersécurité, analyse et protection des données.
Président de l'Organisation de l'innovation et du transfert de technologie.
Membre du Conseil consultatif arabe de la recherche scientifique.
Président / DG / cofondateur du Moroccan Quantum Computing Cluster.
General Chair de la conférence AI2SD.
30+ années d'expérience (depuis 1990), 200+ publications, 350+ thèses / mémoires / projets, 10+ projets de recherche.
E-mail: mezzyani@uae.ac.ma · Tél: +212 661630301 · ORCID: 0000-0002-8828-4972 · Site: https://www.ezziyani.com
Langues: arabe (maternelle), français C2, anglais C2.
`;

let cache: KnowledgeEntry[] | null = null;
const hits = new Map<string, number[]>();

function loadKnowledge(): KnowledgeEntry[] {
  if (cache) return cache;
  cache = readdirSync(DATA_DIR)
    .filter((name) => name.endsWith(".json") && !name.startsWith("_"))
    .flatMap((name) => {
      const raw = JSON.parse(readFileSync(join(DATA_DIR, name), "utf8")) as unknown;
      return Array.isArray(raw) ? (raw as KnowledgeEntry[]) : [];
    });
  return cache;
}

function norm(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function tokens(value: string) {
  const raw = norm(value)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 3 && !STOP.has(token));
  const expanded = new Set(raw);
  for (const token of raw) {
    for (const extra of SYNONYMS[token] ?? []) expanded.add(extra);
  }
  return [...expanded];
}

function scoreEntry(query: string, entry: KnowledgeEntry) {
  const normalized = norm(query).replace(/[?؟]/g, "").trim();
  const queryTokens = new Set(tokens(normalized));
  if (!normalized) return 0;
  let points = 0;
  const questions = [entry.question?.en, entry.question?.fr, entry.question?.ar].filter(Boolean) as string[];
  for (const question of questions) {
    const clean = norm(question).replace(/[?؟]/g, "").trim();
    if (!clean) continue;
    if (normalized === clean || clean.includes(normalized) || normalized.includes(clean)) points += 24;
    points += tokens(clean).filter((token) => queryTokens.has(token)).length * 4;
  }
  for (const word of entry.keywords ?? []) {
    const key = norm(word).replace(/[?؟]/g, "");
    if (key.length >= 4 && normalized.includes(key)) points += key.length > 8 ? 3 : 2;
    if (key.length >= 2 && key.length <= 3 && new RegExp(`(^|\\s)${key}(\\s|$)`).test(normalized)) points += 3;
  }
  return points;
}

function retrieve(query: string, limit = 8) {
  return loadKnowledge()
    .map((entry) => ({ entry, score: scoreEntry(query, entry) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function localeText(value: Partial<Record<Locale, string>> | undefined, locale: Locale) {
  return value?.[locale] || value?.fr || value?.en || value?.ar || "";
}

function allowAsk(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 60_000);
  if (recent.length >= 20) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function avatarConfigured() {
  return Boolean(env.openaiApiKey);
}

export async function answerWithModel(input: {
  question: string;
  locale: Locale;
  history?: ChatTurn[];
  ip: string;
}): Promise<{ text: string; related?: string } | { error: string; status: number }> {
  if (!env.openaiApiKey) return { error: "not_configured", status: 503 };
  if (!allowAsk(input.ip)) return { error: "rate_limited", status: 429 };

  const question = input.question.trim().slice(0, 800);
  if (!question) return { error: "empty", status: 400 };

  const matches = retrieve(question);
  const context = matches
    .map(({ entry }, index) => {
      const q = localeText(entry.question, input.locale);
      const a = localeText(entry.answer, input.locale);
      return `#${index + 1}\nQ: ${q}\nR: ${a}`;
    })
    .join("\n\n");

  const history = (input.history ?? [])
    .slice(-6)
    .map((turn) => `${turn.role === "user" ? "Visiteur" : "Avatar"}: ${turn.text.slice(0, 400)}`)
    .join("\n");

  const language = input.locale === "ar" ? "arabe" : input.locale === "en" ? "anglais" : "français";
  const system = `Tu es EzziyyanIAvatar, assistant officiel du Prof. Dr. Mostafa Ezziyyani.
Tu réponds uniquement à partir du CONTEXTE (profil + fiches). Comprends les reformulations : le sens compte plus que les mots exacts.
Si la question n'a aucun lien avec le professeur, son profil, sa recherche, l'IA, Oman, la stratégie, l'enseignement ou le contact, dis-le clairement et reste sur le profil officiel.
N'invente aucun chiffre, titre, date ou partenariat absent du contexte.
Réponds en ${language}, voix d'un professeur, 60 à 160 mots, sans markdown.`;

  const user = `PROFIL:\n${PROFILE}\n\nFICHES:\n${context || "(aucune fiche proche — appuie-toi seulement sur le profil, ou indique que la question sort du cadre)"}\n\nHISTORIQUE:\n${history || "(début de conversation)"}\n\nQUESTION:\n${question}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 22_000);
  try {
    const response = await fetch(`${env.openaiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.openaiModel,
        temperature: 0.3,
        max_tokens: 420,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      signal: controller.signal,
    });
    const payload = (await response.json().catch(() => ({}))) as {
      error?: { message?: string };
      choices?: Array<{ message?: { content?: string } }>;
    };
    if (!response.ok) {
      return { error: payload.error?.message || "model_error", status: 502 };
    }
    const text = payload.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { error: "empty_model", status: 502 };
    return { text, related: matches[0]?.entry.related };
  } catch {
    return { error: "timeout", status: 504 };
  } finally {
    clearTimeout(timer);
  }
}
