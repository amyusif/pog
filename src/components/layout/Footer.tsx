import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Music, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp, staggerContainer } from "@/hooks/useScrollReveal";

function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <RevealSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="flex flex-col">
              <div className="px-3 py-2 inline-block">
                <img
                  src="/logo.png"
                  alt="Powers of Grace Events and Trading Limited"
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Transforming events into transcendent experiences. A force of nature on stage, delivering soulful, expansive, and commanding live performances.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { icon: Twitter, href: "https://twitter.com", label: "X (Twitter)" },
                { icon: Music, href: "https://music.apple.com", label: "Apple Music" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Powers of Grace on ${label}`}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: "/about", label: "About the Band" },
                { href: "/services", label: "Our Services" },
                { href: "/gallery", label: "Media Gallery" },
                { href: "/events", label: "Upcoming Shows" },
                { href: "/testimonials", label: "Client Reviews" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-xl text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>0548 687 548<br/>0248 400 056<br/>0592 998 852</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>bookings@powersofgrace.com<br/>info@powersofgrace.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Ahinsan Estate, Kumasi<br/>Ashanti Prime TV Premises</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-xl text-white mb-6">Newsletter</h3>
            <p className="text-white/60 mb-4">Subscribe for updates on public shows and exclusive content.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                required
              />
              <Button className="w-full hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300">Subscribe</Button>
            </form>
          </motion.div>
        </RevealSection>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Powers of Grace Live Band. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-white/40 hover:text-white/60 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
