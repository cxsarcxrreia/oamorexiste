import AcademyHeroSection from "../components/AcademyHeroSection";
import AcademyMethodSection from "../components/AcademyMethodSection";
import AcademyMentoringAreasSection from "../components/AcademyMentoringAreasSection";
import AcademyAudienceSection from "../components/AcademyAudienceSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";

export default function AcademyPage() {
  return (
    //Add header
    <div className="relative bg-[#F4F4F4]">
    <Header logoSrc={logoSymbol} />


    <main className="bg-[#F4F4F4] text-[#1F1F1F]">
        <AcademyHeroSection />
        <AcademyMethodSection />
        <AcademyMentoringAreasSection />
        <AcademyAudienceSection />
        
    </main>
    <Footer logoSrc={logoSymbol} />
    </div>
  );
}