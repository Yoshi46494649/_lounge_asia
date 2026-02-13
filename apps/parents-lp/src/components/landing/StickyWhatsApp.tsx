import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/61493013502?text=Hi%20Michael,%20I%20am%20interested%20in%20safe%20study%20options%20in%20Australia.";

export function StickyWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground p-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all hover:scale-110"
      aria-label="Chat with Michael on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
