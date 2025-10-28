import { useState } from "react";
import { Menu, X } from "lucide-react";

const primaryLinks = [
  { label: "About", href: "/#about" },
  { label: "Event", href: "/#event" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Speed Dating", href: "/speed-dating/" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700/50 bg-gray-900/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a
          href="/"
          className="text-xl font-bold tracking-wider text-white transition-colors hover:text-yellow-300"
          onClick={() => setIsOpen(false)}
        >
          Lounge Asia
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold tracking-wide text-slate-200 md:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="inline-flex items-center rounded-full border border-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-300 transition duration-300 hover:bg-yellow-400 hover:text-gray-900"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-gray-800 bg-gray-900/95 px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-200">
            {primaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-gray-800 hover:text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
              <a
                href="/#contact"
              className="rounded-full border border-yellow-400 px-4 py-2 text-center font-semibold text-yellow-300 transition duration-300 hover:bg-yellow-400 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
