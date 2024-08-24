/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      animation: {
        "fade-in-down": "fadeInDown 0.75s ease-in-out forwards",
        "fade-in-delay": "fadeIn 0.5s ease-in-out 0.5s forwards",
        "fade-in-question": "fadeInQuestion 0.5s ease-in-out",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInQuestion: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
