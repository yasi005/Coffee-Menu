"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "./hooks/LanguageContext";
import Image from "next/image";
import { useRef } from "react";
import { MapPin, Clock, ArrowDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1635782165438-f658ae09cdda?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const EXP_IMAGE_URL = "https://images.unsplash.com/photo-1690707561439-c3c654f23361?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function HomePage() {
  const { lang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

        {/* ─── 1. HERO SECTION (Always Dark Theme for Image Readability) ─── */}
        <section ref={heroRef} className="relative w-full min-h-[100svh] overflow-hidden flex flex-col items-center justify-center bg-black">

          <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="absolute inset-0 w-full h-full z-0">
            <Image
              src={HERO_IMAGE_URL}
              alt="The Lab interior"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>

          {/* هاله تیره ثابت برای خوانایی متن در هر دو مود لایت و دارک */}
          <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/40 z-0 pointer-events-none" />

          {/* متن‌ها روی رنگ سفید قفل شدن */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16 max-w-3xl mx-auto w-full">
            <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-8 md:w-12 bg-[#c4a47c]"></div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c4a47c] font-bold drop-shadow-sm">
                {t("Athens · Est. 2018", "Αθήνα · Est. 2018")}
              </p>
              <div className="h-[1px] w-8 md:w-12 bg-[#c4a47c]"></div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-white leading-[1] mb-6 font-serif drop-shadow-md"
              style={{ fontSize: "clamp(50px, 10vw, 120px)", fontWeight: 300, letterSpacing: "-0.03em" }}
            >
              {t("Simply", "Απλά")}<br />
              <span className="italic text-[#c4a47c]">{t("Exceptional.", "Εξαιρετικά.")}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-white/90 max-w-md mx-auto text-base font-light leading-relaxed mb-10 drop-shadow-sm"
            >
              {t("A curated space for specialty coffee, honest food, and long evenings. Where every detail is crafted with intention.", "Ένας προσεγμένος χώρος για specialty καφέ, αληθινό φαγητό και μεγάλα βράδια. Όπου κάθε λεπτομέρεια φτιάχνεται με πρόθεση.")}
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex items-center justify-center gap-6">
              <button
                onClick={scrollToAbout}
                className="group relative flex items-center gap-3 pb-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[#c4a47c] transition-colors drop-shadow-sm"
              >
                <span>{t("Scroll Down", "Κατεβείτε")}</span>
                <ArrowDown size={16} className="group-hover:translate-y-2 transition-transform" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 group-hover:bg-[#c4a47c] transition-colors"></span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ─── 2. MENU CTA (Adapts to Light/Dark Mode) ─── */}
        <section id="about" className="w-full py-22 relative flex items-center justify-center overflow-hidden border-y border-border bg-background">
          {/* پس‌زمینه متنی: بزرگ، ضخیم و با حرکت پیوسته و بی‌نهایت */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04] dark:opacity-[0.03]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="flex whitespace-nowrap text-[16vw] font-serif font-black tracking-tighter text-foreground"
            >
              <span className="pr-8">TASTE • SAVOR • REPEAT • TASTE • SAVOR • REPEAT •</span>
              <span className="pr-8">TASTE • SAVOR • REPEAT • TASTE • SAVOR • REPEAT •</span>
            </motion.div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
            {/* آیکون ستاره که حالا آروم می‌چرخه */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              className="w-14 h-14 mx-auto border border-[#c4a47c] rounded-full flex items-center justify-center mb-8 text-[#c4a47c] text-xl shadow-[0_0_15px_rgba(196,164,124,0.1)]"
            >
              ✦
            </motion.div>

            <motion.h2 {...fadeUp(0.2)} className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6 tracking-tight">
              {t("Discover Our Taste", "Ανακαλύψτε τη Γεύση μας")}
            </motion.h2>

            <motion.p {...fadeUp(0.3)} className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10 font-light max-w-md mx-auto">
              {t("An ever-evolving menu of seasonal ingredients, perfectly pulled espresso, and evening elixirs.", "Ένα συνεχώς εξελισσόμενο μενού από εποχιακά υλικά, τέλειο espresso και βραδινά ελιξίρια.")}
            </motion.p>

            {/* دکمه با افکت هاور حرفه‌ای */}
            <motion.button
              {...fadeUp(0.4)}
              onClick={openHeaderMenu}
              className="group relative px-10 py-4 bg-foreground text-background text-xs font-bold tracking-[0.2em] uppercase overflow-hidden"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white flex items-center gap-3">
                {t("View Full Menu", "Πλήρες Μενού")}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-[#c4a47c] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
            </motion.button>
          </div>
        </section>


        {/* ─── 3. ABOUT & EXPERIENCE (Always Dark Theme) ─── */}
        <section className="relative w-full py-32 flex items-center justify-center text-center bg-black">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${EXP_IMAGE_URL})` }}
          />
          {/* روکش تیره ثابت برای اینکه عکس قشنگ بمونه */}
          <div className="absolute inset-0 bg-black/60 z-0" />

          <div className="relative z-10 px-6 max-w-2xl mx-auto flex flex-col items-center">
            <motion.span {...fadeUp(0.1)} className="text-[10px] font-black tracking-[0.3em] uppercase text-[#c4a47c] mb-4 drop-shadow-sm">
              {t("The Experience", "Η Εμπειρία")}
            </motion.span>
            <motion.h2 {...fadeUp(0.2)} className="text-4xl md:text-5xl font-serif font-light mb-6 text-white leading-tight drop-shadow-md">
              {t("More than just a destination.", "Κάτι περισσότερο από ένας προορισμός.")}
            </motion.h2>
            <motion.p {...fadeUp(0.3)} className="text-white/90 font-medium leading-relaxed text-sm md:text-lg drop-shadow-sm">
              {t(
                "We believe that every detail matters. From the ethically sourced beans we roast each morning to the handcrafted cocktails we shake at night. Our space is designed to be your sanctuary.",
                "Πιστεύουμε ότι κάθε λεπτομέρεια μετράει. Από τους προσεκτικά επιλεγμένους κόκκους, μέχρι τα κοκτέιλ που ετοιμάζουμε το βράδυ. Ο χώρος μας έχει σχεδιαστεί για να είναι το καταφύγιό σας."
              )}
            </motion.p>
          </div>
        </section>

        {/* ─── 4. LOCATION & MAP (Adapts to Light/Dark Mode) ─── */}
        <section className="w-full py-24 px-6 lg:px-12 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">

            <motion.div {...fadeUp(0.1)} className="lg:col-span-5 flex flex-col justify-center lg:pr-16">
              <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#c4a47c] mb-6">
                {t("Visit Us", "Επισκεφθείτε μας")}
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-12">The Lab Athens</h3>

              <div className="space-y-8">
                <div className="group border-t border-border pt-6">
                  <div className="flex items-center gap-4 mb-2 text-foreground">
                    <MapPin size={20} className="text-[#c4a47c]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">{t("Location", "Τοποθεσία")}</h4>
                  </div>
                  <p className="text-muted-foreground font-light pl-9 group-hover:text-foreground transition-colors">
                    National Technical University Area<br />
                    Athens, Greece 106 82
                  </p>
                </div>

                <div className="group border-t border-b border-border py-6">
                  <div className="flex items-center gap-4 mb-2 text-foreground">
                    <Clock size={20} className="text-[#c4a47c]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">{t("Hours", "Ωράριο")}</h4>
                  </div>
                  <p className="text-muted-foreground font-light pl-9 group-hover:text-foreground transition-colors">
                    {t("Mon - Thu: 07:00 - 00:00", "Δευ - Πεμ: 07:00 - 00:00")}<br />
                    {t("Fri - Sun: 07:00 - 02:00", "Παρ - Κυρ: 07:00 - 02:00")}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="lg:col-span-7 h-[300px] lg:h-auto min-h-[300px] relative">
              <div className="absolute inset-0 rounded-2xl lg:rounded-[2rem] overflow-hidden bg-muted">
                <div className="absolute inset-0 pointer-events-none mix-blend-saturation bg-background/20 z-10" />
                <iframe
                  src="https://maps.google.com/maps?q=National%20Technical%20University%20of%20Athens&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0 grayscale-[0.8] contrast-125 opacity-90 dark:invert dark:hue-rotate-180 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

          </div>
        </section>

      </main>
    </>
  );
}