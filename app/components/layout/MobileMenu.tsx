"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Coffee, Tag, MapPin, CupSoda } from "lucide-react";
import { useLanguage } from "../../hooks/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { dict } = useLanguage();

  // Your exact curve logic, untouched.
  // Added 'imgSrc' to pull live placeholder images from Unsplash.
  const menuNodes = [
    { name: dict.header.home, href: "#home", icon: Home, offset: "mr-20", imgSrc: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop" },
    { name: dict.header.menu, href: "#menu", icon: Coffee, offset: "mr-40", imgSrc: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop" },
    { name: dict.header.Juice, href: "#Juice", icon: CupSoda, offset: "mr-60", imgSrc: "https://images.unsplash.com/photo-1622597467836-f38240662c8b?w=200&h=200&fit=crop" },
    { name: dict.header.Tea, href: "#Tea", icon: Coffee, offset: "mr-60", imgSrc: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=200&h=200&fit=crop" },
    { name: dict.header.offers, href: "#offers", icon: Tag, offset: "mr-40", imgSrc: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop" },
    { name: dict.header.offers, href: "#offers", icon: Tag, offset: "mr-20", imgSrc: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] bg-gradient-to-bl from-background via-background/95 to-muted/80 backdrop-blur-3xl flex flex-col justify-start overflow-hidden"
        >
          {/* THE BIG CIRCLE - Moved to the RIGHT side */}
          <motion.div
            initial={{ x: 200, opacity: 0, scale: 0.8 }}
            animate={{ x: 150, opacity: 1, scale: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            // absolute right-0 and translated so half of it is off-screen on the right
            className="absolute top-[440px] -translate-y-1/2 right-0 w-[350px] h-[350px] rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md flex flex-col justify-center items-start pl-16 pointer-events-none"
          >
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-1">Friday</p>
            <h2 className="text-5xl font-black text-foreground tracking-tighter mb-2">29 MAY</h2>
            <p className="text-xl text-foreground/60 tracking-wide font-light">Athens, GR</p>
            <div className="w-12 h-[2px] bg-foreground/20 mt-6" />
          </motion.div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-20 active:scale-95"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Right-aligned Scattered Nodes */}
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              // Kept the nice slow staggered drawing effect
              open: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
            }}
            className="flex flex-col items-end gap-8 w-full mt-32 relative z-10"
          >
            {menuNodes.map((node, i) => (
              <motion.a
                key={i}
                href={node.href}
                onClick={() => setIsOpen(false)}
                variants={{
                  open: { opacity: 1, x: 0, scale: 1 },
                  closed: { opacity: 0, x: 40, scale: 0.8 },
                }}
                transition={{ type: "spring", stiffness: 120, damping: 25 }}
                className={`flex flex-row-reverse items-center gap-4 group cursor-pointer ${node.offset}`}
              >
                {/* The Circular Icon Node WITH BACKGROUND IMAGE */}
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  // Used w-[76px] h-[76px] to fix the w-19 bug but keep your exact size
                  className="w-[76px] h-[76px] rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-500 shadow-lg shrink-0 overflow-hidden relative group-hover:border-foreground/50"
                >
                  {/* Live Background Image */}
                  <img 
                    src={node.imgSrc} 
                    alt={node.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                  />
                  {/* Dark/Light overlay for contrast so the icon is always readable */}
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
                  
                  {/* Icon */}
                  <node.icon size={28} strokeWidth={1.5} className="text-foreground relative z-10 drop-shadow-md" />
                </motion.div>

                {/* Text Label */}
                <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-foreground/70 group-hover:text-foreground transition-colors text-right">
                  {node.name}
                </span>
              </motion.a>
            ))}
          </motion.nav>
          
          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 right-12 text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-right z-10"
          >
            {dict.header.city} • {new Date().getFullYear()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}