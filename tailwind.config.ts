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
			// TODO: change font sizes to rem
			fontSize: {
				'sm': '13px',
				'base': '16px',
			},
			backgroundImage: {
				'notification-default': 'var(--notification-default)',
				'notification-warning': 'var(--notification-warning)',
			},
			colors: {
				ton: 'hsl(var(--ton))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					dark: 'hsl(var(--background-dark))',
					muted: 'hsl(var(--background-muted))',
				},
				text: {
					DEFAULT: 'hsl(var(--text-default))',
					bright: 'hsl(var(--text-bright))',
					muted: 'hsl(var(--text-muted))',
					link: 'hsl(var(--text-link))',
				},
				button: {
					background: {
						primary: 'hsl(var(--button-background-primary))',
						secondary: 'hsl(var(--button-background-secondary))',
						destructive: 'hsl(var(--button-background-destructive))',
						link: 'hsl(var(--button-background-link))',
						muted: 'hsl(var(--button-background-muted))',
					},
					text: {
						primary: 'hsl(var(--button-text-primary))',
						secondary: 'hsl(var(--button-text-secondary))',
						link: 'hsl(var(--button-text-link))',
						muted: 'hsl(var(--button-text-muted))',
					},
				},
				badge: {
					background: {
						blue: 'hsl(var(--badge-background-blue))',
						green: 'hsl(var(--badge-background-green))',
						orange: 'hsl(var(--badge-background-orange))',
						red: 'hsl(var(--badge-background-red))',
					},
					text: {
						blue: 'hsl(var(--badge-text-blue))',
						green: 'hsl(var(--badge-text-green))',
						orange: 'hsl(var(--badge-text-orange))',
						red: 'hsl(var(--badge-text-red))',
					},
				},
				input: {
					DEFAULT: 'hsl(var(--input))',
					background: 'hsl(var(--input-background))',
					text: {
						placeholder: 'hsl(var(--input-text-placeholder))'
					},
					border: {
						focus: 'hsl(var(--input-border-focus))',
						destructive: 'hsl(var(--input-border-destructive))',
					},
				},
				notification: {
					text: 'hsl(var(--notification-text))',
				},
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
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
				border: 'hsl(var(--border))',
				ring: 'hsl(var(--ring))',
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
