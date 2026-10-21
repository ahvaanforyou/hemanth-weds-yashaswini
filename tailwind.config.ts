import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: '#162E5A',
          deep: '#0F2042',
          light: '#284E88',
          subtle: '#4A6B9C',
        },
        script: '#2F679B',
        pastel: {
          blue: '#E9F2FA',
          soft: '#F4F8FC',
          border: '#D0E2F2',
          ice: '#F8FBFE',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5E4B2',
          deep: '#B38B24',
          foil: '#E6C665',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        greatVibes: ['"Great Vibes"', 'cursive'],
        marcellus: ['"Marcellus"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 16px 40px -12px rgba(22, 46, 90, 0.12)',
        glow: '0 0 25px rgba(212, 175, 55, 0.35)',
        goldRing: '0 0 0 2px #D4AF37, 0 10px 30px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.025)', opacity: '0.96' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
