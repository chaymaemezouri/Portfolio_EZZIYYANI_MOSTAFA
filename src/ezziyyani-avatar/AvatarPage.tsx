import { Seo } from "@/components/shared/Seo";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";
import { AvatarStudio } from "./AvatarStudio";

export default function AvatarPage() {
  const { locale, t } = useI18n();

  return (
    <>
      <Seo title="EzziyyanIAvatar" description={t("meta.pages.avatar")} path={localePath(locale, "avatar")} />
      <div className="ez-avatar-page">
        <AvatarStudio />
      </div>
    </>
  );
}
