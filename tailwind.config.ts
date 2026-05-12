import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#9370DB",
          dark: "#5B3CA8",
          ink: "#111018",
          mist: "#F8F5FF",
          soft: "#F5F5F7",
        },
      },
      boxShadow: {
        soft: "0 24px 70px rgba(17, 16, 24, 0.12)",
        glow: "0 18px 60px rgba(147, 112, 219, 0.28)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
