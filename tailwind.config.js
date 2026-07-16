/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#42a5f5',
          400: '#2196f3',
          500: '#1976d2',
          600: '#1565c0',
          700: '#0d47a1',
          800: '#0d2e6e',
          900: '#051640',
          950: '#020f2e',
        },
        neutral: {
          50: '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#78909c',
          400: '#546e7a',
          500: '#37474f',
          600: '#263d5c',
          700: '#1c2e4a',
          800: '#102038',
          900: '#0a1628',
          950: '#050a14',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};
