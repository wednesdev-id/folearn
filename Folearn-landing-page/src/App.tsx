import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Kelas7 from "./pages/Kelas7";
import Kelas8 from "./pages/Kelas8";
import Kelas9 from "./pages/Kelas9";
import SubjectDetail from "./pages/SubjectDetail";
import ChapterDetail from "./pages/ChapterDetail";
import MaterialDetail from "./pages/MaterialDetail";
import SubMaterialDetail from "./pages/SubMaterialDetail";
import LessonContent from "./pages/LessonContent";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Kelas Routes - accessible for guests */}
            <Route path="/kelas-7" element={<Kelas7 />} />
            <Route path="/kelas-8" element={<Kelas8 />} />
            <Route path="/kelas-9" element={<Kelas9 />} />

            {/* Subject, Chapter, and Lesson Routes */}
            {/* Subject and Material - accessible for guests */}
            <Route path="/subject/:subjectId" element={<SubjectDetail />} />
            {/* Material route using subject and material slugs */}
            <Route path="/subject/:subjectSlug/:materialSlug" element={<MaterialDetail />} />
            <Route path="/subject/:subjectSlug/:materialSlug/sub/:subId" element={
              <ProtectedRoute>
                <SubMaterialDetail />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subjectId/chapter/:chapterId" element={
              <ProtectedRoute>
                <ChapterDetail />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subjectId/chapter/:chapterId/lesson/:lessonId" element={
              <ProtectedRoute>
                <LessonContent />
              </ProtectedRoute>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
