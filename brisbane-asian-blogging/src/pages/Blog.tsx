import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { BlogPost, getAllPosts, getCategories, getFeaturedPosts } from "@/lib/blog";

const posts = getAllPosts();
const featured = getFeaturedPosts();
const categories = getCategories();

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.keyword.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Lounge Asia Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your guide to meetups, dating, and community events across Australia
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-10 h-12 rounded-full border-input focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full px-6"
              >
                {category}
              </Button>
            ))}
          </div>

          {featured.length > 0 && selectedCategory === "All" && (
            <section className="mt-12">
              <div className="flex items-center gap-2 mb-6 text-primary font-semibold">
                <TrendingUp className="w-5 h-5" />
                Trending Now
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {featured.map((post, index) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={post.heroImage}
                          alt={post.heroImageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <Badge className="absolute top-4 left-4 bg-gradient-primary border-0 text-white">
                          {post.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{post.publishedAtDisplay}</span>
                          </div>
                          <span>• {post.readTimeLabel}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-7xl">
          {selectedCategory !== "All" && (
            <h2 className="text-2xl font-bold mb-6">{selectedCategory} Articles</h2>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.heroImage}
                        alt={post.heroImageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.publishedAtDisplay}</span>
                        </div>
                        <span>• {post.readTimeLabel}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
