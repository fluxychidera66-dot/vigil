"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Growth",
    price: 50,
    earlyPrice: 25,
    popular: false,
    features: [
      "5 monitored pages",
      "1 transaction replay flow",
      "Hourly checks",
      "Email alerts",
      "7-day screenshot history",
    ],
  },
  {
    name: "Business",
    price: 150,
    earlyPrice: 75,
    popular: true,
    features: [
      "50 monitored pages",
      "10 transaction replay flows",
      "5-minute checks",
      "Slack, email & webhook alerts",
      "30-day screenshot history",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: 300,
    earlyPrice: 150,
    popular: false,
    features: [
      "Unlimited monitored pages",
      "Unlimited transaction replays",
      "1-minute checks",
      "All alert channels",
      "90-day screenshot history",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

interface PricingProps {
  onJoinClick: () => void;
}

export default function Pricing({ onJoinClick }: PricingProps) {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Early Access Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Lock in your launch discount by joining the waitlist today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-brand-card border-2 border-purple-500/50 glow-purple"
                  : "bg-brand-card border border-brand-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-gray-500 line-through text-lg">
                      ${plan.price}
                    </span>
                    <span className="text-4xl font-bold text-white">
                      ${plan.earlyPrice}
                    </span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                  <p className="mt-1 text-sm text-purple-400 font-medium">
                    50% off — early access price
                  </p>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-gray-300 text-sm"
                    >
                      <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onJoinClick}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 glow-purple"
                      : "bg-brand-bg border border-brand-border text-white hover:border-purple-500/50"
                  }`}
                >
                  Join Waitlist
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Lock in your launch discount by joining the waitlist today. Prices
          increase at public launch.
        </motion.p>
      </div>
    </section>
  );
}
