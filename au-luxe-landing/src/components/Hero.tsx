import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-couple.png";
import { Heart, Users, Mail, Lock, Percent } from "lucide-react";
import { useWaitlistSignup } from "@/hooks/use-waitlist-signup";

export const Hero = () => {
  const { email, setEmail, isSubmitting, handleSubmit } = useWaitlistSignup({
    successMessage: "You're on the early access list! We'll email you the next event before it goes public.",
    source: "hero_primary_cta",
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background media with responsive focal point */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Happy couple at speed dating event"
          className="h-full w-full object-cover object-[42%_50%] md:object-[50%_42%] lg:object-[50%_38%]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(183,79,191,0.85)_0%,rgba(217,109,182,0.75)_50%,rgba(232,136,121,0.65)_100%)]" aria-hidden="true" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
              <Heart className="w-4 h-4" />
              Speed Dating Asia
            </span>
          </div>

          {/* Main Headline - Mobile Optimized */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)] px-4 sm:px-6">
            Meet Asian Singles in Australia
          </h1>

          {/* Subheadline - Mobile Optimized */}
          <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed px-4">
            A fun, safe speed dating event. No perfect English needed.
          </p>

          {/* Inline waitlist form */}
          <form
            onSubmit={handleSubmit}
            className="px-4 pt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          >
            <div className="relative w-full sm:max-w-sm">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-pink-200" aria-hidden="true" />
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="h-12 md:h-14 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 border-white/40 pl-11 sm:pl-14 focus:border-pink-200 focus:ring-pink-200"
                aria-label="Email address"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant="hero"
              className="w-full sm:w-auto min-h-[48px] px-6 sm:px-7 md:px-8 py-4 sm:py-5 shadow-2xl text-sm sm:text-base md:text-lg touch-manipulation"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join the Waitlist"}
            </Button>
          </form>
          <p className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base text-white/80 px-6">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span>We only use your email to confirm event details. Unsubscribe anytime.</span>
          </p>

          {/* Trust Badges - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8 max-w-3xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 transition-all duration-300 hover:bg-white/15">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mx-auto mb-2 sm:mb-3" aria-hidden="true" />
              <h3 className="text-white font-bold mb-1 text-sm sm:text-base md:text-lg">Free for women</h3>
              <p className="text-white/80 text-xs sm:text-sm md:text-base">Women pay nothing</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 transition-all duration-300 hover:bg-white/15">
              <Percent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mx-auto mb-2 sm:mb-3" aria-hidden="true" />
              <h3 className="text-white font-bold mb-1 text-sm sm:text-base md:text-lg">40% match rate</h3>
              <p className="text-white/80 text-xs sm:text-sm md:text-base">Nearly half our guests find a match</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 transition-all duration-300 hover:bg-white/15">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mx-auto mb-2 sm:mb-3" aria-hidden="true" />
              <h3 className="text-white font-bold mb-1 text-sm sm:text-base md:text-lg">Asian-only community</h3>
              <p className="text-white/80 text-xs sm:text-sm md:text-base">Everyone shares and respects Asian culture</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

