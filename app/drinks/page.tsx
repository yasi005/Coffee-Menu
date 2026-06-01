// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, List, Home, Languages } from "lucide-react";
// import Link from "next/link";
// import { useLanguage } from "../hooks/LanguageContext";
// import CircularReveal from "../components/ui/CircularReveal";

// type ViewMode = "carousel" | "list";

// interface DrinkItem {
//   id: number;
//   category: string;
//   titleEn: string;
//   titleEl: string;
//   volume: string;
//   rating: string;
//   price: string;
//   image: string;
// }

// const drinkItems: DrinkItem[] = [
//   { id: 1, category: "Citrus", titleEn: "Sex on the Beach", titleEl: "Sex on the Beach", volume: "250 ml", rating: "4.9", price: "12.00", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=600&fit=crop" },
//   { id: 2, category: "Citrus", titleEn: "Aperol Spritz",    titleEl: "Aperol Spritz",    volume: "200 ml", rating: "4.7", price: "11.00", image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=600&h=600&fit=crop" },
//   { id: 3, category: "Exotic", titleEn: "Mojito Classic",   titleEl: "Κλασικό Μοχίτο",  volume: "280 ml", rating: "4.8", price: "10.50", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=600&fit=crop" },
//   { id: 4, category: "Exotic", titleEn: "Pina Colada",      titleEl: "Πίνα Κολάντα",    volume: "300 ml", rating: "4.6", price: "13.00", image: "https://images.unsplash.com/photo-1546173159-315724a13696?w=600&h=600&fit=crop" },
//   { id: 5, category: "Virgin", titleEn: "Virgin Mojito",    titleEl: "Virgin Μοχίτο",   volume: "280 ml", rating: "4.5", price: "8.50",  image: "https://images.unsplash.com/photo-1546173159-315724a13696?w=600&h=600&fit=crop" },
// ];

// const categories = ["All", "Citrus", "Exotic", "Virgin"];

// // Light / dark tokens — single source of truth so nothing is missed
// const t = {
//   pageBg:        "bg-[#fcfaf7]          dark:bg-[#0f0d0b]",
//   heroBg:        "bg-[#fcfaf7]          dark:bg-[#0f0d0b]",
//   headerBtn:     "bg-white/70           dark:bg-black/50   border border-gray-100/50 dark:border-white/[0.08] text-gray-800 dark:text-gray-100",
//   headerBtnTxt:  "text-gray-500         dark:text-gray-400",
//   pillActive:    "bg-[#c4a47c] text-white",
//   pillIdle:      "bg-white              dark:bg-white/[0.05] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/[0.08]",
//   toggleWrap:    "bg-white              dark:bg-white/[0.05] border border-gray-100 dark:border-white/[0.08]",
//   toggleActive:  "bg-[#c4a47c] text-white",
//   toggleIdle:    "text-gray-400         dark:text-gray-500",
//   cardActive:    "bg-white              dark:bg-white/[0.08] border-[#c4a47c]",
//   cardIdle:      "bg-white              dark:bg-white/[0.03] border-gray-100 dark:border-white/[0.06]",
//   cardThumb:     "bg-[#f0ede8]          dark:bg-white/[0.07]",
//   cardTitle:     "text-gray-900         dark:text-gray-100",
//   cardSub:       "text-gray-400         dark:text-gray-500",
//   footerBg:      "bg-[#fcfaf7]/85       dark:bg-[#0f0d0b]/85 border-t border-gray-200/60 dark:border-white/[0.07]",
//   footerTitle:   "text-gray-900         dark:text-gray-100",
//   footerSub:     "text-gray-400         dark:text-gray-600",
//   accent:        "text-[#c4a47c]",
// };

// export default function DrinksPage() {
//   const { lang, toggleLang } = useLanguage();

//   const [viewMode, setViewMode]             = useState<ViewMode>("list");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [activeIndex, setActiveIndex]       = useState(0);

//   const filteredItems = activeCategory === "All"
//     ? drinkItems
//     : drinkItems.filter(item => item.category === activeCategory);

//   const currentItem = filteredItems[activeIndex] ?? filteredItems[0];

//   const handleCategoryChange = (cat: string) => {
//     setActiveCategory(cat);
//     setActiveIndex(0);
//   };

//   return (
//     // CircularReveal must NOT override background — pass transparent so dark: on the inner div wins
//     <CircularReveal bgColor="bg-transparent">
//       <div className={`min-h-screen w-full flex flex-col font-sans pb-28 overflow-x-hidden select-none ${t.pageBg}`}>

//         {/* ── HERO ── */}
//         <div className={`relative w-full h-[360px] overflow-hidden ${t.heroBg}`}>

