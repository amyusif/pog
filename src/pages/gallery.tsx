import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";
import { galleryItems } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [mood, setMood] = useState("All");

  const types = ["All", "Photo", "Video"];
  const moods = ["All", "Romantic", "High-Energy", "Corporate-Formal"];

  const filteredItems = galleryItems.filter(item => {
    const typeMatch = filter === "All" || item.type === filter;
    const moodMatch = mood === "All" || item.mood === mood;
    return typeMatch && moodMatch;
  });

  return (
    <Layout>
      <section className="pt-40 pb-12 bg-black relative">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
            Gallery
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-light mb-12">
            See and feel the energy of Power of Grace.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex gap-2 p-1 bg-white/5 rounded-sm overflow-x-auto w-full md:w-auto max-w-full">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={cn(
                    "px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                    filter === t ? "bg-primary text-black" : "text-white/60 hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2 p-1 bg-white/5 rounded-sm overflow-x-auto w-full md:w-auto max-w-full">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={cn(
                    "px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                    mood === m ? "bg-primary/20 text-primary" : "text-white/60 hover:text-white"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-black min-h-[50vh]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative group overflow-hidden rounded-sm cursor-pointer",
                    item.type === "Video" ? "aspect-video md:col-span-2 lg:col-span-2" : "aspect-square"
                  )}
                >
                  <div className={`absolute inset-0 ${item.image} transition-transform duration-700 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {item.type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                        <Play className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <div className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{item.mood}</div>
                    <h3 className="text-xl font-serif font-bold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-24 text-white/50">
              No media found for this combination.
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-zinc-950 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Press & Media Kit</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Download our Electronic Press Kit (EPK) containing high-res photos, tech riders, stage plots, and official bios for promoters and planners.
          </p>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
            <Download className="w-4 h-4 mr-2" /> Download EPK (PDF)
          </Button>
        </div>
      </section>
    </Layout>
  );
}
