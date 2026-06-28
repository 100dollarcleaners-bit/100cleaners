import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f1729",
          light: "#1a2744",
          dark: "#0a101c",
        },
        charcoal: "#1c1c1e",
        gold: {
          DEFAULT: "#c9a962",
          light: "#dfc98a",
          dark: "#a88b4a",
        },
        cream: "#f8f6f2",
        academy: {
          blue: "#1e6fd9",
          "blue-dark": "#1558b0",
          green: "#7cb518",
          "green-dark": "#5a8f0f",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 25px 50px -12px rgba(15, 23, 41, 0.25)",
        card: "0 4px 24px rgba(15, 23, 41, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
