import { HeroSection } from "@/components/HeroSection";
import { ValueProposition } from "@/components/ValueProposition";
import { PrivacySection } from "@/components/PrivacySection";
import { DiagnosisForm } from "@/components/DiagnosisForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <HeroSection />
      <ValueProposition />
      <PrivacySection />
      <DiagnosisForm />
    </div>
  );
};

export default Index;
