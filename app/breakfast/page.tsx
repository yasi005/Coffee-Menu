"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingCart, Search, Heart } from "lucide-react";
import { useLanguage } from "../hooks/LanguageContext";

export default function QuickOrderPage() {
  const { lang } = useLanguage();

  // State to manage items so the like buttons actually work!
  const [items, setItems] = useState([
    {
      id: 1,
      titleEn: "Espresso",
      titleEl: "Εσπρέσο",
      descEn: "Espresso drink cream",
      descEl: "Κρέμα εσπρέσο",
      price: "4.88",
      likes: 258,
      isLiked: true,
      // For the best look on a white background, use PNGs with transparent backgrounds!
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      titleEn: "Machiatto",
      titleEl: "Μακιάτο",
      descEn: "Espresso drink cream",
      descEl: "Κρέμα εσπρέσο",
      price: "5.99",
      likes: 258,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      titleEn: "Caffè Latte",
      titleEl: "Καφέ Λάτε",
      descEn: "Espresso drink cream",
      descEl: "Κρέμα εσπρέσο",
      price: "2.99",
      likes: 258,
      isLiked: true,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      titleEn: "Americano",
      titleEl: "Αμερικάνο",
      descEn: "Espresso drink cream",
      descEl: "Κρέμα εσπρέσο",
      price: "6.00",
      likes: 258,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=200&h=200&fit=crop",
    },
    {
      id: 5,
      titleEn: "Flat white",
      titleEl: "Flat white",
      descEn: "Espresso drink cream",
      descEl: "Κρέμα εσπρέσο",
      price: "5.88",
      likes: 258,
      isLiked: false,
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=200&h=200&fit=crop",
    },
  ]);

  const toggleLike = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  return (
    // Forced white background to match the crisp e-commerce look of the image
    <div className="min-h-screen bg-white w-full flex flex-col font-sans text-gray-800">
      <div className="w-full max-w-md mx-auto flex flex-col">

        {/* 2. SEARCH BAR */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <Search size={20} className="text-gray-300" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder={lang === "el" ? "Αναζήτηση" : "Search"}
            className="flex-1 bg-transparent border-none outline-none text-gray-600 placeholder:text-gray-300 font-medium text-lg"
          />
        </div>

        {/* 3. PRODUCT LIST */}
        <div className="flex flex-col">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between px-6 py-6 border-b border-gray-50 bg-white hover:bg-gray-50/50 transition-colors"
              >
                {/* Left: Product Image */}
                <div className="w-24 h-24 shrink-0 relative flex items-center justify-center bg-white rounded-full p-2 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                  <img 
                    src={item.image} 
                    alt={item.titleEn} 
                    className="w-full h-full object-cover rounded-full mix-blend-multiply"
                  />
                </div>

                {/* Middle: Text Details */}
                <div className="flex-1 flex flex-col px-5">
                  <h2 className="text-[17px] font-bold text-gray-500 mb-0.5">
                    {lang === "el" ? item.titleEl : item.titleEn}
                  </h2>
                  <p className="text-[13px] text-gray-400 font-medium mb-2">
                    {lang === "el" ? item.descEl : item.descEn}
                  </p>
                  <span className="text-rose-400 font-semibold text-lg">
                    ${item.price}
                  </span>
                </div>

                {/* Right: Like Button with Number */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleLike(item.id)}
                  className={`w-[52px] h-[52px] shrink-0 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${
                    item.isLiked 
                      ? "bg-gradient-to-br from-rose-300 to-rose-400 shadow-[0_8px_20px_-6px_rgba(251,113,133,0.5)]" 
                      : "bg-gray-200"
                  }`}
                >
                  <Heart 
                    size={20} 
                    strokeWidth={item.isLiked ? 0 : 2} 
                    fill={item.isLiked ? "white" : "transparent"} 
                    className={item.isLiked ? "text-white mt-1" : "text-white mt-1"} 
                  />
                  <span className="text-[10px] font-bold text-white mb-1">
                    {item.likes}
                  </span>
                </motion.button>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}