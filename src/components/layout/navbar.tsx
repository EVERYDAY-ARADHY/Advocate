import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PracticeSearch } from "@/components/practice-search";
import { smoothScrollTo } from "@/lib/smooth-scroll";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Practice Areas", href: "/#practice-areas" },
  { name: "Courts", href: "/#courts" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable)
        )
          return;
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      setMobileMenuOpen(false);
      smoothScrollTo(href.substring(1), -80);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-border py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
        >
          A<span className="text-secondary">S</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search practice areas"
            className="ml-2 p-2.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <Search size={18} />
          </button>
          <Link
            href="/consultation"
            className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors inline-block"
          >
            Consultation
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search practice areas"
            className="text-primary p-2"
          >
            <Search size={22} />
          </button>
          <button
            className="text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-serif text-primary hover:text-secondary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <Link
                  href="/consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium w-full text-center hover:bg-primary/90 transition-colors"
                >
                  Consultation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <PracticeSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
