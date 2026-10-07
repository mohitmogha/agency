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
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        accent: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          coral: '#F43F5E',
          amber: '#F59E0B',
          violet: '#8B5CF6',
        },
        dark: {
          bg: '#080C14',
          surface: '#0F172A',
          card: '#131D31',
          cardHigh: '#1E293B',
          border: '#1E293B',
          borderLight: '#334155',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          cardHigh: '#F1F5F9',
          border: '#E2E8F0',
          borderLight: '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 35px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
