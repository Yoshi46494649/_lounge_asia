import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

interface NewsletterCTAProps {
  variant?: "inline" | "end";
}

export const NewsletterCTA = ({ variant = "inline" }: NewsletterCTAProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing! Check your email to confirm.");
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-border p-6 my-8",
        variant === "inline"
          ? "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
          : "bg-card"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3 min-w-[48px] h-[48px] flex items-center justify-center">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">
            {variant === "inline"
              ? "Never Miss an Event!"
              : "Stay Connected with Brisbane's Asian Community"}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Get weekly updates on meetups, dating events, and tips straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-h-[44px]"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="min-h-[44px] min-w-[100px]"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
