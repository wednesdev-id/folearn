// Strapi service untuk Folearn
// Menggunakan env `VITE_STRAPI_URL` sebagai base URL (contoh: http://localhost:1337/api)

export type StrapiResponse<T> = {
  data: T;
  meta?: unknown;
};

// Tipe minimal agar kompatibel dengan komponen yang sudah ada
export type Subject = {
  id: number;
  // Strapi v5 menggunakan documentId sebagai identifier utama
  documentId?: string;
  // Strapi v4: data.attributes.*
  attributes?: {
    title?: string;
    description?: string;
    nama_mapel?: string;
    deskripsi?: string;
    longDescription?: string;
    icon?: string;
    color?: string;
    isOptional?: boolean;
    grade?: number;
    katergori_mapel?: string;
    kategori_mapel?: string;
    slug?: string;
    // Repeatable components
    tujuan_pembelajaran_item?: { isi_tujuan?: string }[] | { data?: { isi_tujuan?: string }[] };
    kompetensi_item?: { isi_kompetensi?: string; icn_kompetensi?: string }[] | { data?: { isi_kompetensi?: string; icn_kompetensi?: string }[] };
    // Alternatif nama di backend sesuai contoh JSON
    tujuan_pembelajaran?: { isi_tujuan?: string }[] | { data?: { isi_tujuan?: string }[] };
    kompetensi_yang_dikembangkan?: { isi_kompetensi?: string; icn_kompetensi?: string }[] | { data?: { isi_kompetensi?: string; icn_kompetensi?: string }[] };
    class?: {
      data?: {
        id: number;
        attributes?: { slug?: string };
      };
    };
    materials?: { data?: Material[] };
  }
  // Strapi v5: field langsung di root object
  title?: string;
  description?: string;
  nama_mapel?: string;
  deskripsi?: string;
  longDescription?: string;
  icon?: string;
  color?: string;
  isOptional?: boolean;
  grade?: number;
  katergori_mapel?: string;
  kategori_mapel?: string;
  slug?: string;
  tujuan_pembelajaran_item?: { isi_tujuan?: string }[] | { data?: { isi_tujuan?: string }[] };
  kompetensi_item?: { isi_kompetensi?: string; icn_kompetensi?: string }[] | { data?: { isi_kompetensi?: string; icn_kompetensi?: string }[] };
  // Alternatif nama di backend sesuai contoh JSON
  tujuan_pembelajaran?: { isi_tujuan?: string }[] | { data?: { isi_tujuan?: string }[] };
  kompetensi_yang_dikembangkan?: { isi_kompetensi?: string; icn_kompetensi?: string }[] | { data?: { isi_kompetensi?: string; icn_kompetensi?: string }[] };
  class?: any;
  materials?: Material[] | { data?: Material[] };
};

export type Material = {
  id: number;
  attributes?: {
    title?: string;
    description?: string;
    updatedAt?: string;
    slug?: string;
    nama_materi?: string;
    deskripsi_materi?: string;
    subject?: { data?: Subject };
    sub_materials?: { data?: SubMaterial[] };
  };
  // v5 langsung
  title?: string;
  description?: string;
  updatedAt?: string;
  slug?: string;
  nama_materi?: string;
  deskripsi_materi?: string;
  subject?: any;
  sub_materials?: SubMaterial[] | { data?: SubMaterial[] };
};

export type SubMaterial = {
  id: number;
  attributes?: {
    title?: string;
    type?: 'video' | 'reading' | string;
    duration?: number;
    difficulty?: 'mudah' | 'sedang' | 'sulit' | string;
    content?: string;
    nama_sub_materi?: string;
    deskripsi?: string;
    lampiran?: any;
    attachments?: any;
    video_link?: string;
    videoUrl?: string;
    link_video?: string;
  };
  // v5 langsung
  title?: string;
  type?: 'video' | 'reading' | string;
  duration?: number;
  difficulty?: 'mudah' | 'sedang' | 'sulit' | string;
  content?: string;
  nama_sub_materi?: string;
  deskripsi?: string;
  lampiran?: any;
  attachments?: any;
  video_link?: string;
  videoUrl?: string;
  link_video?: string;
};

