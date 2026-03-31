"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import WaitlistForm from "./WaitlistForm";

interface HeroProps {
  onSubmit: (name: string, email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SlackNotification = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
    className="relative w-full max-w-sm"
  >
    {/* Glow behind */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-xl" />

    <div className="relative bg-brand-card border border-brand-border rounded-2xl p-5 space-y-3">
      {/* Slack header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">V</span>
        </div>
        <span className="text-white text-sm font-semibold">#vigil-alerts</span>
        <span className="text-gray-500 text-xs ml-auto">just now</span>
      </div>

      {/* Alert message */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            🚨 CRITICAL
          </span>
        </div>
        <p className="text-white text-sm font-medium">
          Checkout button not clickable on /pricing
        </p>
        <p className="text-gray-400 text-xs">
          Element <code className="text-purple-400">.btn-checkout</code> is
          obscured by overlapping div. Users cannot complete purchase.
        </p>

        {/* Blurred screenshot mock */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="relative rounded-lg overflow-hidden mt-2"
        >
          <div className="h-28 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 blur-[2px]">
            <div className="p-3 space-y-2">
              <div className="h-3 w-3/4 bg-gray-600 rounded" />
              <div className="h-3 w-1/2 bg-gray-600 rounded" />
              <div className="flex gap-2 mt-3">
                <div className="h-8 w-20 bg-gray-600 rounded" />
                <div className="h-8 w-20 bg-red-500/40 rounded border-2 border-red-500/60" />
              </div>
              <div className="h-3 w-2/3 bg-gray-600 rounded" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 to-transparent" />
          <div className="absolute bottom-2 left-2 text-xs text-gray-400">
            📸 Screenshot captured
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-brand-bg border border-brand-border text-gray-300">
          View Details
        </span>
        <span className="px-3 py-1.5 rounded-md text-xs font-medium bg-purple-600/20 border border-purple-500/30 text-purple-400">
          Acknowledge
        </span>
      </div>
    </div>

    {/* Animated ping */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
    />
  </motion.div>
);

export default function Hero({ onSubmit, loading, error }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20"
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-purple-400 text-sm font-medium">
                  Early access launching Q3 2026
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Stop losing money to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  silent website failures.
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg">
                Vigil alerts you before customers notice a broken checkout,
                sign-up, payment, or any revenue-critical flow. Join the
                waitlist for early access and a lifetime discount.
              </p>
            </div>

            <WaitlistForm onSubmit={onSubmit} loading={loading} error={error} />

            <a
              href="#features"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors text-sm"
            >
              See how it works
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.span>
            </a>
          </motion.div>

          {/* Right - Animated Slack notification */}
          <div className="hidden lg:flex justify-center">
            <SlackNotification />
          </div>
        </div>
      </div>
    </section>
  );
}
