import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { getSupabaseClient } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_SUCCESS = "Welcome to the waitlist! Check your email for next steps.";
const FALLBACK_DELAY = 600;

type UseWaitlistSignupOptions = {
  successMessage?: string;
  source?: string;
  context?: Record<string, unknown>;
};

export const useWaitlistSignup = (options: UseWaitlistSignupOptions = {}) => {
  const { successMessage = DEFAULT_SUCCESS, source = "landing_waitlist", context } = options;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = useMemo(() => getSupabaseClient(), []);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      event?.preventDefault();

      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail) {
        toast.error("Please enter your email address");
        return;
      }

      if (!EMAIL_REGEX.test(trimmedEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }

      setIsSubmitting(true);

      const resolveSuccess = () => {
        toast.success(successMessage);
        setEmail("");
      };

      if (!supabase) {
        setTimeout(() => {
          resolveSuccess();
          setIsSubmitting(false);
        }, FALLBACK_DELAY);
        return;
      }

      try {
        const { error } = await supabase
          .from("waitlist_signups")
          .upsert(
            {
              email: trimmedEmail,
              source,
              context: context ?? null,
              submitted_at: new Date().toISOString(),
            },
            { onConflict: "email" },
          );

        if (error) {
          throw error;
        }

        resolveSuccess();
      } catch (error) {
        console.error("[Waitlist] Failed to record signup", error);
        toast.error("We couldn't save your email. Please try again shortly.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [context, email, source, successMessage, supabase],
  );

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
  };
};
