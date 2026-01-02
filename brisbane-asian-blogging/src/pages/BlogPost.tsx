import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { SocialShare } from "@/components/blog/SocialShare";
import { SocialProof } from "@/components/blog/SocialProof";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BlogPost as BlogPostData, getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/blog";

const addHeadingIds = (content: string) => {
  if (typeof window === "undefined") return content;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  const headings = tempDiv.querySelectorAll("h2, h3");
  headings.forEach((heading, index) => {
    heading.id = `heading-${index}`;
  });
  return tempDiv.innerHTML;
};

const BlogPost = () => {
  const { slug } = useParams();
  const posts = useMemo(() => getAllPosts(), []);
  const post: BlogPostData | undefined = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);
  const adjacent = useMemo(
    () => (slug ? getAdjacentPosts(slug) : { previous: undefined, next: undefined }),
    [slug]
  );
  const { previous, next } = adjacent;
  const [currentUrl, setCurrentUrl] = useState("");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Lounge Asia Blog`;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", post.metaDescription);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = post.metaDescription;
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "Lounge Asia Blog";
    };
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        "@type": "Organization",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Lounge Asia",
        logo: {
          "@type": "ImageObject",
          url: post.heroImage,
        },
      },
      image: post.heroImage,
      mainEntityOfPage: window.location.href,
    };

    const scriptId = "structured-data-article";
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById(scriptId);
      if (cleanup) cleanup.remove();
    };
  }, [post]);

  useEffect(() => {
    if (!post) return;

    const swipeThreshold = 100;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0].clientX;
    };
    const handleTouchMove = (event: TouchEvent) => {
      touchEndX.current = event.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && next) {
          window.location.href = `/blog/${next.slug}`;
        } else if (diff < 0 && previous) {
          window.location.href = `/blog/${previous.slug}`;
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [post, previous, next]);

  const processedContent = useMemo(() => (post ? addHeadingIds(post.html) : ""), [post]);
  const shareUrl = currentUrl || (typeof window !== "undefined" ? window.location.href : "");

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const others = posts.filter((entry) => entry.slug !== post.slug);
    const sameCategory = others.filter((entry) => entry.category === post.category).slice(0, 2);
    const filler = others.filter((entry) => entry.category !== post.category).slice(0, 2 - sameCategory.length);
    return [...sameCategory, ...filler].slice(0, 2);
  }, [post, posts]);

  const prevArticle = previous
    ? { slug: previous.slug, title: previous.title, category: previous.category }
    : undefined;
  const nextArticle = next
    ? { slug: next.slug, title: next.title, category: next.category }
    : undefined;

  if (!post || !slug) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">
            The article you are looking for may have been moved or published yet.
          </p>
          <Link to="/blog">
            <Button variant="default">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <SocialShare url={shareUrl} title={post.title} variant="sticky" />

      <div className="pt-16">
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </AspectRatio>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex gap-8 max-w-7xl mx-auto">
          <article className="flex-1 max-w-4xl">
            <div className="bg-card rounded-2xl shadow-hover p-6 md:p-12 animate-fade-in-up">
              <Breadcrumb category={post.category} title={post.title} />

              <Badge className="bg-gradient-primary border-0 text-white mb-4">
                {post.category}
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>{post.publishedAtDisplay}</time>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTimeLabel}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span>{post.author}</span>
              </div>

              <div className="mb-6">
                <SocialProof slug={slug} />
              </div>

              <div className="mb-8 pb-8 border-b">
                <SocialShare url={shareUrl} title={post.title} />
              </div>

              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-li:text-foreground/90 prose-li:mb-2
                  prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              <NewsletterCTA variant="inline" />

              <ArticleNavigation prevArticle={prevArticle} nextArticle={nextArticle} />

              <NewsletterCTA variant="end" />
            </div>

            <div className="mt-12 mb-20">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
                    <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1">
                      <AspectRatio ratio={16 / 9} className="overflow-hidden">
                        <img
                          src={relatedPost.heroImage}
                          alt={relatedPost.heroImageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </AspectRatio>
                      <div className="p-6">
                        <Badge className="mb-3 bg-primary/10 text-primary border-0">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          <TableOfContents content={processedContent} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
