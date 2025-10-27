import { Heart, Instagram, Facebook, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 justify-center sm:justify-start">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
              <span className="text-lg sm:text-xl font-bold text-foreground">Lounge Asia</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Creating meaningful connections for Brisbane's Asian community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors touch-manipulation">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors touch-manipulation">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors touch-manipulation">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors touch-manipulation">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Connect With Us</h3>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="#"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 sm:pt-8 text-center text-muted-foreground text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Lounge Asia. All rights reserved. Made with ❤️ in Brisbane.</p>
        </div>
      </div>
    </footer>
  );
};
