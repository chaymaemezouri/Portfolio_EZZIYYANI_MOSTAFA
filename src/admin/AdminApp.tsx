import { Suspense, useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  Award,
  BadgeCheck,
  BookMarked,
  BookOpen,
  Briefcase,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  Globe,
  GraduationCap,
  History,
  Images,
  Layers,
  Library,
  Lightbulb,
  LogOut,
  MapPin,
  Menu,
  Mic,
  Newspaper,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Trophy,
  User,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { collections, getCollection, type Item, type ItemData } from "@/content/collections";
import { api, ApiError, type AuditEntry } from "./client";
import { FieldInput } from "./FieldInput";
import "./admin.css";

function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "Administration — Prof. Dr. Mostafa Ezziyyani";
    return () => meta.remove();
  }, []);
}

function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.login(email, password);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <span className="adm-mark">ME</span>
        <h1>Espace administration</h1>
        <p>Connexion réservée au Prof. Dr. Mostafa Ezziyyani.</p>
        <label className="adm-label" htmlFor="adm-email">E-mail</label>
        <input id="adm-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="adm-label" htmlFor="adm-password">Mot de passe</label>
        <input
          id="adm-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className="adm-error">{error}</p> : null}
        <button className="adm-btn adm-btn-primary" type="submit" disabled={busy}>
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

function readable(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const text = value as Record<string, string>;
    return (text.fr || text.en || text.ar || "").trim();
  }
  return "";
}

function itemTitle(collectionId: string, item: Item) {
  if (collectionId === "international") {
    const country = readable(item.data.country);
    const city = readable(item.data.city);
    return [country, city].filter(Boolean).join(" — ") || item.id;
  }
  const collection = getCollection(collectionId);
  const title = collection ? readable(item.data[collection.titleField]) : "";
  const fallback = title || Object.values(item.data).map(readable).find(Boolean) || item.id;
  return fallback.length > 140 ? `${fallback.slice(0, 140)}…` : fallback;
}

const collectionIcons: Record<string, LucideIcon> = {
  profile: User,
  profileSections: Layers,
  education: GraduationCap,
  publications: BookOpen,
  books: Library,
  projects: FolderKanban,
  patents: Award,
  innovation: Lightbulb,
  team: Users,
  courses: BookMarked,
  pfe: FileSpreadsheet,
  visits: MapPin,
  videos: Video,
  posts: Newspaper,
  articles: FileText,
  gallery: Images,
  awards: Trophy,
  leadership: Briefcase,
  certifications: BadgeCheck,
  conferences: Mic,
  international: Globe,
};

