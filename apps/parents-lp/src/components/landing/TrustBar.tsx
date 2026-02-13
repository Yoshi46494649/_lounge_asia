import { AnimatedSection } from "@/components/AnimatedSection";

const institutions = [
  "University of Queensland",
  "UNSW Sydney",
  "Monash University",
  "UTS",
  "Griffith University",
  "TAFE Queensland",
  "Deakin University",
  "La Trobe University",
];

export function TrustBar() {
  return (
    <section className="bg-secondary py-8 md:py-12 border-b border-border">
      <div className="container mx-auto px-5 md:px-6">
        <p className="text-center text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-5 md:mb-6">
          Placement Available at Top Institutions
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-x-10 md:gap-y-4">
          {institutions.map((name) => (
            <span
              key={name}
              className="text-xs md:text-sm font-bold text-muted-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider whitespace-nowrap cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
