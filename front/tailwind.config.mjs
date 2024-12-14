/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        glacial: ["Glacial Indifference", "sans-serif"],
        dmDisplay: ["DM Serif Display", "serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        text: "var(--text-color)",
        donate: "var(--donate-color)",
        link: "var(--link-color)",
        cacaoMeanings: "var(--cacao-meanings-color)",
        catCardBorder: "var(--cat-card-border-color)",
        catCardBg: "var(--cat-card-bg-color)",
        catDiseasesBg: "var(--cat-diseases-bg-color)",
        pageTitle: "var(--page-title-color)",
        navbar: "var(--navbar-bg-color)",
      },
    },
  },
  plugins: [],
};
