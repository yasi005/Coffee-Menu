"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // لیست آدرس‌هایی که هدر و فوتر نمی‌خوان رو اینجا می‌نویسیم
  const hideNavRoutes = ["/coffee", "/breakfast", "/quick-order","/drinks"];
  
  // چک می‌کنیم آیا آدرس فعلی جزو لیست بالا هست یا نه
  const shouldHideNav = hideNavRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNav && <Header />}
      
      {/* اگه هدر داشتیم پدینگ بالا می‌دیم، اگه نه که هیچی */}
      <main className={`flex-grow ${!shouldHideNav ? "pt-21" : ""}`}>
        {children}
      </main>
      
      {!shouldHideNav && <Footer />}
    </>
  );
}