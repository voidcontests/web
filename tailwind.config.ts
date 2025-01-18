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
			backgroundImage: {
				'notification-default': 'var(--notification-default)',
				'notification-warning': 'var(--notification-warning)',
				'notification-alert': 'var(--notification-alert)',
			},
			colors: {
				// UI ELEMENTS
				text: {
					bright: 'hsla(var(--text-bright))',
					primary: 'hsla(var(--text-primary))',
					'primary-inverse': 'hsla(var(--text-primary-inverse))',
					'primary-on-color': 'hsla(var(--text-primary-on-color))',
					secondary: 'hsla(var(--text-secondary))',
					muted: 'hsla(var(--text-muted))',
					disabled: 'hsla(var(--text-disabled))',
					critical: 'hsla(var(--text-critical))',
					caution: 'hsla(var(--text-caution))',
					success: 'hsla(var(--text-success))',
					link: 'hsla(var(--text-link))',
				},
				background: {
					primary: 'hsla(var(--background-primary))',
					'primary-inverse': 'hsla(var(--background-primary-inverse))',
					secondary: 'hsla(var(--background-secondary))',
					'secondary-subdued': 'hsla(var(--background-secondary-subdued))',
					desabled: 'hsla(var(--background-disabled))',
					'success-subdued': 'hsla(var(--background-success-subdued))',
					'link-subdued': 'hsla(var(--background-link-subdued))',
					'caution-subdued': 'hsla(var(--background-caution-subdued))',
					'critical-subdued': 'hsla(var(--background-critical-subdued))',
					critical: 'hsla(var(--background-critical))',
					popover: 'hsl(var(--background-popover))',
				},
				border: {
					primary: 'hsl(var(--border-primary))',
					critical: 'hsla(var(--border-critical))',
					active: 'hsla(var(--border-active))',
				},
				icon: {
					primary: 'hsla(var(--icon-primary))'
				},
				// COLOR KIT
				black: {
					main: 'hsl(var(--black-main))',
					600: 'hsla(var(--black-600))',
					500: 'hsla(var(--black-500))',
					400: 'hsla(var(--black-400))',
					300: 'hsla(var(--black-300))',
					200: 'hsla(var(--black-200))',
					100: 'hsla(var(--black-100))',
				},
				white: {
					main: 'hsla(var(--white-main))',
					600: 'hsla(var(--white-600))',
					500: 'hsla(var(--white-500))',
					400: 'hsla(var(--white-400))',
					300: 'hsla(var(--white-300))',
					200: 'hsla(var(--white-200))',
					100: 'hsla(var(--white-100))',
				},
				blue: {
					main: 'hsla(var(--blue-main))',
					600: 'hsla(var(--blue-600))',
					500: 'hsla(var(--blue-500))',
					400: 'hsla(var(--blue-400))',
					300: 'hsla(var(--blue-300))',
					200: 'hsla(var(--blue-200))',
					100: 'hsla(var(--blue-100))',
					ton: 'hsl(var(--blue-ton))',
				},
				red: {
					main: 'hsla(var(--red-main))',
					600: 'hsla(var(--red-600))',
					500: 'hsla(var(--red-500))',
					400: 'hsla(var(--red-400))',
					300: 'hsla(var(--red-300))',
					200: 'hsla(var(--red-200))',
					100: 'hsla(var(--red-100))',
				},
				green: {
					main: 'hsla(var(--green-main))',
					600: 'hsla(var(--green-600))',
					500: 'hsla(var(--green-500))',
					400: 'hsla(var(--green-400))',
					300: 'hsla(var(--green-300))',
					200: 'hsla(var(--green-200))',
					100: 'hsla(var(--green-100))',
				},
				orange: {
					main: 'hsla(var(--orange-main))',
					600: 'hsla(var(--orange-600))',
					500: 'hsla(var(--orange-500))',
					400: 'hsla(var(--orange-400))',
					300: 'hsla(var(--orange-300))',
					200: 'hsla(var(--orange-200))',
					100: 'hsla(var(--orange-100))',
				},
				// COLOR KIT END
				// ton: 'hsl(var(--ton))',
				// background: {
				// 	DEFAULT: 'hsl(var(--background))',
				// 	dark: 'hsl(var(--background-dark))',
				// 	muted: 'hsl(var(--background-muted))',
				// },
				// text: {
				// 	DEFAULT: 'hsl(var(--text-default))',
				// 	bright: 'hsl(var(--text-bright))',
				// 	muted: 'hsl(var(--text-muted))',
				// 	link: 'hsl(var(--text-link))',
				// },
				// button: {
				// 	background: {
				// 		primary: 'hsl(var(--button-background-primary))',
				// 		secondary: 'hsl(var(--button-background-secondary))',
				// 		destructive: 'hsl(var(--button-background-destructive))',
				// 		link: 'hsl(var(--button-background-link))',
				// 		muted: 'hsl(var(--button-background-muted))',
				// 	},
				// 	text: {
				// 		primary: 'hsl(var(--button-text-primary))',
				// 		secondary: 'hsl(var(--button-text-secondary))',
				// 		link: 'hsl(var(--button-text-link))',
				// 		muted: 'hsl(var(--button-text-muted))',
				// 	},
				// },
				// badge: {
				// 	background: {
				// 		blue: 'hsl(var(--badge-background-blue))',
				// 		green: 'hsl(var(--badge-background-green))',
				// 		orange: 'hsl(var(--badge-background-orange))',
				// 		red: 'hsl(var(--badge-background-red))',
				// 	},
				// 	text: {
				// 		blue: 'hsl(var(--badge-text-blue))',
				// 		green: 'hsl(var(--badge-text-green))',
				// 		orange: 'hsl(var(--badge-text-orange))',
				// 		red: 'hsl(var(--badge-text-red))',
				// 	},
				// },
				// input: {
				// 	DEFAULT: 'hsl(var(--input))',
				// 	background: 'hsl(var(--input-background))',
				// 	text: {
				// 		placeholder: 'hsl(var(--input-text-placeholder))'
				// 	},
				// 	border: {
				// 		focus: 'hsl(var(--input-border-focus))',
				// 		destructive: 'hsl(var(--input-border-destructive))',
				// 	},
				// },
				// notification: {
				// 	text: 'hsl(var(--notification-text))',
				// },
				// foreground: 'hsl(var(--foreground))',
				// card: {
				// 	DEFAULT: 'hsl(var(--card))',
				// 	foreground: 'hsl(var(--card-foreground))'
				// },
				// popover: {
				// 	DEFAULT: 'hsl(var(--popover))',
				// 	foreground: 'hsl(var(--popover-foreground))'
				// },
				// primary: {
				// 	DEFAULT: 'hsl(var(--primary))',
				// 	foreground: 'hsl(var(--primary-foreground))'
				// },
				// secondary: {
				// 	DEFAULT: 'hsl(var(--secondary))',
				// 	foreground: 'hsl(var(--secondary-foreground))'
				// },
				// muted: {
				// 	DEFAULT: 'hsl(var(--muted))',
				// 	foreground: 'hsl(var(--muted-foreground))'
				// },
				// accent: {
				// 	DEFAULT: 'hsl(var(--accent))',
				// 	foreground: 'hsl(var(--accent-foreground))'
				// },
				// destructive: {
				// 	DEFAULT: 'hsl(var(--destructive))',
				// 	foreground: 'hsl(var(--destructive-foreground))'
				// },
				// // border: 'hsl(var(--border))',
				// ring: 'hsl(var(--ring))',
				// chart: {
				// 	'1': 'hsl(var(--chart-1))',
				// 	'2': 'hsl(var(--chart-2))',
				// 	'3': 'hsl(var(--chart-3))',
				// 	'4': 'hsl(var(--chart-4))',
				// 	'5': 'hsl(var(--chart-5))'
				// }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
};
export default config;
