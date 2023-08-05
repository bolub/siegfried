import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        background: {
          100: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["DM Sans"],
        mono: ["Space Mono"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
