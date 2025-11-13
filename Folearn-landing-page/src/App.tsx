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

            {/* Protected Class Routes */}
            <Route path="/kelas-7" element={
              <ProtectedRoute>
                <Kelas7 />
              </ProtectedRoute>
            } />
            <Route path="/kelas-8" element={
              <ProtectedRoute>
                <Kelas8 />
              </ProtectedRoute>
            } />
            <Route path="/kelas-9" element={
              <ProtectedRoute>
                <Kelas9 />
              </ProtectedRoute>
            } />

            {/* Subject, Chapter, and Lesson Routes */}
            <Route path="/subject/:subjectId" element={
              <ProtectedRoute>
                <SubjectDetail />
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
