import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sparkles, Heart, Share2, Calendar, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiagnosisResultProps {
  diagnosis: string;
  compatibilityScore?: number | null;
  emotionalScore?: number | null;
  communicationScore?: number | null;
  growthScore?: number | null;
  diagnosisType: "today" | "compatibility";
  onBack: () => void;
}

export const DiagnosisResult = ({ 
  diagnosis, 
  compatibilityScore,
  emotionalScore,
  communicationScore,
  growthScore,
  diagnosisType,
  onBack 
}: DiagnosisResultProps) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (platform: "facebook" | "instagram" | "tiktok") => {
    setIsSharing(true);
    const shareText = `I just got my destiny reading! ✨\n\n${diagnosis.substring(0, 200)}...\n\nDiscover yours at ${window.location.origin}`;
    const shareUrl = window.location.origin;

    try {
      if (platform === "facebook") {
        // Facebook opens in new window - if user is logged in, they can share instantly
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        toast({
          title: "Opening Facebook 📘",
          description: "If you're logged in, you can share instantly!",
        });
      } else if (platform === "instagram") {
        // Try to use Web Share API first (works on mobile)
        if (navigator.share) {
          await navigator.share({
            title: 'My Destiny Reading ✨',
            text: shareText,
            url: shareUrl,
          });
          toast({
            title: "Shared successfully! 📸",
            description: "Thanks for sharing your destiny!",
          });
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          toast({
            title: "Copied to clipboard! 📋",
            description: "Open Instagram and paste to share your reading",
          });
        }
      } else if (platform === "tiktok") {
        // Try to use Web Share API first (works on mobile)
        if (navigator.share) {
          await navigator.share({
            title: 'My Destiny Reading ✨',
            text: shareText,
            url: shareUrl,
          });
          toast({
            title: "Shared successfully! 🎵",
            description: "Thanks for sharing your destiny!",
          });
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          toast({
            title: "Copied to clipboard! 📋",
            description: "Open TikTok and paste to share your reading",
          });
        }
      }
    } catch (error) {
      // If user cancels share or clipboard fails
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled share - do nothing
        return;
      }
      console.error("Share error:", error);
      toast({
        title: "Couldn't share 😢",
        description: "Please try again or copy the link manually",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <section className="min-h-screen py-24 px-6 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>

        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-block">
            {diagnosisType === "today" ? (
              <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 animate-sparkle" />
            ) : (
              <Heart className="w-16 h-16 text-secondary mx-auto mb-4 animate-pulse" />
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {diagnosisType === "today" ? "Your Love Fortune Today" : "Your Compatibility Reading"}
          </h2>
          <p className="text-lg text-muted-foreground">
            The stars have aligned to reveal your destiny ✨
          </p>
        </div>

        {/* Compatibility Scores - Moved to top and made more prominent */}
        {diagnosisType === "compatibility" && (emotionalScore || communicationScore || growthScore) && (
          <Card className="p-10 mb-8 shadow-glow border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 backdrop-blur-sm animate-scale-in">
            <h3 className="text-3xl font-bold text-center text-foreground mb-8">
              📊 Compatibility Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emotionalScore !== null && emotionalScore !== undefined && (
                <div className="text-center space-y-3">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${emotionalScore * 3.52} 352`}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{emotionalScore}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">💕 Emotional Connection</p>
                </div>
              )}
              {communicationScore !== null && communicationScore !== undefined && (
                <div className="text-center space-y-3">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${communicationScore * 3.52} 352`}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-secondary">{communicationScore}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">💬 Communication Match</p>
                </div>
              )}
              {growthScore !== null && growthScore !== undefined && (
                <div className="text-center space-y-3">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--accent))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${growthScore * 3.52} 352`}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-accent">{growthScore}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">🌱 Long-Term Growth</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Diagnosis Text */}
        <Card className="p-8 mb-8 shadow-elegant border-border/50 bg-gradient-card backdrop-blur-sm animate-fade-in">
          <div className="prose prose-lg max-w-none text-foreground">
            <div className="whitespace-pre-wrap">{diagnosis}</div>
          </div>
        </Card>

        {/* Share Section */}
        <Card className="p-8 mb-8 shadow-elegant border-border/50 bg-gradient-card backdrop-blur-sm animate-scale-in">
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-primary" />
            Share Your Destiny Reading
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => handleShare("facebook")}
              disabled={isSharing}
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm">Facebook</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare("instagram")}
              disabled={isSharing}
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-sm">Instagram</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare("tiktok")}
              disabled={isSharing}
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              <span className="text-sm">TikTok</span>
            </Button>
          </div>
        </Card>

        {/* Speed Dating CTA - Primary Call to Action */}
        <Card className="p-10 shadow-glow border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 backdrop-blur-sm animate-scale-in">
          <div className="text-center space-y-6">
            <div className="inline-block p-4 rounded-full bg-primary/10">
              <Calendar className="w-14 h-14 text-primary mx-auto" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Meet Your Match?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join Lounge Asia's exclusive speed dating events in Brisbane. 
              Experience genuine conversations with verified Asian singles in a relaxed, safe atmosphere. 
              Your destiny reading has revealed the path — now take the next step! ✨
            </p>
            <Button
              variant="cta"
              size="xl"
              className="mt-6 text-lg w-full sm:w-auto px-6 sm:px-12 py-6 h-auto shadow-glow hover:shadow-soft hover:scale-105"
              onClick={() => window.open('/speed-dating/lp/', '_blank')}
            >
              <Heart className="w-6 h-6 mr-2" />
              Join Speed Dating Events
            </Button>
            <p className="text-sm text-muted-foreground pt-2">
              Limited spots available • ID verified • Balanced pairings
            </p>
          </div>
        </Card>

        {/* Get Another Reading - Secondary Action */}
        <div className="text-center mt-12">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            Get Another Reading
          </Button>
        </div>
      </div>
    </section>
  );
};
