import { AnimatedSection, AnimatedChild } from "@/components/AnimatedSection";
import courseNursing from "@/assets/nursing.png";
import courseIT from "@/assets/infomation.png";
import courseEngineering from "@/assets/engineer.png";
import courseHospitality from "@/assets/hospitarity.png";

const courses = [
  { title: "Nursing", desc: "High demand, direct PR pathway", image: courseNursing },
  { title: "Information Technology", desc: "Tech industry growth, skilled visa eligible", image: courseIT },
  { title: "Engineering", desc: "Critical skills list, strong employment", image: courseEngineering },
  { title: "Hospitality", desc: "Work-integrated learning, fast employment", image: courseHospitality },
];

export function PopularCourses() {
  return (
    <section id="courses" className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <p className="text-center text-xs md:text-sm font-bold text-accent uppercase tracking-widest mb-3">
          Career-Focused
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-10 md:mb-16">
          Top Courses for Permanent Residency
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {courses.map((c, i) => (
            <AnimatedChild key={c.title} delay={0.05 + i * 0.1}>
              <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{c.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
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
