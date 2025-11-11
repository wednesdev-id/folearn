import { Lightbulb } from "lucide-react";
import NeomorphCard from "./NeomorphCard";

const AboutSection = () => {
  return (
    <section id="tentang" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <NeomorphCard className="text-center fade-in" inset>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/30 neomorph flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
            <Lightbulb className="w-10 h-10 text-accent stroke-[2.5] fill-accent/10" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Tentang Folearn</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Folearn membantu siswa SMP belajar di mana saja dan kapan saja.
            Semua materi ditulis langsung oleh guru, disusun ringan agar mudah dipahami.
          </p>
        </NeomorphCard>
      </div>
    </section>
  );
};

export default AboutSection;
