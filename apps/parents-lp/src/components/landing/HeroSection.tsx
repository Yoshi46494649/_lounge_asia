import { MessageCircle, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/top3.png";

const WHATSAPP_URL =
  "https://wa.me/61493013502?text=Hi%20Michael,%20I%20am%20interested%20in%20safe%20study%20options%20in%20Australia.";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-[center_20%]"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/30 md:bg-gradient-to-r md:from-primary/90 md:via-primary/70 md:to-transparent" />

      <div className="relative z-10 container mx-auto px-5 md:px-6 pb-12 pt-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs md:text-sm font-bold text-accent tracking-[0.2em] uppercase mb-3 md:mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Study in Australia — Local Mentorship
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight drop-shadow-lg animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            Secure Education <br />
            <span className="text-accent relative inline-block">
              Australia.
              <span className="absolute bottom-0 left-0 w-full h-2 bg-accent/30 -z-10 rounded-full blur-sm"></span>
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-200 mb-8 md:mb-10 leading-relaxed max-w-lg animate-slide-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            Local Mentorship &amp; Safe Community. We guide your child to the right path with premium support and dedicated care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up opacity-0 relative z-20" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block sm:inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base md:text-lg px-8 py-6 h-auto rounded-full font-bold shadow-[0_8px_30px_rgba(255,125,41,0.5)] hover:shadow-[0_10px_40px_rgba(255,125,41,0.7)] hover:-translate-y-1 transition-all w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                Free Safety Consultation
              </Button>
            </a>
          </div>

          <p className="text-gray-400 text-xs mt-6 flex items-center gap-2 font-medium animate-fade-in opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
            <span className="flex text-accent">★★★★★</span> Trusted by 1,000+ International Students
          </p>
          
          <div className="mt-8 md:mt-12 animate-fade-in opacity-0 max-w-md" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group cursor-pointer relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
               <a href="/" className="flex items-center gap-4 text-left">
                 <div className="bg-white/10 p-3 rounded-lg text-white group-hover:bg-accent group-hover:text-white transition-colors">
                   <Users className="h-6 w-6" />
                 </div>
                 <div className="flex-1">
                   <p className="text-xs text-accent font-bold uppercase tracking-wider mb-0.5">Community</p>
                   <p className="text-white font-bold text-sm md:text-base group-hover:text-accent transition-colors flex items-center gap-2">
                     Visit Lounge Asia <ExternalLink className="h-3 w-3 opacity-50" />
                   </p>
                 </div>
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
