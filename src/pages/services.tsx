import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/data/content";

export default function Services() {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 pb-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              Performances
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
              Tailored musical experiences for events that refuse to be ordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-24 items-center`}>
                <motion.div 
                  className={`w-full md:w-1/2 aspect-[4/3] rounded-sm relative overflow-hidden ${service.image}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
                
                <motion.div 
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">{service.title}</h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-10">
                    {service.description}
                  </p>
                  
                  <div className="mb-10">
                    <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">What's Included</h4>
                    <ul className="space-y-3">
                      {service.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/80">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={`/booking?type=${service.id}`}>
                    <Button size="lg" className="h-14 px-8 text-base">Book This Service</Button>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Production Add-Ons</h2>
            <p className="text-white/60 text-lg">Enhance your booking with our full-service production elements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Sound System (PA)", desc: "Full premium audio setup scaled to your venue and guest count." },
              { title: "Stage Lighting", desc: "Dynamic light shows programmed to match the band's performance." },
              { title: "MC / Hosting", desc: "Professional event hosting to keep your program flowing." },
              { title: "Backup Vocalists", desc: "Expand the choir sound with additional powerhouse singers." },
              { title: "Horn Section", desc: "Add extra brass for that massive, punchy festival sound." },
              { title: "Custom Song Learning", desc: "Special requests outside our repertoire arranged just for you." }
            ].map((addon, i) => (
              <div key={i} className="p-8 border border-white/10 bg-black rounded-sm hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{addon.title}</h3>
                <p className="text-white/60">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
