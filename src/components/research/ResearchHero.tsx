import type { ReactNode } from "react";
import { ArrowUpRight, Atom, BookOpen, BrainCircuit, Database, Lightbulb, Network, ScanLine, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "research" | "projects" | "interests" | "publications" | "patents" | "innovation" | "team";
  children?: ReactNode;
};

export function ResearchHero({ eyebrow, title, description, variant = "research", children }: Props) {
  const { locale, t } = useI18n();
  const CoreIcon = {
    research: Atom,
    projects: Atom,
    interests: BrainCircuit,
    publications: BookOpen,
    patents: ScanLine,
    innovation: Lightbulb,
    team: UsersRound,
  }[variant];
  const compact = variant !== "research" && variant !== "projects";
  return (
    <header className={`science-hero science-hero--${variant}${compact ? " science-hero--compact" : ""} container`}>
      <div className="science-hero-surface">
        <div className="science-hero-copy">
          <p className="science-eyebrow"><span />{eyebrow}</p>
          <h1>{title}</h1>
          <p className="science-hero-description">{description}</p>
          <div className="science-hero-actions">
            <Link className="science-action" to={localePath(locale, variant === "research" ? "publications" : "research")}>
              {t(variant === "research" ? "nav.publications" : "nav.research")}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="science-action-secondary" to={localePath(locale, variant === "research" ? "projects" : "contact")}>
              {t(variant === "research" ? "nav.projects" : "nav.contact")}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="science-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-ring orbit-ring-three" />
          <div className="orbit-core"><CoreIcon size={78} strokeWidth={1} /></div>
          <span className="orbit-node orbit-node-ai"><BrainCircuit size={23} /><span>AI</span></span>
          <span className="orbit-node orbit-node-data"><Database size={23} /><span>DATA</span></span>
          <span className="orbit-node orbit-node-systems"><Network size={23} /><span>SYSTEMS</span></span>
          <span className="orbit-coordinate">01 / 03</span>
          <span className="orbit-point" />
        </div>
      </div>
      {children}
    </header>
  );
}
