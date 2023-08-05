import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const tailwindConfig = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        background: {
          100: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Space Mono", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default tailwindConfig;
