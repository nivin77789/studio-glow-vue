import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { BookingProvider } from "@/hooks/useBooking";
import { SmoothScroll } from "@/components/SmoothScroll";

const FAQChatbot = lazy(() => import("@/components/FAQChatbot"));
const RatingWidget = lazy(() => import("@/components/RatingWidget"));

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CollaborationsPage = lazy(() => import("./pages/CollaborationsPage"));
const PrintsPage = lazy(() => import("./pages/PrintsPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const GlobalWidgets = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <Suspense fallback={null}>
      <SmoothScroll />
      <FAQChatbot />
      <RatingWidget />
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-center" richColors />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <BookingProvider>
          <GlobalWidgets />
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/collaborations" element={<CollaborationsPage />} />
              <Route path="/prints" element={<PrintsPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BookingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;