import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

const WHATSAPP_URL =
  "https://wa.me/61493013502?text=Hi%20Michael,%20I%20am%20interested%20in%20safe%20study%20options%20in%20Australia.";

export function CTASection() {
  return (
    <section className="bg-primary py-14 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 opacity-0 animate-pulse"></div>
      <div className="container mx-auto px-5 md:px-6 text-center max-w-2xl relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 md:mb-6">
          Start Your Safe Journey Today.
        </h2>
        <p className="text-base md:text-lg text-primary-foreground/80 mb-3 md:mb-4 leading-relaxed">
          I handle every inquiry <strong>personally</strong> to ensure quality.
        </p>
        <p className="text-base md:text-lg text-primary-foreground/80 mb-8 md:mb-10 leading-relaxed">
          I can only accept <strong className="text-accent bg-accent/10 px-2 py-1 rounded">5 new families</strong> this month.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-base md:text-lg px-8 md:px-10 h-14 md:h-16 rounded-full font-bold shadow-[0_4px_20px_rgba(255,125,41,0.5)] hover:shadow-[0_4px_30px_rgba(255,125,41,0.7)] hover:-translate-y-1 transition-all w-full sm:w-auto animate-pulse"
          >
            <MessageCircle className="mr-2 h-5 w-5 md:h-6 md:w-6" />
            Start WhatsApp Chat Now
          </Button>
        </a>
        <p className="text-primary-foreground/60 text-xs md:text-sm mt-3 md:mt-4">
          Zero Cost. Zero Risk. Direct line to Michael.
        </p>
      </div>
    </section>
  );
}
