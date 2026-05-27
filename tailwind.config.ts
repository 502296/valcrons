// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
content: [
"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
],
theme: {
extend: {
colors: {
'industrial-charcoal': '#1a1a1a', // لون الخلفية الرئيسي
'industrial-slate': '#2d2d2d', // لون البطاقات
'industrial-blue': '#0070f3', // لون الأزرار والتفاعل
'industrial-text': '#e5e7eb', // لون النص
},
},
},
plugins: [],
};
export default config;
