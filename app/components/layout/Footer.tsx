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
      className="w-full bg-background border-t border-border/30 py-4 mt-auto transition-colors duration-500 font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

        {/* Creative & Bolder Copyright */}
        <div className="text-xs font-semibold tracking-wide text-foreground/80 transition-colors duration-500 flex items-center gap-1.5">
          <span className="text-[#c4a47c] text-sm">©</span>
          <span>{new Date().getFullYear()}</span>
          <span className="text-border mx-1">|</span>
          <span className="bg-gradient-to-r from-foreground/90 to-foreground/50 bg-clip-text text-transparent">
            Designed by You
          </span>
        </div>

        {/* Raw, Bold & Colorful Icons */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            aria-label="Phone"
            className="text-foreground/50 hover:text-[#c4a47c] hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(196,164,124,0.6)]"
          >
            <Phone size={18} strokeWidth={2.2} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-foreground/50 hover:text-[#c4a47c] hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(196,164,124,0.6)]"
          >
            {/* <Instagram size={18} strokeWidth={2.2} /> */}
          </a>
          <a
            href="#"
            aria-label="Location"
            className="text-foreground/50 hover:text-[#c4a47c] hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(196,164,124,0.6)]"
          >
            <MapPin size={18} strokeWidth={2.2} />
          </a>
        </div>

      </div>
    </motion.footer>
  );
}