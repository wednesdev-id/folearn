# Konfigurasi Environment Variables

File ini menjelaskan cara mengkonfigurasi environment variables untuk aplikasi Folearn.

## Setup Environment Variables

1. Buat file `.env` di root directory project (Folearn-landing-page/)
2. Tambahkan konfigurasi berikut:

```env
# Strapi API Configuration
# Pilih salah satu opsi:

# Opsi 1: Jika URL sudah include /api
VITE_STRAPI_URL=http://localhost:1337/api

# Opsi 2: Jika URL belum include /api (akan otomatis ditambahkan)
# VITE_API_URL=http://localhost:1337

# Optional: Strapi Token untuk authenticated requests (jika diperlukan)
# VITE_STRAPI_TOKEN=your_token_here
```

## Penjelasan

- **VITE_STRAPI_URL**: Gunakan jika URL sudah include `/api` di akhir
  - Contoh: `http://localhost:1337/api`
  - Contoh: `https://api.example.com/api`

- **VITE_API_URL**: Gunakan jika URL belum include `/api` (akan otomatis ditambahkan)
  - Contoh: `http://localhost:1337`
  - Contoh: `https://api.example.com`

- **VITE_STRAPI_TOKEN**: Token untuk authenticated requests (opsional)

## Prioritas

Sistem akan membaca environment variables dengan urutan prioritas:
1. `VITE_STRAPI_URL` (prioritas tertinggi)
2. `VITE_API_URL` (fallback)
3. Default: `http://localhost:1337/api` (jika tidak ada env variables)

## Catatan

- File `.env` sudah di-ignore oleh `.gitignore` untuk keamanan
- Jangan commit file `.env` ke repository
- Untuk production, set environment variables di hosting platform (Vercel, Netlify, dll)

