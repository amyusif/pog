import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Star, Quote, Play, User } from "lucide-react";
import { testimonials } from "@/data/content";
import { fadeUp, scaleIn, staggerContainer, smoothEase } from '@/hooks/useScrollReveal';

export default function Testimonials() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const mid = Math.ceil(testimonials.length / 2);
  const col1 = testimonials.slice(0, mid);
  const col2 = testimonials.slice(mid);

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section 
        className="pt-48 pb-28 md:py-48 bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-screen" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Client Experiences
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tighter">
              Words of Wonder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Don't just take our word for it. Hear from those who have experienced the magic firsthand.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Review */}
      <motion.section 
        className="py-12 bg-background relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            variants={scaleIn}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden relative bg-card border border-border group p-10 md:p-16 text-center hover-lift"
          >
            <Quote className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 text-primary/10 -z-10" />
            <div className="flex gap-1 justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <h3 className="text-2xl md:text-4xl font-serif font-medium text-foreground mb-10 leading-snug">
              "An absolutely flawless experience from start to finish. They brought our vision to life in ways we never thought possible."
            </h3>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">The Johnson Family</div>
                <div className="text-muted-foreground">Wedding Celebration</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Review Grid */}
      <motion.section 
        className="py-28 md:py-36 bg-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            <div className="flex flex-col gap-8">
              {col1.map((testimonial) => (
                <ReviewCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            <div className="flex flex-col gap-8">
              {col2.map((testimonial) => (
                <ReviewCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
}

function ReviewCard({ testimonial }: { testimonial: any }) {
  return (
    <motion.div 
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: smoothEase }}
      className="bg-card p-8 border border-border border-l-4 border-l-primary rounded-xl relative glass-card hover-lift flex flex-col"
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-foreground/90 text-lg leading-relaxed mb-8 flex-grow">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-4 pt-6 border-t border-border">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <User className="w-6 h-6" />
        </div>
        <div>
          <div className="text-foreground font-semibold">{testimonial.name}</div>
          <div className="text-muted-foreground text-sm">{testimonial.role}</div>
          <div className="mt-1 text-primary text-xs uppercase tracking-wider font-medium">
            {testimonial.type}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
