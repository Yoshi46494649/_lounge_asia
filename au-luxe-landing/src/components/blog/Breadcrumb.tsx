import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useEffect } from "react";

interface BreadcrumbProps {
  category: string;
  title: string;
}

export const Breadcrumb = ({ category, title }: BreadcrumbProps) => {
  useEffect(() => {
    // Add JSON-LD structured data for breadcrumbs
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${window.location.origin}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category,
          "item": `${window.location.origin}/blog?category=${category}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": title,
          "item": window.location.href
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [category, title]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <li className="flex items-center gap-2 text-slate-400">
          <Link
            to="/"
            className="flex min-h-[44px] items-center gap-1 text-slate-300 transition-colors hover:text-yellow-200"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-500" />
        </li>
        <li className="flex items-center gap-2 text-slate-400">
          <Link
            to="/blog"
            className="flex min-h-[44px] items-center text-slate-300 transition-colors hover:text-yellow-200"
          >
            Blog
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-500" />
        </li>
        <li className="flex items-center gap-2 text-slate-400">
          <Link
            to={`/blog?category=${category}`}
            className="flex min-h-[44px] items-center text-slate-300 transition-colors hover:text-yellow-200"
          >
            {category}
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-500" />
        </li>
        <li className="truncate font-medium text-white">{title}</li>
      </ol>
    </nav>
  );
};
