"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface WaitlistResult {
  position: number;
  referral_code: string;
}

interface UseWaitlistReturn {
  submit: (name: string, email: string, referralCode?: string | null) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  result: WaitlistResult | null;
  reset: () => void;
}

export function useWaitlist(): UseWaitlistReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setResult(null);
  }, []);

  const submit = useCallback(
    async (name: string, email: string, referralCode?: string | null) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: insertError } = await supabase
          .from("waitlist")
          .insert({
            full_name: name,
            email: email.toLowerCase().trim(),
            referred_by: referralCode || null,
            source: "waitlist_page",
          })
          .select("position, referral_code")
          .single();

        if (insertError) {
          if (
            insertError.code === "23505" ||
            insertError.message?.includes("duplicate")
          ) {
            setError(
              "This email is already on the waitlist! We'll be in touch soon."
            );
          } else {
            setError("Something went wrong. Please try again.");
          }
          setLoading(false);
          return;
        }

        setResult({
          position: data.position,
          referral_code: data.referral_code,
        });
        setSuccess(true);
      } catch {
        setError("Network error. Please check your connection and try again.");
      }

      setLoading(false);
    },
    []
  );

  return { submit, loading, error, success, result, reset };
}
