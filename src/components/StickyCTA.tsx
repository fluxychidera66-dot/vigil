"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

interface StickyCTAProps {
  onSubmit: (name: string, email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function StickyCTA({ onSubmit, loading, error }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-brand-bg/95 backdrop-blur-xl border-t border-brand-border"
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
            <p className="text-white font-medium text-sm whitespace-nowrap hidden sm:block">
              Join the waitlist – get lifetime discount
            </p>
            <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
              <WaitlistForm
                onSubmit={onSubmit}
                loading={loading}
                error={error}
                compact
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
