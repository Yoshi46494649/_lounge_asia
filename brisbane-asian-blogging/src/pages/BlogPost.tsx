import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { SocialShare } from "@/components/blog/SocialShare";
import { SocialProof } from "@/components/blog/SocialProof";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock blog post data (in production, this would come from a database)
const blogPostsData: Record<string, any> = {
  "brisbane-asian-meetup-guide-2025": {
    title: "Your Guide to Asian Meetups in Brisbane 2025",
    excerpt: "Discover the best international meetup events in Brisbane for Asians. Connect with like-minded people and build lasting friendships.",
    category: "International Meet Up",
    date: "15/01/2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    author: "Lounge Asia Team",
    content: `
      <p>Brisbane's Asian community is thriving in 2025, with more opportunities than ever to connect, network, and build lasting friendships. Whether you're new to Brisbane or looking to expand your social circle, here's your complete guide to the best Asian meetup events this year.</p>
      
      <h2>1. Lounge Asia Monthly Meetup</h2>
      <p>Our flagship event brings together Brisbane's diverse Asian community every month. It's the perfect casual setting to meet new friends, share experiences, and feel at home.</p>
      <ul>
        <li><strong>When:</strong> Every 4th Tuesday of the month</li>
        <li><strong>Time:</strong> 6:00 PM onwards</li>
        <li><strong>Where:</strong> Criterion Tavern, Brisbane City</li>
        <li><strong>Entry:</strong> Free (pay for your own food & drinks)</li>
      </ul>
      
      <h2>2. Asian Cultural Festival Brisbane</h2>
      <p>Brisbane's largest celebration of Asian culture. Experience authentic food, music, art, and traditional performances from across Asia.</p>
      
      <h2>3. Professional Networking Events</h2>
      <p>Monthly networking sessions designed for Asian professionals looking to advance their careers and build valuable business connections across various industries.</p>
      
      <h2>Why Join Our Meetups?</h2>
      <ul>
        <li>Meet people who share your cultural background</li>
        <li>Expand your professional network</li>
        <li>Exchange valuable information and tips</li>
        <li>Combat homesickness and feel connected</li>
        <li>Have fun and make memories</li>
      </ul>
      
      <p>Stay updated on upcoming events by following Lounge Asia on Facebook and Instagram. We can't wait to see you at the next meetup!</p>
    `,
  },
  "asian-dating-brisbane-complete-guide": {
    title: "Asian Dating in Brisbane: The Complete Guide",
    excerpt: "Everything you need to know about dating as an Asian in Brisbane. Tips, venues, and real success stories.",
    category: "Asian Dating",
    date: "10/01/2025",
    readTime: "7 min read",
    image: "/speed-dating/lp/blog/assets/asian-dating-brisbane.jpg",
    author: "Lounge Asia Team",
    content: `
      <p>Dating in Brisbane as an Asian can be an exciting journey filled with opportunities to meet amazing people. Whether you're looking for someone who shares your cultural background or you're open to cross-cultural relationships, Brisbane offers a welcoming and diverse dating scene.</p>
      
      <h2>Best Places to Meet Singles</h2>
      <p>Brisbane has numerous venues perfect for meeting potential partners:</p>
      
      <h3>1. Community Events</h3>
      <p>Lounge Asia's monthly meetups are fantastic for meeting singles in a relaxed, friendly environment. Many relationships have started at our events!</p>
      
      <h3>2. Asian Restaurants & Cafes</h3>
      <p>Sunnybank Plaza and surrounding areas are social hubs where you'll find like-minded people enjoying authentic Asian cuisine.</p>
      
      <h3>3. Cultural Festivals</h3>
      <p>Asian cultural festivals provide perfect opportunities to connect with people who appreciate and celebrate Asian heritage.</p>
      
      <h2>Dating Tips for Success</h2>
      <ul>
        <li>Be authentic and true to yourself</li>
        <li>Stay open-minded about who you might connect with</li>
        <li>Join activities and events you genuinely enjoy</li>
        <li>Take your time getting to know someone</li>
        <li>Communicate openly about cultural differences</li>
      </ul>
      
      <h2>Success Stories</h2>
      <p>We've heard countless stories of couples who met through our community events. From first conversations at meetups to weddings, Lounge Asia has helped bring people together.</p>
      
      <p>Ready to start your dating journey? Join us at our next event and see where it takes you!</p>
    `,
  },
  "speed-dating-asian-singles-brisbane": {
    title: "Speed Dating for Asian Singles in Brisbane",
    excerpt: "Experience the excitement of speed dating events designed for Brisbane's Asian community. Find your perfect match!",
    category: "Speed Dating",
    date: "05/01/2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop",
    author: "Lounge Asia Team",
    content: `
      <p>Speed dating has become one of the most popular ways for Asian singles in Brisbane to meet potential partners. It's fast, fun, and efficient – perfect for busy professionals looking to expand their dating pool.</p>
      
      <h2>What is Speed Dating?</h2>
      <p>Speed dating involves a series of short, timed conversations (usually 5-7 minutes) with different people. At the end of the event, you indicate who you'd like to see again, and if there's a mutual match, contact details are exchanged.</p>
      
      <h2>Lounge Asia Speed Dating Events</h2>
      <p>Our speed dating nights are specifically designed for Brisbane's Asian community:</p>
      <ul>
        <li><strong>Age Groups:</strong> Events for 20s-30s and 30s-40s</li>
        <li><strong>Format:</strong> Structured yet relaxed atmosphere</li>
        <li><strong>Venue:</strong> Premium CBD locations</li>
        <li><strong>Frequency:</strong> Quarterly events</li>
      </ul>
      
      <h2>Tips for Speed Dating Success</h2>
      <ul>
        <li>Arrive early to settle your nerves</li>
        <li>Prepare 2-3 interesting conversation starters</li>
        <li>Be yourself – authenticity is attractive</li>
        <li>Keep an open mind about who you might connect with</li>
        <li>Make eye contact and smile</li>
        <li>Take notes after each conversation</li>
        <li>Follow up promptly with matches</li>
      </ul>
      
      <h2>What Makes Our Events Special</h2>
      <p>Lounge Asia's speed dating events are tailored for the Asian community, creating a comfortable environment where cultural understanding is built-in. You'll meet quality singles who are genuinely looking for meaningful connections.</p>
      
      <p>Our next speed dating event is coming soon! Follow our social media for updates and early bird tickets.</p>
    `,
  },
  "best-brisbane-spots-asian-community": {
    title: "Best Brisbane Spots for the Asian Community",
    excerpt: "From Sunnybank to the CBD, discover the best places to eat, shop, and socialise in Brisbane's Asian neighbourhoods.",
    category: "Brisbane",
    date: "01/01/2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1624395149011-470cf6f6ec02?w=1200&h=600&fit=crop",
    author: "Lounge Asia Team",
    content: `
      <p>Brisbane has become a hub for Asian culture in Australia, with vibrant neighbourhoods, authentic restaurants, and a thriving community. Here's your essential guide to the best spots in Brisbane for Asians.</p>
      
      <h2>1. Sunnybank - The Heart of Asian Brisbane</h2>
      <p>Sunnybank is undoubtedly Brisbane's most famous Asian precinct. Located in the southern suburbs, it's home to:</p>
      <ul>
        <li>Sunnybank Plaza - the largest Asian shopping centre</li>
        <li>Authentic restaurants serving Chinese, Korean, Japanese, Vietnamese, and more</li>
        <li>Asian grocers, bakeries, and bubble tea shops</li>
        <li>Cultural centres and language schools</li>
      </ul>
      
      <h2>2. CBD Favourites</h2>
      <p>The Brisbane CBD offers excellent options for quick lunches and after-work dining:</p>
      <ul>
        <li>Elizabeth Street - Japanese restaurants and Korean BBQ</li>
        <li>Queen Street Mall - bubble tea chains and Asian fast food</li>
        <li>Eagle Street Pier - upscale Asian fusion dining</li>
      </ul>
      
      <h2>3. West End</h2>
      <p>This trendy neighbourhood features:</p>
      <ul>
        <li>Authentic Vietnamese food on Hardgrave Road</li>
        <li>Asian-inspired cafes and bars</li>
        <li>The Davies Park Markets (Saturday mornings)</li>
      </ul>
      
      <h2>4. Fortitude Valley</h2>
      <p>Brisbane's entertainment district with Asian influences:</p>
      <ul>
        <li>Chinatown Mall</li>
        <li>Asian nightclubs and karaoke bars</li>
        <li>Late-night Asian eateries</li>
      </ul>
      
      <h2>5. Garden City & Upper Mount Gravatt</h2>
      <p>Growing Asian communities with increasing options for shopping and dining.</p>
      
      <h2>Best Asian Grocery Stores</h2>
      <ul>
        <li>Sunlit Asian Supermarket (Sunnybank)</li>
        <li>Chong Co (West End)</li>
        <li>Asian Grocery Store (CBD)</li>
      </ul>
      
      <p>Whether you're craving home-style cooking or looking to connect with the community, Brisbane has everything you need to feel at home.</p>
    `,
  },
  "melbourne-asian-scene-guide": {
    title: "Melbourne's Asian Scene: A Complete Guide",
    excerpt: "Explore Melbourne's vibrant Asian community, from Box Hill to the CBD. Events, restaurants, and social hotspots.",
    category: "Melbourne",
    date: "28/12/2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1200&h=600&fit=crop",
    author: "Lounge Asia Team",
    content: `
      <p>Melbourne is renowned for having Australia's most diverse and vibrant Asian community. From bustling Chinatown to the suburban hubs, here's your guide to experiencing the best of Melbourne's Asian scene.</p>
      
      <h2>1. Box Hill - Melbourne's Largest Asian Precinct</h2>
      <p>Box Hill is to Melbourne what Sunnybank is to Brisbane. This eastern suburb offers:</p>
      <ul>
        <li>Box Hill Central - massive Asian shopping complex</li>
        <li>Dozens of authentic Asian restaurants</li>
        <li>Asian supermarkets and specialty stores</li>
        <li>Cultural centres and community services</li>
      </ul>
      
      <h2>2. Melbourne CBD & Chinatown</h2>
      <p>The city centre provides easy access to Asian culture:</p>
      <ul>
        <li>Little Bourke Street - Historic Chinatown</li>
        <li>Swanston Street - Japanese dining and retail</li>
        <li>Elizabeth Street - bubble tea and Asian fast food</li>
      </ul>
      
      <h2>3. Glen Waverley</h2>
      <p>Another major Asian hub featuring:</p>
      <ul>
        <li>Kingsway shopping precinct</li>
        <li>High concentration of Asian restaurants</li>
        <li>Great schools popular with Asian families</li>
      </ul>
      
      <h2>4. Clayton & Springvale</h2>
      <p>Home to Monash University and vibrant Vietnamese community:</p>
      <ul>
        <li>Springvale Asian district</li>
        <li>Affordable authentic dining</li>
        <li>Asian grocery stores and markets</li>
      </ul>
      
      <h2>5. Richmond - Little Saigon</h2>
      <p>Victoria Street is famous for:</p>
      <ul>
        <li>Vietnamese restaurants and cafes</li>
        <li>Asian grocers and specialty shops</li>
        <li>Cultural events and festivals</li>
      </ul>
      
      <h2>Lounge Asia Melbourne</h2>
      <p>While Lounge Asia originated in Brisbane, we're expanding to Melbourne! Stay tuned for upcoming events and meetups in Melbourne designed to bring the Asian community together.</p>
      
      <p>Follow us on social media for updates on Melbourne events and join our growing community!</p>
    `,
  },
  "tips-making-friends-asian-community": {
    title: "10 Tips for Making Friends in Australia's Asian Community",
    excerpt: "Practical advice for building meaningful connections and finding your tribe in Australia's Asian community.",
    category: "Tips",
    date: "20/12/2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop",
    author: "Lounge Asia Team",
    content: `
      <p>Moving to or living in Australia as an Asian can sometimes feel isolating, especially if you're new to the area. Here are our top 10 tips for making genuine friends within Australia's Asian community.</p>
      
      <h2>1. Attend Regular Community Events</h2>
      <p>Consistency is key. Attend Lounge Asia's monthly meetups regularly – familiar faces become friends over time. Don't just show up once; commit to being part of the community.</p>
      
      <h2>2. Be Approachable</h2>
      <p>Smile, make eye contact, and show open body language. Put your phone away and engage with people around you. Remember, everyone is there to meet new people!</p>
      
      <h2>3. Initiate Conversations</h2>
      <p>Don't wait for others to approach you. Start with simple questions:</p>
      <ul>
        <li>"How long have you been in Australia?"</li>
        <li>"What brought you to Brisbane/Melbourne?"</li>
        <li>"Where's your favourite Asian restaurant here?"</li>
      </ul>
      
      <h2>4. Follow Up After Meeting Someone</h2>
      <p>Exchange social media or phone numbers, then actually follow up! Send a message within 48 hours suggesting coffee or another meetup.</p>
      
      <h2>5. Join Interest-Based Groups</h2>
      <p>Beyond general meetups, join groups based on specific interests:</p>
      <ul>
        <li>Sports teams (badminton, basketball, hiking groups)</li>
        <li>Food & cooking clubs</li>
        <li>Language exchange meetups</li>
        <li>Professional networking groups</li>
      </ul>
      
      <h2>6. Volunteer Together</h2>
      <p>Bonding while helping others creates strong friendships. Look for community service opportunities within the Asian community.</p>
      
      <h2>7. Host Your Own Gatherings</h2>
      <p>Once you've met a few people, invite them over for dinner or organise a small outing. Taking initiative shows you value the friendship.</p>
      
      <h2>8. Be Patient and Authentic</h2>
      <p>Real friendships take time to develop. Don't try to be someone you're not – authenticity attracts genuine connections.</p>
      
      <h2>9. Use Social Media Wisely</h2>
      <p>Join Facebook groups, follow Instagram accounts, and engage with the community online. But remember, online connections should lead to real-life meetups.</p>
      
      <h2>10. Give More Than You Take</h2>
      <p>Be the friend you want to have. Offer help, show genuine interest in others, celebrate their wins, and be there during tough times.</p>
      
      <p>Building a strong social circle takes effort, but the rewards are immeasurable. Start with one friendship, then another, and before you know it, you'll have a wonderful community supporting you.</p>
      
      <p>Come join us at the next Lounge Asia meetup – your future best friend might be waiting there!</p>
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Get all post slugs for navigation
  const postSlugs = Object.keys(blogPostsData);
  const currentIndex = slug ? postSlugs.indexOf(slug) : -1;
  const prevSlug = currentIndex > 0 ? postSlugs[currentIndex - 1] : undefined;
  const nextSlug = currentIndex < postSlugs.length - 1 ? postSlugs[currentIndex + 1] : undefined;

  const prevArticle = prevSlug ? {
    slug: prevSlug,
    title: blogPostsData[prevSlug].title,
    category: blogPostsData[prevSlug].category
  } : undefined;

  const nextArticle = nextSlug ? {
    slug: nextSlug,
    title: blogPostsData[nextSlug].title,
    category: blogPostsData[nextSlug].category
  } : undefined;

  // Add IDs to headings in content
  const addHeadingIds = (content: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const headings = tempDiv.querySelectorAll("h2, h3");
    
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
    });
    
    return tempDiv.innerHTML;
  };

  // Swipe gesture handling
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeThreshold = 100;
      const diff = touchStartX.current - touchEndX.current;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && nextSlug) {
          // Swipe left - next article
          window.location.href = `/blog/${nextSlug}`;
        } else if (diff < 0 && prevSlug) {
          // Swipe right - previous article
          window.location.href = `/blog/${prevSlug}`;
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
  }, [nextSlug, prevSlug]);

  // SEO: Dynamic meta tags and structured data
  useEffect(() => {
    if (!post) return;

    // Update document title
    document.title = `${post.title} | Lounge Asia - Brisbane Asian Community`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", post.excerpt);

    // Update OG tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    const fullUrl = window.location.href;
    updateMetaTag("og:title", post.title);
    updateMetaTag("og:description", post.excerpt);
    updateMetaTag("og:image", post.image);
    updateMetaTag("og:url", fullUrl);
    updateMetaTag("og:type", "article");

    // Twitter Card
    const updateTwitterTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    updateTwitterTag("twitter:card", "summary_large_image");
    updateTwitterTag("twitter:title", post.title);
    updateTwitterTag("twitter:description", post.excerpt);
    updateTwitterTag("twitter:image", post.image);

    // JSON-LD Structured Data for Article
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Lounge Asia",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/placeholder.svg`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": fullUrl
      },
      "articleSection": post.category,
      "keywords": `Asian community, Brisbane, ${post.category}, meetup, dating, events`
    });
    document.head.appendChild(script);

    // Scroll to top
    window.scrollTo(0, 0);

    return () => {
      document.head.removeChild(script);
    };
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or may have been removed.</p>
          <Link to="/blog">
            <Button variant="default" className="bg-gradient-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const processedContent = post ? addHeadingIds(post.content) : "";
  const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Sticky Social Share Buttons */}
      <SocialShare url={currentUrl} title={post.title} variant="sticky" />
      
      {/* Hero Image */}
      <div className="pt-16">
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </AspectRatio>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex gap-8 max-w-7xl mx-auto">
          <article className="flex-1 max-w-4xl">
            <div className="bg-card rounded-2xl shadow-hover p-6 md:p-12 animate-fade-in-up">
              {/* Breadcrumb */}
              <Breadcrumb category={post.category} title={post.title} />

              {/* Category Badge */}
              <Badge className="bg-gradient-primary border-0 text-white mb-4">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span>{post.author}</span>
              </div>

              {/* Social Proof */}
              <div className="mb-6">
                <SocialProof slug={slug || ""} />
              </div>

              {/* Share Buttons */}
              <div className="mb-8 pb-8 border-b">
                <SocialShare url={currentUrl} title={post.title} />
              </div>

              {/* Article Body */}
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

              {/* Inline Newsletter CTA */}
              <NewsletterCTA variant="inline" />

              {/* Article Navigation */}
              <ArticleNavigation prevArticle={prevArticle} nextArticle={nextArticle} />

              {/* End Newsletter CTA */}
              <NewsletterCTA variant="end" />
            </div>

            {/* Related Posts */}
            <div className="mt-12 mb-20">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(blogPostsData)
                  .filter(([key, relatedPost]) => 
                    key !== slug && relatedPost.category === post.category
                  )
                  .slice(0, 2)
                  .concat(
                    Object.entries(blogPostsData)
                      .filter(([key, relatedPost]) => 
                        key !== slug && relatedPost.category !== post.category
                      )
                      .slice(0, 2 - Object.entries(blogPostsData)
                        .filter(([key, relatedPost]) => 
                          key !== slug && relatedPost.category === post.category
                        )
                        .length
                      )
                  )
                  .slice(0, 2)
                  .map(([key, relatedPost]) => (
                    <Link 
                      key={key} 
                      to={`/blog/${key}`}
                      className="group"
                    >
                      <div className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 group-hover:-translate-y-1">
                        <AspectRatio ratio={16 / 9} className="overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
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

          {/* Table of Contents - Desktop only */}
          <TableOfContents content={processedContent} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