export function CollectionList() {
  const { collection: collectionId = "" } = useParams();
  const collection = getCollection(collectionId);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    api
      .list(collectionId)
      .then(setItems)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [collectionId]);

  useEffect(load, [load]);

  if (!collection) return <p className="adm-error">Section inconnue.</p>;
  if (collection.singleton) return <Navigate to={`/admin/c/${collectionId}/main`} replace />;

  const needle = query.trim().toLowerCase();
  const visible = needle
    ? items.filter((item) => JSON.stringify(item.data).toLowerCase().includes(needle))
    : items;

  async function move(index: number, step: number) {
    const target = index + step;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    await api.reorder(collectionId, next.map((item) => item.id)).catch((err: Error) => setError(err.message));
  }

  async function remove(item: Item) {
    if (!window.confirm(`Supprimer « ${itemTitle(collectionId, item)} » ? (restaurable depuis l'historique)`)) return;
    await api.remove(collectionId, item.id).catch((err: Error) => setError(err.message));
    load();
  }

  const Icon = collectionIcons[collection.id] ?? Layers;

  return (
    <section className="adm-section" data-group={collection.group}>
      <header className="adm-head">
        <div>
          <p className="adm-kicker">{collection.group}</p>
          <h1>{collection.label}</h1>
        </div>
        <Link className="adm-btn adm-btn-primary" to="new">
          <Plus size={16} aria-hidden="true" />
          Ajouter
        </Link>
      </header>
      {error ? <p className="adm-error">{error}</p> : null}
      {items.length > 8 ? (
        <input
          className="adm-search"
          type="search"
          placeholder={`Rechercher parmi ${items.length} éléments…`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      ) : null}
      {loading ? (
        <p className="adm-muted">Chargement…</p>
      ) : visible.length === 0 ? (
        <p className="adm-empty">Aucun élément. Ajoutez une carte pour commencer.</p>
      ) : (
        <div className="adm-item-cards">
          {visible.map((item, index) => (
            <article key={item.id} className="adm-item-card">
              <div className="adm-item-card-top">
                <span className="adm-tile-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <span className={`adm-badge${item.published ? " is-live" : ""}`}>
                  {item.published ? "Publié" : "Brouillon"}
                </span>
              </div>
              <Link className="adm-item-card-title" to={item.id}>
                {itemTitle(collectionId, item)}
              </Link>
              <div className="adm-item-card-actions">
                <div className="adm-row-order" hidden={Boolean(needle)}>
                  <button type="button" className="adm-icon" aria-label="Monter" onClick={() => move(index, -1)} disabled={index === 0}>
                    <ArrowUp size={15} />
                  </button>
                  <button
                    type="button"
                    className="adm-icon"
                    aria-label="Descendre"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                  >
                    <ArrowDown size={15} />
                  </button>
                </div>
                <Link className="adm-icon" to={item.id} aria-label="Modifier">
                  <Pencil size={15} />
                </Link>
                <button type="button" className="adm-icon is-danger" aria-label="Supprimer" onClick={() => remove(item)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function ItemEditor() {
  const { collection: collectionId = "", id } = useParams();
  const collection = getCollection(collectionId);
  const navigate = useNavigate();
  const isNew = id === "new";
  const [data, setData] = useState<ItemData>({});
  const [published, setPublished] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew || !id) return;
    api
      .get(collectionId, id)
      .then((item) => {
        setData(item.data);
        setPublished(item.published);
      })
      .catch((err: Error) => setErrors([err.message]));
  }, [collectionId, id, isNew]);

  if (!collection) return <p className="adm-error">Section inconnue.</p>;

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setErrors([]);
    try {
      if (isNew) await api.create(collectionId, data, published);
      else await api.update(collectionId, id!, data, published);
      navigate(collection?.singleton ? "/admin" : `/admin/c/${collectionId}`);
    } catch (err) {
      setErrors(err instanceof ApiError && err.details.length ? err.details : [err instanceof Error ? err.message : "Erreur"]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="adm-editor adm-section" data-group={collection.group} onSubmit={save}>
      <header className="adm-head">
        <div>
          <p className="adm-kicker">{collection.label}</p>
          <h1>{isNew ? "Nouvel élément" : "Modifier"}</h1>
        </div>
      </header>
      <div className="adm-card">
        {collection.fields.map((field) => (
          <FieldInput
            key={field.name}
            field={field}
            value={data[field.name]}
            onChange={(value) => setData((current) => ({ ...current, [field.name]: value }))}
          />
        ))}
        <label className="adm-toggle">
          <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} />
          Publié sur le site
        </label>
      </div>
      {errors.length ? (
        <ul className="adm-error">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      <div className="adm-actions">
        <Link className="adm-btn adm-btn-ghost" to={collection.singleton ? "/admin" : `/admin/c/${collectionId}`}>
          Annuler
        </Link>
        <button className="adm-btn adm-btn-primary" type="submit" disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}

const actionLabels: Record<string, string> = {
  create: "Ajout",
  update: "Modification",
  delete: "Suppression",
  reorder: "Réorganisation",
};

export function AuditLog() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [error, setError] = useState("");
  const load = useCallback(() => {
    api.audit().then(setEntries).catch((err: Error) => setError(err.message));
  }, []);
  useEffect(load, [load]);

  async function restore(entry: AuditEntry) {
    if (!window.confirm("Restaurer l'état d'avant cette action ?")) return;
    await api.restore(entry.id).catch((err: Error) => setError(err.message));
    load();
  }

  return (
    <section className="adm-section" data-group="Profil">
      <header className="adm-head">
        <div>
          <p className="adm-kicker">Suivi</p>
          <h1>Historique</h1>
        </div>
      </header>
      {error ? <p className="adm-error">{error}</p> : null}
      <div className="adm-item-cards">
        {entries.map((entry) => (
          <article key={entry.id} className="adm-item-card">
            <div className="adm-item-card-top">
              <span className="adm-badge">{actionLabels[entry.action] ?? entry.action}</span>
              <span className="adm-muted">{new Date(entry.at).toLocaleString("fr-FR")}</span>
            </div>
            <p className="adm-item-card-title">
              {getCollection(entry.collection)?.label ?? entry.collection}
              {entry.title ? ` — ${entry.title}` : ""}
            </p>
            {entry.canRestore ? (
              <div className="adm-item-card-actions">
                <button type="button" className="adm-btn adm-btn-ghost" onClick={() => restore(entry)}>
                  <RotateCcw size={15} aria-hidden="true" />
                  Restaurer
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Dashboard() {
  return (
    <section className="adm-section">
      <header className="adm-head">
        <div>
          <p className="adm-kicker">Bienvenue</p>
          <h1>Tableau de bord</h1>
        </div>
      </header>
      <div className="adm-tiles">
        {collections.map((collection) => {
          const Icon = collectionIcons[collection.id] ?? Layers;
          return (
            <Link
              key={collection.id}
              className="adm-tile"
              data-group={collection.group}
              to={`/admin/c/${collection.id}`}
            >
              <span className="adm-tile-icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <span>{collection.group}</span>
              <strong>{collection.label}</strong>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function AdminApp() {
  useNoIndex();
  const [state, setState] = useState<"loading" | "out" | "in">("loading");
  const [email, setEmail] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const check = useCallback(() => {
    api
      .me()
      .then((me) => {
        if (!me.email) throw new Error("no session");
        setEmail(me.email);
        setState("in");
      })
      .catch(() => setState("out"));
  }, []);

  useEffect(check, [check]);

  if (state === "loading") return <div className="adm-login" />;
  if (state === "out") return <Login onDone={check} />;

  const groups = [...new Set(collections.map((item) => item.group))];

  return (
    <div className={`adm-shell${navOpen ? " is-nav-open" : ""}`}>
      <header className="adm-topbar">
        <button type="button" className="adm-icon adm-icon-plain" aria-label="Menu" onClick={() => setNavOpen(true)}>
          <Menu size={20} />
        </button>
        <span>Administration</span>
        <span className="adm-mark">ME</span>
      </header>
      <div className="adm-scrim" onClick={() => setNavOpen(false)} />
      <aside className="adm-side" onClick={(event) => (event.target as HTMLElement).closest("a") && setNavOpen(false)}>
        <Link className="adm-brand" to="/admin">
          <span className="adm-mark">ME</span>
          Administration
        </Link>
        <nav>
          {groups.map((group) => (
            <div key={group} className="adm-nav-group" data-group={group}>
              <p>{group}</p>
              {collections
                .filter((item) => item.group === group)
                .map((item) => (
                  <NavLink key={item.id} to={`/admin/c/${item.id}`}>
                    {item.label}
                  </NavLink>
                ))}
            </div>
          ))}
          <div className="adm-nav-group">
            <p>Suivi</p>
            <NavLink to="/admin/history">
              <History size={15} aria-hidden="true" />
              Historique
            </NavLink>
          </div>
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noreferrer">
            <ExternalLink size={15} aria-hidden="true" />
            Voir le site
          </a>
          <span className="adm-muted">{email}</span>
          <button
            type="button"
            className="adm-btn adm-btn-ghost"
            onClick={() => api.logout().finally(() => setState("out"))}
          >
            <LogOut size={15} aria-hidden="true" />
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="adm-main">
        <Suspense fallback={<p className="adm-muted">Chargement…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
