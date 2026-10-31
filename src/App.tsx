import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LocaleLayout } from "@/components/layout/LocaleLayout";
import { defaultLocale } from "@/utils/locale";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ExpertisePage = lazy(() => import("@/pages/ExpertisePage"));
const ResearchPage = lazy(() => import("@/pages/ResearchPage"));
const ResearchInterestPage = lazy(() => import("@/pages/ResearchInterestPage"));
const PublicationsPage = lazy(() => import("@/pages/PublicationsPage"));
const BooksPage = lazy(() => import("@/pages/BooksPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const VisionPage = lazy(() => import("@/pages/VisionPage"));
const InternationalPage = lazy(() => import("@/pages/InternationalPage"));
const MediaPage = lazy(() => import("@/pages/MediaPage"));
const AcademicPage = lazy(() => import("@/pages/AcademicPage"));
const RecognitionPage = lazy(() => import("@/pages/RecognitionPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AvatarPage = lazy(() => import("@/ezziyyani-avatar/AvatarPage"));
const TeachingPage = lazy(() => import("@/pages/TeachingPage"));
const PatentsPage = lazy(() => import("@/pages/ShowcasePages").then((m) => ({ default: m.PatentsPage })));
const InnovationPage = lazy(() => import("@/pages/ShowcasePages").then((m) => ({ default: m.InnovationPage })));
const GalleryPage = lazy(() => import("@/pages/ShowcasePages").then((m) => ({ default: m.GalleryPage })));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const AdminApp = lazy(() => import("@/admin/AdminApp"));
const AdminDashboard = lazy(() => import("@/admin/AdminApp").then((m) => ({ default: m.Dashboard })));
const AdminList = lazy(() => import("@/admin/AdminApp").then((m) => ({ default: m.CollectionList })));
const AdminEditor = lazy(() => import("@/admin/AdminApp").then((m) => ({ default: m.ItemEditor })));
const AdminHistory = lazy(() => import("@/admin/AdminApp").then((m) => ({ default: m.AuditLog })));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="route-fallback" />}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${defaultLocale}`} replace />} />
          <Route path="/admin" element={<AdminApp />}>
            <Route index element={<AdminDashboard />} />
            <Route path="history" element={<AdminHistory />} />
            <Route path="c/:collection" element={<AdminList />} />
            <Route path="c/:collection/:id" element={<AdminEditor />} />
          </Route>
          <Route path="/:locale" element={<LocaleLayout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="expertise" element={<ExpertisePage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="research-interest" element={<ResearchInterestPage />} />
            <Route path="publications" element={<PublicationsPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="vision" element={<VisionPage />} />
            <Route path="international" element={<InternationalPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="academic" element={<AcademicPage />} />
            <Route path="recognition" element={<RecognitionPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="avatar" element={<AvatarPage />} />
            <Route path="teaching" element={<TeachingPage />} />
            <Route path="patents" element={<PatentsPage />} />
            <Route path="innovation" element={<InnovationPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to={`/${defaultLocale}`} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
