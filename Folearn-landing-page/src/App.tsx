import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Kelas7 from "./pages/Kelas7";
import Kelas8 from "./pages/Kelas8";
import Kelas9 from "./pages/Kelas9";
import SubjectDetail from "./pages/SubjectDetail";
import ChapterDetail from "./pages/ChapterDetail";
import LessonContent from "./pages/LessonContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kelas-7" element={<Kelas7 />} />
          <Route path="/kelas-8" element={<Kelas8 />} />
          <Route path="/kelas-9" element={<Kelas9 />} />

          {/* Subject, Chapter, and Lesson Routes */}
          <Route path="/subject/:subjectId" element={<SubjectDetail />} />
          <Route path="/subject/:subjectId/chapter/:chapterId" element={<ChapterDetail />} />
          <Route path="/subject/:subjectId/chapter/:chapterId/lesson/:lessonId" element={<LessonContent />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
