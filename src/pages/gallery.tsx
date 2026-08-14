import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Play, Download, Search, X } from "lucide-react";
import { galleryItems } from "@/data/content";
import { cn } from "@/lib/utils";
import { fadeUp, fadeIn, scaleIn, staggerContainer } from '@/hooks/useScrollReveal';

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [mood, setMood] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const types = ["All", "Photo", "Video"];
  const moods = ["All", "Romantic", "High-Energy", "Corporate-Formal"];

  const filteredItems = galleryItems.filter(item => {
    const typeMatch = filter === "All" || item.type === filter;
    const moodMatch = mood === "All" || item.mood === mood;
    return typeMatch && moodMatch;
  });

  return (
    <Layout>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Home / Gallery
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              Gallery
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
              See and feel the energy of Powers of Grace.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="flex gap-2 p-1 bg-muted rounded-full overflow-x-auto w-full lg:w-auto max-w-full">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                    filter === t ? "bg-primary text-black shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2 p-1 bg-muted rounded-full overflow-x-auto w-full lg:w-auto max-w-full">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
                    mood === m ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            layout 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  variants={scaleIn}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => item.type === "Video" && (item as any).videoSrc && setSelectedVideo((item as any).videoSrc)}
                  className="relative group overflow-hidden rounded-xl cursor-pointer hover-lift shadow-sm bg-card aspect-[4/3]"
                >
                  {item.type === "Video" && (item as any).videoSrc ? (
                    <video 
                      src={`${(item as any).videoSrc}#t=0.1`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      preload="metadata"
                      muted
                      playsInline
                    />
                  ) : (
                    <div className={`absolute inset-0 ${item.image} bg-cover bg-center transition-transform duration-700 group-hover:scale-110`} />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center text-black shadow-lg shadow-black/50">
                      {item.type === "Video" ? (
                        <Play className="w-6 h-6 ml-1" />
                      ) : (
                        <Search className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{item.mood}</div>
                    <h3 className="text-xl font-serif font-bold text-white">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredItems.length === 0 && (
            <motion.div 
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-center py-32 text-muted-foreground"
            >
              No media found for this combination.
            </motion.div>
          )}
        </div>
      </section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="py-28 md:py-36 bg-muted/30 border-t border-border text-center"
      >
        <div className="container mx-auto px-6">
          <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Resources</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Press & Media Kit</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Download our Electronic Press Kit (EPK) containing high-res photos, tech riders, stage plots, and official bios for promoters and planners.
          </p>
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-black h-14 px-8 text-base">
            <Download className="w-5 h-5 mr-3" /> Download EPK (PDF)
          </Button>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black rounded-full p-2 transition-all"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo}
                autoPlay
                controls
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
