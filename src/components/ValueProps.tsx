"use client";

import { motion } from "framer-motion";
import { Bell, Globe, Play } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Instant Visual Alerts",
    description:
      "Slack, email, or webhook alerts with a blurred screenshot of the failure. No more guessing.",
  },
  {
    icon: Globe,
    title: "Whole-Site Crawling",
    description:
      "We automatically discover and check every page for errors, broken elements, and performance issues.",
  },
  {
    icon: Play,
    title: "Transaction Replay",
    description:
      "Record your checkout, sign-up, or any critical flow once; Vigil replays it 24/7 and alerts you the moment a step fails.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ValueProps() {
  return (
    <section id="features" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What You Get
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to catch revenue-killing bugs before your
            customers do.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative bg-brand-card border border-brand-border rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:to-indigo-600/5 rounded-2xl transition-all duration-300" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/20">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
