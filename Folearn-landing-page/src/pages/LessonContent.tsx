import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Award, Play, CheckCircle, Volume2, Maximize2 } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { getSubjectById } from "@/data/subjects";

const LessonContent = () => {
  const { subjectId, chapterId, lessonId } = useParams<{ subjectId: string; chapterId: string; lessonId: string }>();
  const subject = getSubjectById(subjectId || '');
  const chapter = subject?.chapters.find(c => c.id === chapterId);
  const lesson = chapter?.lessons.find(l => l.id === lessonId);

  if (!subject || !chapter || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Pelajaran Tidak Ditemukan</h1>
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
          description: 'Saksikan video pembelajaran interaktif untuk memahami konsep dengan visual yang menarik.',
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
                <p className="text-gray-600 mb-4">
                  Video pembelajaran ini dirancang untuk membantu kamu memahami konsep dasar {lesson.title.toLowerCase()}
                  dengan pendekatan visual yang mudah dipahami. Materi disajikan secara bertahap dengan contoh nyata.
                </p>
              </NeomorphCard>

              {/* Key Points */}
              <NeomorphCard className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Poin Pembelajaran Utama</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Memahami konsep fundamental {lesson.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Menerapkan konsep dalam contoh nyata</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Mengembangkan pemahaman yang mendalam</span>
                  </li>
                </ul>
              </NeomorphCard>
            </div>
          )
        };

      case 'reading':
        return {
          icon: <BookOpen className="w-8 h-8" />,
          title: 'Materi Bacaan',
          description: 'Baca materi pembelajaran komprehensif dengan penjelasan detail dan contoh.',
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
                    topik yang lebih lanjut. Setiap konsep akan dijelaskan secara detail dengan contoh-contoh
                    yang relevan untuk memudahkan pemahaman.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Konsep Utama</h4>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="font-medium text-blue-800">
                      <strong>Definisi:</strong> {lesson.title} adalah konsep dasar yang penting
                      dalam pembelajaran ini. Memahami konsep ini akan membantu kamu dalam menyelesaikan
                      berbagai masalah terkait.
                    </p>
                  </div>

                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Langkah-langkah Pembelajaran:</h5>
                  <ol className="list-decimal list-inside space-y-3 mb-6">
                    <li className="leading-relaxed">
                      <strong>Pengenalan Konsep:</strong> Memahami definisi dan pengertian dasar
                    </li>
                    <li className="leading-relaxed">
                      <strong>Analisis Komponen:</strong> Mengidentifikasi bagian-bagian penting
                    </li>
                    <li className="leading-relaxed">
                      <strong>Implementasi:</strong> Menerapkan konsep dalam contoh nyata
                    </li>
                    <li className="leading-relaxed">
                      <strong>Evaluasi:</strong> Menguji pemahaman melalui latihan
                    </li>
                  </ol>

                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Contoh Aplikasi</h4>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Contoh 1:</h5>
                    <p className="text-gray-700 mb-4">
                      Misalkan kita memiliki situasi di mana konsep {lesson.title.toLowerCase()}
                      diterapkan dalam kehidupan sehari-hari. Contoh nyata ini akan membantu kamu
                      melihat relevansi materi yang dipelajari.
                    </p>
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Kasus:</strong> Deskripsi situasi nyata yang dapat diobservasi
                      </p>
                    </div>
                  </div>
                </div>
              </NeomorphCard>

              {/* Summary */}
              <NeomorphCard className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ringkasan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Yang Telah Dipelajari</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Konsep dasar {lesson.title.toLowerCase()}</li>
                      <li>• Langkah-langkah implementasi</li>
                      <li>• Contoh aplikasi nyata</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Kompetensi yang Dikembangkan</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Pemahaman konseptual</li>
                      <li>• Kemampuan analisis</li>
                      <li>• Penerapan praktis</li>
                    </ul>
                  </div>
                </div>
              </NeomorphCard>
            </div>
          )
        };

      case 'interactive':
        return {
          icon: <Target className="w-8 h-8" />,
          title: 'Aktivitas Interaktif',
          description: 'Ikuti aktivitas pembelajaran interaktif untuk pengalaman belajar yang engaging.',
          content: (
            <div className="space-y-6">
              {/* Interactive Activity */}
              <NeomorphCard className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Aktivitas Pembelajaran Interaktif</h3>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Eksperimen Virtual: {lesson.title}
                  </h4>
                  <p className="text-gray-700 mb-6">
                    Ikuti langkah-langkah interaktif untuk memahami konsep {lesson.title.toLowerCase()}
                    melalui simulasi dan eksperimen virtual yang menarik.
                  </p>

                  {/* Interactive Simulation Area */}
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center">
                    <div className="mb-6">
                      <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 animate-pulse"></div>
                      <p className="text-lg font-medium text-gray-700 mb-2">Area Simulasi Interaktif</p>
                      <p className="text-sm text-gray-500">Klik untuk memulai eksperimen</p>
                    </div>

                    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                      Mulai Simulasi
                    </button>
                  </div>
                </div>

                {/* Step by Step Guide */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Panduan Langkah demi Langkah</h4>
                  {['Persiapan', 'Eksperimen', 'Observasi', 'Analisis'].map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-1">Langkah {index + 1}: {step}</h5>
                        <p className="text-sm text-gray-600">
                          {index === 0 && 'Siapkan materi dan alat yang diperlukan untuk simulasi.'}
                          {index === 1 && 'Ikuti instruksi untuk menjalankan eksperimen virtual.'}
                          {index === 2 && 'Catat hasil dan observasi selama simulasi berlangsung.'}
                          {index === 3 && 'Analisis data dan tarik kesimpulan dari hasil eksperimen.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </NeomorphCard>

              {/* Interactive Tools */}
              <NeomorphCard className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Alat Interaktif</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                    <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-800">Kuis Interaktif</p>
                  </button>
                  <button className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                    <Play className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-800">Animasi Konsep</p>
                  </button>
                  <button className="p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                    <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-purple-800">Challenge Game</p>
                  </button>
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