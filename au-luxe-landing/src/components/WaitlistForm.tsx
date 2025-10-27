import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { useWaitlistSignup } from "@/hooks/use-waitlist-signup";

export const WaitlistForm = () => {
  const { email, setEmail, isSubmitting, handleSubmit } = useWaitlistSignup({
    source: "waitlist_section",
  });

  return (
    <section id="waitlist-form" className="py-10 sm:py-12 md:py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-12 shadow-[0_8px_32px_hsl(280_65%_55%_/_0.2)] border border-border">
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 px-4">
                Get Early Access
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
                Secure your spot for the next event before tickets go public!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 sm:pl-14 md:pl-16 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg rounded-xl touch-manipulation"
                  disabled={isSubmitting}
                  aria-label="Email address"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                variant="hero"
                className="w-full h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-bold touch-manipulation min-h-[48px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Get Early Access Now"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base text-muted-foreground px-2">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
                <p>Your details are safe and secure. We respect your privacy.</p>
              </div>
            </form>

            <div className="mt-5 sm:mt-6 md:mt-8 pt-5 sm:pt-6 md:pt-8 border-t border-border text-center">
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-4">
                Get updates about upcoming events and exclusive early-bird offers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
