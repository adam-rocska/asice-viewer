import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    aspectRatio: {
      'paper-A-vertical': `calc(1 / ${Math.sqrt(2)})`,
      'paper-A-horizontal': `calc(${Math.sqrt(2)}/1)`,
    }
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;
