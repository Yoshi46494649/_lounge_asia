import { AnimatedSection } from "@/components/AnimatedSection";

export function TrustBar() {
  return (
    <section className="bg-secondary py-8 md:py-12 border-b border-border">
      <div className="container mx-auto px-5 md:px-6">
        <p className="text-center text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5 md:mb-6">
          Our Trusted Partner
        </p>
        <div className="flex justify-center items-center">
          <img 
            src="/parents/partners/sora.jpg" 
            alt="Sora Partnership" 
            className="h-16 md:h-20 object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </section>
  );
}
