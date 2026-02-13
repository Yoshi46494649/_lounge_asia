import { AnimatedSection, AnimatedChild } from "@/components/AnimatedSection";
import michaelSon from "@/assets/michael-son.png";

export function FounderSection() {
  return (
    <section id="founder" className="bg-secondary py-14 md:py-28">
      <div className="container mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 max-w-5xl mx-auto">
          <AnimatedChild className="w-full md:w-2/5 flex-shrink-0" delay={0.1}>
            <div className="relative">
              <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 rounded-2xl -z-10"></div>
              <img
                src={michaelSon}
                alt="Michael and his son Haruki in Brisbane"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3] md:aspect-[3/4]"
                loading="lazy"
              />
            </div>
          </AnimatedChild>
          <AnimatedChild className="w-full md:w-3/5" delay={0.25}>
            <p className="text-xs md:text-sm font-bold text-accent uppercase tracking-widest mb-3">
              About the Founder
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-5 md:mb-8">
              Founded by a <span className="text-accent">Local Father.</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                "My name is <strong className="text-foreground">Michael</strong>. I live in Brisbane with
                my son. I act as a local mentor, ensuring students have a{" "}
                <strong className="text-foreground">safe community</strong> and clear goals for their
                future."
              </p>
              <p className="border-l-4 border-accent pl-4 italic bg-white/50 p-4 rounded-r-lg">
                "I am strict about the environment. I{" "}
                <strong className="text-foreground">never</strong> recommend schools or areas that I
                wouldn't choose for my own son."
              </p>
            </div>
            <p className="mt-6 md:mt-8 text-foreground font-bold text-base md:text-lg">
              — Michael, Founder of Lounge Asia
            </p>
          </AnimatedChild>
        </div>
      </div>
    </section>
  );
}
