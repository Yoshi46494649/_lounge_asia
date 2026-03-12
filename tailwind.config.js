export default {
  content: [
    "./index.html",
    "./brisbane.html",
    "./speed-dating/**/*.{js,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#111827',
          primary: '#10B981',
          accent: '#FBBF24',
        }
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
};
