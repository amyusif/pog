import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <section className="pt-40 pb-20 bg-black relative">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light">
              Everything you need to know about booking and working with Power of Grace.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950 border-t border-white/5 min-h-[50vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-white/10 bg-black rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif font-bold text-xl text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-primary transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-white/70 leading-relaxed border-t border-white/5 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center text-white/60">
            <p>Still have questions? <a href="/contact" className="text-primary hover:underline">Contact us directly</a>.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
