import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  slug: string;
  title: string;
  category: string;
}

interface ArticleNavigationProps {
  prevArticle?: Article;
  nextArticle?: Article;
}

export const ArticleNavigation = ({ prevArticle, nextArticle }: ArticleNavigationProps) => {
  if (!prevArticle && !nextArticle) return null;

  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12 pt-8 border-t border-border">
      {prevArticle ? (
        <Link to={`/blog/${prevArticle.slug}`} className="group">
          <Button
            variant="outline"
            className="group flex min-h-[80px] w-full items-start justify-start gap-3 rounded-xl border-white/10 bg-gray-900/70 py-4 px-6 text-slate-100 transition hover:border-yellow-400/50 hover:text-yellow-100"
          >
            <ChevronLeft className="mt-1 h-5 w-5 flex-shrink-0 transition-transform group-hover:-translate-x-1" />
            <div className="min-w-0 flex-1 text-left">
              <div className="mb-1 text-xs uppercase tracking-widest text-slate-400">Previous</div>
              <div className="text-sm font-medium leading-snug text-white sm:text-base line-clamp-2">{prevArticle.title}</div>
              <div className="mt-1 text-xs text-yellow-200">{prevArticle.category}</div>
            </div>
          </Button>
        </Link>
      ) : (
        <div />
      )}
      
      {nextArticle && (
        <Link to={`/blog/${nextArticle.slug}`} className="group">
          <Button
            variant="outline"
            className="group flex min-h-[80px] w-full items-start justify-end gap-3 rounded-xl border-white/10 bg-gray-900/70 py-4 px-6 text-slate-100 transition hover:border-yellow-400/50 hover:text-yellow-100"
          >
            <div className="min-w-0 flex-1 text-right">
              <div className="mb-1 text-xs uppercase tracking-widest text-slate-400">Next</div>
              <div className="text-sm font-medium leading-snug text-white sm:text-base line-clamp-2">{nextArticle.title}</div>
              <div className="mt-1 text-xs text-yellow-200">{nextArticle.category}</div>
            </div>
            <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </nav>
  );
};
