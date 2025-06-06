/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/mayavi/dist/**/*.{js,jsx}', // Include mayavi styles
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 