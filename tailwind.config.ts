import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tarmac: {
          red: '#ED1B36',
          black: '#0D0D0D',
          white: '#FFFFFF',
          blue: '#2396FB',
          success: '#1BA86E',
          warning: '#CF9F02',
          error: '#DC143C',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E6E6E6',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#808080',
          600: '#555555',
          700: '#454545',
          800: '#2B2B2B',
          900: '#0D0D0D',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
