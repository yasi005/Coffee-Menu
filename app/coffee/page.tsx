"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, ArrowLeft, LayoutGrid, List, GalleryHorizontal } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../hooks/LanguageContext";
import CircularReveal from "../components/ui/CircularReveal";

type ViewMode = "carousel" | "list" | "grid";

const coffeeItems = [
  { id: 1, category: "Cappuccino", titleEn: "Classic Cappuccino",     titleEl: "Κλασικό Καπουτσίνο",      volume: "160 ml", rating: "4.8", price: "4.50", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop" },
  { id: 2, category: "Cappuccino", titleEn: "Caramel Cappuccino",     titleEl: "Καπουτσίνο Καραμέλα",      volume: "180 ml", rating: "4.7", price: "5.00", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop" },
  { id: 3, category: "Cappuccino", titleEn: "Vanilla Cappuccino",     titleEl: "Καπουτσίνο Βανίλια",       volume: "160 ml", rating: "4.9", price: "4.80", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop" },
  { id: 4, category: "Cappuccino", titleEn: "Mocha Cappuccino",       titleEl: "Μόκα Καπουτσίνο",          volume: "200 ml", rating: "4.6", price: "5.50", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop" },
  { id: 5, category: "Latte",      titleEn: "Signature Latte",        titleEl: "Λάτε Signature",            volume: "240 ml", rating: "4.8", price: "4.90", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop" },
  { id: 6, category: "Latte",      titleEn: "Iced Spanish Latte",     titleEl: "Spanish Latte Κρύο",        volume: "260 ml", rating: "4.9", price: "5.40", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop" },
  { id: 7, category: "Espresso",   titleEn: "Ristretto Double",       titleEl: "Διπλός Ristretto",          volume: "60 ml",  rating: "4.9", price: "3.50", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop" },
  { id: 8, category: "Espresso",   titleEn: "Espresso Macchiato",     titleEl: "Εσπρέσο Μακιάτο",          volume: "70 ml",  rating: "4.7", price: "3.80", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop" },
  { id: 9, category: "Cold Brew",  titleEn: "Nitro Cold Brew",        titleEl: "Nitro Cold Brew",           volume: "300 ml", rating: "4.9", price: "5.00", image: "https://images.unsplash.com/photo-1499961024600-ad094db60584?w=400&h=400&fit=crop" },
  { id: 10, category: "Cold Brew", titleEn: "Vanilla Cold Foam",      titleEl: "Cold Brew με Αφρό",         volume: "320 ml", rating: "4.8", price: "5.50", image: "https://images.unsplash.com/photo-1517701550927-30cfcb07076b?w=400&h=400&fit=crop" },
];

const CARD_W = 240;
const CARD_GAP = 18; // margin on each side = 9px => neighbours sit close
const STEP = CARD_W + CARD_GAP;
const categories = ["Cappuccino", "Latte", "Espresso", "Cold Brew"];

export default function CoffeePage() {
  const { lang } = useLanguage();

  const [viewMode, setViewMode]           = useState<ViewMode>("carousel");
  const [activeCategory, setActiveCategory] = useState("Cappuccino");
  const [activeIndex, setActiveIndex]     = useState(0);
  const [wrapWidth, setWrapWidth]         = useState(375); // fallback mobile width

  const wrapRef    = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchRef  = useRef<HTMLInputElement>(null);

  const filteredItems = coffeeItems.filter(i => i.category === activeCategory);

  // ─── INFINITE LOOP: triple-clone array so we always have prev+curr+next ──
  // Layout: [ ...clone_A... | ...real... | ...clone_B... ]
  // We start in the "real" section (offset = N items in).
  // When activeIndex would leave the real section, we silently jump back.
  const N = filteredItems.length;
  // loopItems = clone_A + real + clone_B  (3× the real items)
  const loopItems = N > 0 ? [...filteredItems, ...filteredItems, ...filteredItems] : [];
  // visual index into loopItems; real section starts at N
  const loopIndex = N + activeIndex; // always points into the "real" middle block

  // ─── measure wrap width ───────────────────────────────────────────────────
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setWrapWidth(wrapRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // centerOffset: pixels from track left-edge to place loopItems[0] in the middle
  const centerOffset = (wrapWidth - CARD_W) / 2;

  // ─── apply translateX whenever loopIndex / centerOffset changes ───────────
  const applyTranslate = useCallback((idx: number, animated: boolean) => {
    if (!trackRef.current) return;
    const x = centerOffset - idx * STEP;
    if (!animated) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform  = `translateX(${x}px)`;
    } else {
      trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
      trackRef.current.style.transform  = `translateX(${x}px)`;
    }
  }, [centerOffset]);

  useEffect(() => {
    applyTranslate(loopIndex, true);
  }, [loopIndex, applyTranslate]);

  // ─── after each animated slide, check if we need a silent loop-jump ───────
  const handleTransitionEnd = useCallback(() => {
    // If we slid into clone_A (loopIndex < N) or clone_B (loopIndex >= 2N),
    // silently jump to the equivalent real position
    if (loopIndex < N) {
      // was in clone_A — jump to matching position in real section
      const realIdx = loopIndex + N;
      applyTranslate(realIdx, false);
    } else if (loopIndex >= 2 * N) {
      // was in clone_B — jump to matching position in real section
      const realIdx = loopIndex - N;
      applyTranslate(realIdx, false);
    }
    // re-enable smooth transition after silent jump
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
        }
      });
    });
  }, [loopIndex, N, applyTranslate]);

  // ─── reset on category change ─────────────────────────────────────────────
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  // ─── auto-scroll timer (advances activeIndex; loop logic handles wrapping) ─
  useEffect(() => {
    if (viewMode !== "carousel" || N <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % N);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [viewMode, N, activeCategory]);

  // ─── swipe support ────────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setActiveIndex(prev => (prev + (dx < 0 ? 1 : -1) + N) % N);
    }
  };

  // ─── view-mode icon button ────────────────────────────────────────────────
  const viewModes: { mode: ViewMode; Icon: React.ComponentType<{ size: number; strokeWidth: number }> }[] = [
    { mode: "carousel", Icon: GalleryHorizontal },
    { mode: "list",     Icon: List },
    { mode: "grid",     Icon: LayoutGrid },
  ];

  return (
    <CircularReveal bgColor="bg-[#f9f8f4]">
      <div className="min-h-screen w-full flex flex-col font-sans pb-28 overflow-x-hidden pt-8 select-none">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header className="w-full px-6 mb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <Link href="/">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform shadow-sm">
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
            </Link>
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
              <span className="w-1.5 h-1.5 bg-[#c4a47c] rounded-full animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">Athens, GR</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 leading-none">
              The Coffee <span className="text-[#c4a47c]">Lab.</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-1">
              {lang === "el" ? "Ανακαλύψτε specialty χαρμάνια" : "Discover our handcrafted daily specialty blends"}
            </p>
          </div>
        </header>

        {/* ── SEARCH BAR ─────────────────────────────────────────────────── */}
        <div className="px-6">
          <div className="bg-white rounded-full p-2 pl-5 flex items-center shadow-sm border border-gray-100 focus-within:border-[#c4a47c]/40 transition-colors">
            <Search size={20} className="text-gray-400 shrink-0" strokeWidth={2} />
            <input
              ref={searchRef}
              type="text"
              placeholder={lang === "el" ? "Αναζήτηση..." : "Search menu..."}
              className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-sm font-medium px-3"
            />
          </div>
        </div>

        {/* ── CATEGORIES + VIEW TOGGLE ────────────────────────────────────── */}
        <div className="mt-6 px-6 flex items-center gap-3">

          {/* view mode toggle group */}
          <div className="flex items-center bg-white border border-gray-100 rounded-full p-1 gap-0.5 shrink-0 shadow-sm">
            {viewModes.map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  viewMode === mode
                    ? "bg-[#c4a47c] text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon size={15} strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>

        {/* ── VIEWS ──────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {/* ── CAROUSEL ─────────────────────────────────────────────────── */}
          {viewMode === "carousel" && (
            <motion.div
              key={`carousel-${activeCategory}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 w-full"
            >
              {/* dot indicator — only N real dots */}
              <div className="flex justify-center gap-1.5 mb-3">
                {filteredItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-5 bg-[#c4a47c]" : "w-1.5 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* track wrapper */}
              <div
                ref={wrapRef}
                className="w-full overflow-hidden pt-14 pb-10"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* THE TRACK — triple-cloned for infinite loop */}
                <div
                  ref={trackRef}
                  className="flex"
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    transform: `translateX(${centerOffset - loopIndex * STEP}px)`,
                    transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform",
                  }}
                >
                  {loopItems.map((item, index) => {
                    const isActive = index === loopIndex;
                    return (
                      <div
                        key={`${activeCategory}-${item.id}-${index}`}
                        onClick={() => {
                          // clicking a neighbour card navigates to it
                          const offset = index - loopIndex;
                          if (offset !== 0) {
                            setActiveIndex(prev => (prev + offset + N) % N);
                          }
                        }}
                        style={{
                          width: CARD_W,
                          flexShrink: 0,
                          margin: `0 ${CARD_GAP / 2}px`,
                          transform: isActive ? "scale(1)" : "scale(0.78)",
                          opacity: isActive ? 1 : 0.30,
                          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
                          cursor: isActive ? "default" : "pointer",
                        }}
                        className="relative h-[310px] rounded-[32px] bg-gradient-to-b from-[#4a2e1b] to-[#2d1b0f] flex flex-col justify-end p-5 shadow-2xl"
                      >
                        {/* floating image */}
                        <div
                          className="absolute left-1/2 w-[120px] h-[120px]"
                          style={{
                            top: "-48px",
                            transform: `translateX(-50%) scale(${isActive ? 1.12 : 0.86})`,
                            transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.titleEn}
                            className="w-full h-full object-cover rounded-full border-[3px] border-[#4a2e1b]"
                            style={{ boxShadow: "0 15px 30px rgba(0,0,0,0.55)" }}
                          />
                        </div>

                        {/* card body */}
                        <div className="flex flex-col gap-1 text-center relative z-10">
                          <h3 className="text-[17px] font-black text-white tracking-tight line-clamp-1">
                            {lang === "el" ? item.titleEl : item.titleEn}
                          </h3>
                          <div className="flex items-center justify-center gap-1 mb-0.5">
                            <Star size={11} className="text-[#c4a47c]" fill="#c4a47c" />
                            <span className="text-white/90 text-[11px] font-semibold">{item.rating}</span>
                          </div>
                          <p className="text-white/40 text-[9px] font-bold tracking-widest uppercase">
                            Vol {item.volume}
                          </p>
                          <div className="w-full bg-[#3a2010] py-2 rounded-full border border-white/10 mt-2">
                            <span className="text-sm font-black tracking-wider text-white">€{item.price}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── LIST ─────────────────────────────────────────────────────── */}
          {viewMode === "list" && (
            <motion.div
              key={`list-${activeCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 px-6 flex flex-col gap-3"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="flex items-center gap-4 bg-white p-3.5 rounded-3xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
                >
                  {/* thumbnail */}
                  <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-[#f0ede8]">
                    <img src={item.image} alt={item.titleEn} className="w-full h-full object-cover" />
                  </div>

                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                      {lang === "el" ? item.titleEl : item.titleEn}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-[#c4a47c]" fill="#c4a47c" />
                      <span className="text-[11px] text-gray-400 font-medium">{item.rating}</span>
                      <span className="text-[11px] text-gray-300 mx-1">·</span>
                      <span className="text-[11px] text-gray-400">{item.volume}</span>
                    </div>
                  </div>

                  {/* price */}
                  <span className="text-sm font-black text-[#c4a47c] shrink-0">€{item.price}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── GRID ─────────────────────────────────────────────────────── */}
          {viewMode === "grid" && (
            <motion.div
              key={`grid-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 px-6 grid grid-cols-2 gap-3"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.97] transition-transform"
                >
                  {/* image area */}
                  <div className="w-full aspect-square bg-[#f0ede8] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.titleEn}
                      className="w-full h-full object-cover"
                    />
                    {/* rating badge */}
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Star size={9} className="text-[#c4a47c]" fill="#c4a47c" />
                      <span className="text-[10px] font-bold text-gray-700">{item.rating}</span>
                    </div>
                  </div>

                  {/* card footer */}
                  <div className="p-3">
                    <h3 className="text-[13px] font-bold text-gray-900 line-clamp-1 leading-tight">
                      {lang === "el" ? item.titleEl : item.titleEn}
                    </h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-gray-400">{item.volume}</span>
                      <span className="text-sm font-black text-[#c4a47c]">€{item.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#f9f8f4]/85 backdrop-blur-xl border-t border-gray-200/60 py-4 px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-900 uppercase leading-none">
              THE COFFEE LAB
            </span>
            <span className="text-[9px] font-medium text-gray-400 tracking-wider mt-0.5">
              PREMIUM DIGITAL MENU
            </span>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
          </div>
        </footer>

      </div>
    </CircularReveal>
  );
}