//           {/* Morph image transition */}
//           <AnimatePresence mode="popLayout">
//             <motion.div
//               key={currentItem.id}
//               initial={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
//               animate={{ opacity: 1,  scale: 1,    filter: "blur(0px)"  }}
//               exit={{   opacity: 0,  scale: 1.02, filter: "blur(8px)"  }}
//               transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//               className="absolute inset-0"
//             >
//               <img
//                 src={currentItem.image}
//                 alt={currentItem.titleEn}
//                 className="w-full h-full object-cover"
//                 style={{
//                   WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
//                   maskImage:       "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
//                 }}
//               />
//             </motion.div>
//           </AnimatePresence>

//           {/* Gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none z-10" />

//           {/* Header controls */}
//           <div className="absolute top-8 left-6 right-6 z-20 flex items-center justify-between">
//             <Link href="/">
//               <button className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform shadow-xs ${t.headerBtn}`}>
//                 <Home size={18} strokeWidth={2.2} />
//               </button>
//             </Link>

//             <button
//               onClick={toggleLang}
//               className={`h-10 px-3.5 rounded-full flex items-center gap-1.5 backdrop-blur-md active:scale-95 transition-transform shadow-xs ${t.headerBtn}`}
//             >
//               <Languages size={16} strokeWidth={2.2} />
//               <span className={`text-[10px] font-black tracking-wider uppercase ${t.headerBtnTxt}`}>
//                 {lang}
//               </span>
//             </button>
//           </div>

//           {/* Brand title */}
//           <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
//             <span className={`text-[10px] font-black tracking-[0.3em] uppercase drop-shadow-xs ${t.accent}`}>
//               {activeCategory} SELECTION
//             </span>
//             <h1 className="text-3xl font-black tracking-tight mt-0.5 drop-shadow-xs text-gray-950 dark:text-gray-50">
//               The Drink <span className={t.accent}>Lab.</span>
//             </h1>
//           </div>
//         </div>

//         {/* ── CATEGORIES + VIEW TOGGLE ── */}
//         <div className="mt-6 px-6 flex items-center justify-between gap-3">

//           {/* Category pills */}
//           <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 ${
//                   activeCategory === cat ? t.pillActive : t.pillIdle
//                 }`}
//               >
//                 {cat === "All" ? (lang === "el" ? "Όλα" : "All") : cat}
//               </button>
//             ))}
//           </div>

//           {/* View toggle */}
//           <div className={`flex items-center rounded-full p-1 shrink-0 shadow-xs ${t.toggleWrap}`}>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`p-1.5 rounded-full transition-all ${viewMode === "list" ? t.toggleActive : t.toggleIdle}`}
//             >
//               <List size={14} strokeWidth={2.5} />
//             </button>
//           </div>
//         </div>

//         {/* ── LIST ── */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`list-${activeCategory}`}
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="mt-4 px-6 flex flex-col gap-3 pb-12"
//           >
//             {filteredItems.map((item, i) => (
//               <motion.div
//                 key={item.id}
//                 onClick={() => setActiveIndex(i)}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className={`flex items-center gap-4 p-3.5 rounded-3xl shadow-xs border transition-all cursor-pointer ${
//                   i === activeIndex ? t.cardActive : t.cardIdle
//                 }`}
//               >
//                 {/* Thumbnail */}
//                 <div className={`w-14 h-14 shrink-0 rounded-2xl overflow-hidden ${t.cardThumb}`}>
//                   <img src={item.image} alt={item.titleEn} className="w-full h-full object-cover" />
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className={`text-sm font-bold line-clamp-1 ${t.cardTitle}`}>
//                     {lang === "el" ? item.titleEl : item.titleEn}
//                   </h3>
//                   <p className={`text-[11px] mt-0.5 flex items-center gap-1 ${t.cardSub}`}>
//                     {item.volume}
//                     <span className="opacity-40">·</span>
//                     <Star size={10} className={t.accent} fill="#c4a47c" />
//                     {item.rating}
//                   </p>
//                 </div>

//                 {/* Price */}
//                 <span className={`text-sm font-black shrink-0 ${t.accent}`}>€{item.price}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>

//         {/* ── STICKY FOOTER ── */}
//         <footer className={`fixed bottom-0 left-0 w-full z-50 backdrop-blur-xl py-4 px-6 flex items-center justify-between ${t.footerBg}`}>
//           <div className="flex flex-col">
//             <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${t.footerTitle}`}>
//               THE DRINK LAB
//             </span>
//             <span className={`text-[9px] font-medium tracking-wider mt-0.5 ${t.footerSub}`}>
//               PREMIUM COCKTAIL MENU
//             </span>
//           </div>
//           <p className={`text-[9px] font-bold tracking-widest uppercase ${t.footerSub}`}>
//             © {new Date().getFullYear()} ALL RIGHTS RESERVED
//           </p>
//         </footer>

//       </div>
//     </CircularReveal>
//   );
// }