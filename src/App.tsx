import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import CreateProfile from "./components/profile/CreateProfile";
const InterviewPreparation = lazy(
  () => import("./components/resources/InterviewPreparation"),
);
const CareerPathGuidance = lazy(
  () => import("./components/resources/CareerPathGuidance"),
);

// Lazy load components for better performance
const HomePage = lazy(() => import("./components/home/HomePage"));
const AuthForm = lazy(() => import("./components/auth/AuthForm"));
const StudentDashboard = lazy(
  () => import("./components/dashboard/StudentDashboard"),
);
const RecruiterDashboard = lazy(
  () => import("./components/dashboard/RecruiterDashboard"),
);
const AdminDashboard = lazy(
  () => import("./components/dashboard/AdminDashboard"),
);
const JobListings = lazy(() => import("./components/jobs/JobListings"));
const JobPostingForm = lazy(() => import("./components/jobs/JobPostingForm"));
const AboutPage = lazy(() => import("./components/layout/AboutPage"));
const ContactPage = lazy(() => import("./components/layout/ContactPage"));
const InternshipsPage = lazy(
  () => import("./components/resources/InternshipsPage"),
);
const WorkshopsPage = lazy(
  () => import("./components/resources/WorkshopsPage"),
);
const CampusDrivesPage = lazy(
  () => import("./components/resources/CampusDrivesPage"),
);
const ResumeBuilder = lazy(
  () => import("./components/resources/ResumeBuilder"),
);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthForm defaultTab="login" />} />
              <Route
                path="/register"
                element={<AuthForm defaultTab="register" />}
              />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/post-job" element={<JobPostingForm />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/workshops" element={<WorkshopsPage />} />
              <Route path="/campus-drives" element={<CampusDrivesPage />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route
                path="/interview-preparation"
                element={<InterviewPreparation />}
              />
              <Route
                path="/career-path-guidance"
                element={<CareerPathGuidance />}
              />
            </Route>

            {/* Dashboard routes */}
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
            <Route
              path="/recruiter-dashboard/*"
              element={<RecruiterDashboard />}
            />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />

            {/* Tempo routes */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
