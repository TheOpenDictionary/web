import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import Icons from 'unplugin-icons/vite';

import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			customCollections: {
				'od-color': FileSystemIconLoader('./src/icons/color')
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
