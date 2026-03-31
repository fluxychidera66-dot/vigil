"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> on
            OpenReplay
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Terms
            </a>
          </div>

          <p className="text-gray-600 text-sm">© 2026 Vigil</p>
        </div>
      </motion.div>
    </footer>
  );
}
