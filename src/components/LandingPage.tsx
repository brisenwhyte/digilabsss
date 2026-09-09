import { AnimatedBackground } from "./AnimatedBackground";
import { BeforeAfterSection, CapabilitiesSection, FinalStatement, PerformanceSection, ProblemSection, ProcessSection, ProductSection, TechnologySection, TestimonialsSection, TransformationSection } from "./StorySections";
import { FloatingCTA } from "./FloatingCTA";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { QuoteForm } from "./QuoteForm";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ProblemSection />
        <ProductSection />
        <TransformationSection />
        <PerformanceSection />
        <CapabilitiesSection />
        <BeforeAfterSection />
        <ProcessSection />
        <TestimonialsSection />
        <TechnologySection />
        <FinalStatement />
        <QuoteForm />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
}