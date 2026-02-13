import { Star } from "lucide-react";
import { AnimatedSection, AnimatedChild } from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Mrs. Nguyen",
    country: "Vietnam",
    text: "Michael helped my daughter settle in Brisbane safely. She now has a strong friend group and is focused on her nursing degree. I sleep peacefully knowing she has a local mentor.",
  },
  {
    name: "Mr. Sharma",
    country: "India",
    text: "Other agents just sent my son to any school. Michael planned a career path leading to PR. My son now has a part-time job in IT and is thriving.",
  },
  {
    name: "Mrs. Kim",
    country: "South Korea",
    text: "The Lounge Asia community gave my daughter instant friends and role models. She wasn't isolated like other students. Best decision we ever made.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <p className="text-center text-xs md:text-sm font-bold text-accent uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-10 md:mb-16">
          Words from Grateful Parents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <AnimatedChild key={t.name} delay={0.05 + i * 0.12}>
              <div className="p-6 md:p-8 rounded-2xl border border-border bg-card h-full flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-accent"></div>
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1 mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-bold text-accent text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              </div>
            </AnimatedChild>
          ))}
        </div>
      </div>
    </section>
  );
}
