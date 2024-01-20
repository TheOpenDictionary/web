import adapter from '@sveltejs/adapter-auto';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: [vitePreprocess({})],
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components',
			$lib: './src/lib',
			$i18n: './src/i18n/',
			$db: './db',
			$server: './src/server'
		},
		prerender: {
			entries: ['/']
		}
	}
};
