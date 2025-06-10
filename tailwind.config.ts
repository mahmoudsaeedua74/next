import type { Config } from "tailwindcss";
import TwAnimate from "tailwindcss-animate";

const config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
		container: {
		  center: true,
		  padding:{
			DEFAULT: '1rem',
			sm: '0rem',
		  },
	
		},
		extend: {
		}
	  },
    plugins: [TwAnimate],
} satisfies Config;

export default config;
