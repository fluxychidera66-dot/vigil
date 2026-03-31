"use client";

import { motion } from "framer-motion";
import { Wrench, ExternalLink } from "lucide-react";

export default function Roadmap() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10" />
          <div className="relative bg-brand-card/80 border border-brand-border rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <Wrench className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Live Status & Public Roadmap
              </h2>
            </div>

            <p className="text-gray-300 text-lg mb-6">
              🔧 Development progress:{" "}
              <span className="text-white font-bold">92% complete</span>.
              Targeting launch in{" "}
              <span className="text-purple-400 font-semibold">Q3 2026</span>.
            </p>

            {/* Progress bar */}
            <div className="relative h-4 bg-brand-bg rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                92%
              </span>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              View our public roadmap
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
