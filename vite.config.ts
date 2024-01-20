import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import Icons from 'unplugin-icons/vite';

import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { paraglide } from '@inlang/paraglide-js-adapter-vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/i18n'
		}),
		Icons({
			compiler: 'svelte',
			customCollections: {
				color: FileSystemIconLoader('./src/icons/color')
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
