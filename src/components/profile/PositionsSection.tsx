import { privatePositions, publicPositions, type Position } from "@/data/positions";
import { useI18n } from "@/i18n/I18nProvider";
import { text } from "@/utils/text";

function periodLabel(to: string, present: string) {
  return to === "present" ? present : to;
}

function PositionTable({ items }: { items: Position[] }) {
  const { locale, t } = useI18n();

  return (
    <div className="posts-scroll">
      <table className="posts-table">
        <thead>
          <tr>
            <th scope="col">{t("profile.positions.columns.organization")}</th>
            <th scope="col">{t("profile.positions.columns.unit")}</th>
            <th scope="col">{t("profile.positions.columns.role")}</th>
            <th scope="col">{t("profile.positions.columns.period")}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td data-label={t("profile.positions.columns.organization")}>{text(locale, item.organization)}</td>
              <td data-label={t("profile.positions.columns.unit")}>{text(locale, item.unit)}</td>
              <td data-label={t("profile.positions.columns.role")}>{text(locale, item.role)}</td>
              <td className="posts-period" data-label={t("profile.positions.columns.period")}>
                {item.from}
                {" – "}
                {periodLabel(item.to, t("profile.positions.present"))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PositionsSection() {
  const { t } = useI18n();

  return (
    <section className="profile-posts" id="positions">
      <div className="posts-block">
        <h2>{t("profile.positions.private")}</h2>
        <p className="posts-order">{t("profile.positions.order")}</p>
        <PositionTable items={privatePositions} />
      </div>
      <div className="posts-block">
        <h2>{t("profile.positions.public")}</h2>
        <p className="posts-order">{t("profile.positions.order")}</p>
        <PositionTable items={publicPositions} />
      </div>
    </section>
  );
}
