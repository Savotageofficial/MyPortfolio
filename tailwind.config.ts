import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f0e8',
        accent: '#c84b31',
        muted: '#8a8070',
        'paper-dark': '#e8e0d0',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'line-grow': 'lineGrow 1s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          from: { scaleX: '0' },
          to: { scaleX: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
