/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        albathaTeal: '#0aaabc',
        albathaOrange: '#f18f37',
        albathaDarkTeal: '#07848f',
        albathaLightTeal: '#b2e2e4'
      }
    }
  },
  plugins: []
};
