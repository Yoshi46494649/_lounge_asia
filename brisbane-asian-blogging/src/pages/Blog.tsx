import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ArrowRight, TrendingUp } from "lucide-react";

// Mock blog data with SEO-optimized content
const blogPosts = [
  {
    id: 1,
    slug: "brisbane-asian-meetup-guide-2025",
    title: "Your Guide to Asian Meetups in Brisbane 2025",
    excerpt: "Discover the best international meetup events in Brisbane for Asians. Connect with like-minded people and build lasting friendships.",
    category: "International Meet Up",
    date: "15/01/2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 2,
    slug: "asian-dating-brisbane-complete-guide",
    title: "Asian Dating in Brisbane: The Complete Guide",
    excerpt: "Everything you need to know about dating as an Asian in Brisbane. Tips, venues, and real success stories.",
    category: "Asian Dating",
    date: "10/01/2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 3,
    slug: "speed-dating-asian-singles-brisbane",
    title: "Speed Dating for Asian Singles in Brisbane",
    excerpt: "Experience the excitement of speed dating events designed for Brisbane's Asian community. Find your perfect match!",
    category: "Speed Dating",
    date: "05/01/2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 4,
    slug: "best-brisbane-spots-asian-community",
    title: "Best Brisbane Spots for the Asian Community",
    excerpt: "From Sunnybank to the CBD, discover the best places to eat, shop, and socialise in Brisbane's Asian neighbourhoods.",
    category: "Brisbane",
    date: "01/01/2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1624395149011-470cf6f6ec02?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 5,
    slug: "melbourne-asian-scene-guide",
    title: "Melbourne's Asian Scene: A Complete Guide",
    excerpt: "Explore Melbourne's vibrant Asian community, from Box Hill to the CBD. Events, restaurants, and social hotspots.",
    category: "Melbourne",
    date: "28/12/2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 6,
    slug: "tips-making-friends-asian-community",
    title: "10 Tips for Making Friends in Australia's Asian Community",
    excerpt: "Practical advice for building meaningful connections and finding your tribe in Australia's Asian community.",
    category: "Tips",
    date: "20/12/2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    featured: false,
  },
];

const categories = ["All", "International Meet Up", "Asian Dating", "Speed Dating", "Brisbane", "Melbourne", "Tips"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base rounded-xl border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-primary hover:opacity-90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && featuredPosts.length > 0 && (
        <section className="px-4 pb-16">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1 border-2 bg-gradient-card">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
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
                          <span>{post.date}</span>
                        </div>
                        <span>• {post.readTime}</span>
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
          </div>
        </section>
      )}

      {/* All Posts Grid */}
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
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
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
                          <span>{post.date}</span>
                        </div>
                        <span>• {post.readTime}</span>
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
