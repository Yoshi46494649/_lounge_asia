export function Footer() {
  return (
    <footer className="bg-primary py-10 pb-28 md:pb-10">
      <div className="container mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div>
            <span className="text-lg font-extrabold text-primary-foreground tracking-tight">
              Lounge <span className="text-accent">Asia</span>
            </span>
          </div>
          <div className="text-center md:text-right max-w-xl">
            <p className="text-xs md:text-sm text-primary-foreground/60 leading-relaxed">
              Disclaimer: Lounge Asia is a community support network. We are not registered migration
              agents or real estate agents. Visa services are provided by MARA registered partners. Real
              estate services are provided by licensed professionals.
            </p>
            <p className="text-xs text-primary-foreground/40 mt-4">
              ABN 72 472 785 236
            </p>
            <div className="flex gap-4 justify-center md:justify-end text-xs text-primary-foreground/50 mt-2">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            </div>
            <p className="text-xs text-primary-foreground/40 mt-2">
              © 2026 Lounge Asia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
