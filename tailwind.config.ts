import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: 'var(--color-dark)',
        'dark-secondary': 'var(--color-dark-secondary)',
        purple: 'var(--color-purple)',
        'purple-deep': 'var(--color-purple-deep)',
        pink: 'var(--color-pink)',
        magenta: 'var(--color-magenta)',
        light: 'var(--color-light)',
        'light-surface': 'var(--color-light-surface)',
        'text-dark': 'var(--color-text-dark)',
        'text-secondary': 'var(--color-text-secondary)',
        'border-light': 'var(--color-border-light)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