// Minimal type untuk entity Class di Strapi
type ClassEntity = {
  id: number;
  attributes?: {
    nama_kelas?: string;
    slug?: string;
    subjects?: { data?: Subject[] } | Subject[];
  };
  // v5 langsung
  nama_kelas?: string;
  slug?: string;
  subjects?: Subject[] | { data?: Subject[] };
};

const RAW_BASE = (import.meta as any).env?.VITE_STRAPI_URL || (import.meta as any).env?.VITE_API_URL || "";
const BASE_URL = String(RAW_BASE).replace(/\/$/, "");
const API_BASE = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;
const STRAPI_TOKEN = (import.meta as any).env?.VITE_STRAPI_TOKEN || "";

function buildUrl(path: string, params?: Record<string, string | number | boolean>) {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_BASE}${safePath}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, String(v)));
  }
  return url.toString();
}

async function getJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {};
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// Mapping helper: konversi field kategori menjadi 'wajib' | 'pilihan'
function mapKategori(value?: string): 'wajib' | 'pilihan' {
  const v = (value || '').toLowerCase();
  if (v.includes('wajib')) return 'wajib';
  if (v.includes('pilih')) return 'pilihan';
  // default
  return 'wajib';
}

// Helper: membuat slug sederhana jika field slug tidak tersedia
function slugify(input: string): string {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// 1) Fetch subjects by kelas slug (kelas-7/kelas-8/kelas-9) atau fallback by class id
export async function fetchSubjectsByClassSlug(slugOrId: string): Promise<StrapiResponse<Subject[]>> {
  const knownSlugs = new Set(['kelas-7', 'kelas-8', 'kelas-9']);

  // Gunakan populate=* untuk membawa relasi yang diperlukan
  const basePath = '/subjects';
  let url: string;
  if (knownSlugs.has(slugOrId)) {
    url = buildUrl(basePath, {
      'filters[class][slug][$eq]': slugOrId,
      'populate': '*',
      'pagination[pageSize]': 100,
      'publicationState': 'live',
    });
  } else {
    // fallback: filter berdasarkan id class
    url = buildUrl(basePath, {
      'filters[class][id][$eq]': slugOrId,
      'populate': '*',
      'pagination[pageSize]': 100,
      'publicationState': 'live',
    });
  }
  const json = await getJson<StrapiResponse<Subject[]>>(url);
  return json;
}

// 1a) Smart fallback untuk halaman kelas: coba beberapa pola pencarian berdasarkan grade
function gradeSlugToHints(gradeSlug: 'kelas-7' | 'kelas-8' | 'kelas-9') {
  const map: Record<string, { slugHints: string[]; nameHints: string[]; numberHints: string[] }> = {
    'kelas-7': { slugHints: ['vii', '7', 'kelas-7'], nameHints: ['VII', 'Kelas 7', 'Tujuh'], numberHints: ['7'] },
    'kelas-8': { slugHints: ['viii', '8', 'kelas-8'], nameHints: ['VIII', 'Kelas 8', 'Delapan'], numberHints: ['8'] },
    'kelas-9': { slugHints: ['ix', '9', 'kelas-9'], nameHints: ['IX', 'Kelas 9', 'Sembilan'], numberHints: ['9'] },
  };
  return map[gradeSlug];
}

export async function fetchSubjectsSmartByGrade(gradeSlug: 'kelas-7' | 'kelas-8' | 'kelas-9'): Promise<StrapiResponse<Subject[]>> {
  // Langkah 1: coba langsung berdasarkan class.slug == gradeSlug
  try {
    const direct = await fetchSubjectsByClassSlug(gradeSlug);
    if (Array.isArray(direct?.data) && direct.data.length > 0) {
      return direct;
    }
  } catch (_) {
    // lanjut ke fallback
  }

  const hints = gradeSlugToHints(gradeSlug);
  const collectedSubjects: Record<number, Subject> = {};
  const collectedClassIds = new Set<number>();

  // Langkah 2: cari classes dengan slug mengandung hint (vii/viii/ix atau angka)
  for (const hint of hints.slugHints) {
    try {
      const urlClassesBySlug = buildUrl('/classes', {
        'filters[slug][$containsi]': hint,
        'populate': 'subjects',
        'publicationState': 'live',
        'pagination[pageSize]': 100,
      });
      const res = await getJson<StrapiResponse<ClassEntity[]>>(urlClassesBySlug);
      const list = Array.isArray(res.data) ? res.data : [];
      list.forEach((cls) => {
        if (cls?.id) collectedClassIds.add(cls.id);
        const a = getAttrs(cls);
        const subs = getArray<Subject>(a?.subjects ?? (cls as any)?.subjects);
        subs.forEach((s) => { if (s?.id) collectedSubjects[s.id] = s; });
      });
      if (Object.keys(collectedSubjects).length > 0) {
        return { data: Object.values(collectedSubjects) } as StrapiResponse<Subject[]>;
      }
    } catch (_) { /* lanjut */ }
  }

  // Langkah 3: cari classes dengan nama_kelas mengandung hint (VII/VIII/IX atau "Kelas X")
  for (const hint of [...hints.nameHints, ...hints.numberHints]) {
    try {
      const urlClassesByName = buildUrl('/classes', {
        'filters[nama_kelas][$containsi]': hint,
        'populate': 'subjects',
        'publicationState': 'live',
        'pagination[pageSize]': 100,
      });
      const res = await getJson<StrapiResponse<ClassEntity[]>>(urlClassesByName);
      const list = Array.isArray(res.data) ? res.data : [];
      list.forEach((cls) => {
        if (cls?.id) collectedClassIds.add(cls.id);
        const a = getAttrs(cls);
        const subs = getArray<Subject>(a?.subjects ?? (cls as any)?.subjects);
        subs.forEach((s) => { if (s?.id) collectedSubjects[s.id] = s; });
      });
      if (Object.keys(collectedSubjects).length > 0) {
        return { data: Object.values(collectedSubjects) } as StrapiResponse<Subject[]>;
      }
    } catch (_) { /* lanjut */ }
  }

  // Langkah 4: jika kita menemukan class IDs tetapi belum populate subjects, ambil subjects by class id(s)
  if (collectedClassIds.size > 0) {
    try {
      const ids = Array.from(collectedClassIds);
      const urlSubjectsByIds = buildUrl('/subjects', {
        'filters[class][id][$in]': ids.join(','),
        'populate': '*',
        'publicationState': 'live',
        'pagination[pageSize]': 100,
      });
      const res = await getJson<StrapiResponse<Subject[]>>(urlSubjectsByIds);
      return res;
    } catch (_) { /* lanjut */ }
  }

  // Terakhir: fallback ke query semua subjects lalu filter di client jika ada grade di attributes
  try {
    const urlAll = buildUrl('/subjects', {
      'populate': '*',
      'publicationState': 'live',
      'pagination[pageSize]': 100,
    });
    const res = await getJson<StrapiResponse<Subject[]>>(urlAll);
    const data = Array.isArray(res.data) ? res.data : [];
    // Filter pintar: coba beberapa kriteria (grade, slug hint, nama_mapel hint)
    const targetGradeNumber = gradeSlug === 'kelas-7' ? 7 : gradeSlug === 'kelas-8' ? 8 : 9;
    const hints = gradeSlugToHints(gradeSlug);
    const filtered = data.filter((s) => {
      const a = getAttrs(s);
      const gradeMatch = (a.grade as any) === targetGradeNumber;
      const slug = (a.slug || (s as any).slug || '').toLowerCase();
      const name = (a.nama_mapel || a.title || '').toLowerCase();
      const slugMatch = slug.includes(gradeSlug) || hints.slugHints.some((h) => slug.includes(String(h).toLowerCase()));
      const nameMatch = hints.nameHints.some((h) => name.includes(String(h).toLowerCase())) ||
                        hints.numberHints.some((h) => name.includes(String(h).toLowerCase()));
      return gradeMatch || slugMatch || nameMatch;
    });
    if (filtered.length > 0) {
      return { data: filtered } as StrapiResponse<Subject[]>;
    }
    // Kalau tetap kosong, kembalikan semua agar UI tetap tampil minimal
    return res;
  } catch (e) {
    // Jika semuanya gagal, kembalikan struktur kosong dengan meta kosong
    return { data: [] } as StrapiResponse<Subject[]>;
  }
}

// 2) Fetch subject detail by id dengan populate=*
export async function fetchSubjectById(id: string | number): Promise<StrapiResponse<Subject>> {
  const idStr = String(id);
  const isSlug = /[a-zA-Z\-_/]/.test(idStr) && isNaN(Number(idStr));
  if (isSlug) {
    // Prioritaskan pencarian via slug untuk menghindari 404 dari path
    const urlBySlug = buildUrl('/subjects', {
      'filters[slug][$eq]': idStr,
      'populate': '*',
      'publicationState': 'live',
      'pagination[pageSize]': 1,
    });
    const res = await getJson<StrapiResponse<Subject[]>>(urlBySlug);
    if (Array.isArray(res.data) && res.data.length > 0) {
      return { data: res.data[0] } as StrapiResponse<Subject>;
    }
    // fallback ke preview
    const urlBySlugPreview = buildUrl('/subjects', {
      'filters[slug][$eq]': idStr,
      'populate': '*',
      'publicationState': 'preview',
      'pagination[pageSize]': 1,
    });
    const resPrev = await getJson<StrapiResponse<Subject[]>>(urlBySlugPreview);
    if (Array.isArray(resPrev.data) && resPrev.data.length > 0) {
      return { data: resPrev.data[0] } as StrapiResponse<Subject>;
    }
    throw new Error(`Subject dengan slug '${idStr}' tidak ditemukan`);
  }

  // Coba akses langsung via path untuk id numeric atau documentId mentah
  try {
    const url = buildUrl(`/subjects/${idStr}`, { populate: '*', publicationState: 'live' });
    return await getJson<StrapiResponse<Subject>>(url);
  } catch (e) {
    // Fallback 1: preview
    try {
      const urlPreview = buildUrl(`/subjects/${idStr}`, { populate: '*', publicationState: 'preview' });
      return await getJson<StrapiResponse<Subject>>(urlPreview);
    } catch (_) {
      // Fallback 2: filter id atau documentId
      const urlFilter1 = buildUrl('/subjects', {
        'filters[id][$eq]': idStr,
        'populate': '*',
        'publicationState': 'live',
        'pagination[pageSize]': 1,
      });
      try {
        const res1 = await getJson<StrapiResponse<Subject[]>>(urlFilter1);
        if (Array.isArray(res1.data) && res1.data.length > 0) {
          return { data: res1.data[0] } as StrapiResponse<Subject>;
        }
      } catch (_) { /* lanjut */ }

      const urlFilter2 = buildUrl('/subjects', {
        'filters[documentId][$eq]': idStr,
        'populate': '*',
        'publicationState': 'preview',
        'pagination[pageSize]': 1,
      });
      const res2 = await getJson<StrapiResponse<Subject[]>>(urlFilter2);
      if (Array.isArray(res2.data) && res2.data.length > 0) {
        return { data: res2.data[0] } as StrapiResponse<Subject>;
      }

      throw e;
    }
  }
}

// 3) Fetch latest materials sorted by updatedAt:desc, default ambil 2
export async function fetchLatestMaterials(limit = 2): Promise<StrapiResponse<Material[]>> {
  const url = buildUrl('/materials', {
    'sort': 'updatedAt:desc',
    'pagination[pageSize]': limit,
    'populate': '*',
    'filters[publishedAt][$notNull]': true,
    'publicationState': 'live',
  });
  return getJson<StrapiResponse<Material[]>>(url);
}

export async function fetchLatestSubMaterials(limit = 2): Promise<StrapiResponse<SubMaterial[]>> {
  const url = buildUrl('/sub-materials', {
    'sort': 'updatedAt:desc',
    'pagination[pageSize]': limit,
    'populate': '*',
    'filters[publishedAt][$notNull]': true,
    'publicationState': 'live',
  });
  return getJson<StrapiResponse<SubMaterial[]>>(url);
}

// Auth: Register user ke Strapi (Users & Permissions)
export async function registerUser(payload: { username: string; email: string; password: string; nama?: string }) {
  const url = `${API_BASE}/auth/local/register`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Register gagal: ${res.status} ${errText}`);
  }
  return res.json();
}

// Update field nama pada user yang baru diregister
export async function updateUserNama(userId: number | string, jwt: string, nama: string) {
  const url = `${API_BASE}/users/${userId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ nama }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Update nama gagal: ${res.status} ${errText}`);
  }
  return res.json();
}

// Update profil user (nama, username, email) menggunakan JWT milik user
export async function updateUserProfile(
  userId: number | string,
  jwt: string,
  payload: { nama?: string; username?: string; email?: string }
) {
  const url = `${API_BASE}/users/${userId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Update profil gagal: ${res.status} ${errText}`);
  }
  return res.json();
}

// Ganti password dengan memverifikasi password saat ini
export async function changePassword(
  jwt: string,
  payload: { currentPassword: string; password: string; passwordConfirmation: string }
) {
  const url = `${API_BASE}/auth/change-password`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Ganti password gagal: ${res.status} ${errText}`);
  }
  return res.json();
}

