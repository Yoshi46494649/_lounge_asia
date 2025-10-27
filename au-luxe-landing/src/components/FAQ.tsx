import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "How does the event work?",
      answer: "You'll meet multiple people in short 5-minute conversations. After each round, you note who you'd like to see again. If there's a mutual interest, we'll send you both each other's contact details the next day.",
    },
    {
      question: "Can I exchange contact info during the event?",
      answer: "To keep things fair and help everyone focus on genuine conversations, please don't exchange social media or phone numbers during the event. After the event, matched pairs will receive each other's contact details.",
    },
    {
      question: "How do you ensure a safe and secure event?",
      answer: "Absolutely! We verify everyone's ID at check-in, host events at trusted venues in Brisbane, and maintain a friendly atmosphere. Safety is our top priority.",
    },
    {
      question: "What is the cost to attend?",
      answer: "Pricing varies by event. Typically, tickets are $50 for men. Women often enjoy special pricing or free entry. Details are sent when you register.",
    },
    {
      question: "Can I cancel or get a refund?",
      answer: "Yes! If you need to cancel at least 7 days before the event, you'll receive a full refund (minus Stripe processing fees). Cancellations within 6 days of the event are non-refundable.",
    },
    {
      question: "I'm new to speed dating. Will I be looked after?",
      answer: "Absolutely! Most people feel the same way. Our hosts will guide you through everything, and the short conversation format makes it easy to relax. You'll be surprised how naturally it flows.",
    },
    {
      question: "What age range attends these events?",
      answer: "Participants must be 18 years or older (ID required at check-in). We welcome adults of all ages looking for genuine connections.",
    },
    {
      question: "How often are events held?",
      answer: "We host events regularly in Brisbane, typically once a month. Join the waitlist to be notified about upcoming dates and early-bird offers.",
    },
    {
      question: "Do I have to be Asian to join the event?",
      answer: "While our events are designed for the Asian community, we welcome anyone who is genuinely interested in meeting Asian singles and respects our inclusive, diverse community.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 px-4">
            Common Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to know before joining your first event
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 border border-border shadow-[0_2px_12px_hsl(280_65%_55%_/_0.1)]"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-semibold text-foreground hover:no-underline py-4 sm:py-5 md:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5 md:pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
