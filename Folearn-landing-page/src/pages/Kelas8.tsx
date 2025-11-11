import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import SubjectCard from "@/components/SubjectCard";

const Kelas8 = () => {
  const mataPelajaranWajib = [
    {
      title: "Pendidikan Agama dan Budi Pekerti",
      description: "Memperdalam pemahaman nilai-nilai agama dan implementasi dalam kehidupan.",
      icon: "heart",
      color: "text-red-500"
    },
    {
      title: "Pendidikan Pancasila",
      description: "Menganalisis nilai-nilai Pancasila dan penerapannya di masyarakat.",
      icon: "brain",
      color: "text-blue-500"
    },
    {
      title: "Bahasa Indonesia",
      description: "Mengembangkan kemampuan berbahasa Indonesia tingkat menengah.",
      icon: "book",
      color: "text-green-500"
    },
    {
      title: "Matematika",
      description: "Mempelajari konsep matematika tingkat lanjut dan aplikasinya.",
      icon: "calculator",
      color: "text-purple-500"
    },
    {
      title: "Ilmu Pengetahuan Alam (IPA)",
      description: "Memperdalam konsep sains alam dengan analisis dan eksperimen.",
      icon: "microscope",
      color: "text-teal-500"
    },
    {
      title: "Ilmu Pengetahuan Sosial (IPS)",
      description: "Mempelajari struktur sosial, ekonomi, dan politik masyarakat.",
      icon: "globe",
      color: "text-orange-500"
    },
    {
      title: "Bahasa Inggris",
      description: "Meningkatkan kemampuan komunikasi dan tata bahasa Inggris.",
      icon: "languages",
      color: "text-indigo-500"
    },
    {
      title: "Informatika",
      description: "Belajar pemrograman dasar, algoritma, dan teknologi web.",
      icon: "monitor",
      color: "text-cyan-500"
    },
    {
      title: "Pendidikan Jasmani, Olahraga, dan Kesehatan",
      description: "Pengembangan kemampuan olahraga dan pemahaman kesehatan.",
      icon: "dumbbell",
      color: "text-emerald-500"
    }
  ];

  const mataPelajaranPilihan = [
    {
      title: "Seni Budaya dan Prakarya",
      description: "Mengembangkan bakat seni dan keterampilan kerajinan tangan.",
      icon: "palette",
      color: "text-pink-500"
    },
    {
      title: "Muatan Lokal",
      description: "Mempelajari budaya daerah dan potensi lokal masing-masing.",
      icon: "users",
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to="/#kelas"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              {mataPelajaranWajib.map((subject, index) => (
                <div key={subject.title} style={{ animationDelay: `${index * 100}ms` }} className="fade-in">
                  <SubjectCard {...subject} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center max-w-2xl mx-auto">
              {mataPelajaranPilihan.map((subject, index) => (
                <div key={subject.title} style={{ animationDelay: `${(index + 9) * 100}ms` }} className="fade-in">
                  <SubjectCard {...subject} isOptional={true} />
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