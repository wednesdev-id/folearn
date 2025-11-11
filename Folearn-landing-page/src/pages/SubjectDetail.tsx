import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Award, Clock, Users } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { getSubjectById } from "@/data/subjects";

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
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
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
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
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-800">Materi Pembelajaran</h2>
              </div>
              <span className="text-sm text-gray-500">
                {subject.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)} pelajaran •
                {subject.chapters.reduce((total, chapter) => total + chapter.duration.split(' ')[0], 0)} jam total
              </span>
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
                        <p className="text-gray-600 mb-4">{chapter.description}</p>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
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

                        {/* Preview Lessons */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-2">Topik pembelajaran:</p>
                          <div className="flex flex-wrap gap-2">
                            {chapter.lessons.slice(0, 3).map((lesson) => (
                              <span key={lesson.id} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                {lesson.title}
                              </span>
                            ))}
                            {chapter.lessons.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                +{chapter.lessons.length - 3} lagi
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ArrowLeft className="w-5 h-5 text-primary rotate-180" />
                        </div>
                      </div>
                    </div>
                  </NeomorphCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Assessment Methods */}
          <section className="mb-12 fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Metode Penilaian</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.assessmentMethods.map((method, index) => (
                <NeomorphCard key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{method}</p>
                      <p className="text-xs text-gray-500">Metode {index + 1}</p>
                    </div>
                  </div>
                </NeomorphCard>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SubjectDetail;