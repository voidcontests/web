import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'notification-default': 'var(--notification-default)',
				'notification-warning': 'var(--notification-warning)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					dark: 'hsl(var(--card-dark))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				notification: {
					foreground: 'hsl(var(--notification-foreground))',
				},
				link: 'hsl(var(--link))',
				ton: 'hsl(var(--ton))',
				badge: {
					primary: {
						DEFAULT: 'hsl(var(--badge-primary))',
						text: 'hsl(var(--badge-primary-text))'
					},
					blue: {
						DEFAULT: 'hsl(var(--badge-blue))',
						text: 'hsl(var(--badge-blue-text))'
					},
					green: {
						DEFAULT: 'hsl(var(--badge-green))',
						text: 'hsl(var(--badge-green-text))'
					},
					orange: {
						DEFAULT: 'hsl(var(--badge-orange))',
						text: 'hsl(var(--badge-orange-text))'
					},
					red: {
						DEFAULT: 'hsl(var(--badge-red))',
						text: 'hsl(var(--badge-red-text))'
					},
				},
				toggle: {
					active: {
						DEFAULT: 'hsl(var(--toggle-active))',
						text: 'hsl(var(--toggle-active-text))',
					},
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				logo: 'hsl(var(--logo))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
