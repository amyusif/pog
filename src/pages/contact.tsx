import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <Layout>
      <section className="pt-40 pb-20 bg-zinc-950 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tighter">
                Get In Touch
              </h1>
              <p className="text-xl text-white/60 mb-12 font-light">
                For general inquiries, press, or partnership opportunities. To book the band for an event, please use our <a href="/booking" className="text-primary hover:underline">booking form</a> for a faster quote.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Call Us</h3>
                    <p className="text-white/60">0548 687 548</p>
                    <p className="text-white/60">0248 400 056</p>
                    <p className="text-white/60">0592 998 852</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email Us</h3>
                    <p className="text-white/60">bookings@powerofgrace.com</p>
                    <p className="text-white/60">info@powerofgrace.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Office</h3>
                    <p className="text-white/60">Ahinsan Estate, Kumasi<br/>Ashanti Prime TV Premises<br/>(By appointment only)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on Instagram" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on YouTube" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on X (Twitter)" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black p-8 md:p-12 rounded-sm border border-white/10"
            >
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Send a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-primary text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
                  <p className="text-white/60">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-2">Name</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-950 border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-2">Email Address</label>
                    <input 
                      type="email" required
                      className="w-full bg-zinc-950 border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-2">Subject</label>
                    <input 
                      type="text" required
                      className="w-full bg-zinc-950 border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/70 mb-2">Message</label>
                    <textarea 
                      rows={5} required
                      className="w-full bg-zinc-950 border border-white/10 p-4 text-white rounded-sm focus:border-primary focus:outline-none resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-14">Send Message</Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-zinc-900 relative">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTIgMkgwdjJWMk0xOCAySDE2djJWME0yIDE4SDB2MmgxOEwxOCAyMEgyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur border border-white/10 p-6 rounded-sm text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-white font-bold mb-1">Ahinsan Estate, Kumasi</h3>
            <p className="text-white/50 text-sm">Ashanti Prime TV Premises</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