// Auth: Login user ke Strapi (Users & Permissions)
export async function loginUser(payload: { identifier: string; password: string }) {
  const url = `${API_BASE}/auth/local`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Login gagal: ${res.status} ${errText}`);
  }
  return res.json();
}

// 3a) Fetch material berdasarkan subject slug dan material slug
export async function fetchMaterialBySlug(subjectSlug: string, materialSlug: string): Promise<StrapiResponse<Material>> {
  // Coba mode live dulu
  const urlLive = buildUrl('/materials', {
    'filters[subject][slug][$eq]': subjectSlug,
    'filters[slug][$eq]': materialSlug,
    'populate': '*',
    'publicationState': 'live',
    'pagination[pageSize]': 1,
  });
  const resLive = await getJson<StrapiResponse<Material[]>>(urlLive);
  if (Array.isArray(resLive.data) && resLive.data.length > 0) {
    return { data: resLive.data[0] } as StrapiResponse<Material>;
  }

  // Fallback ke preview
  const urlPreview = buildUrl('/materials', {
    'filters[subject][slug][$eq]': subjectSlug,
    'filters[slug][$eq]': materialSlug,
    'populate': '*',
    'publicationState': 'preview',
    'pagination[pageSize]': 1,
  });
  const resPrev = await getJson<StrapiResponse<Material[]>>(urlPreview);
  if (Array.isArray(resPrev.data) && resPrev.data.length > 0) {
    return { data: resPrev.data[0] } as StrapiResponse<Material>;
  }

  throw new Error(`Material dengan slug '${materialSlug}' pada subject '${subjectSlug}' tidak ditemukan`);
}

// 3b) Adapter detail material dengan daftar sub-materi
export function toMaterialDetail(material: Material) {
  const m = material;
  const a = getAttrs(m);
  const subs = getArray<SubMaterial>(a.sub_materials ?? (m as any).sub_materials);
  const subjectRel = a.subject ?? (m as any).subject;
  const subjectAttrs = subjectRel?.data ? getAttrs(subjectRel.data) : getAttrs(subjectRel);
  const subjectSlug = (subjectAttrs?.slug as string) || (subjectRel as any)?.slug || '';

  return {
    id: String(m.id),
    slug: a.slug || (m as any).slug || slugify(a.title || a.nama_materi || ''),
    title: a.title || a.nama_materi || 'Tanpa Judul',
    description: a.description || a.deskripsi_materi || '',
    subjectSlug,
    subMaterials: subs.map((s) => {
      const sa = getAttrs(s);
      const rawFiles = getArray<any>(sa.lampiran ?? (s as any).lampiran ?? sa.attachments ?? (s as any).attachments);
      const files = rawFiles.map((f) => {
        const fa = getAttrs(f);
        const rawUrl = String(fa.url || (f as any).url || '');
        const toFull = (u?: string) => {
          if (!u) return '';
          const hostBase = BASE_URL.endsWith('/api') ? BASE_URL.replace(/\/api$/, '') : BASE_URL;
          return u.startsWith('http') ? u : (hostBase ? `${hostBase}${u}` : u);
        };
        const fullUrl = toFull(rawUrl);
        const name = (fa.name as string) || (f as any).name || 'Lampiran';
        const mime = (fa.mime as string) || (f as any).mime || '';
        const ext = (fa.ext as string) || (f as any).ext || '';
        const size = (fa.size as number) || (f as any).size || 0;
        const typeGroup = String(mime).split('/')[0];
        const kind: 'image' | 'audio' | 'video' | 'file' =
          typeGroup === 'image' ? 'image' : typeGroup === 'audio' ? 'audio' : typeGroup === 'video' ? 'video' : 'file';
        const thumbRaw = (fa.formats as any)?.thumbnail?.url;
        const thumbnailUrl = thumbRaw ? toFull(thumbRaw) : (kind === 'image' ? fullUrl : '');
        return { name, url: rawUrl, fullUrl, mime, ext, size, kind, thumbnailUrl };
      });
      const videoLink = (sa.video_link as string) || (sa.videoUrl as string) || (sa.link_video as string) || '';
      // Ambil urutan jika tersedia di berbagai kemungkinan nama field
      const order = (sa as any).no_urut ?? (sa as any).noUrut ?? (sa as any).order ?? 0;
      return {
        id: String(s.id),
        documentId: (s as any).documentId,
        title: sa.title || (sa.nama_sub_materi as any) || 'Materi',
        description: (sa.deskripsi as any) || '',
        content: (sa.content as any) ?? (sa.konten as any) ?? '',
        type: (sa.type as any) || (sa.tipe as any) || 'reading',
        duration: sa.duration || (sa.durasi as any) || 0,
        lampiran: files,
        videoLink,
        order,
        no_urut: order,
      };
    }),
  };

}

export async function fetchAttachmentsForSub(docId: string) {
  const url = `${API_BASE}/upload/files?filters[related][documentId][$eq]=${docId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN || ""}`
    }
  });

  if (!res.ok) throw new Error("Failed to load attachments");
  const json = await res.json();
  const items = Array.isArray(json) ? json : [];
  const hostBase = BASE_URL.endsWith('/api') ? BASE_URL.replace(/\/api$/, '') : BASE_URL;
  const toFull = (u?: string) => {
    if (!u) return '';
    const s = String(u);
    return s.startsWith('http') ? s : (hostBase ? `${hostBase}${s}` : s);
  };
  return items.map((f: any) => {
    const rawUrl = String(f?.url || '');
    const fullUrl = toFull(rawUrl);
    const name = (f?.name as string) || 'Lampiran';
    const mime = (f?.mime as string) || '';
    const ext = (f?.ext as string) || '';
    const size = (f?.size as number) || 0;
    const typeGroup = String(mime).split('/')[0];
    const kind: 'image' | 'audio' | 'video' | 'file' =
      typeGroup === 'image' ? 'image' : typeGroup === 'audio' ? 'audio' : typeGroup === 'video' ? 'video' : 'file';
    const thumbRaw = (f?.formats as any)?.thumbnail?.url;
    const thumbnailUrl = thumbRaw ? toFull(thumbRaw) : (kind === 'image' ? fullUrl : '');
    return { name, url: rawUrl, fullUrl, mime, ext, size, kind, thumbnailUrl };
  });
}

// Ambil sub-material by documentId lalu normalisasi lampiran ke bentuk dengan fullUrl
export async function fetchSubMaterialAttachments(docId: string) {
  const url = `${API_BASE}/sub-materials/${docId}?populate=*`;
  const res = await getJson<any>(url);
  const sub = (res?.data ?? res) as any;
  const a = sub?.attributes ?? sub;
  const rawFiles = Array.isArray(a?.lampiran)
    ? a.lampiran
    : (Array.isArray(a?.lampiran?.data) ? a.lampiran.data : []);
  const hostBase = BASE_URL.endsWith('/api') ? BASE_URL.replace(/\/api$/, '') : BASE_URL;
  const toFull = (u?: string) => {
    if (!u) return '';
    const s = String(u);
    return s.startsWith('http') ? s : (hostBase ? `${hostBase}${s}` : s);
  };
  return rawFiles.map((f: any) => {
    const fa = f?.attributes ?? f;
    const rawUrl = String(fa?.url || '');
    const fullUrl = toFull(rawUrl);
    const name = (fa?.name as string) || 'Lampiran';
    const mime = (fa?.mime as string) || '';
    const ext = (fa?.ext as string) || '';
    const size = (fa?.size as number) || 0;
    const typeGroup = String(mime).split('/')[0];
    const kind: 'image' | 'audio' | 'video' | 'file' =
      typeGroup === 'image' ? 'image' : typeGroup === 'audio' ? 'audio' : typeGroup === 'video' ? 'video' : 'file';
    const thumbRaw = (fa?.formats as any)?.thumbnail?.url;
    const thumbnailUrl = thumbRaw ? toFull(thumbRaw) : (kind === 'image' ? fullUrl : '');
    return { name, url: rawUrl, fullUrl, mime, ext, size, kind, thumbnailUrl };
  });
}

// Adapter ke bentuk yang dipakai komponen existing
export function toSubjectCardProps(subject: Subject) {
  const a = getAttrs(subject);
  return {
    // Gunakan documentId jika tersedia (Strapi v5), fallback ke id numeric
    id: (subject as any).documentId ?? subject.id,
    slug: a.slug || (subject as any).slug,
    title: a.title || a.nama_mapel || 'Tanpa Judul',
    description: a.description || a.deskripsi || '—',
    icon: a.icon || 'book',
    color: a.color || 'text-primary',
    isOptional: Boolean(a.isOptional),
    category: mapKategori(a.katergori_mapel || a.kategori_mapel),
  };
}

// Adapter subject detail -> chapters (materials) dan lessons (sub_materials)
export function toSubjectDetail(subject: Subject) {
  const a = getAttrs(subject);
  // Ambil class relation dan slug-nya (mendukung v4: data.attributes.slug dan v5: class.slug)
  const classRel = (a as any).class ?? (subject as any).class;
  let classSlug = '';
  if (classRel) {
    const ca = getAttrs(classRel);
    classSlug = (ca?.slug as string) || (classRel as any)?.slug || '';
    if (!classSlug && (classRel as any)?.data) {
      const da = getAttrs((classRel as any).data);
      classSlug = (da?.slug as string) || ((classRel as any).data?.attributes?.slug as string) || '';
    }
  }
  const materials = getArray<Material>(a.materials ?? (subject as any).materials);
  const chapters = materials.map((m) => {
    const ma = getAttrs(m);
    const subs = getArray<SubMaterial>(ma.sub_materials ?? (m as any).sub_materials);
    return {
      id: String(m.id),
      title: ma.title || ma.nama_materi || 'Bab',
      slug: ma.slug || (m as any).slug || slugify(ma.title || ma.nama_materi || ''),
      description: ma.description || ma.deskripsi_materi || '',
      duration: '',
      lessons: subs.map((s) => {
        const sa = getAttrs(s);
        return {
          id: String(s.id),
          title: sa.title || (sa.nama_sub_materi as any) || 'Materi',
          type: (sa.type as any) || (sa.tipe as any) || 'reading',
          duration: sa.duration || (sa.durasi as any) || 0,
          content: sa.content ?? (sa.konten as any),
          description: (sa.deskripsi as any) || '',
          difficulty: (sa.difficulty as any) || (sa.kesulitan as any) || 'mudah',
        };
      }),
      exercises: [],
    };
  });

  return {
    id: String((subject as any).documentId ?? subject.id),
    slug: a.slug || (subject as any).slug || '',
    classSlug,
    title: a.title || a.nama_mapel || 'Tanpa Judul',
    description: a.description || a.deskripsi || '',
    longDescription: a.longDescription || a.deskripsi || a.description || '',
    icon: a.icon || 'book',
    color: a.color || 'text-primary',
    isOptional: Boolean(a.isOptional),
    // Jika grade tidak tersedia, turunkan dari classSlug
    grade: (a.grade as any) || (classSlug.includes('kelas-8') ? 8 : classSlug.includes('kelas-9') ? 9 : classSlug.includes('kelas-7') ? 7 : 7),
    category: mapKategori(a.katergori_mapel || a.kategori_mapel),
    chapters,
    // Repeatable components mapping (mendukung dua penamaan berdasarkan backend)
    learningObjectives: (
      getArray<{ isi_tujuan?: string }>(a.tujuan_pembelajaran ?? (subject as any).tujuan_pembelajaran)
        .map((t) => (t?.isi_tujuan || '').trim()).filter(Boolean)
      .length
        ? getArray<{ isi_tujuan?: string }>(a.tujuan_pembelajaran ?? (subject as any).tujuan_pembelajaran)
            .map((t) => (t?.isi_tujuan || '').trim()).filter(Boolean)
        : getArray<{ isi_tujuan?: string }>(a.tujuan_pembelajaran_item ?? (subject as any).tujuan_pembelajaran_item)
            .map((t) => (t?.isi_tujuan || '').trim()).filter(Boolean)
    ),
    skills: (
      getArray<{ isi_kompetensi?: string; icn_kompetensi?: string }>(a.kompetensi_yang_dikembangkan ?? (subject as any).kompetensi_yang_dikembangkan)
        .map((k) => (k?.isi_kompetensi || '').trim()).filter(Boolean)
      .length
        ? getArray<{ isi_kompetensi?: string; icn_kompetensi?: string }>(a.kompetensi_yang_dikembangkan ?? (subject as any).kompetensi_yang_dikembangkan)
            .map((k) => (k?.isi_kompetensi || '').trim()).filter(Boolean)
        : getArray<{ isi_kompetensi?: string; icn_kompetensi?: string }>(a.kompetensi_item ?? (subject as any).kompetensi_item)
            .map((k) => (k?.isi_kompetensi || '').trim()).filter(Boolean)
    ),
    skillsWithIcon: (
      getArray<{ isi_kompetensi?: string; icn_kompetensi?: string }>(a.kompetensi_yang_dikembangkan ?? (subject as any).kompetensi_yang_dikembangkan)
        .map((k) => ({ text: (k?.isi_kompetensi || '').trim(), icon: (k?.icn_kompetensi || '').trim() }))
        .filter((k) => Boolean(k.text))
      .length
        ? getArray<{ isi_kompetensi?: string; icn_kompetensi?: string }>(a.kompetensi_yang_dikembangkan ?? (subject as any).kompetensi_yang_dikembangkan)
            .map((k) => ({ text: (k?.isi_kompetensi || '').trim(), icon: (k?.icn_kompetensi || '').trim() }))
            .filter((k) => Boolean(k.text))
        : getArray<{ isi_kompetensi?: string; icn_kompetensi?: string }>(a.kompetensi_item ?? (subject as any).kompetensi_item)
            .map((k) => ({ text: (k?.isi_kompetensi || '').trim(), icon: (k?.icn_kompetensi || '').trim() }))
            .filter((k) => Boolean(k.text))
    ),
    assessmentMethods: [],
    resources: [],
  };
}
// Helper untuk mengambil attributes yang kompatibel v4/v5
function getAttrs<T extends { attributes?: any }>(obj: T | undefined): any {
  if (!obj) return {};
  const a = (obj as any).attributes ?? obj;
  return a || {};
}

// Helper untuk mengambil array dari bentuk data/data[].
function getArray<T = any>(maybe: any): T[] {
  if (!maybe) return [];
  if (Array.isArray(maybe)) return maybe as T[];
  if (Array.isArray(maybe?.data)) return maybe.data as T[];
  return [] as T[];
}