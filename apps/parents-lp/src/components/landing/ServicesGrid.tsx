import { Home, FileCheck, Briefcase, HeartPulse, MapPin, Users } from "lucide-react";
import { AnimatedSection, AnimatedChild } from "@/components/AnimatedSection";

const services = [
  {
    icon: Home,
    title: "Safe Accommodation",
    text: "We advise on safe suburbs & housing. We know which streets are safe because we live here.",
  },
  {
    icon: FileCheck,
    title: "Visa & Legal",
    text: "Referred to MARA registered partners. Full legal compliance guaranteed.",
  },
  {
    icon: Briefcase,
    title: "Career Pathways",
    text: "PR & Job focused course planning. We choose courses that lead to Permanent Residency.",
  },
  {
    icon: HeartPulse,
    title: "OSHC Insurance",
    text: "Mandatory health cover arrangement. We ensure your child is fully covered from day one.",
  },
  {
    icon: MapPin,
    title: "Onshore Welcome",
    text: "Life setup advice & orientation. Airport pickup coordination and first-week support.",
  },
  {
    icon: Users,
    title: "Community Network",
    text: "Access to 'Lounge Asia' local events & a network of 1,000+ successful students.",
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <p className="text-center text-xs md:text-sm font-bold text-accent uppercase tracking-widest mb-3">
          What We Do
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-10 md:mb-16">
          Comprehensive Onshore Support
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <AnimatedChild key={s.title} delay={0.05 + i * 0.08}>
              <div className="p-6 md:p-8 rounded-xl border border-border bg-card hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 h-full group">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg bg-accent/10 mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <s.icon className="h-6 w-6 md:h-7 md:w-7 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </AnimatedChild>
          ))}
        </div>
      </div>
    </section>
  );
}
