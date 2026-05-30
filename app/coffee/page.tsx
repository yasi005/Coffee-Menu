"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, LayoutGrid, List } from "lucide-react";
import { useLanguage } from "../hooks/LanguageContext";
import CircularReveal from "../components/ui/CircularReveal";

export default function CoffeePage() {
  const { lang } = useLanguage();
  
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");
  const [activeCategory, setActiveCategory] = useState("Cappuccino");
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = ["Cappuccino", "Latte", "Espresso", "Cold Brew"];

  const coffeeItems = [
    { id: 1, category: "Cappuccino", titleEn: "Classic Cappuccino", titleEl: "Κλασικό Καπουτσίνο", descEn: "Rich espresso with steamed milk foam", descEl: "Πλούσιος εσπρέσο με αφρόγαλα", volume: "160 ml", rating: "4.8", price: "4.50", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop" },
    { id: 2, category: "Cappuccino", titleEn: "Caramel Cappuccino", titleEl: "Καπουτσίνο Καραμέλα", descEn: "Sweet caramel syrup blend", descEl: "Γλυκό μείγμα σιροπιού καραμέλας", volume: "180 ml", rating: "4.7", price: "5.00", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop" },
    { id: 3, category: "Cappuccino", titleEn: "Vanilla Cappuccino", titleEl: "Καπουτσίνο Βανίλια", descEn: "Infused with real vanilla bean", descEl: "Με πραγματικούς κόκκους βανίλιας", volume: "160 ml", rating: "4.9", price: "4.80", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop" },
    { id: 4, category: "Cappuccino", titleEn: "Mocha Cappuccino", titleEl: "Μόκα Καπουτσίνο", descEn: "Dark chocolate and espresso", descEl: "Μαύρη σοκολάτα και εσπρέσο", volume: "200 ml", rating: "4.6", price: "5.50", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop" },
    { id: 5, category: "Cappuccino", titleEn: "Hazelnut Cappuccino", titleEl: "Καπουτσίνο Φουντούκι", descEn: "Roasted hazelnut notes", descEl: "Νότες ψημένου φουντουκιού", volume: "160 ml", rating: "4.8", price: "4.90", image: "https://images.unsplash.com/photo-1499961024600-ad094db60584?w=400&h=400&fit=crop" },
    { id: 6, category: "Cappuccino", titleEn: "Coconut Cappuccino", titleEl: "Καπουτσίνο Καρύδα", descEn: "Dairy-free coconut milk foam", descEl: "Αφρόγαλα καρύδας χωρίς γαλακτοκομικά", volume: "180 ml", rating: "4.5", price: "5.20", image: "https://images.unsplash.com/photo-1517701550927-30cfcb07076b?w=400&h=400&fit=crop" },
    { id: 7, category: "Cappuccino", titleEn: "Cinnamon Cappuccino", titleEl: "Καπουτσίνο Κανέλα", descEn: "Dusted with warm cinnamon", descEl: "Πασπαλισμένο με ζεστή κανέλα", volume: "160 ml", rating: "4.7", price: "4.60", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop" },
    { id: 8, category: "Cappuccino", titleEn: "Almond Cappuccino", titleEl: "Καπουτσίνο Αμύγδαλο", descEn: "Smooth almond milk blend", descEl: "Απαλό μείγμα γάλακτος αμυγδάλου", volume: "180 ml", rating: "4.8", price: "5.10", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop" },
    { id: 9, category: "Cappuccino", titleEn: "Irish Cappuccino", titleEl: "Ιρλανδικό Καπουτσίνο", descEn: "Non-alcoholic Irish cream", descEl: "Ιρλανδική κρέμα χωρίς αλκοόλ", volume: "160 ml", rating: "4.9", price: "5.30", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop" },
    { id: 10, category: "Cappuccino", titleEn: "Decaf Cappuccino", titleEl: "Ντεκαφεϊνέ Καπουτσίνο", descEn: "All the flavor, zero caffeine", descEl: "Όλη η γεύση, μηδέν καφεΐνη", volume: "160 ml", rating: "4.6", price: "4.50", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop" },
  ];

  const filteredItems = coffeeItems.filter(item => item.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child: Element, index) => {
      const htmlChild = child as HTMLElement;
      const childCenter = htmlChild.offsetLeft + htmlChild.clientWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <CircularReveal bgColor="bg-[#f9f8f4]">
      <div className="w-full flex flex-col font-sans overflow-x-hidden">
        
        {/* --- HEADER ---
        <header className="w-full px-6 pt-10 flex items-center justify-start">
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <MapPin size={16} className="text-[#c4a47c]" strokeWidth={2.5} />
            <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">Athens, GR</span>
          </div>
        </header> */}

        {/* --- SEARCH BAR --- */}
        {/* <div className="px-6 mt-6">
          <div className="bg-white rounded-full p-2 pl-5 flex items-center shadow-sm border border-gray-100">
            <Search size={20} className="text-gray-400 shrink-0" strokeWidth={2} />
            <input 
              type="text" 
              placeholder={lang === "el" ? "Αναζήτηση στο μενού..." : "Search menu..."}
              className="flex-1 w-full min-w-0 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-sm font-medium px-3"
            />
            <div className="w-10 h-10 rounded-full bg-[#f9f8f4] flex items-center justify-center shrink-0 border border-gray-100">
              <Search size={18} className="text-[#c4a47c]" strokeWidth={2.5} />
            </div>
          </div>
        </div> */}

        {/* --- CATEGORIES & VIEW TOGGLE --- */}
        <div className="mt-8 px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {lang === "el" ? "Κατηγορίες" : "Categories"}
            </h2>
            
            <div className="flex items-center gap-2 bg-gray-200/50 p-1 rounded-full shrink-0">
              <button 
                onClick={() => setViewMode("carousel")}
                className={`p-1.5 rounded-full transition-colors ${viewMode === "carousel" ? "bg-white text-[#c4a47c] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutGrid size={16} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-full transition-colors ${viewMode === "list" ? "bg-white text-[#c4a47c] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all shrink-0 ${
                  activeCategory === cat 
                    ? "bg-[#c4a47c] text-white shadow-md" 
                    : "bg-white text-gray-500 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- PRODUCTS DISPLAY --- */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            
            {/* CAROUSEL VIEW */}
            {viewMode === "carousel" && (
              <motion.div
                key="carousel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                ref={scrollRef}
                onScroll={handleScroll}
                // THE FIX: Exact pixel math guarantees perfect centering and peeking on iPhone 13 (and all devices).
                // 130px is exactly half of the 260px card width.
                style={{
                  paddingLeft: "calc(50vw - 130px)",
                  paddingRight: "calc(50vw - 130px)"
                }}
                className="flex gap-4 overflow-x-auto pb-12 pt-20 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {filteredItems.length === 0 ? (
                  <p className="text-gray-400 text-center w-full">No items found.</p>
                ) : (
                  filteredItems.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <motion.div 
                        key={item.id} 
                        animate={{ 
                          scale: isActive ? 1 : 0.85,
                          opacity: isActive ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        // THE FIX: Locked width to exactly 260px.
                        className="relative w-[260px] h-[310px] rounded-[32px] bg-gradient-to-b from-[#4a2e1b] to-[#2d1b0f] shrink-0 snap-center flex flex-col justify-end p-6 shadow-xl origin-bottom"
                      >
                        {/* Floating Image */}
                        <motion.div 
                          animate={{ 
                            scale: isActive ? 1.1 : 0.9,
                            y: isActive ? 0 : 15 
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          // THE FIX: Adjusted image size to perfectly match the new 260px card width
                          className="absolute -top-14 left-1/2 -translate-x-1/2 w-[130px] h-[130px]"
                        >
                          <img 
                            src={item.image} 
                            alt={item.titleEn} 
                            className="w-full h-full object-cover rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-[3px] border-[#4a2e1b]"
                          />
                        </motion.div>

                        <div className="flex flex-col gap-1.5 relative z-10 text-center">
                          <h3 className="text-[19px] font-bold text-white tracking-tight line-clamp-1">
                            {lang === "el" ? item.titleEl : item.titleEn}
                          </h3>
                          
                          <div className="flex items-center justify-center gap-1.5 mb-0.5">
                            <Star size={13} className="text-[#c4a47c]" fill="#c4a47c" />
                            <span className="text-white/90 text-sm font-semibold">{item.rating}</span>
                          </div>
                          
                          <p className="text-white/50 text-[11px] font-medium mb-4 uppercase tracking-wider">
                            Vol {item.volume}
                          </p>
                          
                          <div className="w-full bg-[#3a2010] py-2 rounded-full border border-white/10 flex items-center justify-center">
                            <span className="text-base font-black tracking-wider text-white">
                              €{item.price}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}

            {/* LIST VIEW */}
            {viewMode === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 px-6 pb-12"
              >
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100"
                  >
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-gray-50 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.titleEn} 
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">
                        {lang === "el" ? item.titleEl : item.titleEn}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-medium mb-2 line-clamp-1">
                        {lang === "el" ? item.descEl : item.descEn}
                      </p>
                      
                      <span className="text-base font-black tracking-tight text-[#c4a47c]">
                        €{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </CircularReveal>
  );
}