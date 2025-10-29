import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface SocialProofProps {
  slug: string;
}

export const SocialProof = ({ slug }: SocialProofProps) => {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    // Simulate fetching view count
    // In production, this would be an API call
    const baseCount = Math.floor(Math.random() * 500) + 100;
    const additionalViews = Math.floor(Math.random() * 50);
    setViewCount(baseCount + additionalViews);

    // Simulate real-time view updates
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>
        <strong className="text-foreground font-medium">{viewCount.toLocaleString()}</strong> people
        have read this article
      </span>
    </div>
  );
};
