import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        custom: ["Your Custom Font", "Arial", "sans-serif"],
      },
      colors: {
        primary: {
          100: "rgba(115, 57, 237,  0.1)",
          200: "rgba(115, 57, 237,  0.2)",
          300: "rgba(115, 57, 237,  0.3)",
          400: "rgba(115, 57, 237,  0.4)",
          500: "rgba(115, 57, 237,  0.5)",
          600: "rgba(115, 57, 237,  0.6)",
          700: "rgba(115, 57, 237,  0.7)",
          800: "rgba(115, 57, 237,  0.8)",
          900: "rgba(115, 57, 237,  0.9)",
          1000: "rgba(115, 57, 237,  1)",
        },
        secondary: {
          100: "rgba(4, 13, 44, 0.1)",
          200: "rgba(4, 13, 44, 0.2)",
          300: "rgba(4, 13, 44, 0.3)",
          400: "rgba(4, 13, 44, 0.4)",
          500: "rgba(4, 13, 44, 0.5)",
          600: "rgba(4, 13, 44, 0.6)",
          700: "rgba(4, 13, 44, 0.7)",
          800: "rgba(4, 13, 44, 0.8)",
          900: "rgba(4, 13, 44, 0.9)",
          1000: "rgba(4, 13, 44, 1)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
