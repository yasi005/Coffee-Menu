"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlignRight, Languages, Moon, Sun } from "lucide-react";
import { useLanguage } from "../../hooks/LanguageContext";
import { useTheme } from "next-themes";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { dict, lang, toggleLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const nakedBtnClass = "text-muted-foreground hover:text-foreground transition-colors p-1";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-muted/80 backdrop-blur-2xl py-4 shadow-sm" 
            : "bg-muted/40 backdrop-blur-md py-6"
        }`}
      >
        {/* The Creative Gradient Border */}
        <div 
          className={`absolute bottom-0 left-0 w-full h-[1px] transition-opacity duration-500 bg-gradient-to-r from-transparent via-foreground/20 to-transparent ${
            scrolled ? "opacity-100" : "opacity-50"
          }`} 
        />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center relative z-10">
          
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-black tracking-tighter text-foreground cursor-pointer select-none"
          >
            {dict.header.logo}
          </motion.div>

          <div className="flex items-center gap-6">
            
            <motion.button
              whileTap={{ scale: 0.8, rotate: -20 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={nakedBtnClass}
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun size={26} strokeWidth={1.2} />
                ) : (
                  <Moon size={26} strokeWidth={1.2} />
                )
              ) : (
                <div className="w-[26px] h-[26px]" />
              )}
            </motion.button>

            <motion.button 
              whileTap={{ scale: 0.85 }}
              onClick={toggleLang} 
              className={`flex items-center gap-2 ${nakedBtnClass}`}
            >
              <Languages size={24} strokeWidth={1.2} />
              <span className="text-[10px] font-bold tracking-widest uppercase mt-[2px]">{lang}</span>
            </motion.button>

            <div className="w-[1px] h-6 bg-border/80 mx-1" />

            <motion.button 
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsOpen(true)} 
              className={nakedBtnClass}
              aria-label="Open Menu"
            >
              <AlignRight size={28} strokeWidth={1.2} />
            </motion.button>
            
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}