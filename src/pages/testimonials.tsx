import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/content";

export default function Testimonials() {
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
              Client Stories
            </h1>
            <p className="text-xl text-primary max-w-2xl mx-auto font-light">
              Don't just take our word for it. Hear from those who have experienced the magic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Video Testimonial Placeholder */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden relative bg-zinc-900 border border-white/10 group cursor-pointer">
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all text-white group-hover:text-black">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Watch: The Johnson Wedding</h3>
                <p className="text-white/60">A behind-the-scenes look at an unforgettable night.</p>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="bg-black p-8 border border-white/5 rounded-sm relative"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-8 relative z-10 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-white/10 pt-6">
                  <div className="text-white font-bold text-lg">{testimonial.name}</div>
                  <div className="text-white/50 text-sm mt-1">{testimonial.role}</div>
                  <div className="mt-3 inline-block px-3 py-1 bg-white/5 text-primary text-xs uppercase tracking-widest rounded-sm">
                    {testimonial.type}
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
