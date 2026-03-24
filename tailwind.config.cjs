/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        heading: ['"Archivo"', 'sans-serif'],
      },
      colors: {
        design: {
          primary: '#18181B',
          secondary: '#3F3F46',
          cta: '#2563EB',
          bg: '#FAFAFA',
        }
      }
    },
  },
  plugins: [],
}
