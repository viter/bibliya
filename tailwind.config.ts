import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arnold: ['var(--font-arnold)'],
        lombardina: ['var(--font-lombardina)'],
        evangelie: ['var(--font-evangelie)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        '2xl': '1750px',
        '3xl': '2240px',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
export default config;
