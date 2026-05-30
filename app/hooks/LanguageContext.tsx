"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language } from "../config/dictionary";

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  dict: typeof dictionaries.en; // Strongly typed based on our dictionary
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("el"); // Defaulting to Greek

  // This effect updates the class name on the <html> tag whenever the language changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("lang-en", "lang-el");
    root.classList.add(`lang-${lang}`);
    root.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "el" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, dict: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the dictionary anywhere
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}