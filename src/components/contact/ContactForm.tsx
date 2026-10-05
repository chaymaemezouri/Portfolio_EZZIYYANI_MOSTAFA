import { FormEvent, useState } from "react";
import { contactPurposes } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";

interface FormState {
  name: string;
  organization: string;
  email: string;
  purpose: string;
  subject: string;
  message: string;
}

const empty: FormState = {
  name: "",
  organization: "",
  email: "",
  purpose: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const { t } = useI18n();
  const [values, setValues] = useState<FormState>(empty);
  const [status, setStatus] = useState("");

  function update(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.email) {
      setStatus(t("contact.pending"));
      return;
    }
    const purpose = values.purpose ? t(`contact.purposes.${values.purpose}`) : "";
    const body = [
      `${t("contact.form.name")}: ${values.name}`,
      `${t("contact.form.organization")}: ${values.organization}`,
      `${t("contact.form.email")}: ${values.email}`,
      `${t("contact.form.purpose")}: ${purpose}`,
      "",
      values.message,
    ].join("\n");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    setStatus(t("contact.sent"));
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="contact-name">{t("contact.form.name")}</label>
        <input id="contact-name" name="name" autoComplete="name" required value={values.name} onChange={(event) => update("name", event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="contact-org">{t("contact.form.organization")}</label>
        <input id="contact-org" name="organization" autoComplete="organization" required value={values.organization} onChange={(event) => update("organization", event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="contact-email">{t("contact.form.email")}</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update("email", event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="contact-purpose">{t("contact.form.purpose")}</label>
        <select id="contact-purpose" name="purpose" required value={values.purpose} onChange={(event) => update("purpose", event.target.value)}>
          <option value="">{t("contact.form.purposePlaceholder")}</option>
          {contactPurposes.map((purpose) => (
            <option key={purpose} value={purpose}>{t(`contact.purposes.${purpose}`)}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-subject">{t("contact.form.subject")}</label>
        <input id="contact-subject" name="subject" required value={values.subject} onChange={(event) => update("subject", event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="contact-message">{t("contact.form.message")}</label>
        <textarea id="contact-message" name="message" required value={values.message} onChange={(event) => update("message", event.target.value)} />
      </div>
      <button className="btn btn-primary" type="submit">{t("contact.form.submit")}</button>
      {status ? <p className="form-status" role="status">{status}</p> : null}
    </form>
  );
}
