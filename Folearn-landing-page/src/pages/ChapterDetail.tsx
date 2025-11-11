import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Award, Play, FileText, Monitor, Edit, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { getSubjectById } from "@/data/subjects";

const ChapterDetail = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();
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

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-5 h-5" />;
      case 'reading':
        return <FileText className="w-5 h-5" />;
      case 'interactive':
        return <Monitor className="w-5 h-5" />;
      case 'assignment':
        return <Edit className="w-5 h-5" />;
      case 'quiz':
        return <CheckCircle className="w-5 h-5" />;
      case 'practical':
        return <Award className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getLessonTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Pembelajaran';
      case 'reading':
        return 'Materi Bacaan';
      case 'interactive':
        return 'Aktivitas Interaktif';
      case 'assignment':
        return 'Tugas';
      case 'quiz':
        return 'Kuis';
      case 'practical':
        return 'Praktikum';
      default:
        return 'Pelajaran';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'mudah':
        return 'bg-green-100 text-green-600';
      case 'sedang':
        return 'bg-yellow-100 text-yellow-600';
      case 'sulit':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

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
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke {subject.title}
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Bab {chapterIndex + 1}: {chapter.title}
              </h1>
              <p className="text-gray-600 mb-4">{chapter.description}</p>

              <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{chapter.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{chapter.lessons.length} pelajaran</span>
                </div>
                {chapter.exercises.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{chapter.exercises.length} latihan</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lessons */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Materi Pembelajaran</h2>
            </div>

            <div className="space-y-4">
              {chapter.lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={`/subject/${subjectId}/chapter/${chapterId}/lesson/${lesson.id}`}
                  className="block"
                >
                  <NeomorphCard className="p-6 hover-lift cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className={subject.color.replace('text-', 'text-')}>
                            {getLessonIcon(lesson.type)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                              {lesson.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                              {lesson.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span>{getLessonTypeLabel(lesson.type)}</span>
                            <span>•</span>
                            <span>{lesson.duration} menit</span>
                            <span>•</span>
                            <span className={`font-medium ${subject.color.replace('text-', 'text-')}`}>
                              Pelajaran {index + 1}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2">
                            {lesson.content || `Pelajaran interaktif tentang ${lesson.title.toLowerCase()} untuk meningkatkan pemahaman konsep dasar.`}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded-lg neomorph-sm flex items-center justify-center">
                          <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                        </div>
                      </div>
                    </div>
                  </NeomorphCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Exercises */}
          {chapter.exercises.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-800">Latihan & Evaluasi</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chapter.exercises.map((exercise, index) => (
                  <NeomorphCard key={exercise.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {exercise.title}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="capitalize">{exercise.type.replace('-', ' ')}</span>
                          <span>•</span>
                          <span>{exercise.questions} soal</span>
                          <span>•</span>
                          <span>{exercise.duration} menit</span>
                          <span>•</span>
                          <span className="font-medium text-green-600">{exercise.points} poin</span>
                        </div>

                        <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                          Mulai Latihan
                        </button>
                      </div>
                    </div>
                  </NeomorphCard>
                ))}
              </div>
            </section>
          )}

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