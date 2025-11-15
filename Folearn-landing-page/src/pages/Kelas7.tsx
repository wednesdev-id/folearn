import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import SubjectCard from "@/components/SubjectCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjectsSmartByGrade, toSubjectCardProps } from "@/services/strapi";

const Kelas7 = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subjects', 'kelas-7'],
    queryFn: async () => {
      const res = await fetchSubjectsSmartByGrade('kelas-7');
      return res.data.map(toSubjectCardProps);
    },
    // Kurangi refetch saat fokus yang memicu ERR_ABORTED
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });

  const subjects = data || [];

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

          {/* Daftar Mata Pelajaran (gabungan, tanpa pembagian wajib/pilihan) */}
          <section>
            {isLoading && (
              <p className="text-muted-foreground">Memuat data mata pelajaran...</p>
            )}
            {isError && (
              <p className="text-red-600">Gagal memuat data: {(error as Error)?.message}</p>
            )}
            {!isLoading && !isError && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                  <div key={subject.id} style={{ animationDelay: `${index * 100}ms` }} className="fade-in">
                    <SubjectCard
                      title={subject.title}
                      description={subject.description}
                      icon={subject.icon}
                      color={subject.color}
                      isOptional={subject.isOptional}
                      subjectId={String((subject as any).slug ?? subject.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Kelas7;