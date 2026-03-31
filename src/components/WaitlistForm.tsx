"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface WaitlistFormProps {
  onSubmit: (name: string, email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  compact?: boolean;
}

export default function WaitlistForm({
  onSubmit,
  loading,
  error,
  compact = false,
}: WaitlistFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await onSubmit(compact ? "" : name, email);
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2.5 bg-brand-card border border-brand-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 text-sm whitespace-nowrap flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
        </motion.button>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md">
      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 bg-brand-card border border-brand-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
      />
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 bg-brand-card border border-brand-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2 glow-purple"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Joining...
          </>
        ) : (
          "Join the Waitlist"
        )}
      </motion.button>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm text-center"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}
