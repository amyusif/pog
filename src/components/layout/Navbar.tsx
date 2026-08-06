import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const mainNavLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Events", path: "/events" },
  { name: "Contact", path: "/contact" },
];

const aboutDropdownLinks = [
  { name: "About The Band", path: "/about" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "FAQ", path: "/faq" },
];

const mobileNavLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Events", path: "/events" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isAboutActive =
    location === "/about" ||
    location === "/testimonials" ||
    location === "/faq";

  // All nav links including about dropdown paths for active detection
  const allNavPaths = [...mainNavLinks.map(l => l.path), ...aboutDropdownLinks.map(l => l.path)];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          scrolled
            ? cn(
                "py-3 shadow-lg",
                theme === "dark"
                  ? "bg-black/80 backdrop-blur-xl"
                  : "bg-white/90 backdrop-blur-xl shadow-sm"
              )
            : theme === "dark"
              ? "bg-gradient-to-b from-black/80 to-transparent py-5"
              : "bg-gradient-to-b from-white/95 via-white/80 to-transparent py-5"
        )}
        style={{
          transition: "padding 0.4s cubic-bezier(0.25,0.46,0.45,0.94), background-color 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.4s cubic-bezier(0.25,0.46,0.45,0.94)"
        }}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center">
            <div className="px-2 py-1">
              <img
                src="/logo.png"
                alt="Powers of Grace Events and Trading Limited"
                className={cn(
                  "w-auto object-contain group-hover:opacity-80",
                  scrolled ? "h-16 md:h-20" : "h-20 md:h-28"
                )}
                style={{ transition: "height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease" }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-1 relative">
              {mainNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={cn(
                      "relative text-sm font-medium uppercase tracking-wider px-4 py-2 rounded-full",
                      location === link.path
                        ? "text-primary font-bold"
                        : theme === "dark"
                          ? "text-white/80 hover:text-white"
                          : "text-foreground/80 hover:text-foreground font-semibold"
                    )}
                    style={{ transition: "color 0.25s ease" }}
                  >
                    {link.name}
                    {location === link.path && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className={cn(
                          "absolute inset-0 rounded-full -z-10",
                          theme === "dark" ? "bg-white/[0.08]" : "bg-black/[0.06]"
                        )}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}

              {/* About Dropdown */}
              <li
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  onClick={() => setAboutOpen((o) => !o)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setAboutOpen(false);
                    if (e.key === "ArrowDown") { e.preventDefault(); setAboutOpen(true); }
                  }}
                  aria-haspopup="menu"
                  aria-expanded={aboutOpen}
                  className={cn(
                    "relative flex items-center gap-1 text-sm font-medium uppercase tracking-wider px-4 py-2 rounded-full",
                    isAboutActive
                      ? "text-primary"
                      : "text-white/80 hover:text-white"
                  )}
                  style={{ transition: "color 0.25s ease" }}
                >
                  About
                  <ChevronDown
                    className={cn(
                      "w-4 h-4",
                      aboutOpen ? "rotate-180" : ""
                    )}
                    style={{ transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                  />
                  {isAboutActive && !mainNavLinks.find(l => l.path === location) && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      role="menu"
                      aria-label="About submenu"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onKeyDown={(e) => { if (e.key === "Escape") setAboutOpen(false); }}
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 shadow-2xl z-50 overflow-hidden rounded-lg",
                        theme === "dark"
                          ? "bg-zinc-900/95 backdrop-blur-xl border border-white/10"
                          : "bg-white/95 backdrop-blur-xl border border-black/10"
                      )}
                    >
                      {/* Gold accent top line */}
                      <div className="h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 w-full" />
                      {aboutDropdownLinks.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          role="menuitem"
                          onClick={() => setAboutOpen(false)}
                          onKeyDown={(e) => { if (e.key === "Escape") setAboutOpen(false); }}
                          className={cn(
                            "block px-5 py-3 text-sm uppercase tracking-wider hover:bg-white/5 hover:text-primary focus:outline-none focus:bg-white/5 focus:text-primary",
                            location === item.path
                              ? "text-primary bg-white/5"
                              : "text-white/80"
                          )}
                          style={{ transition: "background-color 0.2s ease, color 0.2s ease" }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-full border hover:border-primary",
                theme === "dark"
                  ? "border-white/20 text-white/70 hover:text-primary"
                  : "border-black/20 text-black/70 hover:text-primary"
              )}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <Link href="/booking">
              <Button className="rounded-none uppercase tracking-widest text-xs font-bold border border-primary/50 hover:bg-primary hover:text-black hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all duration-300">
                Book Us
              </Button>
            </Link>
          </nav>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-full border",
                theme === "dark"
                  ? "border-white/20 text-white/70"
                  : "border-black/20 text-black/70"
              )}
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm z-[60] bg-black flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <img
                  src="/logo.png"
                  alt="Powers of Grace Events and Trading Limited"
                  className="h-16 w-auto object-contain brightness-0 invert"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2 hover:text-primary transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col items-start justify-center gap-1 p-8 overflow-y-auto">
                {mobileNavLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full"
                  >
                    <Link
                      href={link.path}
                      className={cn(
                        "block text-2xl font-serif tracking-wide py-3 border-b border-white/5",
                        location === link.path ? "text-primary" : "text-white hover:text-primary"
                      )}
                      style={{ transition: "color 0.2s ease" }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.35 }}
                  className="mt-8 w-full"
                >
                  <Link href="/booking">
                    <Button size="lg" className="w-full text-lg">
                      Book The Band
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
