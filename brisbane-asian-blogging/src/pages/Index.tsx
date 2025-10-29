import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-shimmer" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Lounge Asia
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Your East Asian Community in Brisbane
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            ブリスベンのアジア人コミュニティ。イベント、グルメ、ライフスタイル情報を発信中。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blog">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 group">
                ブログを読む
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="https://www.facebook.com/profile.php?id=61575030717215" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Facebookでフォロー
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
