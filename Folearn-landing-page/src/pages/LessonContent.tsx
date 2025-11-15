import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, BookOpen, Play, Volume2, Maximize2 } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjectById, toSubjectDetail } from "@/services/strapi";

const LessonContent = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { subjectId, chapterId, lessonId } = useParams<{ subjectId: string; chapterId: string; lessonId: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subject', subjectId],
    queryFn: async () => {
      if (!subjectId) throw new Error('Subject ID tidak valid');
      const res = await fetchSubjectById(subjectId);
      return toSubjectDetail(res.data as any);
    },
    enabled: !!subjectId,
  });

  const subject = data;
  const chapter = subject?.chapters.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Memuat pelajaran...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !subject || !chapter || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Pelajaran Tidak Ditemukan</h1>
            {isError && (
              <p className="text-red-600 mb-3">{(error as Error)?.message}</p>
            )}
            <Link to={`/subject/${subjectId}/chapter/${chapterId}`} className="text-primary hover:text-primary/80">
              Kembali ke Bab
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const lessonIndex = chapter.lessons.findIndex(l => l.id === lessonId);

  const getLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return {
          icon: <Play className="w-8 h-8" />,
          title: 'Video Pembelajaran',
          description: 'Saksikan video pembelajaran untuk memahami konsep dengan penjelasan visual.',
          content: (
            <div className="space-y-6">
              {/* Video Player Placeholder */}
              <div className="relative bg-black rounded-lg overflow-hidden neomorph" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale cursor-pointer">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white text-lg font-medium">Klik untuk memutar video</p>
                    <p className="text-white/70 text-sm mt-2">Durasi: {lesson.duration} menit</p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <button className="hover-scale">
                        <Play className="w-5 h-5" />
                      </button>
                      <Volume2 className="w-5 h-5 cursor-pointer" />
                      <Maximize2 className="w-5 h-5 cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">0:00</span>
                      <div className="w-64 h-1 bg-white/30 rounded-full">
                        <div className="w-1/3 h-full bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm">{Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Description */}
              <NeomorphCard className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Deskripsi Video</h3>
                <p className="text-gray-600">
                  Video pembelajaran tentang {lesson.title} dengan durasi {lesson.duration} menit
                  untuk membantu pemahaman konsep secara visual.
                </p>
              </NeomorphCard>
            </div>
          )
        };

      case 'reading':
        return {
          icon: <BookOpen className="w-8 h-8" />,
          title: 'Materi Bacaan',
          description: 'Baca materi pembelajaran komprehensif dengan penjelasan detail.',
          content: (
            <div className="space-y-6">
              {/* Reading Content */}
              <NeomorphCard className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{lesson.title}</h3>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Pendahuluan</h4>
                  <p className="mb-6 leading-relaxed">
                    Selamat datang dalam pembelajaran {lesson.title.toLowerCase()}. Dalam materi ini,
                    kita akan mempelajari konsep-konsep fundamental yang menjadi dasar untuk memahami
                    topik ini secara mendalam.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Materi Pembelajaran</h4>
                  <p className="mb-6 leading-relaxed">
                    {lesson.title} merupakan materi penting yang perlu dipahami dengan baik.
                    Melalui materi ini, kamu akan mempelajari konsep dasar serta penerapannya
                    dalam konteks pembelajaran yang relevan.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="font-medium text-blue-800">
                      <strong>Penting:</strong> Pelajari materi ini dengan seksama untuk pemahaman yang lebih baik.
                    </p>
                  </div>
                </div>
              </NeomorphCard>
            </div>
          )
        };

      default:
        return {
          icon: <BookOpen className="w-8 h-8" />,
          title: 'Pelajaran',
          description: 'Materi pembelajaran komprehensif.',
          content: (
            <NeomorphCard className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{lesson.title}</h3>
              <p className="text-gray-700">
                Pelajaran tentang {lesson.title} dengan durasi {lesson.duration} menit
                pada tingkat kesulitan {lesson.difficulty}.
              </p>
            </NeomorphCard>
          )
        };
    }
  };

  const lessonContent = getLessonContent();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to={`/subject/${subjectId}/chapter/${chapterId}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke {chapter.title}
            </Link>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className={subject.color.replace('text-', 'text-')}>
                  {lessonContent.icon}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
                <p className="text-gray-600">{lessonContent.description}</p>

                              </div>
            </div>
          </div>

          
          {/* Lesson Content */}
          <div className="mb-12 fade-in">
            {lessonContent.content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <div>
              {lessonIndex > 0 && (
                <Link
                  to={`/subject/${subjectId}/chapter/${chapterId}/lesson/${chapter.lessons[lessonIndex - 1].id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg neomorph hover-lift"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Pelajaran Sebelumnya
                </Link>
              )}
            </div>

            <div>
              {lessonIndex < chapter.lessons.length - 1 ? (
                <Link
                  to={`/subject/${subjectId}/chapter/${chapterId}/lesson/${chapter.lessons[lessonIndex + 1].id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
                >
                  Selanjutnya
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              ) : (
                <Link
                  to={`/subject/${subjectId}`}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-bold"
                >
                  Kembali
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonContent;