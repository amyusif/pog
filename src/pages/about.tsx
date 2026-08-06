import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { bandMembers } from "@/data/content";
import { fadeUp, fadeIn, fadeLeft, scaleIn, staggerContainer } from '@/hooks/useScrollReveal';

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Home / About
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              About The Band
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light">
              More than a playlist. A living, breathing force of musical energy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleIn}
              className="w-full lg:w-[60%] aspect-[4/3] lg:aspect-video rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470229722913-7c092bb83dfc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <span className="font-serif text-3xl font-bold text-white/40 uppercase tracking-widest">
                  Power Of Grace In Session
                </span>
              </div>
            </motion.div>
            
            <motion.div
              className="w-full lg:w-[40%]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeLeft} className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                The Origin
              </motion.div>
              <motion.h2 variants={fadeLeft} className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-8">
                Our Story
              </motion.h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <motion.p variants={fadeUp}>
                  Powers of Grace began as a group of passionate musicians united by faith and music. What started in intimate venues has since evolved into one of Kumasi's most sought-after live acts for events that demand absolute excellence.
                </motion.p>
                <motion.p variants={fadeUp}>
                  We believe that live music is a conversation between the stage and the audience. Our sound is deeply rooted in Afrobeat rhythms, elevated by gospel-infused vocal energy, and refined with jazz sophistication.
                </motion.p>
                <motion.p variants={fadeUp}>
                  When we step onto a stage, our mission is singular: to completely transform the atmosphere of the room and leave a lasting mark on every person present.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Band */}
      <section className="py-28 md:py-36 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">The Talent</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">Meet The Collective</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The world-class musicians behind the signature Powers of Grace sound.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bandMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="group relative hover-lift rounded-2xl overflow-hidden aspect-[4/5] bg-card"
              >
                <div className={`absolute inset-0 ${member.image} bg-cover bg-center transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-500" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">{member.name}</h3>
                  <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">{member.role}</div>
                  <p className="text-white/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients & Venues */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="py-28 md:py-36 bg-background border-t border-border text-center"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 variants={fadeIn} className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground mb-12">
            Trusted by premium brands and venues
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {["Kempinski Hotel", "Movenpick Ambassador", "GCB Bank", "Stanbic Bank", "Accra City Hotel"].map((brand) => (
              <motion.div 
                key={brand}
                variants={fadeUp}
                className="glass-card bg-card border border-border rounded-xl p-6 flex items-center justify-center text-center h-32 hover-lift"
              >
                <span className="text-lg font-serif font-bold text-foreground opacity-60 grayscale-hover transition-all duration-500">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="py-28 md:py-36 bg-primary text-primary-foreground text-center"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-black">Want us on your stage?</h2>
          <Link href="/booking">
            <Button size="lg" className="bg-black text-white hover:bg-zinc-800 text-lg h-14 px-10">
              Book The Band
            </Button>
          </Link>
        </div>
      </motion.section>
    </Layout>
  );
}
