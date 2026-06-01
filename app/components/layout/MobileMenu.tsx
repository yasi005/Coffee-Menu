"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Coffee, Tag, CupSoda, ChevronRight } from "lucide-react";
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
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Track dark mode from <html> class
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Live clock
  useEffect(() => {
    const tick = () =>
      setCurrentTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const menuNodes = [
    { name: dict.header.home, href: "#home", icon: Home, label: "Start here", imgSrc: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop", accentColor: "#c4a47c" },
    { name: dict.header.menu, href: "#quick-order", icon: Coffee, label: "Our coffees", imgSrc: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop", accentColor: "#a07850" },
    { name: dict.header.Juice, href: "#Juice", icon: CupSoda, label: "Fresh pressed", imgSrc: "https://images.unsplash.com/photo-1622597467836-f38240662c8b?w=200&h=200&fit=crop", accentColor: "#e09050" },
    { name: dict.header.Tea, href: "#Tea", icon: Coffee, label: "Hot & iced", imgSrc: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=200&h=200&fit=crop", accentColor: "#7c9e78" },
    { name: dict.header.offers, href: "/coffee", icon: Tag, label: "Today's deals", imgSrc: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop", accentColor: "#c46a5a" },
    { name: dict.header.offers, href: "#offers", icon: Tag, label: "Seasonal picks", imgSrc: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop", accentColor: "#8a7cc4" },
  ];

  // Cascade offsets — peak indent at middle items, mimicking an arc feel
  const offsets = ["mr-6", "mr-16", "mr-28", "mr-28", "mr-16", "mr-6"];

  const handleNodeClick = (e: React.MouseEvent, href: string, index: number) => {
    e.preventDefault();
    if (expandingNode !== null) return;
    setExpandingNode(index);
    setTimeout(() => {
      router.push(href);
      setTimeout(() => { setIsOpen(false); setExpandingNode(null); }, 300);
    }, 750);
  };

  const isTransitioning = expandingNode !== null;
  const expandBg = isDark ? "#0f0d0b" : "#ffffff";

  const navVariants = {
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
    closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 as const } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 120, damping: 22 } },
    closed: { opacity: 0, x: 48, filter: "blur(4px)", transition: { type: "spring" as const, stiffness: 120, damping: 22 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[60] overflow-hidden select-none
            bg-[#f7f5f0]/96 dark:bg-[#0f0d0b]/96 backdrop-blur-2xl"
        >

          {/* ── Grain texture ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px",
            }}
          />

          {/* ── Top accent line ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="absolute top-0 left-0 right-0 h-[2px]
              bg-gradient-to-r from-transparent via-[#c4a47c]/60 to-transparent
              dark:via-[#c4a47c]/30"
          />

          {/* ── Expanding page-transition overlay ── */}
          <AnimatePresence>
            {expandingNode !== null && (
              <motion.div
                key="expand"
                initial={{ scale: 0 }}
                animate={{ scale: 80 }}
                transition={{ duration: 0.75, ease: [0.85, 0, 0.15, 1] }}
                className="absolute z-50 pointer-events-none rounded-full"
                style={{
                  width: 68,
                  height: 68,
                  // Align to where the tapped node circle lives in the nav list
                  right: 32,
                  top: 112 + expandingNode * 76,
                  transformOrigin: "center center",
                  willChange: "transform",
                  backgroundColor: expandBg,
                }}
              />
            )}
          </AnimatePresence>

          {/* ── Close button ── */}
          <motion.button
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-7 right-7 p-2.5 z-20 rounded-full
              text-gray-500 hover:text-gray-900
              dark:text-gray-500 dark:hover:text-gray-100
              bg-black/[0.05] hover:bg-black/[0.09]
              dark:bg-white/[0.05] dark:hover:bg-white/[0.1]
              border border-black/[0.07] dark:border-white/[0.09]
              transition-all duration-200 active:scale-90"
          >
            <X size={22} strokeWidth={2} />
          </motion.button>

          {/* ── Location pill ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -8 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute top-8 left-7 z-10
              flex items-center gap-1.5 px-3 py-1.5 rounded-full
              bg-black/[0.04] dark:bg-white/[0.05]
              border border-black/[0.06] dark:border-white/[0.08]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-widest uppercase
              text-gray-500 dark:text-gray-400">
              Athens
            </span>
          </motion.div>

          {/* ── Nav list — staggered vertical cascade ── */}
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            className="absolute top-0 left-0 right-0 z-10
              flex flex-col items-end gap-5 pt-28 px-8"
            role="navigation"
            aria-label="Main menu"
          >
            {menuNodes.map((node, i) => {
              const isRevealingThis = expandingNode === i;
              const hideOthers = isTransitioning && !isRevealingThis;

              return (
                <motion.a
                  key={i}
                  href={node.href}
                  onClick={(e) => handleNodeClick(e, node.href, i)}
                  onMouseEnter={() => !isTransitioning && setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  variants={itemVariants}
                  animate={hideOthers ? { opacity: 0, x: 16, filter: "blur(2px)" } : undefined}
                  transition={{ duration: 0.22 }}
                  className={`flex flex-row-reverse items-center gap-4 cursor-pointer group focus:outline-none ${offsets[i]}`}
                  aria-label={`${node.name} – ${node.label}`}
                >
                  {/* ── Node circle ── */}
                  <motion.div
                    whileTap={!isTransitioning ? { scale: 0.88 } : undefined}
                    whileHover={!isTransitioning ? { scale: 1.08 } : undefined}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-full flex items-center justify-center shrink-0
                      overflow-hidden relative
                      bg-white dark:bg-[#1c1916]
                      border border-black/[0.06] dark:border-white/[0.08]
                      transition-shadow duration-300"
                    style={{
                      width: 68,
                      height: 68,
                      boxShadow: hoveredNode === i && !isTransitioning
                        ? `0 8px 32px ${node.accentColor}40`
                        : isDark
                          ? "0 6px 24px rgba(0,0,0,0.4)"
                          : "0 6px 24px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Background image */}
                    <motion.img
                      src={node.imgSrc}
                      alt=""
                      aria-hidden="true"
                      animate={{ opacity: isRevealingThis ? 0 : hoveredNode === i ? 0.45 : 0.18 }}
                      transition={{ duration: isRevealingThis ? 0.1 : 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover
                        mix-blend-multiply dark:mix-blend-luminosity"
                    />
                    {/* Icon */}
                    <motion.div
                      animate={{ opacity: isRevealingThis ? 0 : 1 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10"
                    >
                      <node.icon
                        size={22}
                        strokeWidth={1.5}
                        className="text-gray-600 dark:text-gray-300 transition-colors"
                        style={hoveredNode === i ? { color: node.accentColor } : undefined}
                      />
                    </motion.div>
                    {/* Hover ring */}
                    <motion.div
                      animate={{ opacity: hoveredNode === i && !isTransitioning ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1.5px ${node.accentColor}55` }}
                    />
                  </motion.div>

                  {/* ── Text label ── */}
                  <motion.div
                    animate={{ opacity: isRevealingThis ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-end gap-0.5"
                  >
                    <span
                      className="text-[12px] font-black tracking-[0.18em] uppercase
                        text-gray-500 dark:text-gray-400
                        group-hover:text-[#c4a47c] dark:group-hover:text-[#c4a47c]
                        transition-colors duration-300"
                      style={hoveredNode === i ? { color: node.accentColor } : undefined}
                    >
                      {node.name}
                    </span>
                    <span className="text-[10px] tracking-[0.08em] font-medium
                      text-gray-400 dark:text-gray-600
                      group-hover:text-gray-500 dark:group-hover:text-gray-500
                      transition-colors duration-300">
                      {node.label}
                    </span>
                  </motion.div>

                  {/* Chevron on hover */}
                  <motion.div
                    animate={{
                      opacity: hoveredNode === i && !isTransitioning ? 1 : 0,
                      x: hoveredNode === i ? 0 : -4,
                    }}
                    transition={{ duration: 0.18 }}
                  >
                    <ChevronRight size={13} strokeWidth={2.5} className="text-[#c4a47c] dark:text-[#c4a47c]/60" />
                  </motion.div>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* ── Bottom tagline ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="absolute bottom-10 left-8 z-10
              text-[10px] font-medium tracking-[0.22em] uppercase
              text-gray-300 dark:text-gray-700"
          >
            Brewed with care · Athens
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}