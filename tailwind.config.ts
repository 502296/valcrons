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
industrial: {
charcoal: "#121212",
blue: "#007AFF",
orange: "#FF9500",
slate: "#2A2A2A",
copper: "#B87333", // لون النحاس الفخم الذي رأيناه في الشعار والأزرار
},
},
},
},
plugins: [],
};
export default config;
