/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        airtel: {
          red: '#E60000',
          darkred: '#B30000',
          deepred: '#8A0000',
          lightred: '#FF4D4D',
          glow: 'rgba(230, 0, 0, 0.4)',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFE55C',
          dark: '#D4AF37',
          amber: '#F59E0B',
          metallic: '#C5A059',
        },
        dark: {
          text: '#202020',
          muted: '#555555',
          subtle: '#777777',
        },
        light: {
          bg: '#FFF5F5',
          card: '#FFFFFF',
          border: '#FFE0E0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'festive': '0 10px 30px -10px rgba(230, 0, 0, 0.35)',
        'gold-glow': '0 0 25px rgba(255, 215, 0, 0.45)',
        'card-hover': '0 20px 35px -5px rgba(230, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

