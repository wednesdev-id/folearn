import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { getSubjectById } from "@/data/subjects";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const ChapterDetail = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();

  // Scroll to top setiap kali berpindah chapter
  useScrollToTop([subjectId, chapterId]);
  const subject = getSubjectById(subjectId || '');
  const chapter = subject?.chapters.find(c => c.id === chapterId);

  if (!subject || !chapter) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Bab Tidak Ditemukan</h1>
            <Link to={`/subject/${subjectId}`} className="text-primary hover:text-primary/80">
              Kembali ke Mata Pelajaran
            </Link>
          </div>
        </main>
      </div>
    );
  }

  
  const chapterIndex = subject.chapters.findIndex(c => c.id === chapterId);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to={`/subject/${subjectId}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke {subject.title}
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Bab {chapterIndex + 1}: {chapter.title}
              </h1>
              <p className="text-gray-600 mb-4">{chapter.description}</p>
            </div>
          </div>

          {/* Lessons */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Materi Pembelajaran</h2>
            </div>

            <div className="space-y-4">
              {chapter.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/subject/${subjectId}/chapter/${chapterId}/lesson/${lesson.id}`}
                  className="block"
                >
                  <NeomorphCard className="p-8 hover-lift cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors mb-3">
                          {lesson.title}
                        </h3>
                        <p className="text-gray-600">
                          {lesson.content || `Pelajaran interaktif tentang ${lesson.title.toLowerCase()} untuk meningkatkan pemahaman konsep dasar.`}
                        </p>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        <button className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-bold text-lg">
                          Mulai Belajar
                        </button>
                      </div>
                    </div>
                  </NeomorphCard>
                </Link>
              ))}
            </div>
          </section>

  
          {/* Chapter Navigation */}
          <section>
            <div className="flex justify-between items-center">
              <div>
                {chapterIndex > 0 && (
                  <Link
                    to={`/subject/${subjectId}/chapter/${subject.chapters[chapterIndex - 1].id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg neomorph hover-lift"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Bab Sebelumnya
                  </Link>
                )}
              </div>

              <div>
                {chapterIndex < subject.chapters.length - 1 && (
                  <Link
                    to={`/subject/${subjectId}/chapter/${subject.chapters[chapterIndex + 1].id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Bab Selanjutnya
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChapterDetail;