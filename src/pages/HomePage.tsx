import { Seo } from "@/components/shared/Seo";
import { FinalCta } from "@/components/home/FinalCta";
import { Expertise } from "@/components/home/Expertise";
import { FeaturedResearch } from "@/components/home/FeaturedResearch";
import { HomeReel } from "@/components/home/HomeReel";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { MediaSection } from "@/components/home/MediaSection";
import { RecognitionSection } from "@/components/home/RecognitionSection";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { useI18n } from "@/i18n/I18nProvider";
import { localePath } from "@/utils/locale";

export default function HomePage() {
  const { locale, t } = useI18n();
  return (
    <>
      <Seo title={t("meta.siteName")} description={t("meta.pages.home")} path={localePath(locale)} />
      <div className="home-open">
        <Hero />
        <Impact />
      </div>
      <Expertise />
      <FeaturedResearch />
      <HomeReel />
      <SelectedProjects />
      <MediaSection />
      <RecognitionSection />
      <FinalCta />
    </>
  );
}
