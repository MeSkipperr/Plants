import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#FFFAFA',
        second:"#264432",
        third:"#FFB22C",
        lightGreen:"#EDF8EE",
      },
      fontFamily: {
        kaftan: ['Kaftan', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
export default config;
