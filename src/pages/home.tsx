import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Star, Calendar, MapPin, Users, Video } from "lucide-react";
import { services, testimonials, upcomingEvents } from "@/data/content";

function useCountdown(targetDate: Date) {
  const calculate = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  };
  const [timeLeft, setTimeLeft] = useState(calculate);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

const SHOW_DATE = new Date("2026-12-20T19:00:00+00:00");

export default function Home() {
  const countdown = useCountdown(SHOW_DATE);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          {/* Abstract placeholder for band performance */}
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-60 mix-blend-screen" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-primary tracking-[0.3em] uppercase text-sm md:text-base font-bold mb-6 block">
              The Ultimate Live Experience
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white mb-8 tracking-tighter leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            POWER OF GRACE
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Live music that turns moments into memories.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/booking">
              <Button size="lg" className="text-lg px-8 h-16 w-full sm:w-auto hover:bg-white hover:text-black">
                Book Us Now
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="text-lg px-8 h-16 w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
                <Video className="w-5 h-5 mr-2" />
                Watch Highlights
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-zinc-950">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: "Years Active", value: "10+" },
              { label: "Events Played", value: "500+" },
              { label: "Cities Performed", value: "30+" },
              { label: "Client Satisfaction", value: "98%" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">What We Do</h2>
              <p className="text-white/60 text-lg max-w-xl">
                We don't just play music; we orchestrate atmospheres. Tailored performances for every kind of stage.
              </p>
            </div>
            <Link href="/services">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-black">
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-96 overflow-hidden rounded-sm"
              >
                <div className={`absolute inset-0 ${service.image} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-serif font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 line-clamp-2 mb-6">
                    {service.description}
                  </p>
                  <Link href="/services" className="inline-flex items-center text-primary font-bold uppercase tracking-wider text-sm">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-12">Experience The Energy</h2>
          
          <div className="aspect-video max-w-5xl mx-auto rounded-sm overflow-hidden relative group cursor-pointer bg-zinc-900 border border-white/10 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8 text-black" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-left">
              <div className="text-white font-bold text-xl drop-shadow-md">Power of Grace - Live at Accra International Conference Centre</div>
              <div className="text-white/80 text-sm drop-shadow-md">Highlight Reel 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Show Countdown */}
      <section className="py-24 bg-primary text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center justify-center gap-2 border border-black/20 px-4 py-2 rounded-full mb-8 font-bold tracking-widest uppercase text-sm">
            <Calendar className="w-4 h-4" /> Next Public Show
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6">A Night of Grace</h2>
          <p className="text-xl md:text-2xl mb-12 font-medium opacity-80">December 20, 2026 • Accra Sports Stadium</p>
          
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            {([
              { label: "Days", value: String(countdown.days).padStart(2, "0") },
              { label: "Hours", value: String(countdown.hours).padStart(2, "0") },
              { label: "Mins", value: String(countdown.mins).padStart(2, "0") },
              { label: "Secs", value: String(countdown.secs).padStart(2, "0") }
            ] as { label: string; value: string }[]).map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  key={unit.value}
                  initial={{ opacity: 0.4, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-black text-primary text-2xl md:text-4xl font-bold font-mono flex items-center justify-center rounded-sm shadow-xl"
                >
                  {unit.value}
                </motion.div>
                <span className="mt-3 font-bold uppercase tracking-wider text-xs md:text-sm">{unit.label}</span>
              </div>
            ))}
          </div>

          <Link href="/booking">
            <Button size="lg" className="bg-black text-white hover:bg-black/80 text-lg h-14 px-10">
              Get Tickets
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white text-center mb-16">Client Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <div key={testimonial.id} className="bg-zinc-900 border border-white/5 p-8 rounded-sm hover:border-primary/30 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-8 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-primary text-sm uppercase tracking-wider mt-1">{testimonial.type}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button variant="link" className="text-primary text-lg">Read more reviews <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Words From The Crowd — scrolling marquee */}
      <section className="py-20 bg-zinc-950 overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
          <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold">Unfiltered Reactions</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-3">Words From The Crowd</h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative flex overflow-hidden mb-6">
          <div className="flex gap-6 animate-marquee-left whitespace-nowrap">
            {[
              "They completely blew the roof off!",
              "Never seen anything like it in Accra.",
              "I cried — and I NEVER cry at concerts.",
              "The brass section is from another planet.",
              "Best wedding band on the continent, full stop.",
              "We danced until they literally had to stop us.",
              "My boss asked for their number mid-gala.",
              "Pure electricity on stage.",
              "They completely blew the roof off!",
              "Never seen anything like it in Accra.",
              "I cried — and I NEVER cry at concerts.",
              "The brass section is from another planet.",
              "Best wedding band on the continent, full stop.",
              "We danced until they literally had to stop us.",
              "My boss asked for their number mid-gala.",
              "Pure electricity on stage.",
            ].map((quote, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 text-white/70 text-lg font-light px-4"
              >
                <span className="text-primary text-2xl leading-none select-none">&ldquo;</span>
                {quote}
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative flex overflow-hidden">
          <div className="flex gap-6 animate-marquee-right whitespace-nowrap">
            {[
              "Power of Grace saved my 50th birthday.",
              "Guests are STILL talking about it.",
              "Tunde's trumpet solo had the whole hall gasping.",
              "10 out of 10 — no notes.",
              "I've been to concerts worldwide. This topped them.",
              "Chinwe's voice is a gift to humanity.",
              "Every single song felt like it was played just for us.",
              "Worth every single cedi, and then some.",
              "Power of Grace saved my 50th birthday.",
              "Guests are STILL talking about it.",
              "Tunde's trumpet solo had the whole hall gasping.",
              "10 out of 10 — no notes.",
              "I've been to concerts worldwide. This topped them.",
              "Chinwe's voice is a gift to humanity.",
              "Every single song felt like it was played just for us.",
              "Worth every single cedi, and then some.",
            ].map((quote, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 text-white/60 text-lg font-light px-4"
              >
                <span className="text-primary text-2xl leading-none select-none">&ldquo;</span>
                {quote}
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Media Partners */}
      <section className="py-20 bg-black border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold">Press &amp; Media</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">Media Partners</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {[
              { name: "Joy FM",           img: "/media-joy-fm.png" },
              { name: "GTV",              img: "/media-gtv.png" },
              { name: "Citi TV",          img: "/media-citi-tv.png" },
              { name: "Pulse Ghana",      img: "/media-pulse-ghana.png" },
              { name: "Ghana Web",        img: "/media-ghanaweb.png" },
              { name: "Graphic Online",   img: "/media-graphic-online.png" },
              { name: "Ashanti Prime TV", img: "/ashanti.jpeg" },
            ].map((partner) => (
              <motion.div
                key={partner.name}
                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(212,50,12,0.25)" }}
                className="group flex flex-col items-center justify-center gap-3 py-6 px-4 bg-white rounded-lg cursor-default transition-all duration-300"
              >
                <div className="w-full h-20 flex items-center justify-center px-2">
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="max-h-20 max-w-full w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest group-hover:text-zinc-700 transition-colors text-center font-semibold">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/30 text-sm mt-8 uppercase tracking-widest">
            Featured in leading Ghanaian media outlets
          </p>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6">Ready to make your event unforgettable?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">Dates book up quickly. Secure the ultimate live band experience for your next major event.</p>
          <Link href="/booking">
            <Button size="lg" className="h-16 px-12 text-lg">
              Check Availability
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
