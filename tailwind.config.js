export default {
  content: [
    "./**/*.html",
    "./speed-dating/**/*.{js,html}",
    "./assets/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          dark: '#111827',
          primary: '#D4AF37', // Champagne Gold
          matcha: '#10B981',
          accent: '#D4AF37',
        }
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
};
