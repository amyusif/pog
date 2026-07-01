import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="pointer-events-auto"
        >
          <Link href="/booking" className="group flex items-center justify-center">
            <div className="bg-primary text-black font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 hover:bg-white transition-all">
              Book Now
            </div>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-auto"
        >
          <a 
            href="https://wa.me/2348001234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-7 h-7" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
