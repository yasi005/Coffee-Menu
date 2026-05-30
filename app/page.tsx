"use client";

import { motion } from "framer-motion";
import { CloudSun, Calendar, Plus } from "lucide-react";
import { useLanguage } from "./hooks/LanguageContext";
import LiveWeatherTime from "./components/ui/LiveWatherTime";

export default function Home() {
  const { lang } = useLanguage();

  // Temporary mock data to show how the "Full Menu" will look.
  // We will replace this with your real menuData.ts file next!
  const menuCategories = [
    {
      titleEn: "Signature Coffee",
      titleEl: "Καφές Signature",
      items: [
        { id: 1, name: "Aged Espresso", price: "4.50", descEn: "Double shot, 12-day barrel aged", descEl: "Διπλή δόση, παλαιωμένος 12 μέρες" },
        { id: 2, name: "Velvet Flat White", price: "5.00", descEn: "Oat milk, vanilla bean dust", descEl: "Γάλα βρώμης, πούδρα βανίλιας" },
      ]
    },
    {
      titleEn: "Cold Pressed Juices",
      titleEl: "Φυσικοί Χυμοί",
      items: [
        { id: 3, name: "Green Detox", price: "6.50", descEn: "Celery, green apple, ginger, lime", descEl: "Σέλινο, πράσινο μήλο, τζίντζερ, λάιμ" },
        { id: 4, name: "Sunset Glow", price: "6.00", descEn: "Carrot, orange, turmeric", descEl: "Καρότο, πορτοκάλι, κουρκουμάς" },
      ]
    }
  ];

  return (
    // px-6 and md:px-12 ensures the content NEVER touches the screen edges
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-16 pb-32">

      {/* 1. WELCOME HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 mt-16 md:mt-24"
      >

        {/* --- THE NEW LIVE SYNC BADGE --- */}
        <LiveWeatherTime />

        {/* The Massive Minimalist Title */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground">
          {lang === "el" ? (
            <>Απλά. <br /><span className="text-muted-foreground/50">Εξαιρετικά.</span></>
          ) : (
            <>Simply. <br /><span className="text-muted-foreground/50">Exceptional.</span></>
          )}
        </h1>
      </motion.section>

      {/* 2. THE FULL MENU SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col gap-16"
      >
        {menuCategories.map((category, catIndex) => (
          <div key={catIndex} className="flex flex-col gap-8">

            {/* Category Header */}
            <div className="flex items-end justify-between border-b border-border/40 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {lang === "el" ? category.titleEl : category.titleEn}
              </h2>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                  className="group flex items-center justify-between p-4 rounded-3xl bg-muted/10 border border-border/30 hover:border-foreground/20 hover:bg-muted/30 transition-all cursor-pointer"
                >
                  {/* Item Details */}
                  <div className="flex flex-col gap-1 pr-4">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {lang === "el" ? item.descEl : item.descEn}
                    </p>
                  </div>

                  {/* Price & Add Button */}
                  <div className="flex flex-col items-end gap-3 pl-4 border-l border-border/40 shrink-0">
                    <span className="text-lg font-black tracking-tighter text-foreground">
                      €{item.price}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                      <Plus size={16} strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        ))}
      </motion.section>

    </div>
  );
}