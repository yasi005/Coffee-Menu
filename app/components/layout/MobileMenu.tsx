"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Coffee, Tag, MapPin, CupSoda } from "lucide-react";
import { useLanguage } from "../../hooks/LanguageContext";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { dict } = useLanguage();
  const router = useRouter();
  
  const [expandingNode, setExpandingNode] = useState<number | null>(null);

  const menuNodes = [
    { name: dict.header.home, href: "#home", icon: Home, offset: "mr-20", imgSrc: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop" },
    { name: dict.header.menu, href: "#quick-order", icon: Coffee, offset: "mr-40", imgSrc: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop" },
    { name: dict.header.Juice, href: "#Juice", icon: CupSoda, offset: "mr-60", imgSrc: "https://images.unsplash.com/photo-1622597467836-f38240662c8b?w=200&h=200&fit=crop" },
    { name: dict.header.Tea, href: "#Tea", icon: Coffee, offset: "mr-60", imgSrc: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=200&h=200&fit=crop" },
    { name: dict.header.offers, href: "/coffee", icon: Tag, offset: "mr-40", imgSrc: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop" },
    { name: dict.header.offers, href: "#offers", icon: Tag, offset: "mr-20", imgSrc: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop" },
  ];

  const handleNodeClick = (e: React.MouseEvent, href: string, index: number) => {
    e.preventDefault();
    setExpandingNode(index);

    // Wait 700ms for the elegant white expansion to finish
    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        setIsOpen(false);
        setExpandingNode(null);
      }, 300);
    }, 700);
  };

  const isTransitioning = expandingNode !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          // CLEAN AESTHETIC: Soft off-white frosted glass, exactly matching the target pages
          className="fixed inset-0 z-[60] bg-[#f9f8f4]/95 backdrop-blur-xl flex flex-col justify-start overflow-hidden font-sans"
        >
          {/* THE BIG CIRCLE - Now acts as a soft, elegant beige anchor */}
          <motion.div
            animate={{ opacity: isTransitioning ? 0 : 1, x: isTransitioning ? 200 : 150 }}
            transition={{ duration: 0.4 }}
            className="absolute top-[440px] -translate-y-1/2 right-0 w-[350px] h-[350px] rounded-full border border-[#c4a47c]/20 bg-white/50 backdrop-blur-md flex flex-col justify-center items-start pl-16 pointer-events-none shadow-[0_0_40px_rgba(196,164,124,0.1)]"
          >
            <p className="text-sm font-bold tracking-widest text-[#c4a47c] uppercase mb-1">Friday</p>
            <h2 className="text-5xl font-black text-gray-800 tracking-tighter mb-2">29 MAY</h2>
            <p className="text-xl text-gray-500 tracking-wide font-medium">Athens, GR</p>
            <div className="w-12 h-[3px] bg-[#c4a47c]/40 mt-6 rounded-full" />
          </motion.div>

          <motion.button
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 p-3 text-gray-400 hover:text-gray-800 transition-colors z-20 active:scale-95"
          >
            <X size={32} strokeWidth={2} />
          </motion.button>

          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
            }}
            className="flex flex-col items-end gap-8 w-full mt-32 relative z-10"
          >
            {menuNodes.map((node, i) => {
              const isRevealingThis = expandingNode === i;
              const hideOthers = isTransitioning && !isRevealingThis;

              return (
                <motion.a
                  key={i}
                  href={node.href}
                  onClick={(e) => handleNodeClick(e, node.href, i)}
                  variants={{
                    open: { opacity: 1, x: 0, scale: 1 },
                    closed: { opacity: 0, x: 40, scale: 0.8 },
                  }}
                  animate={hideOthers ? { opacity: 0, x: 20 } : {}}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  className={`flex flex-row-reverse items-center gap-5 group cursor-pointer ${node.offset}`}
                >
                  {/* THE NODE: Now a clean, soft white circle with an elegant shadow */}
                  <motion.div 
                    whileTap={!isTransitioning ? { scale: 0.9 } : undefined}
                    // When clicked, it expands with pure #ffffff to flawlessly match the destination page
                    animate={isRevealingThis ? { scale: 80, zIndex: 100, backgroundColor: "#ffffff" } : { scale: 1, zIndex: 1, backgroundColor: "#ffffff" }}
                    transition={isRevealingThis ? { duration: 0.7, ease: [0.85, 0, 0.15, 1] } : { duration: 0.3 }}
                    style={{ willChange: "transform" }}
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center shrink-0 overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgb(196,164,124,0.2)] transition-shadow duration-500 border border-gray-100"
                  >
                    {/* Image fades out immediately to prevent ugly stretching */}
                    <motion.img 
                      src={node.imgSrc} 
                      alt={node.name} 
                      animate={{ opacity: isRevealingThis ? 0 : 0.25 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-opacity"
                    />
                    
                    <motion.div animate={{ opacity: isRevealingThis ? 0 : 1 }}>
                      <node.icon size={26} strokeWidth={1.5} className="text-gray-700 relative z-10" />
                    </motion.div>
                  </motion.div>

                  {/* Text Label */}
                  <motion.span 
                    animate={{ opacity: isRevealingThis ? 0 : 1 }}
                    className="text-[13px] font-black tracking-[0.15em] uppercase text-gray-500 group-hover:text-[#c4a47c] transition-colors text-right"
                  >
                    {node.name}
                  </motion.span>
                </motion.a>
              );
            })}
          </motion.nav>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}