/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#F2EAE0",
        "surface": "#F2EAE0",
        "surface-container-lowest": "#FAF6F0",
        "surface-container-low": "#F5EEDB",
        "surface-container": "#F2EAE0",
        "surface-container-high": "#E7DCCC",
        "on-surface": "#282828",
        "on-surface-variant": "#4F4A45",
        "primary": "#CD9853",
        "on-primary": "#FFFFFF",
        "outline-variant": "rgba(40,40,40,0.2)",
        "tertiary": "#AD6A4B",
        "on-tertiary": "#FFFFFF",
        "error": "#b83230",
        "on-error": "#ffffff",
      },
      fontFamily: {
        "sans": ["DM Sans", "sans-serif"],
        "serif": ["Syne", "sans-serif"],
        "headline": ["Syne", "sans-serif"],
        "body": ["DM Sans", "sans-serif"],
        "label": ["DM Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0px",
        "md": "4px",
        "lg": "8px",
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
        "full": "9999px"
      },
      boxShadow: {
        "solid-sm": "4px 4px 0px #282828",
        "solid": "6px 6px 0px #282828",
        "solid-lg": "8px 8px 0px #282828",
        "solid-hover": "2px 2px 0px #282828"
      }
    },
  },
  plugins: [],
}
