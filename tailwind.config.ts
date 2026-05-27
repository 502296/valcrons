import type { Config } from "tailwindcss";

const config: Config = {
content: [
"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
extend: {
colors: {
'industrial-charcoal': '#1a1a1a',
'industrial-slate': '#2d2d2d',
'industrial-blue': '#0070f3',
'industrial-text': '#e5e7eb',
},
},
},
plugins: [],
};
export default config;
