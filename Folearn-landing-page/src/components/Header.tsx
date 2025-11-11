import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NeomorphCard from "./NeomorphCard";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/utils/smoothScroll";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", active: location.pathname === "/" },
    { name: "Materi", path: "/", hash: "kelas", active: location.pathname === "/" && location.hash === "#kelas" },
    { name: "Tentang", path: "/", hash: "tentang", active: location.pathname === "/" && location.hash === "#tentang" },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.hash) {
      smoothScrollTo(item.hash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <NeomorphCard className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EduMuda
          </h1>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path + (item.hash ? `#${item.hash}` : "")}
                onClick={() => item.hash && handleNavClick(item)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  item.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="w-10 h-10 rounded-full neomorph flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
          <User className="w-5 h-5 text-primary stroke-[2.5]" />
        </div>
      </NeomorphCard>
    </header>
  );
};

export default Header;
