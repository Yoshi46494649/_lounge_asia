import { Mail, Lock } from "lucide-react";
import { useWaitlistSignup } from "@/hooks/use-waitlist-signup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const WaitlistCTA = () => {
  const { email, setEmail, isSubmitting, handleSubmit } = useWaitlistSignup({
    successMessage: "Thanks! We’ll notify you about the next Lounge Asia experience before it sells out.",
    source: "blog_post_bottom_cta",
  });

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-[0_25px_55px_rgba(8,12,28,0.5)] md:mt-16 md:p-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-yellow-200/80">Stay in the loop</p>
          <h3 className="text-2xl font-bold text-white md:text-3xl">Get Early Access</h3>
          <p className="text-sm text-slate-300 md:text-base">
            Secure your spot at the next Lounge Asia event before tickets go public. Drop your email and we&apos;ll send
            early invitations, event highlights, and insider offers curated for Brisbane&apos;s Asian community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 md:max-w-sm"
        >
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              disabled={isSubmitting}
              className="h-12 rounded-xl border border-white/10 bg-gray-900/70 pl-12 text-slate-100 placeholder:text-slate-400 focus:border-yellow-400/70 focus:ring-yellow-400/30"
            />
          </div>
          <Button
            type="submit"
            className="h-12 rounded-xl bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining..." : "Get Early Access Now"}
          </Button>
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="h-4 w-4" />
            <span>Your details are safe. We respect your privacy.</span>
          </p>
        </form>
      </div>
    </section>
  );
};
