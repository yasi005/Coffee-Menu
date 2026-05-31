"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, LayoutGrid, List, GalleryHorizontal, Home, Languages } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../hooks/LanguageContext";
import CircularReveal from "../components/ui/CircularReveal";

type ViewMode = "carousel" | "list";

interface DrinkItem {
  id: number;
  category: string;
  titleEn: string;
  titleEl: string;
  volume: string;
  rating: string;
  price: string;
  image: string;
}

const drinkItems: DrinkItem[] = [
  { id: 1, category: "Citrus", titleEn: "Sex on the Beach", titleEl: "Sex on the Beach", volume: "250 ml", rating: "4.9", price: "12.00", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=600&fit=crop" },
  { id: 2, category: "Citrus", titleEn: "Aperol Spritz", titleEl: "Aperol Spritz", volume: "200 ml", rating: "4.7", price: "11.00", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&h=600&fit=crop" },
  { id: 3, category: "Exotic", titleEn: "Mojito Classic", titleEl: "Κλασικό Μοχίτο", volume: "280 ml", rating: "4.8", price: "10.50", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&fit=crop" },
  { id: 4, category: "Exotic", titleEn: "Pina Colada", titleEl: "Πίνα Κολάντα", volume: "300 ml", rating: "4.6", price: "13.00", image: "https://images.unsplash.com/photo-1546173159-315724a13696?w=600&h=600&fit=crop" },
  { id: 5, category: "Virgin", titleEn: "Virgin Mojito", titleEl: "Virgin Μοχίτο", volume: "280 ml", rating: "4.5", price: "8.50", image: "https://images.unsplash.com/photo-1546173159-315724a13696?w=600&h=600&fit=crop" },
];

const CARD_W = 240;
const CARD_GAP = 18;
const STEP = CARD_W + CARD_GAP;

export default function DrinksPage() {
  const { lang, toggleLang } = useLanguage();

  const [viewMode, setViewMode] = useState<ViewMode>("carousel");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [wrapWidth, setWrapWidth] = useState(375);
  const categories = ["All", "Citrus", "Exotic", "Virgin"];

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredItems = activeCategory === "All"
    ? drinkItems
    : drinkItems.filter(item => item.category === activeCategory);

  const N = filteredItems.length;
  const loopItems = N > 0 ? [...filteredItems, ...filteredItems, ...filteredItems] : [];
  const loopIndex = N + activeIndex;

  // پیدا کردن آیتم فعال برای نمایش تصویر بزرگ هیرو در بالای صفحه
  const currentActiveItem = filteredItems[activeIndex] || filteredItems[0];

  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setWrapWidth(wrapRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const centerOffset = (wrapWidth - CARD_W) / 2;

  const applyTranslate = useCallback((idx: number, animated: boolean) => {
    if (!trackRef.current) return;
    const x = centerOffset - idx * STEP;
    if (!animated) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(${x}px)`;
    } else {
      trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
      trackRef.current.style.transform = `translateX(${x}px)`;
    }
  }, [centerOffset]);

  useEffect(() => {
    if (viewMode === "carousel") {
      applyTranslate(loopIndex, true);
    }
  }, [loopIndex, viewMode, applyTranslate]);

  const handleTransitionEnd = useCallback(() => {
    if (loopIndex < N) {
      const realIdx = loopIndex + N;
      applyTranslate(realIdx, false);
    } else if (loopIndex >= 2 * N) {
      const realIdx = loopIndex - N;
      applyTranslate(realIdx, false);
    }
  }, [loopIndex, N, applyTranslate]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  useEffect(() => {
    if (viewMode !== "carousel" || N <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % N);
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [viewMode, N, activeCategory]);

  return (
    <CircularReveal bgColor="bg-[#fcfaf7]">
      <div className="min-h-screen w-full flex flex-col font-sans pb-28 overflow-x-hidden select-none">
        
        {/* ─── DYNAMIC HERO IMAGE SECTION (عکس بزرگ بالای صفحه مثل آرت دیزاینت) ─── */}
        <div className="relative w-full h-[320px] bg-gradient-to-b from-[#f5ebe0] to-[#fcfaf7] overflow-hidden flex items-center justify-center px-6 pt-6">
          {/* دکمه‌های کنترل هدر در لایه رویی آرت */}
          <div className="absolute top-8 left-6 right-6 z-20 flex items-center justify-between w-full pr-12">
            <Link href="/">
              <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 flex items-center justify-center text-gray-700 active:scale-95 transition-transform shadow-xs">
                <Home size={18} strokeWidth={2.2} />
              </button>
            </Link>

            <button
              onClick={toggleLang}
              className="h-10 px-3.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 flex items-center gap-1.5 text-gray-700 active:scale-95 transition-transform shadow-xs"
            >
              <Languages size={16} strokeWidth={2.2} />
              <span className="text-[10px] font-black tracking-wider uppercase text-gray-500">
                {lang}
              </span>
            </button>
          </div>

          <div className="absolute top-0 right-0 w-[60%] h-full flex items-center justify-end overflow-visible pointer-events-none w-full">
            <AnimatePresence mode="wait">
              {currentActiveItem && (
                <motion.img
                  key={currentActiveItem.id}
                  src={currentActiveItem.image}
                  alt={currentActiveItem.titleEn}
                  initial={{ opacity: 0, scale: 0.8, rotate: 10, x: 50 }}
                  animate={{ opacity: 1, scale: 1.1, rotate: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -10, x: 50 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-[110%] object-cover rounded-l-[60px] shadow-[-20px_0_40px_rgba(0,0,0,0.06)]"
                />
              )}
            </AnimatePresence>
          </div>

          {/* متن‌های عنوان برند هدر */}
          <div className="absolute bottom-6 left-6 z-10 flex flex-col pointer-events-none">
            <span className="text-[11px] font-black tracking-[0.25em] text-[#c4a47c] uppercase">
              {activeCategory} Blends
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-950 mt-1">
              The Drink <span className="text-[#c4a47c]">Lab.</span>
            </h1>
          </div>
        </div>

        {/* ─── SEARCH BAR ─── */}
        {/* <div className="px-6 mt-4">
          <div className="bg-white rounded-full p-2 pl-5 flex items-center shadow-xs border border-gray-100/80 focus-within:border-[#c4a47c]/40 transition-colors">
            <Search size={18} className="text-gray-400 shrink-0" strokeWidth={2.5} />
            <input
              ref={searchRef}
              type="text"
              placeholder={lang === "el" ? "Αναζήτηση کوکتل..." : "Search drinks..."}
              className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 text-sm font-medium px-3"
            />
          </div>
        </div> */}

        {/* ─── CATEGORIES + VIEW TOGGLE (بدون دکمه گرید) ─── */}
        <div className="mt-6 px-6 flex items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#c4a47c] text-white shadow-xs"
                    : "bg-white text-gray-500 border border-gray-100"
                }`}
              >
                {cat === "All" ? (lang === "el" ? "Όλα" : "All") : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white border border-gray-100 rounded-full p-1 shrink-0 shadow-xs">
            <button
              onClick={() => setViewMode("carousel")}
              className={`p-1.5 rounded-full transition-all ${viewMode === "carousel" ? "bg-[#c4a47c] text-white" : "text-gray-400"}`}
            >
              <GalleryHorizontal size={14} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-full transition-all ${viewMode === "list" ? "bg-[#c4a47c] text-white" : "text-gray-400"}`}
            >
              <List size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ─── VIEWS DISPLAY ─── */}
        <AnimatePresence mode="wait">
          
          {/* ── CAROUSEL VIEW ── */}
          {viewMode === "carousel" && (
            <motion.div
              key={`carousel-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 w-full"
            >
              {/* شتاب‌دهنده Drag اسموت سخت‌افزاری فرامر موشن */}
              <div ref={wrapRef} className="w-full overflow-visible pt-12 pb-10 touch-pan-y">
                <motion.div
                  ref={trackRef}
                  drag="x"
                  dragConstraints={{ left: centerOffset - (loopItems.length - 1) * STEP, right: centerOffset }}
                  dragElastic={0.15}
                  onDragEnd={(e, info) => {
                    const threshold = 50;
                    if (info.offset.x < -threshold) {
                      setActiveIndex(prev => (prev + 1) % N);
                    } else if (info.offset.x > threshold) {
                      setActiveIndex(prev => (prev - 1 + N) % N);
                    } else {
                      applyTranslate(loopIndex, true);
                    }
                  }}
                  className="flex cursor-grab active:cursor-grabbing"
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
                          const offset = index - loopIndex;
                          if (offset !== 0) {
                            setActiveIndex(prev => (prev + offset + N) % N);
                          }
                        }}
                        style={{
                          width: CARD_W,
                          flexShrink: 0,
                          margin: `0 ${CARD_GAP / 2}px`,
                          transform: isActive ? "scale(1)" : "scale(0.82)",
                          opacity: isActive ? 1 : 0.35,
                          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
                        }}
                        className="relative h-[260px] rounded-[32px] bg-gradient-to-b from-[#2d1b0f] to-[#120a05] flex flex-col justify-end p-5 shadow-xl"
                      >
                        <div className="flex flex-col gap-1 text-center relative z-10 pointer-events-none">
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
                          <div className="w-full bg-white/10 py-2 rounded-full border border-white/10 mt-2">
                            <span className="text-sm font-black tracking-wider text-white">€{item.price}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── LIST VIEW ── */}
          {viewMode === "list" && (
            <motion.div
              key={`list-${activeCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 px-6 flex flex-col gap-3 pb-12"
            >
              {filteredItems.map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(i)} // کلیک روی هر لیست، تصویر هیرو بالای صفحه رو تغییر میده
                  className={`flex items-center gap-4 p-3.5 rounded-3xl shadow-xs border transition-all cursor-pointer ${
                    i === activeIndex ? "bg-white border-[#c4a47c]" : "bg-white border-gray-100"
                  }`}
                >
                  <div className="w-14 h-14 shrink-0 rounded-2xl overflow-hidden bg-[#f0ede8]">
                    <img src={item.image} alt={item.titleEn} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                      {lang === "el" ? item.titleEl : item.titleEn}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.volume} · ⭐ {item.rating}</p>
                  </div>

                  <span className="text-sm font-black text-[#c4a47c] shrink-0">€{item.price}</span>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── STICKY FOOTER ── */}
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#fcfaf7]/85 backdrop-blur-xl border-t border-gray-200/60 py-4 px-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-900 uppercase">
              THE DRINK LAB
            </span>
            <span className="text-[9px] font-medium text-gray-400 tracking-wider mt-0.5">
              PREMIUM COCKTAIL MENU
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