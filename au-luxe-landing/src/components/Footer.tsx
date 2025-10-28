export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <nav
          aria-label="Legal"
          className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6 text-muted-foreground"
        >
          <a
            href="/speed-dating/privacy.html"
            className="hover:text-primary transition-colors touch-manipulation"
          >
            Privacy Policy
          </a>
          <a
            href="/speed-dating/terms.html"
            className="hover:text-primary transition-colors touch-manipulation"
          >
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
};
