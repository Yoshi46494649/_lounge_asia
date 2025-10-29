import { Sparkles, Brain, Heart, Star } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Find Your Perfect Match",
    description: "Discover compatibility with potential partners before your first date. Know who's worth your time.",
  },
  {
    icon: Brain,
    title: "Science Meets Tradition",
    description: "AI-powered analysis combined with ancient astrological wisdom for insights you can trust.",
  },
  {
    icon: Star,
    title: "Actionable Love Guidance",
    description: "Get specific advice on timing, conversation starters, and how to make the best impression.",
  },
];

export const ValueProposition = () => {
  return (
    <section className="py-24 px-6 bg-gradient-soft relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Your Path to <span className="bg-gradient-destiny bg-clip-text text-transparent">Meaningful Connection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop wasting time on wrong matches. Get personalized insights that actually help you find love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-card backdrop-blur-sm rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-scale-in border border-border/50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-destiny flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social Proof & Diagnosis types preview */}
        <div className="mt-16 space-y-8">
          {/* Success Stories Preview */}
          <div className="text-center space-y-4 bg-gradient-card backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Heart className="w-5 h-5 fill-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider">Success Stories</span>
            </div>
            <p className="text-lg md:text-xl text-foreground italic max-w-3xl mx-auto">
              "This reading gave me confidence before my speed dating event. I knew exactly who to focus on, and we've been dating for 3 months now!" 
            </p>
            <p className="text-sm text-muted-foreground">— Sarah M., Tokyo</p>
          </div>

          {/* Diagnosis Types */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-6 border border-primary/20 shadow-soft hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground">Today's Love Fortune</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Perfect timing for your next date, conversation tips, and what to watch out for today.
              </p>
              <p className="text-sm text-primary font-medium">→ Best for daily guidance</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-secondary/20 shadow-soft hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground">Compatibility Check</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Discover your match score, strengths as a couple, and potential challenges to navigate.
              </p>
              <p className="text-sm text-secondary font-medium">→ Best before speed dating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};