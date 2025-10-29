import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  variant?: "default" | "sticky";
}

export const SocialShare = ({ url, title, variant = "default" }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  if (variant === "sticky") {
    return (
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-10">
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleShare("facebook")}
          className="rounded-full bg-background/95 backdrop-blur min-w-[48px] min-h-[48px]"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleShare("twitter")}
          className="rounded-full bg-background/95 backdrop-blur min-w-[48px] min-h-[48px]"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => handleShare("line")}
          className="rounded-full bg-background/95 backdrop-blur min-w-[48px] min-h-[48px]"
          aria-label="Share on LINE"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleCopyLink}
          className="rounded-full bg-background/95 backdrop-blur min-w-[48px] min-h-[48px]"
          aria-label="Copy link"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleShare("facebook")}
        className="gap-2 min-h-[44px]"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleShare("twitter")}
        className="gap-2 min-h-[44px]"
      >
        <Twitter className="h-4 w-4" />
        Twitter
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleShare("line")}
        className="gap-2 min-h-[44px]"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
        LINE
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleCopyLink}
        className="gap-2 min-h-[44px]"
      >
        <Share2 className="h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
};
