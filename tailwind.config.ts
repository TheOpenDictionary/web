import { Config } from 'tailwindcss';

import kit from '@kojodesign/tailwindkit';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1440px'
			}
		},
		fontFamily: {
			display: ['Geologica Variable', 'Helvetica', 'Arial', 'sans-serif'],
			sans: ['Noto Sans Variable', 'Helvetica', 'Arial', 'sans-serif']
		},
		borderColor: ({ theme }) => ({
			DEFAULT: theme('colors.gray.900/0.08'),
			clear: 'transparent'
		}),
		boxShadow: {
			md: [
				'14px 13px 41px 0px rgba(0, 0, 0, 0.02)',
				'54px 52px 75px 0px rgba(0, 0, 0, 0.02)',
				'122px 116px 101px 0px rgba(0, 0, 0, 0.01)',
				'217px 207px 120px 0px rgba(0, 0, 0, 0.00)',
				'339px 323px 131px 0px rgba(0, 0, 0, 0.00)'
			].join(', ')
		},
		colors: {
			clear: 'transparent',
			white: '#ffffff',
			blue: {
				light: '#55BAFF',
				dark: '#028CEB'
			},
			gray: {
				50: '#fafbfc',
				100: '#f6f7f8',
				200: '#eef0f1',
				300: '#e2e4e6',
				400: '#d1d3d6',
				500: '#babdc0',
				600: '#9da0a3',
				700: '#797c7f',
				800: '#515355',
				900: '#272829'
			}
		},
		textColor: ({ theme }) => ({
			DEFAULT: theme('colors.gray.900'),
			subtle: theme('colors.gray.700'),
			muted: theme('colors.gray.500'),
      primary: theme('colors.blue.dark'),
			inverted: theme('colors.white')
		}),
		extend: {}
	},
	plugins: [kit()]
} satisfies Config;
