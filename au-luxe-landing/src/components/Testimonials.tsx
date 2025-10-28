import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah L.",
      age: "28",
      location: "Brisbane CBD",
      quote: "After trying the apps, I felt so much more comfortable here. It's great to meet people who understand my background and values. Found my first match right here in Brisbane!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&h=160&q=80",
    },
    {
      name: "James K.",
      age: "30",
      location: "International Student",
      quote: "The ratio was perfectly balanced, and the matching system was efficient. As a busy professional, this is the best way to meet quality people without wasting time.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=80",
    },
    {
      name: "Kenji T.",
      age: "31",
      location: "Brisbane",
      quote: "I joined the Stock Exchange Hotel session after work and the vibe was effortlessly relaxed. The hosts kept the pace moving, the matches were genuine, and it felt like everyone showed up with serious intent.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=160&h=160&q=80",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 px-4">
            What People Are Saying
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Real stories from Brisbane singles who found meaningful connections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_4px_24px_hsl(280_65%_55%_/_0.15)] border border-border hover:shadow-[0_8px_32px_hsl(280_65%_55%_/_0.25)] transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5 md:mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3">
                {testimonial.avatar ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-border bg-muted/40 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} profile photo`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover blur-sm scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm sm:text-base flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                    {testimonial.name}, {testimonial.age}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {testimonial.location}
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
