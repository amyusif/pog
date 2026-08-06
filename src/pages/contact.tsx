import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from "lucide-react";
import { useState } from "react";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, smoothEase } from '@/hooks/useScrollReveal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

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
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Connect With Us
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tighter">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              For general inquiries, press, or partnership opportunities. To book the band for an event, please use our <a href="/booking" className="text-primary hover:underline font-medium">booking form</a> for a faster quote.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-28 md:py-36 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeLeft}
              className="bg-card p-8 md:p-12 rounded-2xl border border-border shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="text-3xl font-serif font-medium text-foreground mb-12">Contact Information</h2>
                <div className="space-y-10 mb-12">
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-2 text-lg">Call Us</h3>
                      <p className="text-muted-foreground mb-1">0548 687 548</p>
                      <p className="text-muted-foreground mb-1">0248 400 056</p>
                      <p className="text-muted-foreground">0592 998 852</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-2 text-lg">Email Us</h3>
                      <p className="text-muted-foreground mb-1">bookings@powersofgrace.com</p>
                      <p className="text-muted-foreground">info@powersofgrace.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-2 text-lg">Office</h3>
                      <p className="text-muted-foreground leading-relaxed">Ahinsan Estate, Kumasi<br/>Ashanti Prime TV Premises<br/>(By appointment only)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground font-semibold mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Powers of Grace on Instagram" className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Powers of Grace on YouTube" className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Powers of Grace on X (Twitter)" className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeRight}
              className="bg-card p-8 md:p-12 rounded-2xl border border-border shadow-sm glass-card"
            >
              <h2 className="text-3xl font-serif font-medium text-foreground mb-8">Send a Message</h2>
              
              {submitted ? (
                <div className="text-center py-20 flex flex-col items-center justify-center h-full min-h-[400px]">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Message Sent</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">Thank you for reaching out. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <input 
                      type="text" required
                      className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input 
                      type="email" required
                      className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input 
                      type="text" required
                      className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea 
                      rows={5} required
                      className="w-full bg-background border border-border p-4 text-foreground rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50"
                      placeholder="Write your message here..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-14 rounded-lg text-base hover-lift mt-4">Send Message</Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="h-[500px] bg-muted/50 relative rounded-2xl overflow-hidden border border-border"
          >
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTIgMkgwdjJWMk0xOCAySDE2djJWME0yIDE4SDB2MmgxOEwxOCAyMEgyeiIgZmlsbD0iI2N1cnJlbnRDb2xvciIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card/90 backdrop-blur-md border border-border p-8 rounded-2xl text-center shadow-xl hover-lift max-w-sm">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-foreground font-semibold mb-2 text-xl">Ahinsan Estate, Kumasi</h3>
                <p className="text-muted-foreground">Ashanti Prime TV Premises</p>
                <p className="text-xs text-muted-foreground/70 mt-4 uppercase tracking-widest font-medium">By Appointment Only</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
