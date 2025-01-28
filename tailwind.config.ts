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
				'notification-alert': 'var(--notification-alert)',
			},
			colors: {
				bright: {
					text: 'hsla(var(--text-bright))',
				},
				primary: {
					DEFAULT: 'hsla(var(--background-primary))',
					inverse: {
						DEFAULT: 'hsla(var(--background-primary-inverse))',
						text: 'hsla(var(--text-primary-inverse))',
					},
					border: 'hsl(var(--border-primary))',
					icon: 'hsla(var(--icon-primary))',
					text: 'hsla(var(--text-primary))',
					'on-color-text': 'hsla(var(--text-primary-on-color))',
				},
				secondary: {
					DEFAULT: 'hsla(var(--background-secondary))',
					subdued: 'hsla(var(--background-secondary-subdued))',
					text: 'hsla(var(--text-secondary))',
				},
				disabled: {
					DEFAULT: 'hsla(var(--background-disabled))',
					text: 'hsla(var(--text-disabled))',
				},
				muted: {
					text: 'hsla(var(--text-muted))',
				},
				success: {
					subdued: 'hsla(var(--background-success-subdued))',
					text: 'hsla(var(--text-success))',
				},
				link: {
					subdued: 'hsla(var(--background-link-subdued))',
					text: 'hsla(var(--text-link))',
				},
				caution: {
					subdued: 'hsla(var(--background-caution-subdued))',
					text: 'hsla(var(--text-caution))',
				},
				critical: {
					DEFAULT: 'hsla(var(--background-critical))',
					subdued: 'hsla(var(--background-critical-subdued))',
					border: 'hsla(var(--border-critical))',
					text: 'hsla(var(--text-critical))',
				},
				popover: {
					DEFAULT: 'hsl(var(--background-popover))',
				},
				active: {
					border: 'hsla(var(--border-active))',
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
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
		screens: {
			sm: {
				min: '0px',
				max: '480px'
			},
			md: {
				min: '481px',
				max: '768px'
			},
			lg: {
				min: '769px',
				max: '1280px'
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
};
export default config;
