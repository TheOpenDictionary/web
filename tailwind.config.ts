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
		typography: ({ theme }) => ({
			colors: {
				DEFAULT: {
					light: theme('colors.gray.900'),
					dark: theme('colors.white')
				},
				muted: theme('colors.gray.500')
			},
			sizes: ['sm', 'md', 'lg'],
			variants: {
				DEFAULT: {
					family: theme('fontFamily.sans'),
					weight: theme('fontWeight.normal'),
					leading: theme('lineHeight.normal'),
					size: {
						sm: theme('textSize.xs'),
						md: theme('textSize.sm'),
						lg: theme('textSize.base')
					}
				},
				title: {
					family: theme('fontFamily.display'),
					weight: theme('fontWeight.light'),
					sizes: {
						sm: theme('textSize.base'),
						md: theme('textSize.lg'),
						lg: theme('textSize.xl')
					}
				}
			}
		}),
		extend: {}
	},
	plugins: [kit()]
} satisfies Config;
