import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Music, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex flex-col">
              <div className="px-3 py-2 inline-block">
                <img
                  src="/logo.png"
                  alt="Power of Grace Events and Trading Limited"
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Transforming events into transcendent experiences. A force of nature on stage, delivering soulful, expansive, and commanding live performances.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black hover:border-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on YouTube" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black hover:border-primary transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on X (Twitter)" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black hover:border-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" aria-label="Power of Grace on Apple Music" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-black hover:border-primary transition-all">
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-primary transition-colors">About the Band</Link></li>
              <li><Link href="/services" className="text-white/60 hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/gallery" className="text-white/60 hover:text-primary transition-colors">Media Gallery</Link></li>
              <li><Link href="/events" className="text-white/60 hover:text-primary transition-colors">Upcoming Shows</Link></li>
              <li><Link href="/testimonials" className="text-white/60 hover:text-primary transition-colors">Client Reviews</Link></li>
              <li><Link href="/faq" className="text-white/60 hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>0548 687 548<br/>0248 400 056<br/>0592 998 852</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>bookings@powerofgrace.com<br/>info@powerofgrace.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Ahinsan Estate, Kumasi<br/>Ashanti Prime TV Premises</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white mb-6">Newsletter</h3>
            <p className="text-white/60 mb-4">Subscribe for updates on public shows and exclusive content.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Power of Grace Live Band. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <span className="text-white/40">Privacy Policy</span>
            <span className="text-white/40">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
