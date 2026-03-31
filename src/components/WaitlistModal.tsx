"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Twitter, Linkedin, Share2 } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: number;
  referralCode: string;
}

export default function WaitlistModal({
  isOpen,
  onClose,
  position,
  referralCode,
}: WaitlistModalProps) {
  const [copied, setCopied] = useState(false);

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}?ref=${referralCode}`
      : `https://vigil.app?ref=${referralCode}`;

  const shareText = encodeURIComponent(
    "I just joined the Vigil waitlist – stop losing money to silent website failures. Join me:"
  );
  const shareUrl = encodeURIComponent(referralLink);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-8 glow-purple-lg"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 mb-4"
              >
                <span className="text-3xl">🎉</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                You&apos;re #{position} on the waitlist!
              </h3>
              <p className="text-gray-400">
                Share your unique link and move up{" "}
                <span className="text-purple-400 font-semibold">10 spots</span>{" "}
                for every friend who joins.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-brand-bg border border-brand-border rounded-xl p-3">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-transparent text-sm text-gray-300 outline-none truncate"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white text-sm font-medium hover:from-purple-500 hover:to-indigo-500 transition-all whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex gap-3">
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-bg border border-brand-border rounded-xl text-gray-300 hover:text-white hover:border-purple-500/50 transition-all"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-bg border border-brand-border rounded-xl text-gray-300 hover:text-white hover:border-purple-500/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-bg border border-brand-border rounded-xl text-gray-300 hover:text-white hover:border-purple-500/50 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Copy Link</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
