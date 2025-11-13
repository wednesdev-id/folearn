import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import SubjectCard from "@/components/SubjectCard";
import { getSubjectsByGrade } from "@/data/subjects";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Kelas7 = () => {
  // Scroll to top setiap kali masuk halaman kelas
  useScrollToTop(['kelas-7']);
  const kelas7Subjects = getSubjectsByGrade(7);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to="/#kelas"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Pilihan Kelas
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <NeomorphCard className="p-4">
                <div className="text-4xl font-bold text-blue-500">7</div>
              </NeomorphCard>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelas 7 SMP</h1>
                <p className="text-gray-600">Mulai petualangan belajarmu di SMP!</p>
              </div>
            </div>
          </div>

          {/* Mata Pelajaran */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Mata Pelajaran Kelas 7</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kelas7Subjects.map((subject, index) => (
                <div key={subject.id} style={{ animationDelay: `${index * 100}ms` }} className="fade-in">
                  <SubjectCard
                    title={subject.title}
                    description={subject.description}
                    icon={subject.icon}
                    color={subject.color}
                    subjectId={subject.id}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Kelas7;