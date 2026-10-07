/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#121212',
          card: '#1c1c1c',
          cardLight: '#242424',
          accent: '#18D2D8',
          accentHover: '#14b8bd',
          whatsapp: '#25D366',
          whatsappHover: '#20ba59',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        brand: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
