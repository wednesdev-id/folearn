import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Award } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { getSubjectById } from "@/data/subjects";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  // Scroll to top setiap kali berpindah subject
  useScrollToTop([subjectId]);
  const subject = getSubjectById(subjectId || '');

  if (!subject) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Mata Pelajaran Tidak Ditemukan</h1>
            <Link to="/#kelas" className="text-primary hover:text-primary/80">
              Kembali ke Pilihan Kelas
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to={`/kelas-${subject.grade}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Kelas {subject.grade}
            </Link>

            <div className="flex items-start gap-6 mb-8">
              <NeomorphCard className="p-4">
                <div className="p-3 bg-white rounded-lg neomorph-sm">
                  {subject.icon === 'calculator' && (
                    <div className="text-3xl">📐</div>
                  )}
                  {subject.icon === 'book' && (
                    <div className="text-3xl">📚</div>
                  )}
                  {subject.icon === 'microscope' && (
                    <div className="text-3xl">🔬</div>
                  )}
                  {subject.icon === 'globe' && (
                    <div className="text-3xl">🌍</div>
                  )}
                  {subject.icon === 'heart' && (
                    <div className="text-3xl">❤️</div>
                  )}
                  {subject.icon === 'brain' && (
                    <div className="text-3xl">🧠</div>
                  )}
                  {subject.icon === 'languages' && (
                    <div className="text-3xl">🗣️</div>
                  )}
                  {subject.icon === 'monitor' && (
                    <div className="text-3xl">💻</div>
                  )}
                  {subject.icon === 'dumbbell' && (
                    <div className="text-3xl">⚽</div>
                  )}
                  {subject.icon === 'palette' && (
                    <div className="text-3xl">🎨</div>
                  )}
                  {subject.icon === 'users' && (
                    <div className="text-3xl">👥</div>
                  )}
                </div>
              </NeomorphCard>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{subject.title}</h1>
                <p className="text-gray-600 mb-4">{subject.longDescription}</p>

                <div className="flex flex-wrap gap-4">
                  <span className={`px-3 py-1 bg-white rounded-full text-sm font-medium ${subject.color}`}>
                    Kelas {subject.grade}
                  </span>
                  {subject.isOptional && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      Mata Pelajaran Pilihan
                    </span>
                  )}
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    {subject.chapters.length} Bab
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                    {subject.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)} Pelajaran
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <section className="mb-12 fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Tujuan Pembelajaran</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.learningObjectives.map((objective, index) => (
                <NeomorphCard key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{objective}</p>
                  </div>
                </NeomorphCard>
              ))}
            </div>
          </section>

          {/* Skills Development */}
          <section className="mb-12 fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Kompetensi yang Dikembangkan</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {subject.skills.map((skill, index) => (
                <NeomorphCard key={index} className="p-4 text-center">
                  <div className="text-2xl mb-2">
                    {skill.includes('Math') || skill.includes('Algebra') ? '🔢' :
                     skill.includes('Language') || skill.includes('Grammar') ? '📝' :
                     skill.includes('Science') || skill.includes('Analysis') ? '🔍' :
                     skill.includes('Digital') || skill.includes('Technology') ? '💻' : '🎯'}
                  </div>
                  <p className="text-xs text-gray-700 font-medium">{skill}</p>
                </NeomorphCard>
              ))}
            </div>
          </section>

          {/* Chapters */}
          <section className="mb-12 fade-in">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Materi Pembelajaran</h2>
            </div>

            <div className="space-y-6">
              {subject.chapters.map((chapter, index) => (
                <Link
                  key={chapter.id}
                  to={`/subject/${subject.id}/chapter/${chapter.id}`}
                  className="block"
                >
                  <NeomorphCard className="p-6 hover-lift cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg font-bold text-primary">Bab {index + 1}</span>
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h3>
                        </div>
                        <p className="text-gray-600">{chapter.description}</p>
                      </div>

                      <div className="ml-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <ArrowLeft className="w-5 h-5 text-primary rotate-180" />
                        </div>
                      </div>
                    </div>
                  </NeomorphCard>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SubjectDetail;