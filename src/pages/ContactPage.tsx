import { useProfile } from "@/content/hooks";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { visibleSocialLinks } from "@/data/socialLinks";
import { contactPurposes } from "@/data/navigation";
import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function ContactPage() {
  const { locale, t } = useI18n();
  const profile = useProfile();
  return (
    <>
      <Seo title={t("contact.title")} description={t("meta.pages.contact")} path={localePath(locale, "contact")} />
      <section className="container page-hero contact-page">
        <div className="contact-grid">
          <div className="contact-intro">
            <p className="eyebrow">{t("cta.label")}</p>
            <h1 className="page-title">{t("contact.title")}</h1>
            <p className="page-lede">{t("contact.lede")}</p>
            <ul className="purpose-list">
              {contactPurposes.map((purpose) => (
                <li key={purpose}>{t(`contact.purposes.${purpose}`)}</li>
              ))}
            </ul>
            <div className="contact-direct">
              <a href={`mailto:${profile.email}`}>
                <span>{t("contact.form.email")}</span>
                <strong>{profile.email}</strong>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <span>{t("contact.phone")}</span>
                <strong>{profile.phone}</strong>
              </a>
            </div>
            <p className="micro">{t("contact.links")}</p>
            <div className="hero-social">
              {visibleSocialLinks.map((link) => (
                <a key={link.id} href={link.href} target="_blank" rel="noreferrer">
                  <SocialIcon id={link.id} />
                  {link.label}
                  <span className="sr-only"> {t("common.external")}</span>
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
