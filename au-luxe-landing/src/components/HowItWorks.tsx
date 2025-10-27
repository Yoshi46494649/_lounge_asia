import { ClipboardCheck, Heart, Mail } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      icon: ClipboardCheck,
      title: "Join the Priority List",
      description: "Only your email is needed. Secure your spot for the next event before tickets go public.",
    },
    {
      step: "2",
      icon: Mail,
      title: "Receive Your Exclusive Invitation",
      description: "We'll email you a private link to book and complete your full profile for the event.",
    },
    {
      step: "3",
      icon: Heart,
      title: "Meet, Mingle & Match",
      description: "Enjoy a safe night out. Hosts guide the rotations. Matches are delivered the next day.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 px-4">
            Your Simple Path to Connection
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Three easy steps to your next connection.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-8 shadow-lg border border-border hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-3 sm:gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_hsl(320_75%_70%_/_0.4)]">
                    <step.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary-foreground" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="mb-2 md:mb-3">
                    <span className="text-xs md:text-sm font-bold text-primary block mb-1">STEP {step.step}</span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
