// Data mata pelajaran untuk platform edukasi Folearn
// Struktur data untuk setiap mata pelajaran

export interface SubjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  isOptional?: boolean;
  grade: 7 | 8 | 9;
  category: 'wajib' | 'pilihan';
  chapters: Chapter[];
  learningObjectives: string[];
  skills: string[];
  assessmentMethods: string[];
  resources: Resource[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string; // dalam jam
  lessons: Lesson[];
  exercises: Exercise[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading';
  duration: number; // dalam menit
  content?: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
}

export interface Exercise {
  id: string;
  title: string;
  type: 'multiple-choice' | 'essay' | 'practical' | 'project';
  questions: number;
  duration: number; // dalam menit
  points: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'interactive' | 'website' | 'book';
  url: string;
  description: string;
}

// Data untuk Kelas 7
export const kelas7Subjects: SubjectDetail[] = [
  {
    id: 'pa-bp-k7',
    title: 'Pendidikan Agama dan Budi Pekerti',
    description: 'Membentuk karakter berlandaskan nilai-nilai agama dan budi pekerti luhur.',
    longDescription: 'Mata pelajaran ini bertujuan membentuk karakter peserta didik yang berlandaskan nilai-nilai agama dan budi pekerti luhur, serta mengembangkan kesadaran spiritual dan social.',
    icon: 'heart',
    color: 'text-red-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Memahami konsep ketuhanan sesuai agama masing-masing',
      'Mengamalkan nilai-nilai keagamaan dalam kehidupan sehari-hari',
      'Mengembangkan sikap toleransi antarumat beragama',
      'Menunjukkan perilaku terpuji dalam interaksi sosial'
    ],
    skills: ['Spiritual', 'Social', 'Emotional Intelligence', 'Character Building'],
    assessmentMethods: ['Observasi perilaku', 'Portofolio amalan', 'Tes tertulis', 'Presentasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pengenalan Nilai-Nilai Agama',
        description: 'Memahami dasar-dasar ajaran agama',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Konsep Ketuhanan',
            type: 'video',
            duration: 20,
            difficulty: 'mudah'
          },
          {
            id: 'ls2',
            title: 'Kitab Suci dan Isi Kandungannya',
            type: 'reading',
            duration: 30,
            difficulty: 'mudah'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            title: 'Quiz Nilai-Nilai Keagamaan',
            type: 'multiple-choice',
            questions: 10,
            duration: 15,
            points: 100
          }
        ]
      }
    ],
    resources: [
      {
        id: 'res1',
        title: 'E-Modul Agama Kelas 7',
        type: 'pdf',
        url: '#',
        description: 'Modul pembelajaran lengkap untuk semester 1'
      }
    ]
  },
  {
    id: 'pp-k7',
    title: 'Pendidikan Pancasila',
    description: 'Mempelajari dan mengamalkan nilai-nilai Pancasila dalam kehidupan sehari-hari.',
    longDescription: 'Mata pelajaran ini membantu peserta didik memahami, menghayati, dan mengamalkan nilai-nilai Pancasila sebagai ideologi negara dan dasar kehidupan bermasyarakat.',
    icon: 'brain',
    color: 'text-blue-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Memahami sila-sila Pancasila',
      'Mengidentifikasi penerapan Pancasila dalam kehidupan',
      'Mengembangkan sikap nasionalisme',
      'Menunjukkan perilaku gotong royong'
    ],
    skills: ['Civic Education', 'National Values', 'Social Responsibility', 'Critical Thinking'],
    assessmentMethods: ['Diskusi kelompok', 'Essay', 'Simulasi', 'Portofolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pancasila sebagai Ideologi Terbuka',
        description: 'Memahami hakikat Pancasila',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Sejarah Perumusan Pancasila',
            type: 'video',
            duration: 25,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'bi-k7',
    title: 'Bahasa Indonesia',
    description: 'Meningkatkan kemampuan berbahasa Indonesia yang baik dan benar.',
    longDescription: 'Membantu peserta didik menguasai kompetensi berbahasa Indonesia secara lisan dan tulisan untuk berkomunikasi secara efektif.',
    icon: 'book',
    color: 'text-green-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Menggunakan bahasa Indonesia dalam berkomunikasi',
      'Memahami berbagai teks tulis',
      'Menghasilkan karya tulis sederhana',
      'Menghargai karya sastra Indonesia'
    ],
    skills: ['Reading Comprehension', 'Writing', 'Speaking', 'Listening', 'Literature Analysis'],
    assessmentMethods: ['Tes membaca', 'Menulis esai', 'Presentasi lisan', 'Portofolio tulisan'],
    chapters: [
      {
        id: 'ch1',
        title: 'Teks Deskripsi',
        description: 'Membaca dan menulis teks deskripsi',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Pengertian dan Ciri Teks Deskripsi',
            type: 'video',
            duration: 30,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'mtk-k7',
    title: 'Matematika',
    description: 'Mempelajari konsep matematika dasar dan problem solving.',
    longDescription: 'Membangun pemahaman konsep matematika dasar dan kemampuan berpikir logis untuk menyelesaikan masalah sehari-hari.',
    icon: 'calculator',
    color: 'text-purple-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Memahami operasi hitung bilangan',
      'Menyelesaikan masalah aritmetika',
      'Mengenal konsep aljabar dasar',
      'Memahami geometri dasar'
    ],
    skills: ['Logical Thinking', 'Problem Solving', 'Numerical Analysis', 'Abstract Reasoning'],
    assessmentMethods: ['Tes hitungan', 'Problem solving', 'Portofolio', 'Presentasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Bilangan Bulat dan Pecahan',
        description: 'Operasi hitung bilangan',
        duration: '6 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Operasi Penjumlahan dan Pengurangan',
            type: 'video',
            duration: 25,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'ipa-k7',
    title: 'Ilmu Pengetahuan Alam (IPA)',
    description: 'Eksplorasi dunia sains alam melalui eksperimen dan observasi.',
    longDescription: 'Memperkenalkan konsep dasar ilmu pengetahuan alam dan metode ilmiah untuk memahami fenomena alam.',
    icon: 'microscope',
    color: 'text-teal-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Memahami metode ilmiah',
      'Mengidentifikasi karakteristik makhluk hidup',
      'Memahami sistem organ tubuh manusia',
      'Mengenal materi dan perubahannya'
    ],
    skills: ['Scientific Method', 'Observation', 'Experimentation', 'Data Analysis'],
    assessmentMethods: ['Laporan praktikum', 'Tes konsep', 'Presentasi', 'Portofolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Klasifikasi Makhluk Hidup',
        description: 'Mengelompokkan makhluk hidup',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Pengamatan Ciri-Ciri Makhluk Hidup',
            type: 'reading',
            duration: 40,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'ips-k7',
    title: 'Ilmu Pengetahuan Sosial (IPS)',
    description: 'Memahami masyarakat, sejarah, dan lingkungan sosial.',
    longDescription: 'Membantu peserta didik memahami konsep dasar kemasyarakatan, sejarah, dan geografi dalam kehidupan sosial.',
    icon: 'globe',
    color: 'text-orange-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Memahami konsep ruang dan interaksi sosial',
      'Mengenal sejarah Indonesia kuno',
      'Memahami bentang alam Indonesia',
      'Mengidentifikasi aktivitas ekonomi'
    ],
    skills: ['Social Analysis', 'Historical Thinking', 'Geographical Awareness', 'Economic Literacy'],
    assessmentMethods: ['Essay', 'Peta konsep', 'Presentasi', 'Portofolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Manusia Sebagai Makhluk Sosial',
        description: 'Pengenalan konsep sosial',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Interaksi Sosial dan Lembaga Sosial',
            type: 'video',
            duration: 35,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'bing-k7',
    title: 'Bahasa Inggris',
    description: 'Mengembangkan kemampuan berkomunikasi dalam bahasa Inggris.',
    longDescription: 'Membangun kompetensi berkomunikasi dalam bahasa Inggris untuk berinteraksi dalam konteks global.',
    icon: 'languages',
    color: 'text-indigo-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Menggunakan ungkapan sapaan dasar',
      'Memahami teks fungsional pendek',
      'Menghasilkan teks deskriptif sederhana',
      'Memahami percakapan sederhana'
    ],
    skills: ['English Communication', 'Vocabulary Building', 'Grammar', 'Pronunciation'],
    assessmentMethods: ['Listening test', 'Speaking test', 'Writing test', 'Reading comprehension'],
    chapters: [
      {
        id: 'ch1',
        title: 'Greetings and Introductions',
        description: 'Percakapan perkenalan dasar',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Meeting New People',
            type: 'video',
            duration: 30,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'info-k7',
    title: 'Informatika',
    description: 'Belajar dasar-dasar komputer, coding, dan teknologi digital.',
    longDescription: 'Memperkenalkan dasar-dasar teknologi informasi dan komunikasi untuk mendukung pembelajaran di era digital.',
    icon: 'monitor',
    color: 'text-cyan-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Memahami komponen komputer',
      'Menggunakan software dasar',
      'Mengenal konsep internet',
      'Belajar logika pemrograman dasar'
    ],
    skills: ['Digital Literacy', 'Computer Operation', 'Internet Skills', 'Programming Logic'],
    assessmentMethods: ['Praktik komputer', 'Project', 'Quiz', 'Portofolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pengenalan Komputer',
        description: 'Hardware dan software dasar',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Komponen Hardware Komputer',
            type: 'video',
            duration: 25,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'pjok-k7',
    title: 'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    description: 'Mengembangkan kebugaran fisik dan gaya hidup sehat.',
    longDescription: 'Membangun kebugaran fisik, keterampilan olahraga, dan pemahaman gaya hidup sehat untuk kesehatan optimal.',
    icon: 'dumbbell',
    color: 'text-emerald-500',
    grade: 7,
    category: 'wajib',
    learningObjectives: [
      'Mengembangkan kebugaran fisik',
      'Menguasai gerak dasar olahraga',
      'Memahami kesehatan pribadi',
      'Menunjukkan sportivitas'
    ],
    skills: ['Physical Fitness', 'Motor Skills', 'Health Awareness', 'Teamwork'],
    assessmentMethods: ['Performa fisik', 'Tes praktik', 'Portofolio', 'Observasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Permainan Bola Basket',
        description: 'Teknik dasar basket',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Teknik Dribbling dan Passing',
            type: 'reading',
            duration: 40,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'sb-k7',
    title: 'Seni Budaya dan Prakarya',
    description: 'Mengembangkan kreativitas melalui seni, musik, dan keterampilan tangan.',
    longDescription: 'Membina apresiasi terhadap seni dan mengembangkan keterampilan praktis melalui berbagai kegiatan kreatif.',
    icon: 'palette',
    color: 'text-pink-500',
    grade: 7,
    category: 'pilihan',
    isOptional: true,
    learningObjectives: [
      'Mengapresiasi karya seni',
      'Menciptakan karya seni sederhana',
      'Mengembangkan kreativitas',
      'Memahami keragaman budaya'
    ],
    skills: ['Creativity', 'Artistic Expression', 'Craft Skills', 'Cultural Awareness'],
    assessmentMethods: ['Portofolio karya', 'Presentasi', 'Demonstrasi', 'Essay'],
    chapters: [
      {
        id: 'ch1',
        title: 'Seni Rupa dan Kriya',
        description: 'Menggambar dan membuat kerajinan',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Teknik Menggambar Dasar',
            type: 'reading',
            duration: 45,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'mulok-k7',
    title: 'Muatan Lokal',
    description: 'Mempelajari kearifan lokal dan budaya daerah masing-masing.',
    longDescription: 'Mengenal dan melestarikan kearifan lokal serta potensi budaya daerah sebagai bagian dari identitas bangsa.',
    icon: 'users',
    color: 'text-yellow-600',
    grade: 7,
    category: 'pilihan',
    isOptional: true,
    learningObjectives: [
      'Memahami budaya lokal',
      'Mengenal bahasa daerah',
      'Mengapresiasi tradisi setempat',
      'Mengembangkan kepedulian sosial'
    ],
    skills: ['Cultural Literacy', 'Local Language', 'Traditional Arts', 'Community Values'],
    assessmentMethods: ['Presentasi budaya', 'Portofolio', 'Partisipasi', 'Essay'],
    chapters: [
      {
        id: 'ch1',
        title: 'Kebudayaan Daerah Setempat',
        description: 'Pengenalan kebudayaan lokal',
        duration: '2 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Sejarah dan Tradisi Lokal',
            type: 'video',
            duration: 30,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  }
];

// Data untuk Kelas 8
export const kelas8Subjects: SubjectDetail[] = [
  {
    id: 'pa-bp-k8',
    title: 'Pendidikan Agama dan Budi Pekerti',
    description: 'Memperdalam pemahaman nilai-nilai agama dan implementasi dalam kehidupan.',
    longDescription: 'Mendalami pemahaman nilai-nilai agama dan implementasinya dalam kehidupan sehari-hari dengan tingkat kesulitan menengah.',
    icon: 'heart',
    color: 'text-red-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Memperdalam pemahaman ajaran agama',
      'Menganalisis nilai-nilai keagamaan',
      'Mengimplementasikan ibadah sesuai syariat',
      'Mengembangkan sikap toleransi'
    ],
    skills: ['Deep Spiritual Understanding', 'Religious Practice', 'Tolerance', 'Character Development'],
    assessmentMethods: ['Essay reflektif', 'Presentasi', 'Observasi', 'Portofolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Peningkatan Iman dan Taqwa',
        description: 'Mendalami konsep keimanan',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Implementasi Nilai-Nilai Agama Modern',
            type: 'video',
            duration: 25,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'pp-k8',
    title: 'Pendidikan Pancasila',
    description: 'Menganalisis nilai-nilai Pancasila dan penerapannya di masyarakat.',
    longDescription: 'Menganalisis penerapan nilai-nilai Pancasila dalam konteks masyarakat modern Indonesia.',
    icon: 'brain',
    color: 'text-blue-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Menganalisis implementasi Pancasila',
      'Mengkaji demokrasi Pancasila',
      'Memahami HAM dan kewajiban',
      'Mengembangkan civic responsibility'
    ],
    skills: ['Political Analysis', 'Democratic Values', 'Human Rights', 'Social Justice'],
    assessmentMethods: ['Debat', 'Essay analisis', 'Simulasi', 'Research project'],
    chapters: [
      {
        id: 'ch1',
        title: 'Demokrasi Pancasila',
        description: 'Implementasi demokrasi',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Sistem Demokrasi Indonesia',
            type: 'video',
            duration: 30,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'bi-k8',
    title: 'Bahasa Indonesia',
    description: 'Mengembangkan kemampuan berbahasa Indonesia tingkat menengah.',
    longDescription: 'Meningkatkan kompetensi berbahasa Indonesia dengan fokus pada teks kompleks dan kajian sastra.',
    icon: 'book',
    color: 'text-green-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Menganalisis teks eksposisi',
      'Membuat teks persuasif',
      'Memahami kajian sastra',
      'Mengembangkan retorika'
    ],
    skills: ['Text Analysis', 'Persuasive Writing', 'Literary Criticism', 'Public Speaking'],
    assessmentMethods: ['Essay analisis', 'Debat', 'Portofolio tulisan', 'Presentasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Teks Eksposisi',
        description: 'Analisis teks eksposisi',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Struktur dan Kaidah Teks Eksposisi',
            type: 'video',
            duration: 35,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'mtk-k8',
    title: 'Matematika',
    description: 'Mempelajari konsep matematika tingkat lanjut dan aplikasinya.',
    longDescription: 'Mengembangkan pemahaman matematika tingkat lanjut dengan aplikasi dalam pemecahan masalah kompleks.',
    icon: 'calculator',
    color: 'text-purple-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Menguasai operasi aljabar',
      'Memahami sistem persamaan',
      'Mengenal geometri transformasi',
      'Menyelesaikan masalah statistika'
    ],
    skills: ['Algebraic Thinking', 'Problem Solving', 'Geometric Reasoning', 'Statistical Analysis'],
    assessmentMethods: ['Problem solving', 'Tes konsep', 'Project', 'Portofolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Sistem Persamaan Linear Dua Variabel',
        description: 'SPLDV dan aplikasinya',
        duration: '6 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Metode Substitusi dan Eliminasi',
            type: 'video',
            duration: 30,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'ipa-k8',
    title: 'Ilmu Pengetahuan Alam (IPA)',
    description: 'Memperdalam konsep sains alam dengan analisis dan eksperimen.',
    longDescription: 'Memperdalam pemahaman konsep IPA dengan fokus pada analisis kuantitatif dan eksperimen ilmiah.',
    icon: 'microscope',
    color: 'text-teal-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Memahami sistem gerak manusia',
      'Menganalisis gaya dan tekanan',
      'Memahami ekosistem',
      'Mengenal sifat zat kimia'
    ],
    skills: ['Scientific Analysis', 'Experimental Design', 'Data Interpretation', 'Laboratory Skills'],
    assessmentMethods: ['Laporan praktikum', 'Tes kuantitatif', 'Project ilmiah', 'Presentasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Sistem Gerak pada Manusia',
        description: 'Tulang, otot, dan persendian',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Struktur dan Fungsi Sistem Otot',
            type: 'video',
            duration: 40,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'ips-k8',
    title: 'Ilmu Pengetahuan Sosial (IPS)',
    description: 'Mempelajari struktur sosial, ekonomi, dan politik masyarakat.',
    longDescription: 'Memahami konsep ekonomi, struktur politik, dan dinamika sosial dalam masyarakat Indonesia.',
    icon: 'globe',
    color: 'text-orange-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Memahami konsep ekonomi sederhana',
      'Menganalisis struktur pemerintahan',
      'Memahami interaksi global',
      'Mengidentifikasi masalah sosial'
    ],
    skills: ['Economic Literacy', 'Political Systems', 'Global Awareness', 'Social Analysis'],
    assessmentMethods: ['Essay analisis', 'Presentasi', 'Project', 'Debat'],
    chapters: [
      {
        id: 'ch1',
        title: 'Kegiatan Ekonomi Masyarakat',
        description: 'Pengenalan konsep ekonomi',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Permintaan, Penawaran, dan Harga',
            type: 'video',
            duration: 35,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'bing-k8',
    title: 'Bahasa Inggris',
    description: 'Meningkatkan kemampuan komunikasi dan tata bahasa Inggris.',
    longDescription: 'Meningkatkan kompetensi berbahasa Inggris dengan fokus pada grammar dan percakapan kompleks.',
    icon: 'languages',
    color: 'text-indigo-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Meningkatkan kemampuan listening',
      'Menguasai tata bahasa lanjutan',
      'Membuat teks naratif',
      'Berpartisipasi dalam diskusi'
    ],
    skills: ['Advanced Grammar', 'Conversation Skills', 'Text Composition', 'Comprehension'],
    assessmentMethods: ['Grammar test', 'Speaking assessment', 'Writing portfolio', 'Reading comprehension'],
    chapters: [
      {
        id: 'ch1',
        title: 'Expressing Intention and Narrative Text',
        description: 'Percakapan dan teks naratif',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Simple Future Tense and Narrative Structure',
            type: 'video',
            duration: 30,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'info-k8',
    title: 'Informatika',
    description: 'Belajar pemrograman dasar, algoritma, dan teknologi web.',
    longDescription: 'Memperkenalkan konsep pemrograman, algoritma, dan pengembangan web modern.',
    icon: 'monitor',
    color: 'text-cyan-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Memahami algoritma pemrograman',
      'Membuat program sederhana',
      'Mengembangkan web dasar',
      'Menganalisis data digital'
    ],
    skills: ['Algorithmic Thinking', 'Programming Basics', 'Web Development', 'Data Management'],
    assessmentMethods: ['Coding project', 'Algorithm quiz', 'Web portfolio', 'Practical exam'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pemrograman Web dan Algoritma',
        description: 'HTML, CSS, dan JavaScript dasar',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'HTML dan CSS Structure',
            type: 'video',
            duration: 40,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'pjok-k8',
    title: 'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    description: 'Pengembangan kemampuan olahraga dan pemahaman kesehatan.',
    longDescription: 'Mengembangkan keterampilan olahraga lanjutan dan pemahaman kesehatan holistik.',
    icon: 'dumbbell',
    color: 'text-emerald-500',
    grade: 8,
    category: 'wajib',
    learningObjectives: [
      'Menguasai teknik olahraga lanjutan',
      'Memahami kesehatan reproduksi',
      'Mengembangkan kebugaran',
      'Menunjukkan fair play'
    ],
    skills: ['Advanced Sports Techniques', 'Health Education', 'Physical Fitness', 'Sportsmanship'],
    assessmentMethods: ['Performance assessment', 'Health project', 'Fitness test', 'Portfolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Permainan Bola Voli dan Atletik',
        description: 'Teknik dasar voli dan atletik',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Teknik Servis, Passing, dan Smash Voli',
            type: 'reading',
            duration: 40,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'sb-k8',
    title: 'Seni Budaya dan Prakarya',
    description: 'Mengembangkan bakat seni dan keterampilan kerajinan tangan.',
    longDescription: 'Mengembangkan bakat artistik dan keterampilan praktis melalui berbagai medium seni dan kerajinan.',
    icon: 'palette',
    color: 'text-pink-500',
    grade: 8,
    category: 'pilihan',
    isOptional: true,
    learningObjectives: [
      'Mengembangkan teknik seni lanjutan',
      'Menciptakan karya seni kompleks',
      'Mengapresiasi seni tradisional',
      'Menggabungkan seni dan teknologi'
    ],
    skills: ['Advanced Art Techniques', 'Creative Expression', 'Cultural Integration', 'Digital Art'],
    assessmentMethods: ['Portofolio karya', 'Pameran seni', 'Presentasi', 'Essay reflektif'],
    chapters: [
      {
        id: 'ch1',
        title: 'Seni Musik dan Pertunjukan',
        description: 'Permainan musik dan teater',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Teknik Permainan Alat Musik Tradisional',
            type: 'reading',
            duration: 45,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'mulok-k8',
    title: 'Muatan Lokal',
    description: 'Mempelajari budaya daerah dan potensi lokal masing-masing.',
    longDescription: 'Mengembangkan pemahaman tentang potensi budaya dan ekonomi kreatif daerah.',
    icon: 'users',
    color: 'text-yellow-600',
    grade: 8,
    category: 'pilihan',
    isOptional: true,
    learningObjectives: [
      'Memahami potensi lokal',
      'Mengembangkan produk kreatif',
      'Mempelajari sejarah daerah',
      'Melestarikan tradisi'
    ],
    skills: ['Local Cultural Knowledge', 'Creative Industries', 'Regional History', 'Heritage Preservation'],
    assessmentMethods: ['Community project', 'Cultural presentation', 'Portfolio', 'Participation'],
    chapters: [
      {
        id: 'ch1',
        title: 'Potensi Ekonomi Kreatif Daerah',
        description: 'Pengembangan usaha lokal',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Identifikasi dan Pengembangan Produk Lokal',
            type: 'video',
            duration: 35,
            difficulty: 'mudah'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  }
];

// Data untuk Kelas 9
export const kelas9Subjects: SubjectDetail[] = [
  {
    id: 'pa-bp-k9',
    title: 'Pendidikan Agama dan Budi Pekerti',
    description: 'Menguasai nilai-nilai agama sebagai bekal kehidupan bermasyarakat.',
    longDescription: 'Mengoptimalkan pemahaman dan pengamalan nilai-nilai agama sebagai bekal kehidupan di masyarakat majemuk.',
    icon: 'heart',
    color: 'text-red-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Menguasai implementasi ajaran agama',
      'Menganalisis isu kontemporer',
      'Mengembangkan kepemimpinan spiritual',
      'Mempraktikkan nilai-nilai universal'
    ],
    skills: ['Advanced Religious Understanding', 'Leadership', 'Social Responsibility', 'Moral Reasoning'],
    assessmentMethods: ['Research project', 'Community service', 'Essay analisis', 'Presentasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Implementasi Nilai-Nilai Agama Modern',
        description: 'Ajaran agama dalam konteks modern',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Etika dan Moral dalam Era Digital',
            type: 'video',
            duration: 25,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'pp-k9',
    title: 'Pendidikan Pancasila',
    description: 'Menerapkan nilai-nilai Pancasila dalam kehidupan berbangsa dan bernegara.',
    longDescription: 'Menerapkan nilai-nilai Pancasila secara komprehensif dalam kehidupan berbangsa dan bernegara di era global.',
    icon: 'brain',
    color: 'text-blue-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Mengimplementasikan nilai-nilai Pancasila',
      'Menganalisis isu global dan nasional',
      'Mengembangkan jiwa kepemimpinan',
      'Menunjukkan patriotisme modern'
    ],
    skills: ['Civic Leadership', 'Global Citizenship', 'Political Analysis', 'National Identity'],
    assessmentMethods: ['Debat nasional', 'Project civic engagement', 'Essay kritikal', 'Presentasi kebangsaan'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pancasila dalam Tatanan Global',
        description: 'Implementasi Pancasila modern',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Harmoni Nilai Pancasila dan Globalisasi',
            type: 'video',
            duration: 30,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'bi-k9',
    title: 'Bahasa Indonesia',
    description: 'Menguasai kemampuan berbahasa Indonesia tingkat lanjut.',
    longDescription: 'Mengoptimalkan kompetensi berbahasa Indonesia tingkat mahir untuk komunikasi akademik dan profesional.',
    icon: 'book',
    color: 'text-green-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Menganalisis teks editorial',
      'Menguasai teknik debat',
      'Membuat karya ilmiah sederhana',
      'Mengapresiasi sastra modern'
    ],
    skills: ['Critical Text Analysis', 'Academic Writing', 'Debate Skills', 'Literary Criticism'],
    assessmentMethods: ['Essay analisis', 'Debat kompetitif', 'Penelitian kecil', 'Presentasi akademik'],
    chapters: [
      {
        id: 'ch1',
        title: 'Teks Editorial dan Surat Kabar',
        description: 'Analisis teks persuasif',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Struktur dan Strategi Argumentasi',
            type: 'video',
            duration: 35,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'mtk-k9',
    title: 'Matematika',
    description: 'Mempelajari matematika lanjutan sebagai persiapan jenjang berikutnya.',
    longDescription: 'Mempelajari matematika tingkat lanjut sebagai persiapan untuk jenjang pendidikan menengah atas.',
    icon: 'calculator',
    color: 'text-purple-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Menguasai persamaan kuadrat',
      'Memahami trigonometri dasar',
      'Mengenal statistika inferensial',
      'Menyelesaikan masalah kompleks'
    ],
    skills: ['Advanced Algebra', 'Trigonometry', 'Statistical Analysis', 'Complex Problem Solving'],
    assessmentMethods: ['Problem solving kompleks', 'Tes komprehensif', 'Research project', 'Presentasi'],
    chapters: [
      {
        id: 'ch1',
        title: 'Persamaan Kuadrat dan Fungsi Kuadrat',
        description: 'Persamaan kuadrat dan aplikasinya',
        duration: '6 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Rumus Kuadrat dan Diskriminan',
            type: 'video',
            duration: 30,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'ipa-k9',
    title: 'Ilmu Pengetahuan Alam (IPA)',
    description: 'Memahami konsep sains kompleks dan persiapan studi lanjut.',
    longDescription: 'Memahami konsep sains tingkat lanjut sebagai persiapan untuk studi lebih lanjut di bidang sains.',
    icon: 'microscope',
    color: 'text-teal-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Memahami reproduksi manusia',
      'Menganalisis pewarisan sifat',
      'Memahami listrik statis dan dinamis',
      'Mengenal teknologi modern'
    ],
    skills: ['Advanced Scientific Concepts', 'Research Methods', 'Technology Integration', 'Critical Analysis'],
    assessmentMethods: ['Scientific research', 'Lab reports', 'Innovation project', 'Comprehensive exam'],
    chapters: [
      {
        id: 'ch1',
        title: 'Sistem Reproduksi pada Manusia',
        description: 'Reproduksi dan pewarisan sifat',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Struktur Reproduksi dan Hormon',
            type: 'video',
            duration: 40,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'ips-k9',
    title: 'Ilmu Pengetahuan Sosial (IPS)',
    description: 'Menganalisis isu sosial, ekonomi, dan global kontemporer.',
    longDescription: 'Menganalisis isu-isu kontemporer sosial, ekonomi, dan global dengan perspektif kritis Indonesia.',
    icon: 'globe',
    color: 'text-orange-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Menganalisis isu global',
      'Memahami ekonomi makro',
      'Mengkaji sejarah kontemporer',
      'Mengembangkan thinking global'
    ],
    skills: ['Global Issues Analysis', 'Economic Systems', 'Contemporary History', 'Critical Thinking'],
    assessmentMethods: ['Research paper', 'Debat global', 'Project analysis', 'Presentasi internasional'],
    chapters: [
      {
        id: 'ch1',
        title: 'Globalisasi dan Dampaknya',
        description: 'Analisis fenomena globalisasi',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Ekonomi Politik Global',
            type: 'video',
            duration: 35,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'bing-k9',
    title: 'Bahasa Inggris',
    description: 'Mencapai kemampuan komunikasi bahasa Inggris tingkat mahir.',
    longDescription: 'Mencapai kompetensi bahasa Inggris tingkat mahir untuk komunikasi internasional dan akademik.',
    icon: 'languages',
    color: 'text-indigo-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Mencapai kemampuan berbicara lancar',
      'Mengapresiasi sastra Inggris',
      'Membuat akademik writing',
      'Memahami cultural awareness'
    ],
    skills: ['Fluent Communication', 'Literary Appreciation', 'Academic English', 'Cultural Intelligence'],
    assessmentMethods: ['Speaking proficiency test', 'Literary analysis essay', 'Research paper', 'Cultural presentation'],
    chapters: [
      {
        id: 'ch1',
        title: 'Public Speaking and Academic Writing',
        description: 'Komunikasi formal dan akademik',
        duration: '5 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Presentation Skills and Research Writing',
            type: 'video',
            duration: 40,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'info-k9',
    title: 'Informatika',
    description: 'Belajar pengembangan web, database, dan teknologi digital.',
    longDescription: 'Mempelajari teknologi digital tingkat lanjut termasuk pengembangan web dan database.',
    icon: 'monitor',
    color: 'text-cyan-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Menguasai pengembangan web',
      'Memahami database system',
      'Membangun aplikasi sederhana',
      'Menganalisis cybersecurity'
    ],
    skills: ['Web Development', 'Database Management', 'Application Development', 'Digital Security'],
    assessmentMethods: ['Web development project', 'Database design project', 'Application portfolio', 'Security analysis'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pengembangan Web Dinamis dan Database',
        description: 'Frontend, backend, dan database',
        duration: '6 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'JavaScript Frameworks dan SQL Basics',
            type: 'video',
            duration: 45,
            difficulty: 'sulit'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'pjok-k9',
    title: 'Pendidikan Jasmani, Olahraga, dan Kesehatan',
    description: 'Pembentukan karakter dan gaya hidup sehat untuk masa depan.',
    longDescription: 'Membentuk karakter dan gaya hidup sehat holistik untuk persiapan kehidupan dewasa.',
    icon: 'dumbbell',
    color: 'text-emerald-500',
    grade: 9,
    category: 'wajib',
    learningObjectives: [
      'Membentuk gaya hidup sehat',
      'Menguasai olahraga kompetitif',
      'Memahami kesehatan mental',
      'Mengembangkan leadership'
    ],
    skills: ['Holistic Health', 'Competitive Sports', 'Mental Health Awareness', 'Leadership Skills'],
    assessmentMethods: ['Fitness portfolio', 'Sports coaching project', 'Health presentation', 'Leadership demonstration'],
    chapters: [
      {
        id: 'ch1',
        title: 'Olahraga Kompetitif dan Kesehatan Mental',
        description: 'Persiapan kompetisi dan kesehatan holistik',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Teknik Coaching dan Mental Health Management',
            type: 'reading',
            duration: 40,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'sb-k9',
    title: 'Seni Budaya dan Prakarya',
    description: 'Mengembangkan karya seni dan kewirausahaan kreatif.',
    longDescription: 'Mengembangkan karya seni kreatif dan keterampilan kewirausahaan dalam bidang seni dan kerajinan.',
    icon: 'palette',
    color: 'text-pink-500',
    grade: 9,
    category: 'pilihan',
    isOptional: true,
    learningObjectives: [
      'Menciptakan karya seni inovatif',
      'Mengembangkan entrepreneurship kreatif',
      'Memadukan seni dan bisnis',
      'Menghasilkan produk kreatif'
    ],
    skills: ['Creative Innovation', 'Entrepreneurship', 'Business Skills', 'Art Production'],
    assessmentMethods: ['Product development', 'Business plan', 'Market analysis', 'Portfolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Kewirausahaan di Bidang Seni',
        description: 'Bisnis seni kreatif',
        duration: '4 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Branding dan Pemasaran Produk Seni',
            type: 'video',
            duration: 45,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  },
  {
    id: 'mulok-k9',
    title: 'Muatan Lokal',
    description: 'Mempelajari kebudayaan lokal dan pengembangan potensi daerah.',
    longDescription: 'Mempelajari kebudayaan lokal dan pengembangan potensi daerah dalam konteks global.',
    icon: 'users',
    color: 'text-yellow-600',
    grade: 9,
    category: 'pilihan',
    isOptional: true,
    learningObjectives: [
      'Mengembangkan potensi daerah',
      'Melestarikan warisan budaya',
      'Membangun jejaring lokal',
      'Menyusun rencana pembangunan'
    ],
    skills: ['Regional Development', 'Cultural Heritage', 'Networking', 'Development Planning'],
    assessmentMethods: ['Development project', 'Cultural preservation plan', 'Community presentation', 'Portfolio'],
    chapters: [
      {
        id: 'ch1',
        title: 'Pengembangan Potensi Daerah berbasis Budaya',
        description: 'Integrasi budaya dan pembangunan',
        duration: '3 jam',
        lessons: [
          {
            id: 'ls1',
            title: 'Strategi Pengembangan Ekonomi Kreatif Lokal',
            type: 'video',
            duration: 35,
            difficulty: 'sedang'
          }
        ],
        exercises: []
      }
    ],
    resources: []
  }
];

// Helper functions untuk akses data
export const getSubjectsByGrade = (grade: 7 | 8 | 9): SubjectDetail[] => {
  switch (grade) {
    case 7:
      return kelas7Subjects;
    case 8:
      return kelas8Subjects;
    case 9:
      return kelas9Subjects;
    default:
      return [];
  }
};

export const getSubjectById = (id: string): SubjectDetail | undefined => {
  const allSubjects = [...kelas7Subjects, ...kelas8Subjects, ...kelas9Subjects];
  return allSubjects.find(subject => subject.id === id);
};

export const getSubjectsByCategory = (grade: 7 | 8 | 9, category: 'wajib' | 'pilihan'): SubjectDetail[] => {
  const subjects = getSubjectsByGrade(grade);
  return subjects.filter(subject => subject.category === category);
};