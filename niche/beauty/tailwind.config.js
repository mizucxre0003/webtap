/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'Arial', 'sans-serif'],
        editorial: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(73, 55, 43, 0.12)',
        editorial: '0 32px 90px rgba(0, 0, 0, 0.35)',
        clean: '0 18px 55px rgba(70, 66, 58, 0.08)',
        rose: '0 26px 80px rgba(130, 72, 82, 0.18)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
};
