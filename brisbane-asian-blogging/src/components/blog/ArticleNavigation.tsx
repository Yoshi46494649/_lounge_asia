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
            className="w-full h-auto py-4 px-6 flex items-start justify-start gap-3 min-h-[80px]"
          >
            <ChevronLeft className="h-5 w-5 mt-1 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground mb-1">Previous</div>
              <div className="font-medium line-clamp-2">{prevArticle.title}</div>
              <div className="text-xs text-primary mt-1">{prevArticle.category}</div>
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
            className="w-full h-auto py-4 px-6 flex items-start justify-end gap-3 min-h-[80px]"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Next</div>
              <div className="font-medium line-clamp-2">{nextArticle.title}</div>
              <div className="text-xs text-primary mt-1">{nextArticle.category}</div>
            </div>
            <ChevronRight className="h-5 w-5 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      )}
    </nav>
  );
};
