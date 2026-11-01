/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050709',
          900: '#090D11',
          850: '#0D131A',
          800: '#121922',
          700: '#1B2430',
          600: '#2A3648',
        },
        brand: {
          neon: '#00FF87',
          lime: '#CCFF00',
          electric: '#10B981',
          accent: '#05DF72',
          glow: 'rgba(0, 255, 135, 0.4)',
          darkgreen: '#062B1A'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 25px -5px rgba(0, 255, 135, 0.35)',
        'neon-lg': '0 0 45px -5px rgba(0, 255, 135, 0.45)',
        'lime': '0 0 25px -5px rgba(204, 255, 0, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 255, 135, 0.15) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 255, 135, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(0, 255, 135, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
