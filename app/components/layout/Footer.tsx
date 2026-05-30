"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 py-10 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
        
        {/* Contact & Socials */}
        <div className="flex justify-center gap-4">
          <a href="#" className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 transition-colors">
            <Phone size={20} />
          </a>
          <a href="#" className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 transition-colors">
            <Phone size={20} />
          </a>
          <a href="#" className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 transition-colors">
            <MapPin size={20} />
          </a>
        </div>

        {/* Address */}
        <div className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
          <p>Odos Ermou 12, Athens 105 63</p>
          <p>+30 21 1234 5678</p>
        </div>

        {/* Copyright */}
        <div className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
          Designed by You • © {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </motion.footer>
  );
}