import { useLocation } from "react-router-dom";
import { smoothScrollTo, handleHashScroll } from "@/utils/smoothScroll";
import { useEffect } from "react";

export const useSmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scroll on route change
    handleHashScroll();
  }, [location.pathname, location.hash]);

  const handleNavClick = (path: string, hash?: string) => {
    if (hash) {
      smoothScrollTo(hash);
    }
  };

  return { handleNavClick };
};