import { HeroBanner } from "@/components/HeroBanner";
import { AboutUs } from "@/components/AboutUs";
import { Services } from "@/components/Services";
import { WorkingProcessSection } from "@/components/WorkingProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogSection } from "@/components/BlogSection";
import { BottomBanner } from "@/components/BottomBanner";
import { Footer } from "@/components/Footer";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <main className="min-h-[50vh] w-full overflow-x-hidden bg-white font-sans">
        <HeroBanner />
        <AboutUs />
        <Services />
        <ProjectsSection />
        <WorkingProcessSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <BottomBanner />
      <Footer />
    </>
  );
}
