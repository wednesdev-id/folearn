import { Megaphone } from "lucide-react";
import LatestInfoCard from "./LatestInfoCard";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestMaterials, fetchLatestSubMaterials } from "@/services/strapi";

const AnnouncementSection = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['latest-content', 2],
    queryFn: async () => {
      const [matRes, subRes] = await Promise.allSettled([
        fetchLatestMaterials(10),
        fetchLatestSubMaterials(10),
      ]);

      const materials = matRes.status === 'fulfilled' ? (matRes.value.data || []) : [];
      const subs = subRes.status === 'fulfilled' ? (subRes.value.data || []) : [];

      const normalized = [
        // Materials: dukung v4 (attributes.*) dan v5 (field root)
        ...materials.map((m: any) => {
          const ma = m?.attributes || m || {};
          const updatedAtVal = ma.updatedAt || m?.updatedAt || null;
          const updatedAt = updatedAtVal ? new Date(updatedAtVal) : null;
          // Ambil slug subject (v4/v5) dan slug material
          const subjectRel = ma.subject || (m as any).subject;
          const subjectAttrs = subjectRel?.data ? (subjectRel?.data?.attributes || subjectRel?.data || {}) : (subjectRel?.attributes || subjectRel || {});
          const subjectSlug = subjectAttrs?.slug || (subjectRel as any)?.slug || '';
          const materialSlug = ma.slug || (m as any).slug || '';
          return {
            title: ma.title || ma.nama_materi || 'Materi Terbaru',
            description: ma.description || ma.deskripsi_materi || '-',
            date: updatedAt ? updatedAt.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '',
            sortDate: updatedAt ? updatedAt.getTime() : 0,
            href: subjectSlug && materialSlug ? `/subject/${subjectSlug}/${materialSlug}` : undefined,
          };
        }),
        // Sub-materials: dukung v4 (attributes.*) dan v5 (field root)
        ...subs.map((s: any) => {
          const sa = s?.attributes || s || {};
          const updatedAtVal = sa.updatedAt || s?.updatedAt || null;
          const updatedAt = updatedAtVal ? new Date(updatedAtVal) : null;
          const contentPreview = sa.content ? String(sa.content) : '';
          // Ambil slug material dan subject dari relasi material (v4/v5)
          const materialRel = sa.material || (s as any).material;
          const materialAttrs = materialRel?.data ? (materialRel?.data?.attributes || materialRel?.data || {}) : (materialRel?.attributes || materialRel || {});
          const materialSlug = materialAttrs?.slug || (materialRel as any)?.slug || '';
          const subjectRel2 = materialAttrs?.subject || (materialAttrs as any)?.subject;
          const subjectAttrs2 = subjectRel2?.data ? (subjectRel2?.data?.attributes || subjectRel2?.data || {}) : (subjectRel2?.attributes || subjectRel2 || {});
          const subjectSlug2 = subjectAttrs2?.slug || (subjectRel2 as any)?.slug || '';
          const subId = String((s as any)?.documentId || s?.id || '');
          return {
            title: sa.title || sa.nama_sub_materi || 'Sub-Materi Terbaru',
            description: contentPreview
              ? contentPreview.slice(0, 120) + (contentPreview.length > 120 ? '…' : '')
              : (sa.type ? `Materi tipe ${sa.type}` : '-'),
            date: updatedAt ? updatedAt.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '',
            sortDate: updatedAt ? updatedAt.getTime() : 0,
            href: (subjectSlug2 && materialSlug && subId) ? `/subject/${subjectSlug2}/${materialSlug}/sub/${subId}` : undefined,
          };
        }),
      ]
        .filter((i) => i.sortDate > 0)
        .sort((a, b) => b.sortDate - a.sortDate)
        .slice(0, 2);

      return normalized;
    },
    // Kurangi refetch yang dapat memicu abort saat perpindahan fokus/navigasi
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 neomorph flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-primary stroke-[2.5]" />
            </div>
            Info Terbaru dari Guru
          </h2>
        </div>
        {isLoading && (
          <p className="text-muted-foreground text-center">Memuat info terbaru...</p>
        )}
        {isError && (
          <p className="text-red-600 text-center">Gagal memuat info terbaru: {(error as Error)?.message}</p>
        )}
        {!isLoading && !isError && (data && data.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6">
            {(data || []).map((announcement, index) => (
              <div
                key={`${announcement.title}-${index}`}
                className="fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <LatestInfoCard
                  title={announcement.title}
                  description={announcement.description}
                  date={announcement.date}
                  to={announcement.href}
                />
              </div>
            ))}
          </div>
        )}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <p className="text-muted-foreground text-center">Belum ada pembaruan materi.</p>
        )}
      </div>
    </section>
  );
};

export default AnnouncementSection;
