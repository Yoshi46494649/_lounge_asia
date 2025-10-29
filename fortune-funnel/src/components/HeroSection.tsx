import { Sparkles, Star, Heart } from "lucide-react";
import { Button } from "./ui/button";
import heroDestiny from "@/assets/hero-destiny.jpg";

export const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('diagnosis-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroDestiny})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 left-[10%] w-6 h-6 text-primary/30 animate-sparkle" style={{ animationDelay: '0s' }} />
        <Star className="absolute top-40 right-[15%] w-4 h-4 text-accent/40 animate-sparkle" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-40 left-[20%] w-5 h-5 text-primary/25 animate-float" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-32 right-[25%] w-6 h-6 text-secondary/30 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-fade-in">
        <div className="space-y-6">
          <div className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <Star className="w-4 h-4 text-primary fill-primary" />
              <Star className="w-4 h-4 text-primary fill-primary" />
              <Star className="w-4 h-4 text-primary fill-primary" />
              <Star className="w-4 h-4 text-primary fill-primary" />
            </div>
            <p className="text-sm text-foreground/80 font-medium">
              Trusted by 10,000+ people finding love
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" style={{
            textShadow: '0 2px 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)'
          }}>
            Discover Your Love Destiny
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 font-medium bg-background/60 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block shadow-soft max-w-3xl">
            Ancient wisdom meets AI to reveal your perfect match and romantic future
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-foreground/80 pt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>60-second reading</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-secondary" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>Science-backed insights</span>
            </div>
          </div>
        </div>

        <Button 
          variant="cta" 
          size="xl"
          onClick={scrollToForm}
          className="group shadow-glow"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Get Your Free Reading
        </Button>

        {/* Decorative divider */}
        <div className="pt-12 flex items-center justify-center gap-2">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <Star className="w-4 h-4 text-primary" />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};