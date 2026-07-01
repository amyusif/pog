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
    window.addEventListener("scroll", handleScroll);
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

  const isAboutActive =
    location === "/about" ||
    location === "/testimonials" ||
    location === "/faq";

  const navBarBg = scrolled
    ? theme === "dark"
      ? "bg-black/90 backdrop-blur-md border-white/10 shadow-lg py-4"
      : "bg-white/90 backdrop-blur-md border-black/10 shadow-lg py-4"
    : "bg-gradient-to-b from-black/80 to-transparent py-6";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
          navBarBg
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center">
            <div className="px-2 py-1">
              <img
                src="/logo.png"
                alt="Power of Grace Events and Trading Limited"
                className="h-20 md:h-28 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {mainNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={cn(
                      "text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary",
                      location === link.path ? "text-primary" : "text-white/80"
                    )}
                  >
                    {link.name}
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
                    "flex items-center gap-1 text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary",
                    isAboutActive ? "text-primary" : "text-white/80"
                  )}
                >
                  About
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      aboutOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      role="menu"
                      aria-label="About submenu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      onKeyDown={(e) => { if (e.key === "Escape") setAboutOpen(false); }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-black border border-white/10 shadow-2xl z-50 overflow-hidden"
                    >
                      {/* Gold accent top line */}
                      <div className="h-[2px] bg-primary w-full" />
                      {aboutDropdownLinks.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          role="menuitem"
                          onClick={() => setAboutOpen(false)}
                          onKeyDown={(e) => { if (e.key === "Escape") setAboutOpen(false); }}
                          className={cn(
                            "block px-5 py-3 text-sm uppercase tracking-wider transition-colors hover:bg-white/5 hover:text-primary focus:outline-none focus:bg-white/5 focus:text-primary",
                            location === item.path
                              ? "text-primary bg-white/5"
                              : "text-white/80"
                          )}
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
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-primary hover:border-primary transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <Link href="/booking">
              <Button className="rounded-none uppercase tracking-widest text-xs font-bold border border-primary/50 hover:bg-primary hover:text-black">
                Book Us
              </Button>
            </Link>
          </nav>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-primary hover:border-primary transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
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
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <img
                src="/logo.png"
                alt="Power of Grace Events and Trading Limited"
                className="h-20 w-auto object-contain brightness-0 invert"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="Close navigation menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-7 p-6 overflow-y-auto">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "text-2xl font-serif tracking-wide transition-colors",
                    location === link.path ? "text-primary" : "text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-4 w-full max-w-sm">
                <Link href="/booking">
                  <Button size="lg" className="w-full text-lg">
                    Book The Band
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
