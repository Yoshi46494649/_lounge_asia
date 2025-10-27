import { Users, Calendar } from "lucide-react";
import communityImage from "@/assets/lounge-asia-community.jpg";

export const CommunityTrust = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header - Mobile Optimized */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-3 sm:mb-4">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">Trusted Community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 px-4">
              Backed by Lounge Asia
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Brisbane's largest Asian community bringing singles together
            </p>
          </div>

          {/* Community Image - Optimized */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_hsl(280_65%_55%_/_0.3)] mb-10 md:mb-12 lg:mb-16">
            <img 
              src={communityImage} 
              alt="Lounge Asia Community Events" 
              className="w-full h-[220px] sm:h-[280px] md:h-[400px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Stats - Simple 2 Column - Mobile Optimized */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-[0_0_30px_hsl(280_65%_55%_/_0.4)]">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">Community Members</div>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-[0_0_30px_hsl(320_75%_70%_/_0.4)]">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">12+</div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">Events Per Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
