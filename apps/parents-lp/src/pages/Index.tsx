import { StickyHeader } from "@/components/landing/StickyHeader";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { ServicesGrid } from "@/components/landing/ServicesGrid";
import { RealitySection } from "@/components/landing/RealitySection";
import { PopularCourses } from "@/components/landing/PopularCourses";
import { FounderSection } from "@/components/landing/FounderSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { StickyWhatsApp } from "@/components/landing/StickyWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-poppins selection:bg-accent selection:text-white">
      <StickyHeader />
      <HeroSection />
      
      <AnimatedSection delay={0.1}>
        <TrustBar />
      </AnimatedSection>
      
      <AnimatedSection id="services" className="scroll-mt-20">
        <ServicesGrid />
      </AnimatedSection>
      
      <AnimatedSection>
        <RealitySection />
      </AnimatedSection>
      
      <AnimatedSection>
        <PopularCourses />
      </AnimatedSection>
      
      <AnimatedSection>
        <FounderSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      
      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
      
      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Index;
