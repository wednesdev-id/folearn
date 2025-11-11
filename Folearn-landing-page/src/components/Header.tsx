import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/utils/smoothScroll";

const Header = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  // Scroll spy implementation
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = [
      { id: "home", element: document.getElementById("home") },
      { id: "kelas", element: document.getElementById("kelas") },
      { id: "tentang", element: document.getElementById("tentang") }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is 40% visible
        threshold: 0
      }
    );

    // Also listen to scroll to set active section to "home" when at top
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Observe all sections
    sections.forEach(({ element }) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(({ element }) => {
        if (element) {
          observer.unobserve(element);
        }
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const isActiveHome = location.pathname === "/" && activeSection === "home";
  const isActiveMateri = location.pathname === "/" && activeSection === "kelas";
  const isActiveTentang = location.pathname === "/" && activeSection === "tentang";

  const navItems = [
    { name: "Home", path: "/", hash: null, active: isActiveHome },
    { name: "Materi", path: "/", hash: "kelas", active: isActiveMateri },
    { name: "Tentang", path: "/", hash: "tentang", active: isActiveTentang },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.hash) {
      smoothScrollTo(item.hash);
    } else if (item.name === "Home") {
      // Scroll to top when Home is clicked
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between bg-white shadow-bottom px-6 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Folearn
          </h1>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path + (item.hash ? `#${item.hash}` : "")}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  item.active
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
          <User className="w-5 h-5 text-blue-500 stroke-[2.5]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
