import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

export function ArrowLink({ to, children }: { to: string; children: React.ReactNode }) {
  const external = to.startsWith("http");
  const { t } = useI18n();
  const content = (
    <>
      <span>{children}</span>
      {external ? (
        <ArrowUpRight size={16} aria-hidden="true" />
      ) : (
        <ArrowRight className="icon-dir" size={16} aria-hidden="true" />
      )}
    </>
  );
  if (external) {
    return (
      <a className="arrow-link" href={to} target="_blank" rel="noreferrer">
        {content}
        <span className="sr-only">{t("common.external")}</span>
      </a>
    );
  }
  return (
    <Link className="arrow-link" to={to}>
      {content}
    </Link>
  );
}
