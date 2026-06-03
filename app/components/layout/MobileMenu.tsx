"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Coffee, CupSoda, Utensils, Leaf, Cake, MapPin, ArrowUpRight } from "lucide-react";
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
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setCurrentTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // لیست جدید دسته‌بندی‌ها با عکس پس‌زمینه و گرید نامتقارن
  const menuNodes = [
    { name: dict.header?.home || "Home", href: "/", icon: Home, label: "Start here", colSpan: 2, height: "h-40", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=300&fit=crop" },
    { name: dict.header?.coffee || "Coffee", href: "/coffee", icon: Coffee, label: "Hot & Iced", colSpan: 1, height: "h-36", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300&h=300&fit=crop" },
    { name: dict.header?.drinks || "Drinks", href: "/drinks", icon: CupSoda, label: "Refreshers", colSpan: 1, height: "h-36", image: "https://plus.unsplash.com/premium_photo-1723924878055-37ba67a1f11d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyfGVufDB8fDB8fHww" },
    { name: dict.header?.foods || "Foods", href: "/foods", icon: Utensils, label: "Brunch & More", colSpan: 1, height: "h-36", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&h=300&fit=crop" },
    { name: dict.header?.appetizer || "Appetizer", href: "/appetizer", icon: Leaf, label: "Starters", colSpan: 1, height: "h-36", image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=300&h=300&fit=crop" },
    { name: dict.header?.dessert || "Dessert", href: "/dessert", icon: Cake, label: "Sweet Treats", colSpan: 2, height: "h-40", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=300&fit=crop" },
  ];

  const handleNodeClick = (e: React.MouseEvent, href: string, index: number) => {
    e.preventDefault();
    if (expandingNode !== null) return;
    setExpandingNode(index);

    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        setIsOpen(false);
        setExpandingNode(null);
      }, 300);
    }, 600);
  };

  const isTransitioning = expandingNode !== null;

  const containerVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 as const } },
  };

  const cardVariants = {
    open: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 20 } },
    closed: { opacity: 0, scale: 0.8, y: 20, filter: "blur(5px)", transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-[60] flex flex-col bg-[#f9f8f6] dark:bg-[#0c0a09] overflow-y-auto overflow-x-hidden"
        >
          {/* هدر */}
          <div className="relative z-40 flex items-center justify-between px-6 py-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isTransitioning ? 0 : 1, x: isTransitioning ? -20 : 0 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/10"
            >
              <MapPin size={16} className="text-[#c4a47c]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
                  Athens
                </span>
                <span className="text-[9px] tracking-widest text-gray-400 dark:text-gray-400">
                  {currentTime}
                </span>
              </div>
            </motion.div>

            <motion.button
              animate={{ opacity: isTransitioning ? 0 : 1, rotate: isTransitioning ? 90 : 0 }}
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-full bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 shadow-sm border border-black/5 dark:border-white/10 active:scale-90 transition-all"
            >
              <X size={20} strokeWidth={2.5} />
            </motion.button>
          </div>

          {/* محتوای گرید (Bento) */}
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className="flex-1 px-6 pt-2 pb-12 z-40 grid grid-cols-2 gap-3 content-start"
          >
            {menuNodes.map((node, i) => {
              const isRevealingThis = expandingNode === i;
              const hideOthers = isTransitioning && !isRevealingThis;

              return (
                <motion.a
                  key={i}
                  href={node.href}
                  onClick={(e) => handleNodeClick(e, node.href, i)}
                  variants={cardVariants}
                  animate={
                    isRevealingThis
                      ? { scale: 1.05, opacity: 1, zIndex: 50 }
                      : hideOthers
                        ? { opacity: 0, scale: 0.9, filter: "blur(8px)" }
                        : undefined
                  }
                  whileTap={!isTransitioning ? { scale: 0.96 } : undefined}
                  className={`group relative flex flex-col justify-between rounded-[2rem] overflow-hidden shadow-sm ${node.height}`}
                  style={{ gridColumn: `span ${node.colSpan}` }}
                >
                  {/* عکس پس‌زمینه */}
                  <div className="absolute inset-0">
                    <img
                      src={node.image}
                      alt={node.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* لایه تیره روی عکس که در دارک مود کمی غلیظ‌تر میشه */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 dark:from-black/90 dark:via-black/50 dark:to-black/40 transition-colors" />
                  </div>

                  {/* محتوای روی کارت */}
                  <div className="relative z-10 flex justify-between items-start w-full pt-4 px-4">
                    <div className="p-2.5 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-md text-white border border-white/20">
                      <node.icon size={22} strokeWidth={1.5} />
                    </div>
                    <ArrowUpRight size={22} className="text-white/70 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  <div className="relative z-10 p-5 flex flex-col">
                    <span className="text-lg font-black tracking-wider uppercase text-white drop-shadow-md">
                      {node.name}
                    </span>
                    <span className="text-xs font-medium tracking-widest text-white/80 mt-0.5 drop-shadow-sm">
                      {node.label}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}