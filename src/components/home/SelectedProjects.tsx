import { Link } from "react-router-dom";
import { projectCategoryIds } from "@/data/projects";
import { useProjects } from "@/content/hooks";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Reveal } from "@/components/shared/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { text } from "@/utils/text";
import type { ResearchProject } from "@/types";

const slots = ["plate-a", "plate-b", "plate-c", "plate-d"] as const;

function PlateLink({
  art,
  slot,
  kicker,
  title,
  role,
  summary,
  href,
  image,
}: {
  art: number;
  slot: string;
  kicker: string;
  title: string;
  role: string;
  summary: string;
  href: string;
  image?: string;
}) {
  return (
    <Link to={href} className={`plate ${slot}${image ? " has-image" : ""}`} data-art={art}>
      {image ? <img src={image} alt="" /> : null}
      <span className="plate-body">
        <span className="plate-kicker">{kicker}</span>
        <span className="plate-title">{title}</span>
        {role ? <span className="plate-role">{role}</span> : null}
        {summary ? <span className="plate-summary">{summary}</span> : null}
      </span>
    </Link>
  );
}

export function ProjectMosaic({ items }: { items: ResearchProject[] }) {
  const { locale, t } = useI18n();
  const source = items.length > 0
    ? items.slice(0, 4)
    : projectCategoryIds.slice(0, 4).map((id) => ({
        id,
        title: t(`projects.categories.${id}`),
        year: "",
        category: id,
        role: "",
        summary: "",
        organization: "",
        partners: [],
        country: "",
        status: "",
        image: "",
        links: [],
        featured: false,
      }));

  return (
    <div className="project-mosaic">
      {source.map((item, index) => (
        <PlateLink
          key={item.id}
          art={(index % 4) + 1}
          slot={slots[index] ?? "plate-d"}
          kicker={items.length > 0 ? (item.category ? t(`projects.categories.${item.category}`) : item.year) : t("projects.categoryLabel")}
          title={text(locale, item.title) || "—"}
          role={text(locale, item.role)}
          summary={text(locale, item.summary)}
          href={`${localePath(locale, "projects")}#${item.id}`}
          image={item.image}
        />
      ))}
    </div>
  );
}

export function SelectedProjects() {
  const { locale, t } = useI18n();
  const projects = useProjects();
  return (
    <section className="band">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <h2 className="section-title">{t("projects.title")}</h2>
              <p className="section-text" style={{ marginTop: "0.9rem" }}>{t("projects.homeLead")}</p>
            </div>
            <ArrowLink to={localePath(locale, "projects")}>{t("projects.viewAll")}</ArrowLink>
          </div>
        </Reveal>
        <ProjectMosaic items={projects} />
      </div>
    </section>
  );
}
