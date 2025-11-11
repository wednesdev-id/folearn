import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClassSection from "@/components/ClassSection";
import AboutSection from "@/components/AboutSection";
import AnnouncementSection from "@/components/AnnouncementSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main>
        <HeroSection />
        <ClassSection />
        <AboutSection />
        <AnnouncementSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
