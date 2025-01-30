import { mauve, violet } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.jsx"],
  theme: {
    extend: {
      screens: {
        xs: "485px",
      },
      colors: {
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
};
