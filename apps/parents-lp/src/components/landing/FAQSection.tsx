import { useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is Australia safe for international students?",
    answer: "Yes, Australia is generally very safe. However, like any country, some areas are safer than others. We strictly recommend suburbs and housing options that we know are secure and family-friendly, based on our local experience."
  },
  {
    question: "What is the difference between you and a normal agent?",
    answer: "Most agents are 'offshore' and stop helping once the student arrives. We are 'onshore' mentors. We live in Brisbane and providing ongoing support, community, and guidance throughout your child's entire study journey."
  },
  {
    question: "Can you guarantee a visa?",
    answer: "No one can guarantee a visa. However, we partner with MARA-registered migration lawyers who have a very high success rate. We ensure all applications are legally compliant and optimised for the best chance of approval."
  },
  {
    question: "How much do your services cost?",
    answer: "Our school placement and basic visa support services are usually free for parents, as we are funded by the institutions. For our premium onshore mentorship and specific legal work, there may be separate fees which we will discuss transparently."
  },
  {
    question: "What happens if my child gets sick?",
    answer: "All international students must have OSHC (Overseas Student Health Cover). We ensure this is set up before they arrive. If they get sick, we can guide them to English-speaking doctors and hospitals."
  },
  {
    question: "Will my child make friends?",
    answer: "Isolation is a big risk. That's why we created the 'Lounge Asia' community. Your child will be invited to our safe, alcohol-free (or responsible) social events to meet other motivated students from day one."
  },
  {
    question: "Can they work while studying?",
    answer: "Yes, most student visas allow for part-time work (currently 48 hours per fortnight). We advise students on how to balance work and study, and how to find safe, legal employment."
  },
  {
    question: "Do you help with finding accommodation?",
    answer: "Yes. We advise on safe suburbs and can inspect properties on your behalf. We warn against student housing scams and ensure your child ends up in a safe, clean home."
  },
  {
    question: "Which universities do you work with?",
    answer: "We work with a wide range of top Australian institutions. However, we prioritize courses and schools that offer good student support and clear pathways to careers and Permanent Residency, not just 'big names'."
  },
  {
    question: "How do we stay in touch with Michael?",
    answer: "We keep a direct line of communication with parents via WhatsApp. You can message Michael personally to ask about your child's progress or any concerns you may have."
  }
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-accent focus:outline-none"
      >
        <span className="text-foreground/90 font-bold">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-accent" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-48 opacity-100 pb-4" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs md:text-sm font-bold text-accent uppercase tracking-widest mb-3">
            Common Questions
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-10 md:mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem key={index} item={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
