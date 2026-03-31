"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Code, Building2 } from "lucide-react";

const stories = [
  {
    icon: ShoppingCart,
    category: "E-commerce",
    headline:
      "A CSS update made the 'Add to Cart' button invisible. Sales dropped 40% in one hour.",
    missed:
      "Traditional uptime monitors showed the site as 100% up. No alerts were triggered because the page loaded fine — the button was just hidden by a CSS z-index bug.",
    caught:
      "Vigil's visual page scanner detects element visibility changes. It would have flagged the invisible button within minutes and sent a screenshot alert to Slack.",
  },
  {
    icon: Code,
    category: "SaaS",
    headline:
      "A third-party API change broke the sign-up form. The founder only noticed after 3 support tickets.",
    missed:
      "Status monitoring showed green. The page loaded, the form rendered, but submissions silently failed with a 422 error from the changed API endpoint.",
    caught:
      "Vigil's transaction replay would have attempted a test sign-up every 5 minutes, caught the 422 error instantly, and alerted the team before any real user was affected.",
  },
  {
    icon: Building2,
    category: "Lead Generation",
    headline:
      "A broken contact form cost a real estate agent $15,000 in lost commissions.",
    missed:
      "The contact form looked fine but the submit handler was broken after a WordPress plugin update. No monitoring tool flagged it because the page loaded normally.",
    caught:
      "Vigil would have replayed a form submission, detected the failure, and sent an immediate alert with a screenshot showing the broken state.",
  },
];

interface FailureStoriesProps {
  onJoinClick: () => void;
}

export default function FailureStories({ onJoinClick }: FailureStoriesProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % stories.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + stories.length) % stories.length);
  };

  const story = stories[current];

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real Failures. Real Costs.
          </h2>
          <p className="text-gray-400 text-lg">
            These stories happen every day to businesses like yours.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-brand-card border border-brand-border min-h-[380px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="p-8 sm:p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-600/20">
                    <story.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-purple-400">
                    {story.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug">
                  &ldquo;{story.headline}&rdquo;
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm font-semibold text-red-400">
                        What traditional monitoring missed
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {story.missed}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-semibold text-green-400">
                        How Vigil catches it
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {story.caught}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white hover:border-purple-500/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white hover:border-purple-500/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-purple-500 w-6"
                      : "bg-brand-border hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-gray-400 mb-4">
              Don&apos;t let this be you.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onJoinClick}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all glow-purple"
            >
              Join the Waitlist
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
