import { motion, useMotionValue, useTransform, animate, useScroll, useInView } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState, useRef, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Star, Calendar, MapPin, Users, Video, Play, X } from "lucide-react";
import { services, testimonials, upcomingEvents } from "@/data/content";
import { useScrollReveal, fadeUp, fadeIn, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerContainerFast, smoothEase } from '@/hooks/useScrollReveal';
import { hasLoadedInitialPage } from "@/components/PageLoader";

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

function useTypewriter(text: string) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayedText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * 0.12,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 3,
    });
    return controls.stop;
  }, [count, text.length]);

  return displayedText;
}

function AnimatedNumber({ value }: { value: string }) {
  const numValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      animate(motionValue, numValue, { duration: 2, ease: smoothEase });
    }
  }, [isInView, motionValue, numValue]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

const SHOW_DATE = new Date("2026-12-20T19:00:00+00:00");

export default function Home() {
  const countdown = useCountdown(SHOW_DATE);
  const typedText = useTypewriter("POWERS OF GRACE");
  const [videoOpen, setVideoOpen] = useState(false);

  const closeVideo = useCallback(() => setVideoOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeVideo(); };
    if (videoOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [videoOpen, closeVideo]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);

  const [loaderFinished, setLoaderFinished] = useState(() => hasLoadedInitialPage);

  useEffect(() => {
    if (hasLoadedInitialPage) {
      setLoaderFinished(true);
      return;
    }
    const handleComplete = () => setLoaderFinished(true);
    window.addEventListener('pageloader-complete', handleComplete);
    return () => window.removeEventListener('pageloader-complete', handleComplete);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Background overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background dark:from-black/75 dark:via-black/65 dark:to-black z-10" />
          {/* Hero background image with Parallax */}
          <motion.img
            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
            alt="Powers of Grace Live Stage"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-45 dark:opacity-55"
            style={{ y: heroY }}
          />
          {/* Subtle noise/grain texture overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 z-10" />
        </div>

        <motion.div 
          className="container mx-auto px-6 relative z-20 text-center"
          initial={hasLoadedInitialPage ? false : { opacity: 0, y: 35, scale: 0.97 }}
          animate={loaderFinished ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.97 }}
          transition={{ duration: 1, ease: smoothEase, delay: 0.15 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
          >
            <span className="text-primary tracking-[0.3em] uppercase text-sm md:text-base font-bold mb-6 block">
              The Ultimate Live Experience
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-foreground/90 dark:text-zinc-300 mb-8 tracking-tighter leading-none min-h-[1em]">
            <motion.span>{typedText}</motion.span>
            <span className="animate-pulse">|</span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground dark:text-zinc-400 max-w-2xl mx-auto mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: smoothEase }}
          >
            Live music that turns moments into memories.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: smoothEase }}
          >
            <Link href="/booking">
              <Button size="lg" className="text-lg px-8 h-16 w-full sm:w-auto hover:bg-primary/90">
                Book Us Now
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="text-lg px-8 h-16 w-full sm:w-auto border-foreground/30 text-foreground hover:bg-foreground hover:text-background dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                <Video className="w-5 h-5 mr-2" />
                Watch Highlights
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <motion.section 
        className="border-y border-white/10 bg-zinc-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: "Years Active", value: "10+" },
              { label: "Events Played", value: "500+" },
              { label: "Cities Performed", value: "30+" },
              { label: "Client Satisfaction", value: "98%" }
            ].map((stat, i) => (
              <motion.div key={i} className="text-center px-4" variants={fadeUp}>
                <div className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-24 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                variants={fadeUp}
                className="group relative h-96 overflow-hidden rounded-sm glass-card hover-lift"
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
      </motion.section>

      {/* Featured Video */}
      <motion.section 
        className="py-24 bg-zinc-950 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.p variants={fadeUp} className="text-primary uppercase tracking-widest text-sm font-semibold mb-3">See Us In Action</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Experience The Energy</motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 max-w-xl mx-auto mb-12">Watch us perform live — click to play with sound.</motion.p>

          {/* Thumbnail / Preview — click to open modal */}
          <motion.div
            variants={fadeUp}
            onClick={() => setVideoOpen(true)}
            className="aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden relative group cursor-pointer bg-zinc-900 border border-white/10 shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(217,119,6,0.15)' }}
          >
            {/* Muted looping preview */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform"
            >
              <source src="/media/vid.mov" type="video/mp4" />
            </video>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Animated play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative">
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping scale-150" />
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-125" style={{ animationDelay: '0.3s' }} />
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform duration-300 shadow-2xl relative z-10">
                  <Play className="w-10 h-10 text-black fill-black" />
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-6 left-6 text-left z-10">
              <div className="text-white font-bold text-xl drop-shadow-lg">Powers of Grace — Live Performance</div>
              <div className="text-white/70 text-sm drop-shadow-md mt-1">Highlight Reel 2025</div>
            </div>

            {/* Top-right badge */}
            <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-xs font-semibold">LIVE RECORDING</span>
            </div>
          </motion.div>
        </div>

        {/* Fullscreen Modal Player */}
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl mx-4 aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/media/vid.mov"
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </motion.div>
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close video"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </motion.section>

      {/* Upcoming Show Countdown */}
      <motion.section 
        className="py-24 bg-primary text-black relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center justify-center gap-2 border border-black/20 px-4 py-2 rounded-full mb-8 font-bold tracking-widest uppercase text-sm glass-card hover-lift">
            <Calendar className="w-4 h-4" /> Next Public Show
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl font-serif font-bold mb-6">A Night of Grace</motion.h2>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-12 font-medium opacity-80">December 20, 2026 • Accra Sports Stadium</motion.p>
          
          <motion.div variants={staggerContainer} className="flex justify-center gap-4 md:gap-8 mb-12">
            {([
              { label: "Days", value: String(countdown.days).padStart(2, "0") },
              { label: "Hours", value: String(countdown.hours).padStart(2, "0") },
              { label: "Mins", value: String(countdown.mins).padStart(2, "0") },
              { label: "Secs", value: String(countdown.secs).padStart(2, "0") }
            ] as { label: string; value: string }[]).map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  variants={scaleIn}
                  className="w-16 h-16 md:w-24 md:h-24 bg-black text-primary text-2xl md:text-4xl font-bold font-mono flex items-center justify-center rounded-sm shadow-xl hover-lift"
                >
                  <motion.span
                    key={unit.value}
                    initial={{ opacity: 0.4, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {unit.value}
                  </motion.span>
                </motion.div>
                <motion.span variants={fadeUp} className="mt-3 font-bold uppercase tracking-wider text-xs md:text-sm">{unit.label}</motion.span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/booking">
              <Button size="lg" className="bg-black text-white hover:bg-black/80 text-lg h-14 px-10 hover-lift">
                Get Tickets
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-24 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif font-bold text-white text-center mb-16">Client Testimonials</motion.h2>
          
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <motion.div key={testimonial.id} variants={scaleIn} className="bg-zinc-900 border border-white/5 p-8 rounded-sm hover:border-primary/30 transition-colors glass-card hover-lift">
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
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeUp} className="text-center mt-12">
            <Link href="/testimonials">
              <Button variant="link" className="text-primary text-lg">Read more reviews <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Words From The Crowd — scrolling marquee */}
      <motion.section 
        className="py-20 bg-zinc-950 overflow-hidden border-y border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeIn}
      >
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
              "Powers of Grace saved my 50th birthday.",
              "Guests are STILL talking about it.",
              "Tunde's trumpet solo had the whole hall gasping.",
              "10 out of 10 — no notes.",
              "I've been to concerts worldwide. This topped them.",
              "Chinwe's voice is a gift to humanity.",
              "Every single song felt like it was played just for us.",
              "Worth every single cedi, and then some.",
              "Powers of Grace saved my 50th birthday.",
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
      </motion.section>

      {/* Media Partners */}
      <motion.section 
        className="py-20 bg-black border-b border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold">Press &amp; Media</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">Media Partners</h2>
          </motion.div>

          <motion.div variants={staggerContainerFast} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
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
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(212,50,12,0.25)" }}
                className="group flex flex-col items-center justify-center gap-3 py-6 px-4 bg-white rounded-lg cursor-default transition-all duration-300"
              >
                <div className="w-full h-20 flex items-center justify-center px-2">
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="max-h-20 max-w-full w-auto object-contain grayscale-hover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest group-hover:text-zinc-700 transition-colors text-center font-semibold">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-center text-white/30 text-sm mt-8 uppercase tracking-widest">
            Featured in leading Ghanaian media outlets
          </motion.p>
        </div>
      </motion.section>


      {/* Final CTA */}
      <motion.section 
        className="py-32 bg-zinc-950 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6">Ready to make your event unforgettable?</h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">Dates book up quickly. Secure the ultimate live band experience for your next major event.</p>
          <Link href="/booking">
            <Button size="lg" className="h-16 px-12 text-lg hover-lift">
              Check Availability
            </Button>
          </Link>
        </div>
      </motion.section>
    </Layout>
  );
}
