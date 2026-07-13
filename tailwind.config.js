/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nova: {
          navy: "#1a1a2e",
          black: "#11101a",
          gray: "#5f5965",
          "gray-light": "#a29aa4",
          border: "#e5e4e7",
          accent: "#4f46e5",
          lavender: "#ede9fe",
          "lavender-dark": "#ddd6fe",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
