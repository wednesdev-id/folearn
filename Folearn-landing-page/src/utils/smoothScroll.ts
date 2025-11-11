export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Handle fixed header offset
    const headerHeight = 80; // Approximate header height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const handleHashScroll = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Small delay to ensure component is mounted
      setTimeout(() => {
        smoothScrollTo(hash);
      }, 100);
    }
  }
};