import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";
import { smoothScrollTo } from "@/utils/smoothScroll";

const HeroSection = () => {
  const scrollToClasses = () => {
    smoothScrollTo('kelas');
  };

  return (
    <section id="home" className="pt-20 md:pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Selamat Datang di Folearn{" "}
              <span className="inline-block animate-[wave_1s_ease-in-out_infinite]">👋</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tempat belajar online yang mudah dan menyenangkan untuk siswa SMP.
            </p>
            <Button
              size="lg"
              onClick={scrollToClasses}
              className="neomorph neomorph-hover bg-primary text-primary-foreground rounded-2xl px-8 py-6 font-medium text-lg hover:shadow-neomorph-hover cursor-pointer"
            >
              Mulai Belajar
            </Button>
          </div>
          <div className="relative">
            <div className="neomorph rounded-3xl overflow-hidden">
              <img
                src={heroIllustration}
                alt="Students learning"
                className="w-full h-auto"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-secondary/50 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent/50 blur-3xl animate-pulse delay-75"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
