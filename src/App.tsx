import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LocaleLayout } from "@/components/layout/LocaleLayout";
import { defaultLocale } from "@/utils/locale";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ExpertisePage = lazy(() => import("@/pages/ExpertisePage"));
const ResearchPage = lazy(() => import("@/pages/ResearchPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const VisionPage = lazy(() => import("@/pages/VisionPage"));
const InternationalPage = lazy(() => import("@/pages/InternationalPage"));
const MediaPage = lazy(() => import("@/pages/MediaPage"));
const AcademicPage = lazy(() => import("@/pages/AcademicPage"));
const RecognitionPage = lazy(() => import("@/pages/RecognitionPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-fallback" />}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${defaultLocale}`} replace />} />
          <Route path="/:locale" element={<LocaleLayout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="expertise" element={<ExpertisePage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="vision" element={<VisionPage />} />
            <Route path="international" element={<InternationalPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="academic" element={<AcademicPage />} />
            <Route path="recognition" element={<RecognitionPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to={`/${defaultLocale}`} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
