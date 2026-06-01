"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "./hooks/LanguageContext";
import Image from "next/image";
import { useRef } from "react";
import { MapPin, Clock } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80";
const EXP_IMAGE_URL = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80";

export default function HomePage() {
  const { lang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const t = (en: string, el: string) => (lang === "el" ? el : en);

  const openHeaderMenu = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const menuBtn = document.querySelector('button[aria-label="Open Menu"]') as HTMLButtonElement;
    if (menuBtn) {
      menuBtn.click();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');
      `}</style>

      <main className="w-full bg-background text-foreground transition-colors duration-500 overflow-hidden font-sans">

        {/* ─── 1. HERO SECTION ─── */}
        <section ref={heroRef} className="relative w-full h-[85svh] overflow-hidden flex items-center justify-center">
          <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0 w-full h-full z-0">
            <Image src={HERO_IMAGE_URL} alt="The Lab interior" fill className="object-cover" priority sizes="100vw" />
          </motion.div>

          {/* تغییر مهم: گرادیان فقط در دارک‌مود وجود داره، در لایت‌مود کاملاً محو میشه تا عکس واضح باشه */}
          <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-background/10 dark:via-background/40 dark:to-background z-0 transition-colors duration-500" />

          <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10">
            <motion.p
              {...fadeUp(0.1)}
              className="text-[10px] tracking-[0.4em] uppercase text-[#c4a47c] mb-3 font-bold"
            >
              {t("Athens · Est. 2018", "Αθήνα · Est. 2018")}
            </motion.p>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-[#3a3530] dark:text-white leading-[0.95] mb-4 font-serif"
              style={{ 
                y: titleY, 
                fontSize: "clamp(60px, 14vw, 100px)", 
                fontWeight: 400, 
                letterSpacing: "-0.02em" 
              }}
            >
              {t("Simply.", "Απλά.")}
              <br />
              <span className="italic text-[#6b6258] dark:text-white/70">{t("Exceptional.", "Εξαιρετικά.")}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-[#6b6258] dark:text-white/70 max-w-sm text-sm font-light leading-relaxed mb-8"
            >
              {t("A curated space for specialty coffee, honest food, and long evenings.", "Ένας προσεγμένος χώρος για specialty καφέ, αληθινό φαγητό και μεγάλα βράδια.")}
            </motion.p>

            <motion.div {...fadeUp(0.4)}>
              <a
                href="#about"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#c4a47c] text-[#c4a47c] hover:bg-[#c4a47c] hover:text-white transition-all shadow-[0_0_20px_rgba(196,164,124,0.3)] dark:shadow-[0_0_20px_rgba(196,164,124,0.45)]"
              >
                ↓
              </a>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. ABOUT & EXPERIENCE ─── */}
        <section id="about" className="relative w-full py-24 flex items-center justify-center text-center transition-colors duration-500">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${EXP_IMAGE_URL})` }}
          />
          {/* تغییر مهم: روکش سفید در لایت‌مود خیلی کمتر شد و به جاش یه بلور ریز گرفت تا عکس واضح‌تر باشه و دارک‌مود همون موند */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] dark:backdrop-blur-none dark:bg-background/75 z-0 transition-all duration-500" />

          <div className="relative z-10 px-6 max-w-2xl mx-auto flex flex-col items-center">
            <motion.span {...fadeUp(0.1)} className="text-[10px] font-black tracking-[0.3em] uppercase text-[#c4a47c] mb-3 drop-shadow-sm dark:drop-shadow-none">
              {t("The Experience", "Η Εμπειρία")}
            </motion.span>
            <motion.h2 {...fadeUp(0.2)} className="text-3xl md:text-4xl font-serif font-light mb-5 text-[#1a1815] dark:text-foreground leading-tight drop-shadow-sm dark:drop-shadow-none">
              {t("More than just a destination.", "Κάτι περισσότερο από ένας προορισμός.")}
            </motion.h2>
            <motion.p {...fadeUp(0.3)} className="text-[#3a3530] dark:text-muted-foreground font-light leading-relaxed text-sm md:text-base drop-shadow-sm dark:drop-shadow-none">
              {t(
                "We believe that every detail matters. From the ethically sourced beans we roast each morning to the handcrafted cocktails we shake at night. Our space is designed to be your sanctuary.",
                "Πιστεύουμε ότι κάθε λεπτομέρεια μετράει. Από τους προσεκτικά επιλεγμένους κόκκους, μέχρι τα κοκτέιλ που ετοιμάζουμε το βράδυ. Ο χώρος μας έχει σχεδιαστεί για να είναι το καταφύγιό σας."
              )}
            </motion.p>
          </div>
        </section>

        {/* ─── 3. MENU TRIGGER CTA ─── */}
        <section className="w-full py-16 bg-background border-b border-border transition-colors duration-500">
          <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center">
            <motion.h2 {...fadeUp(0.1)} className="text-3xl font-serif text-foreground mb-3">
              {t("Discover Our Taste", "Ανακαλύψτε τη Γεύση μας")}
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="text-sm text-muted-foreground mb-8">
              {t("Explore our hand-crafted selections of coffee, food, and signature drinks.", "Εξερευνήστε τις χειροποίητες επιλογές μας από καφέ, φαγητό και ποτά.")}
            </motion.p>

            <motion.button
              {...fadeUp(0.3)}
              onClick={openHeaderMenu}
              className="px-8 py-3 rounded-full bg-[#c4a47c] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a88a65] hover:shadow-[0_0_20px_rgba(196,164,124,0.4)] transition-all"
            >
              {t("Check the Menu", "Δείτε το Μενού")}
            </motion.button>
          </div>
        </section>

        {/* ─── 4. COMPACT LOCATION & MAP ─── */}
        <section className="w-full py-16 px-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 bg-card p-6 rounded-[32px] shadow-sm border border-border transition-colors duration-500">

            <motion.div {...fadeUp(0.1)} className="flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#c4a47c] mb-2">
                {t("Visit Us", "Επισκεφθείτε μας")}
              </span>
              <h2 className="text-2xl font-serif text-foreground mb-6">The Lab Athens</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#c4a47c]"><MapPin size={18} /></div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                      {t("Location", "Τοποθεσία")}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      National Technical University Area<br />
                      Athens, Greece 106 82
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#c4a47c]"><Clock size={18} /></div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                      {t("Hours", "Ωράριο")}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t("Mon - Thu: 07:00 - 00:00", "Δευ - Πεμ: 07:00 - 00:00")}<br />
                      {t("Fri - Sun: 07:00 - 02:00", "Παρ - Κυρ: 07:00 - 02:00")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="flex-1 h-[250px] md:h-auto rounded-[20px] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
              <iframe
                src="https://maps.google.com/maps?q=National%20Technical%20University%20of%20Athens&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}