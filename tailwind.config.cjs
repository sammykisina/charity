/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        noto: ["noto", "serif"],
      },
      animation: {
        enter: "fadeInRight 300ms ease-out",
        leave: "fadeOutLeft 300ms ease-in forwards",
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translate(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        fadeOutLeft: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      colors: {
        dark: "#020202",
        light: "#323232",
        yellow: "#FFD249",
        gray: "#DDDDDD",
      },
    },
    screens: {
      xs: "500px",
      // => @media (min-width: 500px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      xmd: "925px",
      // => @media (min-width: 935px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
