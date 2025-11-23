import { useEffect } from 'react';

/**
 * Custom hook untuk scroll ke top setiap kali berpindah halaman
 * @param dependencies - Array dependency untuk trigger scroll
 */
export const useScrollToTop = (dependencies: string[] = []) => {
  useEffect(() => {
    // Force scroll to top dengan behavior smooth
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Double check untuk memastikan scroll benar-benar ke top (fallback)
    setTimeout(() => {
      if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 100);
  }, dependencies);
};