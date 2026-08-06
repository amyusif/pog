import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/data/content";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerContainerFast, smoothEase } from '@/hooks/useScrollReveal';

export default function Services() {
  const featuredService = services[0];
  const remainingServices = services.slice(1);

  return (
    <Layout>
      {/* Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background to-transparent" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Home / Services
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              Performances
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">
              Tailored musical experiences for events that refuse to be ordinary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Service */}
      {featuredService && (
        <section className="py-28 md:py-36 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Signature Experience</div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Our Featured Service</h2>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden w-full min-h-[500px] flex items-end p-8 md:p-16 hover-lift"
            >
              <div className={`absolute inset-0 ${featuredService.image} bg-cover bg-center`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="relative z-10 w-full max-w-3xl">
                <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{featuredService.title}</h3>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">{featuredService.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {featuredService.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-white">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/booking?type=${featuredService.id}`}>
                  <Button size="lg" className="h-14 px-8 text-base">Book This Service</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="py-28 md:py-36 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {remainingServices.map((service, index) => (
              <motion.div 
                key={service.id} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerContainer}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col hover-lift"
              >
                <motion.div 
                  className={`w-full aspect-[16/9] relative overflow-hidden ${service.image} bg-cover bg-center`}
                  variants={fadeUp}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
                
                <motion.div 
                  className="p-8 md:p-12 flex-1 flex flex-col"
                  variants={fadeUp}
                >
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-1">
                    {service.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">What's Included</h4>
                    <motion.ul variants={staggerContainerFast} className="space-y-3">
                      {service.included.map((item, i) => (
                        <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-foreground/80">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                  
                  <Link href={`/booking?type=${service.id}`}>
                    <Button size="lg" variant="outline" className="w-full h-14 text-base border-primary text-foreground hover:bg-primary hover:text-black">
                      Book This Service
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-28 md:py-36 bg-background border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Enhancements</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Production Add-Ons</h2>
            <p className="text-muted-foreground text-lg">Enhance your booking with our full-service production elements.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Sound System (PA)", desc: "Full premium audio setup scaled to your venue and guest count." },
              { title: "Stage Lighting", desc: "Dynamic light shows programmed to match the band's performance." },
              { title: "MC / Hosting", desc: "Professional event hosting to keep your program flowing." },
              { title: "Backup Vocalists", desc: "Expand the choir sound with additional powerhouse singers." },
              { title: "Horn Section", desc: "Add extra brass for that massive, punchy festival sound." },
              { title: "Custom Song Learning", desc: "Special requests outside our repertoire arranged just for you." }
            ].map((addon, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="hover-lift glass-card p-10 border border-border bg-card rounded-xl text-center hover:border-primary/50 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{addon.title}</h3>
                <p className="text-muted-foreground">{addon.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
