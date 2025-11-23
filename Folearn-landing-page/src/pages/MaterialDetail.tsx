import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { useQuery } from "@tanstack/react-query";
import { fetchMaterialBySlug, toMaterialDetail } from "@/services/strapi";

const MaterialDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { subjectSlug, materialSlug } = useParams<{ subjectSlug: string; materialSlug: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['material', subjectSlug, materialSlug],
    queryFn: async () => {
      if (!subjectSlug || !materialSlug) throw new Error('Slug tidak valid');
      const res = await fetchMaterialBySlug(subjectSlug, materialSlug);
      return toMaterialDetail(res.data as any);
    },
    enabled: !!subjectSlug && !!materialSlug,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Memuat materi...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Materi Tidak Ditemukan</h1>
            {isError && (
              <p className="text-red-600 mb-3">{(error as Error)?.message}</p>
            )}
            {subjectSlug && (
              <Link to={`/subject/${subjectSlug}`} className="text-primary hover:text-primary/80">
                Kembali ke Mata Pelajaran
              </Link>
            )}
          </div>
        </main>
      </div>
    );
  }

  const material = data;
  const orderedSubs = (material.subMaterials || []).slice().sort((a: any, b: any) => {
    const ao = (a.order ?? a.no_urut ?? 0) as number;
    const bo = (b.order ?? b.no_urut ?? 0) as number;
    return ao - bo;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to={`/subject/${material.subjectSlug || subjectSlug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Mata Pelajaran
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{material.title}</h1>
              <p className="text-gray-600 mb-4">{material.description}</p>
            </div>
          </div>

          {/* Sub-Materials List */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-gray-800">Sub Materi</h2>
            </div>

            <div className="space-y-4">
              {orderedSubs && orderedSubs.length > 0 ? (
                orderedSubs.map((sub) => (
                  <NeomorphCard key={sub.id} className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          {sub.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {sub.description || `Sub materi terkait ${material.title.toLowerCase()}.`}
                        </p>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        <Link
                          to={`/subject/${material.subjectSlug || subjectSlug}/${material.slug || materialSlug}/sub/${sub.id}`}
                          className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-bold text-lg"
                        >
                          Mulai Belajar
                        </Link>
                      </div>
                    </div>
                  </NeomorphCard>
                ))
              ) : (
                <p className="text-gray-600">Belum ada sub materi.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MaterialDetail;