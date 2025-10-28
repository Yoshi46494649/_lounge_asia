import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = ({ content }: { content: string }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const headingElements = tempDiv.querySelectorAll("h2, h3");
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.charAt(1));
      return { id, text, level };
    });

    setHeadings(extractedHeadings);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    // Observe all headings in the actual article
    setTimeout(() => {
      extractedHeadings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="sticky top-24 hidden w-64 lg:ml-8 lg:block">
      <div className="rounded-xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_18px_40px_rgba(8,12,24,0.45)]">
        <h3 className="mb-4 font-semibold text-white">Table of Contents</h3>
        <ul className="space-y-1.5">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  "flex min-h-[40px] w-full items-center text-left text-sm text-slate-300 transition-colors hover:text-yellow-200",
                  activeId === heading.id
                    ? "text-yellow-200 font-medium"
                    : "text-slate-400"
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
