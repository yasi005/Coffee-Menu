"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();

  const [expandingNode, setExpandingNode] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const menuNodes = [
    {
      name: dict.header.home,
      href: "#home",
      icon: Home,
      label: "Start here",
      imgSrc:
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop",
      accentColor: "#c4a47c",
    },
    {
      name: dict.header.menu,
      href: "#quick-order",
      icon: Coffee,
      label: "Our coffees",
      imgSrc:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
      accentColor: "#a07850",
    },
    {
      name: dict.header.Juice,
      href: "#Juice",
      icon: CupSoda,
      label: "Fresh pressed",
      imgSrc:
        "https://images.unsplash.com/photo-1622597467836-f38240662c8b?w=200&h=200&fit=crop",
      accentColor: "#e09050",
    },
    {
      name: dict.header.Tea,
      href: "#Tea",
      icon: Coffee,
      label: "Hot & iced",
      imgSrc:
        "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=200&h=200&fit=crop",
      accentColor: "#7c9e78",
    },
    {
      name: dict.header.offers,
      href: "/coffee",
      icon: Tag,
      label: "Today's deals",
      imgSrc:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop",
      accentColor: "#c46a5a",
    },
    {
      name: dict.header.offers,
      href: "#offers",
      icon: Tag,
      label: "Seasonal picks",
      imgSrc:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=200&h=200&fit=crop",
      accentColor: "#8a7cc4",
    },
  ];

  const handleNodeClick = (
    e: React.MouseEvent,
    href: string,
    index: number
  ) => {
    e.preventDefault();
    if (expandingNode !== null) return;
    setExpandingNode(index);

    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        setIsOpen(false);
        setExpandingNode(null);
      }, 300);
    }, 750);
  };

  const isTransitioning = expandingNode !== null;

  // Smooth stagger variants
  const navVariants = {
    open: {
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 120, damping: 22 },
    },
    closed: {
      opacity: 0,
      x: 48,
      filter: "blur(4px)",
      transition: { type: "spring" as const, stiffness: 120, damping: 22 },
    },
  };

  // Offset cascade for visual rhythm
  const offsets = ["mr-2", "mr-10", "mr-20", "mr-28", "mr-16", "mr-6"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            fixed inset-0 z-[60] flex flex-col overflow-hidden select-none
            bg-[#f7f5f0]/96 backdrop-blur-2xl
            dark:bg-[#0f0d0b]/96 dark:backdrop-blur-2xl
          "
        >
          {/* ── Grain texture overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px",
            }}
          />

          {/* ── Subtle top accent line ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c4a47c]/60 to-transparent dark:via-[#c4a47c]/40"
          />

          {/* ── BIG DECORATIVE CIRCLE (preserved, smoothed) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: isTransitioning ? 0 : 1,
              scale: isTransitioning ? 0.88 : 1,
              x: 150,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="
              absolute top-[440px] -translate-y-1/2 right-0
              w-[340px] h-[340px] rounded-full pointer-events-none
              border border-[#c4a47c]/15 dark:border-[#c4a47c]/10
              bg-white/60 dark:bg-white/[0.04]
              backdrop-blur-lg
              shadow-[0_0_60px_rgba(196,164,124,0.08)] dark:shadow-[0_0_60px_rgba(196,164,124,0.04)]
              flex flex-col justify-center items-start pl-14
            "
          >
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#c4a47c] uppercase mb-1">
              {new Date().toLocaleDateString("en-GB", { weekday: "long" })}
            </p>
            <h2 className="text-5xl font-black text-gray-800 dark:text-gray-100 tracking-tighter mb-1 leading-none">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              }).toUpperCase()}
            </h2>
            <p className="text-2xl font-light text-gray-400 dark:text-gray-500 tracking-widest tabular-nums mt-1">
              {currentTime}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-600 tracking-wide font-medium mt-2">
              Athens, GR
            </p>
            <div className="w-10 h-[2px] bg-[#c4a47c]/35 dark:bg-[#c4a47c]/20 mt-5 rounded-full" />
          </motion.div>

          {/* ── Expanding white/dark circle overlay (circle transition – preserved) ── */}
          <AnimatePresence>
            {expandingNode !== null && (
              <motion.div
                key="expanding-overlay"
                initial={{ scale: 0 }}
                animate={{ scale: 80 }}
                transition={{ duration: 0.75, ease: [0.85, 0, 0.15, 1] }}
                className="
                  absolute z-50 pointer-events-none rounded-full
                  bg-white dark:bg-[#0f0d0b]
                "
                style={{
                  width: 72,
                  height: 72,
                  // Position the expanding circle at the tapped node
                  right: 32,
                  top: `${132 + expandingNode * 80}px`,
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              />
            )}
          </AnimatePresence>

          {/* ── Close Button ── */}
          <motion.button
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="
              absolute top-7 right-7 p-2.5 z-20
              rounded-full
              text-gray-400 hover:text-gray-800
              dark:text-gray-500 dark:hover:text-gray-100
              bg-black/[0.04] hover:bg-black/[0.08]
              dark:bg-white/[0.05] dark:hover:bg-white/[0.1]
              transition-all duration-200 active:scale-90
              border border-black/[0.06] dark:border-white/[0.08]
            "
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2} />
          </motion.button>

          {/* ── Location pill (top-left) ── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -8 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="
              absolute top-8 left-7 z-10
              flex items-center gap-1.5 px-3 py-1.5 rounded-full
              bg-black/[0.04] dark:bg-white/[0.06]
              border border-black/[0.06] dark:border-white/[0.08]
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4a47c] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">
              Athens
            </span>
          </motion.div>

          {/* ── Nav Items ── */}
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            className="flex flex-col items-end gap-[18px] w-full mt-28 px-8 relative z-10"
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
                  animate={
                    hideOthers
                      ? { opacity: 0, x: 16, filter: "blur(2px)" }
                      : undefined
                  }
                  transition={{ duration: 0.25 }}
                  className={`flex flex-row-reverse items-center gap-4 group cursor-pointer ${offsets[i]} focus:outline-none`}
                  aria-label={`${node.name} – ${node.label}`}
                >
                  {/* ── Node circle (preserved transition, smoothed) ── */}
                  <motion.div
                    whileTap={!isTransitioning ? { scale: 0.88 } : undefined}
                    whileHover={!isTransitioning ? { scale: 1.06 } : undefined}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                      w-[68px] h-[68px] rounded-full flex items-center justify-center shrink-0
                      overflow-hidden relative
                      bg-white dark:bg-[#1a1713]
                      shadow-[0_6px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.3)]
                      border border-black/[0.06] dark:border-white/[0.08]
                      transition-shadow duration-400
                    `}
                    style={{
                      boxShadow:
                        hoveredNode === i && !isTransitioning
                          ? `0 8px 32px ${node.accentColor}30`
                          : undefined,
                    }}
                  >
                    {/* Background image – fades on transition */}
                    <motion.img
                      src={node.imgSrc}
                      alt=""
                      aria-hidden="true"
                      animate={{
                        opacity: isRevealingThis
                          ? 0
                          : hoveredNode === i
                          ? 0.45
                          : 0.18,
                      }}
                      transition={{ duration: isRevealingThis ? 0.1 : 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply dark:mix-blend-luminosity"
                    />

                    {/* Icon */}
                    <motion.div
                      animate={{ opacity: isRevealingThis ? 0 : 1 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10"
                    >
                      <node.icon
                        size={24}
                        strokeWidth={1.5}
                        className="text-gray-600 dark:text-gray-300 transition-colors"
                        style={
                          hoveredNode === i
                            ? { color: node.accentColor }
                            : undefined
                        }
                      />
                    </motion.div>

                    {/* Hover accent ring */}
                    <motion.div
                      animate={{
                        opacity: hoveredNode === i && !isTransitioning ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 0 1.5px ${node.accentColor}50`,
                      }}
                    />
                  </motion.div>

                  {/* ── Text block ── */}
                  <motion.div
                    animate={{ opacity: isRevealingThis ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-end gap-0.5"
                  >
                    <span
                      className="
                        text-[12px] font-black tracking-[0.18em] uppercase
                        text-gray-500 dark:text-gray-400
                        group-hover:text-[#c4a47c] dark:group-hover:text-[#c4a47c]
                        transition-colors duration-300
                      "
                      style={
                        hoveredNode === i ? { color: node.accentColor } : undefined
                      }
                    >
                      {node.name}
                    </span>
                    <span
                      className="
                        text-[10px] tracking-[0.08em] font-medium
                        text-gray-350 dark:text-gray-600
                        group-hover:text-gray-400 dark:group-hover:text-gray-500
                        transition-colors duration-300
                      "
                    >
                      {node.label}
                    </span>
                  </motion.div>

                  {/* ── Chevron hint ── */}
                  <motion.div
                    animate={{
                      opacity: hoveredNode === i && !isTransitioning ? 1 : 0,
                      x: hoveredNode === i ? 0 : -4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="text-[#c4a47c] dark:text-[#c4a47c]/70"
                    />
                  </motion.div>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* ── Bottom tagline ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="
              absolute bottom-10 left-8 z-10
              text-[10px] font-medium tracking-[0.22em] uppercase
              text-gray-300 dark:text-gray-700
            "
          >
            Brewed with care · Athens
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}