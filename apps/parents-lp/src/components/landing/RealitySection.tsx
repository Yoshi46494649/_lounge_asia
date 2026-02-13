import { AlertTriangle, X } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

export function RealitySection() {
  return (
    <section className="bg-secondary py-14 md:py-28">
      <div className="container mx-auto px-5 md:px-6 max-w-3xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          <p className="text-xs md:text-sm font-bold text-accent uppercase tracking-widest">
            The Reality
          </p>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 md:mb-8 text-center">
          Why do <span className="text-accent underline decoration-accent/30 underline-offset-4">30%</span> of International Students Fail?
        </h2>
        <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 md:space-y-6">
          <p className="text-center font-medium">
            It's not English skills. It's <strong className="text-foreground">"The Wrong Environment"</strong>.
          </p>
          <ul className="space-y-4 pl-2 bg-white/50 p-6 rounded-2xl border border-border/50">
            {[
              "Fall into lazy or bad influence groups",
              "Lose motivation and skip classes",
              "Get isolated and depressed without support",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="bg-red-100 p-1 rounded-full mt-0.5">
                  <X className="h-4 w-4 text-destructive flex-shrink-0" />
                </div>
                <span className="text-foreground/80 font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-center">
            Offshore agents disappear once your child lands at the airport. We provide a{" "}
            <strong className="text-foreground">local network</strong> to keep them on track.
          </p>
          <p className="font-bold text-foreground text-lg md:text-xl text-center border-l-4 border-accent pl-4 ml-4 md:ml-0 md:border-l-0 md:border-b-4 md:pb-2 md:pl-0 inline-block">
            Without a local guide, your investment is at risk.
          </p>
        </div>
      </div>
    </section>
  );
}
