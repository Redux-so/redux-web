import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#794ADE",
          "purple-hover": "#9168eb",
          link: "#A688F0",
          "link-hover": "#BBA0F5",
          bg: "#0a0a0a",
          surface: "#1d1d1d",
          "surface-card": "#121212",
          surface2: "#1d1d1d",
          border: "#2e2e2e",
          "border-focus": "#3a3a3a",
        },
      },
    },
  },
};

export default config;
