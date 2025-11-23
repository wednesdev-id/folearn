import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import NeomorphCard from "@/components/NeomorphCard";
import { renderMarkdownToHtml, sanitizeHtml } from "@/utils/markdown";
import { useQuery } from "@tanstack/react-query";
import { fetchMaterialBySlug, toMaterialDetail, fetchAttachmentsForSub, fetchSubMaterialAttachments } from "@/services/strapi";

const SubMaterialDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const { subjectSlug, materialSlug, subId } = useParams<{ subjectSlug: string; materialSlug: string; subId: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['sub-material', subjectSlug, materialSlug],
    queryFn: async () => {
      if (!subjectSlug || !materialSlug) throw new Error('Slug tidak valid');
      const res = await fetchMaterialBySlug(subjectSlug, materialSlug);
      return toMaterialDetail(res.data as any);
    },
    enabled: !!subjectSlug && !!materialSlug,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
  // Hitung material & sub secara aman (data bisa undefined saat loading)
  const material = data;
  // Cocokkan baik berdasarkan id numeric maupun documentId agar robust
  const sub = material?.subMaterials.find((s: any) => {
    const sid = String(s.id);
    const sdoc = String(s.documentId || "");
    const pid = String(subId || "");
    return sid === pid || sdoc === pid;
  });
  // Jika lampiran tidak dipopulate, ambil dari endpoint upload/files berdasarkan relasi sub-material
  const { data: lazyLampiran } = useQuery({
    queryKey: ['lampiran', sub?.documentId || sub?.id],
    queryFn: async () => {
      const idOrDoc = String(sub?.documentId || sub?.id);
      try {
        return await fetchSubMaterialAttachments(idOrDoc);
      } catch (_) {
        return await fetchAttachmentsForSub(idOrDoc);
      }
    },
    enabled: !!sub && !!(sub as any) && !(Array.isArray((sub as any).lampiran) && (sub as any).lampiran.length > 0),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
  const lampiran = sub
    ? ((Array.isArray((sub as any).lampiran) && (sub as any).lampiran.length > 0)
        ? (sub as any).lampiran
        : (lazyLampiran || []))
    : [];
  // Susun sub materi berdasarkan no_urut/order untuk navigasi berikutnya
  const orderedSubs = (material?.subMaterials ?? []).slice().sort((a: any, b: any) => {
    const ao = (a.order ?? a.no_urut ?? 0) as number;
    const bo = (b.order ?? b.no_urut ?? 0) as number;
    return ao - bo;
  });
  const currentIndex = orderedSubs.findIndex((s: any) => s.id === String(subId));
  const prevSub = currentIndex > 0 ? orderedSubs[currentIndex - 1] : undefined;
  const nextSub = currentIndex >= 0 && currentIndex < orderedSubs.length - 1 ? orderedSubs[currentIndex + 1] : undefined;

  // Return bersyarat dipanggil SETELAH semua hooks di atas
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Memuat sub materi...</h1>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Sub Materi Tidak Ditemukan</h1>
            {isError && (
              <p className="text-red-600 mb-3">{(error as Error)?.message}</p>
            )}
            {subjectSlug && materialSlug && (
              <Link to={`/subject/${subjectSlug}/${materialSlug}`} className="text-primary hover:text-primary/80">
                Kembali ke Materi
              </Link>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Sub Materi Tidak Ditemukan</h1>
            <Link to={`/subject/${subjectSlug}/${materialSlug}`} className="text-primary hover:text-primary/80">
              Kembali ke Materi
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
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8 fade-in">
            <Link
              to={`/subject/${subjectSlug}/${materialSlug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke {material.title}
            </Link>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-primary">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{sub.title}</h1>
                <p className="text-gray-600">{sub.description || 'Materi pembelajaran komprehensif.'}</p>
              </div>
            </div>
          </div>

          {/* Konten dalam kartu: Markdown -> HTML + sanitasi iframe */}
          <NeomorphCard className="p-8">
            <div
              className="prose prose-gray max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: renderMarkdownToHtml(sub.content) || sanitizeHtml('Konten belum tersedia.'),
              }}
            />
          </NeomorphCard>

          {/* Lampiran dan Video Link setelah konten */}
          <div className="mt-8 fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lampiran</h3>
            {lampiran?.length ? (
              <div className="space-y-6">
                {lampiran.map((f: any, idx: number) => {
                  const kind = f?.kind || (f?.mime?.startsWith('image/') ? 'image' : f?.mime?.startsWith('audio/') ? 'audio' : f?.mime?.startsWith('video/') ? 'video' : 'file');
                  if (kind === 'image') {
                    return (
                      <div key={idx} className="flex items-center gap-4">
                        <img src={f.thumbnailUrl || f.fullUrl || f.url} alt={f.name || `Lampiran ${idx + 1}`} className="w-16 h-16 object-cover rounded" />
                        <a href={f.fullUrl || f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          {f.name || `Gambar ${idx + 1}`}
                        </a>
                      </div>
                    );
                  }
                  if (kind === 'audio') {
                    return (
                      <div key={idx} className="space-y-2">
                        <audio controls src={f.fullUrl || f.url} className="w-full" />
                        <a href={f.fullUrl || f.url} download={f.name || true} className="text-blue-600 hover:text-blue-700">
                          Unduh Audio{f.name ? ` (${f.name})` : ''}
                        </a>
                      </div>
                    );
                  }
                  if (kind === 'video') {
                    return (
                      <div key={idx} className="space-y-2">
                        <video controls src={f.fullUrl || f.url} className="w-full max-w-xl rounded" />
                        <a href={f.fullUrl || f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          Buka Video{f.name ? ` (${f.name})` : ''}
                        </a>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full" />
                      <a href={f.fullUrl || f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700" download={f.name || true}>
                        {f.name || `Lampiran ${idx + 1}`}
                      </a>
                      {f.ext && <span className="text-gray-500 text-sm">({f.ext.replace('.', '').toUpperCase()})</span>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">Belum ada lampiran.</p>
            )}
          </div>

          {sub.videoLink && (
            <div className="mt-6 fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Video Pembelajaran</h3>
              <a
                href={sub.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Tonton Video
              </a>
            </div>
          )}

          {/* Tombol Selanjutnya ke sub materi berikutnya */}
          {(prevSub || nextSub) && (
            <div className="mt-8 flex items-center justify-between">
              {prevSub ? (
                <Link
                  to={`/subject/${subjectSlug}/${materialSlug}/sub/${prevSub.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
                  aria-label="Pergi ke sub materi sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </Link>
              ) : (
                <span />
              )}

              {nextSub && (
                <Link
                  to={`/subject/${subjectSlug}/${materialSlug}/sub/${nextSub.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold"
                  aria-label="Pergi ke sub materi selanjutnya"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SubMaterialDetail;