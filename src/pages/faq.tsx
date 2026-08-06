import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs } from "@/data/content";
import { fadeUp, staggerContainer } from '@/hooks/useScrollReveal';
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <motion.section 
        className="pt-48 pb-28 md:py-48 bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Information
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tighter">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Everything you need to know about booking and working with Powers of Grace.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-28 md:py-36 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  variants={fadeUp}
                  className={`border border-border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-card shadow-sm' : 'bg-transparent hover:bg-card/50'}`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left p-6 md:p-8 flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-serif font-medium text-xl text-foreground pr-8">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div variants={fadeUp} className="mt-20">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center glass-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-foreground mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
}
