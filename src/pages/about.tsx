import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { bandMembers } from "@/data/content";

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 pb-20 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              About The Band
            </h1>
            <p className="text-xl md:text-2xl text-primary max-w-3xl font-light">
              More than a playlist. A living, breathing force of musical energy.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Story */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Our Origin</h2>
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>
                  Power of Grace began as a group of passionate musicians united by faith and music. What started in intimate venues has since evolved into one of Kumasi's most sought-after live acts for events that demand absolute excellence.
                </p>
                <p>
                  We believe that live music is a conversation between the stage and the audience. Our sound is deeply rooted in Afrobeat rhythms, elevated by gospel-infused vocal energy, and refined with jazz sophistication.
                </p>
                <p>
                  When we step onto a stage, our mission is singular: to completely transform the atmosphere of the room and leave a lasting mark on every person present.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square bg-zinc-900 border border-white/10 rounded-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <span className="font-serif text-3xl font-bold text-white/20 uppercase tracking-widest">
                  Power Of Grace In Session
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Band */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Meet The Collective</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">The world-class musicians behind the signature Power of Grace sound.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bandMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className={`aspect-[4/5] ${member.image} mb-6 rounded-sm relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-1">{member.name}</h3>
                <div className="text-primary font-bold tracking-widest uppercase text-xs mb-4">{member.role}</div>
                <p className="text-white/60 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Venues */}
      <section className="py-24 bg-black border-t border-white/5 text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/40 mb-12">Trusted by premium brands and venues</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Kempinski Hotel", "Movenpick Ambassador", "GCB Bank", "Stanbic Bank", "Accra City Hotel"].map((brand) => (
              <div key={brand} className="text-2xl font-serif font-bold text-white">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Want us on your stage?</h2>
          <Link href="/booking">
            <Button size="lg" className="bg-black text-white hover:bg-zinc-800 text-lg h-14 px-10">
              Book The Band
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
