import { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Floating Buttons — appear after scrolling past the hero */}
      <AnimatePresence>
        {showFloating && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pointer-events-auto"
            >
              <Link href="/booking" className="group flex items-center justify-center">
                <div className="bg-primary text-black font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-primary/40 hover:shadow-xl active:scale-95 transition-all duration-300">
                  Book Now
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              transition={{ duration: 0.35, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pointer-events-auto"
            >
              <a 
                href="https://wa.me/233599846316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 wa-pulse"
              >
                <MessageCircle className="w-7 h-7" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
