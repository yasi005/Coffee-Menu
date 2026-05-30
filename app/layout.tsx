import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "./hooks/LanguageContext";
import { ThemeProvider } from "./components/providers/ThemeProvider"; // <-- Import it

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Premium Digital Menu",
  description: "Interactive and scannable digital menu for our restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed the hardcoded dark classes from body so the provider can handle it dynamically
  return (
    <html lang="el" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased flex flex-col min-h-screen relative overflow-x-hidden transition-colors duration-500`}>
        {/* Add the ThemeProvider wrapping everything */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider>
            <Header />
            <main className="flex-grow pt-21">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}