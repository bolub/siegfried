import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        100: "#101828",
      },
      placeholder: {
        100: "#667085",
      },
      white: "#FFFFFF",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)"],
        mono: ["var(--font-space-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
