import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import SubjectCard from "@/components/SubjectCard";
import { getSubjectsByGrade } from "@/data/subjects";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Kelas8 = () => {
  // Scroll to top setiap kali masuk halaman kelas
  useScrollToTop(['kelas-8']);
  const kelas8Subjects = getSubjectsByGrade(8);
  const mataPelajaranWajib = kelas8Subjects.filter(subject => subject.category === 'wajib');
  const mataPelajaranPilihan = kelas8Subjects.filter(subject => subject.category === 'pilihan');

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
                <div className="text-4xl font-bold text-purple-500">8</div>
              </NeomorphCard>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelas 8 SMP</h1>
                <p className="text-gray-600">Tingkatkan pengetahuanmu di jenjang berikutnya.</p>
              </div>
            </div>
          </div>

          {/* Mata Pelajaran Wajib */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Mata Pelajaran Wajib</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mataPelajaranWajib.map((subject, index) => (
                <div key={subject.id} style={{ animationDelay: `${index * 100}ms` }} className="fade-in">
                  <SubjectCard
                    title={subject.title}
                    description={subject.description}
                    icon={subject.icon}
                    color={subject.color}
                    isOptional={subject.isOptional}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Mata Pelajaran Pilihan */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Mata Pelajaran Pilihan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {mataPelajaranPilihan.map((subject, index) => (
                <div key={subject.id} style={{ animationDelay: `${(index + 9) * 100}ms` }} className="fade-in">
                  <SubjectCard
                    title={subject.title}
                    description={subject.description}
                    icon={subject.icon}
                    color={subject.color}
                    isOptional={subject.isOptional}
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

export default Kelas8;