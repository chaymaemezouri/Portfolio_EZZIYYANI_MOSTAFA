import { useId, useState } from "react";
import { ArrowDown, ArrowUp, FileText, Plus, Trash2, Upload } from "lucide-react";
import type { Field, ItemData } from "@/content/collections";
import { api } from "./client";

type Props = {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
};

function UploadInput({
  field,
  value,
  onChange,
  multiple = false,
  onUploadMany,
}: Props & { multiple?: boolean; onUploadMany?: (urls: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const url = typeof value === "string" ? value : "";
  const accept = field.type === "image" || multiple ? "image/jpeg,image/png,image/webp" : ".pdf,.ppt,.pptx,.doc,.docx,.zip";

  async function pick(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const list = Array.from(files);
      const uploaded: string[] = [];
      for (const file of list) {
        const { url: next } = await api.upload(file);
        uploaded.push(next);
      }
      if (onUploadMany) onUploadMany(uploaded);
      else onChange(uploaded[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec du téléversement");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-upload">
      {url && !multiple ? (
        field.type === "image" ? (
          <img src={url} alt="" />
        ) : (
          <a href={url} target="_blank" rel="noreferrer">
            <FileText size={16} aria-hidden="true" />
            {url.split("/").pop()}
          </a>
        )
      ) : null}
      <div className="adm-upload-actions">
        <label className="adm-btn adm-btn-ghost">
          <Upload size={15} aria-hidden="true" />
          {busy ? "Envoi…" : multiple ? "Ajouter des photos" : url ? "Remplacer" : "Choisir un fichier"}
          <input
            type="file"
            accept={accept}
            hidden
            multiple={multiple}
            disabled={busy}
            onChange={(event) => {
              void pick(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
        {url && !multiple ? (
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => onChange(undefined)}>
            Retirer
          </button>
        ) : null}
      </div>
      {error ? <p className="adm-error">{error}</p> : null}
    </div>
  );
}

const localeLabels = [
  ["fr", "FR"],
  ["en", "EN"],
  ["ar", "AR"],
] as const;

type L10nValue = Record<(typeof localeLabels)[number][0], string>;

function toL10n(value: unknown): L10nValue {
  if (value && typeof value === "object") {
    const source = value as Partial<L10nValue>;
    return { fr: source.fr ?? "", en: source.en ?? "", ar: source.ar ?? "" };
  }
  const text = value === undefined || value === null ? "" : String(value);
  return { fr: text, en: text, ar: text };
}

function L10nInput({ field, value, onChange }: Props) {
  const current = toL10n(value);
  return (
    <div className="adm-l10n">
      {localeLabels.map(([locale, label]) => {
        const props = {
          value: current[locale],
          dir: locale === "ar" ? "rtl" : "ltr",
          "aria-label": `${field.label} ${label}`,
          onChange: (event: { target: { value: string } }) => onChange({ ...current, [locale]: event.target.value }),
        };
        return (
          <div key={locale} className="adm-l10n-row">
            <span className="adm-l10n-tag">{label}</span>
            {field.multiline ? <textarea rows={4} {...props} /> : <input type="text" {...props} />}
          </div>
        );
      })}
    </div>
  );
}

function ArrayTools({ index, length, onMove, onRemove }: { index: number; length: number; onMove: (step: number) => void; onRemove: () => void }) {
  return (
    <div className="adm-list-tools">
      <button type="button" className="adm-icon" aria-label="Monter" disabled={index === 0} onClick={() => onMove(-1)}>
        <ArrowUp size={15} />
      </button>
      <button type="button" className="adm-icon" aria-label="Descendre" disabled={index === length - 1} onClick={() => onMove(1)}>
        <ArrowDown size={15} />
      </button>
      <button type="button" className="adm-icon is-danger" aria-label="Supprimer" onClick={onRemove}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function moveEntry<T>(rows: T[], index: number, step: number) {
  const target = index + step;
  if (target < 0 || target >= rows.length) return rows;
  const next = [...rows];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function L10nListInput({ field, value, onChange }: Props) {
  const rows = Array.isArray(value) ? value : [];
  return (
    <div className="adm-list">
      {rows.map((row, index) => (
        <div key={index} className="adm-list-row">
          <div className="adm-list-fields">
            <L10nInput
              field={{ ...field, multiline: true }}
              value={row}
              onChange={(next) => onChange(rows.map((entry, i) => (i === index ? next : entry)))}
            />
          </div>
          <ArrayTools
            index={index}
            length={rows.length}
            onMove={(step) => onChange(moveEntry(rows, index, step))}
            onRemove={() => onChange(rows.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn-ghost" onClick={() => onChange([...rows, { fr: "", en: "", ar: "" }])}>
        <Plus size={15} aria-hidden="true" />
        Ajouter un paragraphe
      </button>
    </div>
  );
}

function ImagesInput({ field, value, onChange }: Props) {
  const rows = Array.isArray(value) ? (value as string[]) : [];
  return (
    <div className="adm-images">
      {rows.map((url, index) => (
        <div key={`${url}-${index}`} className="adm-list-row">
          <img src={url} alt="" />
          <ArrayTools
            index={index}
            length={rows.length}
            onMove={(step) => onChange(moveEntry(rows, index, step))}
            onRemove={() => onChange(rows.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <UploadInput
        field={{ ...field, type: "image" }}
        value=""
        multiple
        onChange={() => undefined}
        onUploadMany={(urls) => onChange([...rows, ...urls])}
      />
    </div>
  );
}

function ListInput({ field, value, onChange }: Props) {
  const rows = Array.isArray(value) ? (value as ItemData[]) : [];
  const update = (index: number, next: ItemData) => onChange(rows.map((row, i) => (i === index ? next : row)));
  const move = (index: number, step: number) => {
    const target = index + step;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="adm-list">
      {rows.map((row, index) => (
        <div key={index} className="adm-list-row">
          <div className="adm-list-fields">
            {(field.fields ?? []).map((sub) => (
              <FieldInput
                key={sub.name}
                field={sub}
                value={row[sub.name]}
                onChange={(next) => update(index, { ...row, [sub.name]: next })}
              />
            ))}
          </div>
          <div className="adm-list-tools">
            <button type="button" className="adm-icon" aria-label="Monter" onClick={() => move(index, -1)}>
              <ArrowUp size={15} />
            </button>
            <button type="button" className="adm-icon" aria-label="Descendre" onClick={() => move(index, 1)}>
              <ArrowDown size={15} />
            </button>
            <button
              type="button"
              className="adm-icon is-danger"
              aria-label="Supprimer"
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn-ghost" onClick={() => onChange([...rows, {}])}>
        <Plus size={15} aria-hidden="true" />
        Ajouter
      </button>
    </div>
  );
}

export function FieldInput({ field, value, onChange }: Props) {
  const id = useId();
  const label = (
    <label className="adm-label" htmlFor={id}>
      {field.label}
      {field.required ? <span aria-hidden="true"> *</span> : null}
    </label>
  );
  const text = value === undefined || value === null ? "" : String(value);

  let control;
  switch (field.type) {
    case "textarea":
      control = <textarea id={id} rows={4} value={text} onChange={(event) => onChange(event.target.value)} />;
      break;
    case "number":
      control = (
        <input
          id={id}
          type="number"
          value={text}
          onChange={(event) => onChange(event.target.value === "" ? undefined : Number(event.target.value))}
        />
      );
      break;
    case "select":
      control = (
        <select id={id} value={text} onChange={(event) => onChange(event.target.value || undefined)}>
          <option value="">—</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case "image":
    case "file":
      control = <UploadInput field={field} value={value} onChange={onChange} />;
      break;
    case "list":
      control = <ListInput field={field} value={value} onChange={onChange} />;
      break;
    case "l10n":
      control = <L10nInput field={field} value={value} onChange={onChange} />;
      break;
    case "l10nList":
      control = <L10nListInput field={field} value={value} onChange={onChange} />;
      break;
    case "images":
      control = <ImagesInput field={field} value={value} onChange={onChange} />;
      break;
    case "tags":
      control = (
        <textarea
          id={id}
          rows={3}
          value={Array.isArray(value) ? value.join("\n") : text}
          onChange={(event) => onChange(event.target.value.split("\n"))}
        />
      );
      break;
    case "checkbox":
      return (
        <label className="adm-toggle">
          <input type="checkbox" checked={value === true} onChange={(event) => onChange(event.target.checked)} />
          {field.label}
        </label>
      );
    default:
      control = (
        <input
          id={id}
          type={field.type === "url" ? "url" : "text"}
          value={text}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }

  return (
    <div className={`adm-field adm-field-${field.type}`}>
      {label}
      {field.type === "tags" ? <p className="adm-help">Un élément par ligne.</p> : null}
      {field.help ? <p className="adm-help">{field.help}</p> : null}
      {control}
    </div>
  );
}
