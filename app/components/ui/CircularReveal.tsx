"use client";

import { motion } from "framer-motion";

interface CircularRevealProps {
  children: React.ReactNode;
  bgColor?: string;
}

export default function CircularReveal({ children, bgColor = "bg-white" }: CircularRevealProps) {
  return (
    <motion.div
      // Starts as a completely invisible dot in the center of the screen
      initial={{ clipPath: "circle(0% at 50% 50%)" }}
      // Expands to cover the entire screen (150% ensures the corners are covered)
      animate={{ clipPath: "circle(150% at 50% 50%)" }}
      // If you ever use AnimatePresence for exiting, it shrinks back down
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      // A premium, slightly slow ease-out curve (like Apple animations)
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`w-full min-h-screen ${bgColor}`}
    >
      {children}
    </motion.div>
  );
}