import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ArrowRight, TrendingUp, Flame } from "lucide-react";
import { Helmet } from "react-helmet";

// Mock blog data with SEO-optimized content
const blogPosts = [
  {
    id: 1,
    slug: "brisbane-asian-meetup-guide-2025",
    title: "Your Guide to Asian Meetups in Brisbane 2025",
    excerpt: "Step inside Lounge Asia's International Meet Up-an open-floor language exchange for Asian professionals and local friends.",
    category: "International Meet Up",
    date: "15/01/2025",
    readTime: "8 min read",
    image: "blog/international-meet-up/meetup-hero.png",
    featured: true,
  },
  {
    id: 2,
    slug: "asian-dating-brisbane-complete-guide",
    title: "Asian Dating in Brisbane: The Complete Guide",
    excerpt: "Practical ways to build romantic connections in Brisbane's Asian community and how Speed Dating Asia supports every step.",
    category: "Asian Dating",
    date: "10/01/2025",
    readTime: "8 min read",
    image: "blog/asian-dating/asian-dating-hero.jpg",
    featured: true,
  },
  {
    id: 3,
    slug: "speed-dating-asian-singles-brisbane",
    title: "Speed Dating for Asian Singles in Brisbane",
    excerpt: "Behind the scenes of our first Speed Dating Asia round-what we learned, who joined, and why the format stays comfortable.",
    category: "Speed Dating",
    date: "05/01/2025",
    readTime: "9 min read",
    image: "blog/speed-dating/speed-dating-hero.jpg",
    featured: false,
  },
  {
    id: 4,
    slug: "best-brisbane-spots-asian-community",
    title: "Best Brisbane Spots for the Asian Community",
    excerpt: "Venue scouting notes from Lounge Asia-where we hold socials, language exchanges, and casual follow-ups across Brisbane.",
    category: "Brisbane",
    date: "01/01/2025",
    readTime: "7 min read",
    image: "blog/brisbane/brisbane-hero.jpg",
    featured: false,
  },
  {
    id: 5,
    slug: "melbourne-asian-scene-guide",
    title: "Melbourne's Asian Scene: A Complete Guide",
    excerpt: "Scouting Melbourne ahead of our expansion-meet-ups, partner venues, and how we'll recreate Comfort & Romance.",
    category: "Melbourne",
    date: "28/12/2024",
    readTime: "8 min read",
    image: "blog/melbourne/melbourne-hero.png",
    featured: false,
  },
  {
    id: 6,
    slug: "tips-making-friends-asian-community",
    title: "10 Tips for Making Friends in Australia's Asian Community",
    excerpt: "Ten lessons from our team and guests that turn a quiet weekend into lasting friendships in Brisbane.",
    category: "Tips",
    date: "20/12/2024",
    readTime: "7 min read",
    image: "blog/tips/tips-hero.jpg",
    featured: false,
  },
];

const categories = ["All", "International Meet Up", "Asian Dating", "Speed Dating", "Brisbane", "Melbourne", "Tips"];

const siteBaseUrl = "https://www.loungeasia.com.au/speed-dating/lp/blog";

const toIsoDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPosts = useMemo(() => blogPosts.filter((post) => post.featured), []);
  const mostReadPost = useMemo(() => blogPosts[0], []);
  const metaTitle = "Lounge Asia Blog | Brisbane Asian Community Stories";
  const metaDescription =
    "Discover calm, in-depth stories about Lounge Asia events, dating insights, and community highlights for Brisbane's Asian professionals.";
  const canonicalUrl = `${siteBaseUrl}/`;
  const withBase = (path: string) => (path.startsWith("http") ? path : `${import.meta.env.BASE_URL}${path}`);
  const socialImage = mostReadPost?.image ? withBase(mostReadPost.image) : "https://www.loungeasia.com.au/assets/og-image.jpg";
  const absoluteSocialImage = mostReadPost?.image
    ? mostReadPost.image.startsWith("http")
      ? mostReadPost.image
      : `https://www.loungeasia.com.au/speed-dating/lp/${mostReadPost.image}`
    : "https://www.loungeasia.com.au/assets/og-image.jpg";
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Lounge Asia Blog",
    "description": metaDescription,
    "url": canonicalUrl,
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": "Lounge Asia",
      "url": "https://www.loungeasia.com.au/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.loungeasia.com.au/assets/logo.png"
      }
    },
    "blogPost": blogPosts.slice(0, 6).map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${siteBaseUrl}/${post.slug}`,
      "datePublished": toIsoDate(post.date),
      "image": post.image.startsWith("http")
        ? post.image
        : `https://www.loungeasia.com.au/speed-dating/lp/${post.image}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absoluteSocialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={absoluteSocialImage} />
        <script type="application/ld+json">{JSON.stringify(blogListJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-950 text-slate-100">
        <Navigation />

        <main className="pt-28 pb-20">
        {/* Spotlight article */}
        <section className="px-4">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-200/80">
              <Flame className="h-4 w-4 text-yellow-300" />
              <span>Most read this week</span>
            </div>

            <Link
              to={`/blog/${mostReadPost.slug}`}
              className="group block overflow-hidden rounded-3xl border border-white/10 bg-gray-900/80 shadow-[0_35px_80px_rgba(8,12,28,0.6)] backdrop-blur transition hover:border-yellow-400/50"
            >
              <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
                <div className="relative h-64 md:h-full">
                  <img
                    src={withBase(mostReadPost.image)}
                    alt={mostReadPost.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/60 to-transparent" />
                </div>

                <div className="flex flex-col justify-center gap-4 px-6 py-8 md:px-10 md:py-12">
                  <Badge className="w-fit border border-yellow-300/50 bg-yellow-400/15 text-yellow-100">
                    {mostReadPost.category}
                  </Badge>
                  <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                    {mostReadPost.title}
                  </h1>
                  <p className="text-base text-slate-300 md:text-lg line-clamp-3">
                    {mostReadPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {mostReadPost.date}
                    </span>
                    <span>• {mostReadPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-yellow-200">
                    <span>Read the story</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Search & filters */}
        <section className="px-4 mt-12">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="relative animate-fade-in">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-12 rounded-xl border border-white/10 bg-gray-900/70 pl-12 text-slate-100 placeholder:text-slate-400 focus:border-yellow-400/70 focus:ring-yellow-400/30"
                aria-label="Search blog posts"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-[0_18px_40px_rgba(10,12,24,0.45)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300/80">
                  Browse Categories
                </h2>
                <Button
                  variant="outline"
                  className="border-yellow-400/60 text-yellow-200 hover:bg-yellow-400 hover:text-gray-950"
                  onClick={() => setSelectedCategory("All")}
                >
                  View All
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <Button
                      key={category}
                      variant="outline"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        isActive
                          ? "border-yellow-400/80 bg-yellow-400/20 text-yellow-100 hover:bg-yellow-400/30"
                          : "border-white/10 bg-gray-900/70 text-slate-200 hover:border-yellow-300/60 hover:bg-gray-900/80 hover:text-yellow-100"
                      }
                    >
                      {category}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured articles */}
        {selectedCategory === "All" && featuredPosts.length > 0 && (
          <section className="px-4 pt-16">
            <div className="container mx-auto max-w-6xl">
              <div className="mb-8 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-300" />
                <h2 className="text-2xl font-semibold text-white">Featured Articles</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${0.25 + index * 0.1}s` }}
                  >
                    <Card className="flex h-full flex-col overflow-hidden border border-white/10 bg-gray-900/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-yellow-400/50">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={withBase(post.image)}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <Badge className="absolute left-4 top-4 border border-yellow-300/50 bg-yellow-400/20 text-yellow-100 backdrop-blur">
                          {post.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl text-white transition-colors group-hover:text-yellow-200 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.date}
                          </span>
                          <span>• {post.readTime}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base text-slate-300 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <Button variant="ghost" className="group/btn h-auto p-0 text-yellow-200 hover:text-yellow-100">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All posts */}
        <section className="px-4 pt-16">
          <div className="container mx-auto max-w-6xl">
            {selectedCategory !== "All" && (
              <h2 className="mb-6 text-2xl font-semibold text-white">{selectedCategory} Articles</h2>
            )}

            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-gray-900/50 py-12 text-center text-slate-400">
                No articles found matching your filters.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <Card className="flex h-full flex-col overflow-hidden border border-white/10 bg-gray-900/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-yellow-400/40">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={withBase(post.image)}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <Badge className="absolute left-3 top-3 border border-yellow-300/50 bg-yellow-400/15 text-yellow-100 backdrop-blur">
                          {post.category}
                        </Badge>
                      </div>
                      <CardHeader className="flex-grow">
                        <CardTitle className="text-xl text-white transition-colors group-hover:text-yellow-200 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                          <span>• {post.readTime}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-300 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" className="group/btn h-auto p-0 text-yellow-200 hover:text-yellow-100">
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
    </>
  );
};

export default Blog;
