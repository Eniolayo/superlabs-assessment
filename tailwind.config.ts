import type { Config } from "tailwindcss";
// import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: {},
      backgroundImage: {},
      boxShadow: {},
      fontSize: {
        "8xl": [
          // 64px
          "clamp(2.5rem, 2.5rem + 2vw, 4rem)",
          {
            lineHeight: "1.1",
          },
        ],
        "7xl": [
          // 54px
          "clamp(2.25rem, 2.25rem + 1.5vw, 3.375rem)",
          {
            lineHeight: "1.2",
          },
        ],
        "6xl": [
          // 48px
          "clamp(2rem, 2rem + 1.25vw, 3rem)",
          {
            lineHeight: "1.1",
          },
        ],
        "5xl": [
          // 36px
          "clamp(1.75rem, 1.75rem + 1vw, 2.25rem)",
          {
            lineHeight: "2.5rem",
          },
        ],
        "4xl": [
          // 32px
          "clamp(1.5rem, 1.5rem + 1vw, 2rem)",
          {
            lineHeight: "2.5rem",
          },
        ],
        "3xl": [
          // 28px
          "clamp(1.375rem, 1.375rem + 0.75vw, 1.75rem)",
          {
            lineHeight: "2.25rem",
          },
        ],
        "2xl": [
          // 25px
          "clamp(1.25rem, 1.25rem + 0.625vw, 1.5625rem)",
          {
            lineHeight: "2rem",
          },
        ],
        xl: [
          // 22px
          "clamp(1.125rem, 1.125rem + 0.5vw, 1.375rem)",
          {
            lineHeight: "1.75rem",
          },
        ],
        lg: [
          // 20px
          "clamp(1.0625rem, 1.0625rem + 0.375vw, 1.25rem)",
          {
            lineHeight: "1.625rem",
          },
        ],
        md: [
          // 18px
          "clamp(1rem, 1rem + 0.25vw, 1.125rem)",
          {
            lineHeight: "1.5rem",
          },
        ],
        base: [
          // 16px
          "clamp(0.9375rem, 0.9375rem + 0.125vw, 1rem)",
          {
            lineHeight: "1.5rem",
          },
        ],
        sm: [
          // 14px
          "clamp(0.875rem, 0.875rem + 0.0625vw, 0.9375rem)",
          {
            lineHeight: "1.25rem",
          },
        ],
        xs: [
          // 12px
          "clamp(0.75rem, 0.75rem + 0.0625vw, 0.8125rem)",
          {
            lineHeight: "1.125rem",
          },
        ],
        "2xs": [
          // 11px
          "clamp(0.6875rem, 0.6875rem + 0.0625vw, 0.75rem)",
          {
            lineHeight: "1rem",
          },
        ],
      },
      borderWidth: {
        0.3: "0.3px",
        0.5: "0.5px",
        1.5: "1.5px",
        2.5: "2.5px",
        3: "3px",
        3.5: "3.5px",
      },
    },
  },
  plugins: [],
};
export default config;
