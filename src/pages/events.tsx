import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { upcomingEvents, pastEvents } from "@/data/content";
import { fadeUp, fadeIn, scaleIn, staggerContainer, smoothEase } from '@/hooks/useScrollReveal';

export default function Events() {
  return (
    <Layout>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-d76947230485?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Home / Tour & Events
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              Tour & Events
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
              Catch us live. Feel the energy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-12"
          >
            <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Mark Your Calendar</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground flex items-center gap-4">
              <Calendar className="text-primary w-8 h-8" />
              Upcoming Public Shows
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {upcomingEvents.map((event) => (
              <motion.div 
                key={event.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="group hover-lift glass-card border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-primary/50 transition-colors rounded-xl shadow-sm"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 w-full md:w-auto text-center md:text-left">
                  <div className="shrink-0 w-32 bg-muted/50 rounded-lg p-4">
                    <div className="text-primary font-bold text-xl">{event.date}</div>
                    <div className="text-muted-foreground text-sm mt-1">{event.time}</div>
                  </div>
                  <div className="py-2">
                    <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                  </div>
                </div>
                <Link href={event.ticketLink} className="w-full md:w-auto shrink-0">
                  <Button className="w-full md:w-auto h-12 px-8">Get Tickets</Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-28 md:py-36 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">The Archives</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Past Highlights</h2>
            </div>
            <Link href="/gallery" className="text-primary hover:text-foreground flex items-center text-sm font-bold uppercase tracking-wider transition-colors">
              View Gallery <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pastEvents.map((event) => (
              <motion.div 
                key={event.id}
                variants={scaleIn}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden hover-lift shadow-md bg-card"
              >
                <div className={`absolute inset-0 ${event.image} bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ease-out`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{event.date}</div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">{event.title}</h3>
                  <div className="text-white/80 text-sm flex items-center gap-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                    <MapPin className="w-4 h-4" /> {event.venue}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
