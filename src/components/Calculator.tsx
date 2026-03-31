"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Calculator as CalcIcon } from "lucide-react";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function CalculatorSection() {
  const [aov, setAov] = useState(75);
  const [ordersPerHour, setOrdersPerHour] = useState(20);

  const hourlyCost = aov * ordersPerHour;
  const vigilPrice = 50;
  const paybackMinutes =
    ordersPerHour > 0 && aov > 0
      ? Math.max(1, Math.round((vigilPrice / (aov * ordersPerHour)) * 60))
      : 0;

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
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl" />
          <div className="relative m-[1px] bg-brand-card rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <CalcIcon className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Cost of Downtime Calculator
              </h2>
            </div>

            <p className="text-gray-400 mb-8">
              What would a 1-hour checkout failure cost you?
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">
                  Average order value ($)
                </label>
                <input
                  type="number"
                  min={0}
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-white text-lg font-semibold focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">
                  Orders per hour
                </label>
                <input
                  type="number"
                  min={0}
                  value={ordersPerHour}
                  onChange={(e) => setOrdersPerHour(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl text-white text-lg font-semibold focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <motion.div
              layout
              className="bg-brand-bg border border-brand-border rounded-xl p-6 text-center space-y-2"
            >
              <p className="text-gray-400">
                A 1-hour failure would cost you
              </p>
              <p className="text-4xl font-bold text-white">
                $<AnimatedNumber value={hourlyCost} />
              </p>
              {paybackMinutes > 0 && (
                <p className="text-purple-400 font-medium">
                  Vigil pays for itself in{" "}
                  <span className="text-white font-bold">{paybackMinutes}</span>{" "}
                  {paybackMinutes === 1 ? "minute" : "minutes"}.
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
