import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

// Konversi Markdown menjadi HTML string, mengizinkan HTML mentah termasuk iframe.
// Kemudian sanitasi output agar aman ditampilkan di browser.
export function renderMarkdownToHtml(markdown?: string): string {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
  });

  const rawHtml = md.render(String(markdown || ''));

  // Izinkan tag iframe dengan atribut umum yang aman.
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'src', 'title', 'width', 'height', 'frameborder',
      'allow', 'allowfullscreen', 'loading', 'referrerpolicy'
    ],
  });

  return cleanHtml;
}

// Helper: jika konten sudah HTML (mis. dari Strapi), tetap sanitasi agar aman.
export function sanitizeHtml(html?: string): string {
  return DOMPurify.sanitize(String(html || ''), {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'src', 'title', 'width', 'height', 'frameborder',
      'allow', 'allowfullscreen', 'loading', 'referrerpolicy'
    ],
  });
}