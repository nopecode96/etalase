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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Strict 60-30-10 Warm Editorial 2027 Tokens
        porcelain: "#FAF8F5", // 60% Canvas
        espresso: "#1C1917",  // Primary Heading text
        mutedStone: "#57534E",// Secondary / Body text
        hairline: "#E7E5E4",  // 1px Subtle Border
        terracotta: {
          DEFAULT: "#D94E28", // 10% Primary Accent / CTA
          hover: "#B83E1D",   // Hover CTA
          tint: "#FDF0EC",    // Soft Badge / Tint Surface
        },
      },
    },
  },
  plugins: [],
};
export default config;
