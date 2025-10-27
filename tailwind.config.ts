import type { Config } from "tailwindcss";

const config: Config = {
	theme: {
		screens: {
			"2xl": { max: "1535px" },
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "639px" },
		},
	},
	plugins: [require("@tailwindcss/typography")],
};

export default config;
