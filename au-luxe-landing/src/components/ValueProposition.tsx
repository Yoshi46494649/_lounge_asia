import { MessageCircle, Users2, ShieldCheck, Sparkles } from "lucide-react";
import coupleImage from "@/assets/couple-happy.png";

export const ValueProposition = () => {
  const values = [
    {
      icon: MessageCircle,
      title: "Authentic Connections",
      description: "Built to bring together singles who share your culture, values, and communication style so conversation flows naturally.",
    },
    {
      icon: Users2,
      title: "Asian-Focused Community",
      description: "Meet people who understand your background, humor, and what really matters in a lasting relationship.",
    },
    {
      icon: ShieldCheck,
      title: "Verified & Balanced",
      description: "Every participant is ID-verified and we secure equal numbers of men and women to keep each round fair and respectful.",
    },
    {
      icon: Sparkles,
      title: "Next-Day Results",
      description: "Submit your preferences digitally and receive your confirmed matches in your inbox the very next evening.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 px-4">
            What Makes It Special
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Genuine conversations, balanced pairings, and a relaxed, safe atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_4px_24px_hsl(280_65%_55%_/_0.15)] hover:shadow-[0_8px_32px_hsl(280_65%_55%_/_0.25)] transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 sm:mb-4 md:mb-6 mx-auto">
                <value.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 text-center">
                {value.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-center">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Happy Couple Image Section - Optimized */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_32px_hsl(280_65%_55%_/_0.2)] border border-border">
            <img 
              src={coupleImage} 
              alt="Happy couple at Brisbane speed dating event" 
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
                Real connections happen face-to-face
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
