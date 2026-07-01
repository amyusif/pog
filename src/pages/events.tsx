import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { upcomingEvents, pastEvents } from "@/data/content";

export default function Events() {
  return (
    <Layout>
      <section className="pt-40 pb-20 bg-zinc-950">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              Tour & Events
            </h1>
            <p className="text-xl text-primary max-w-2xl mx-auto font-light">
              Catch us live. Feel the energy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-12 flex items-center gap-4">
            <Calendar className="text-primary w-8 h-8" />
            Upcoming Public Shows
          </h2>

          <div className="space-y-6">
            {upcomingEvents.map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-white/10 bg-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-primary/50 transition-colors rounded-sm"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 w-full md:w-auto text-center md:text-left">
                  <div className="shrink-0 w-32">
                    <div className="text-primary font-bold text-lg">{event.date}</div>
                    <div className="text-white/60 text-sm mt-1">{event.time}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors">{event.title}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white/60 mt-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                  </div>
                </div>
                <Link href={event.ticketLink} className="w-full md:w-auto shrink-0">
                  <Button className="w-full md:w-auto">Get Tickets</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Past Highlights</h2>
            <Link href="/gallery" className="text-primary hover:text-white flex items-center text-sm font-bold uppercase tracking-wider">
              View Gallery <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden"
              >
                <div className={`absolute inset-0 ${event.image} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{event.date}</div>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{event.title}</h3>
                  <div className="text-white/60 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {event.venue}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
