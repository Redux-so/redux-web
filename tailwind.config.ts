import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#3A6FFF",
          "purple-hover": "#5285FF",
          link: "#7CA8FF",
          "link-hover": "#96BBFF",
          bg: "#04060E",
          surface: "#191919",
          "surface-card": "#101010",
          surface2: "#191919",
          border: "#2a2a2a",
          "border-focus": "#363636",
        },
      },
    },
  },
};

export default config;
