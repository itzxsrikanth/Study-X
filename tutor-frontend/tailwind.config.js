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
        studyxVoid: '#0B0B10',
        studyxN900: '#0B0B10',
        studyxN800: '#11121A',
        studyxN700: '#1A1C26',
        studyxN600: '#252936',
        studyxN500: '#343745',
        studyxN400: '#4A4F5F',
        studyxN300: '#687380',
        studyxN200: '#9CA3AF',
        studyxN100: '#D1D5DB',
        studyxN0: '#FFFEFF',
        studyxPurple: '#3B82F6',
        studyxPink: '#0EA5E9',
        studyxCyan: '#06B6D4',
        studyxLime: '#C6FF00',
        borderGlass: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '56px', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'h4': ['22px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'studyx-glass': '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'glow-primary': '0 0 25px -3px rgba(180, 77, 255, 0.5)',
        'glow-pink': '0 0 25px -3px rgba(255, 46, 209, 0.5)',
        'glow-cyan': '0 0 25px -3px rgba(0, 240, 255, 0.5)',
        'glow-lime': '0 0 25px -3px rgba(198, 255, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
