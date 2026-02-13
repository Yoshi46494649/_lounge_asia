import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL =
  "https://wa.me/61493013502?text=Hi%20Michael,%20I%20am%20interested%20in%20safe%20study%20options%20in%20Australia.";

const navLinks = [
  { label: "Study", href: "#services" },
  { label: "Services", href: "#courses" },
  { label: "About", href: "#founder" },
];

export function StickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-extrabold text-primary tracking-tight">
            Lounge <span className="text-accent">Asia</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 font-bold text-sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Michael
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-sm font-semibold text-foreground/80 hover:text-accent"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-full font-bold text-sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Michael
            </Button>
          </a>
        </div>
      )}
    </header>
  );
}
