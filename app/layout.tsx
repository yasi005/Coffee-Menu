import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./hooks/LanguageContext";
import { ThemeProvider } from "./components/providers/ThemeProvider"; 
import ConditionalLayout from "./components/layout/ConditionalLayout"; // <-- اینو اضافه کردیم

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
  return (
    <html lang="el" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased flex flex-col min-h-screen relative overflow-x-hidden transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider>
            
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}