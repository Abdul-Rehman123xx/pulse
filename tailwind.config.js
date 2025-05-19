/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        soft: "#f4f4f5",
        primary: "#6366f1", // periwinkle purple
        secondary: "#f472b6", // pastel pink
       accent: "#34d399", // minty green
       dark: "#1f2937",
      },
    },
  },
  plugins: [],
};