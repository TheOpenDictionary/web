import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';

import { sourceLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';

import { getTextDirection } from '$lib/i18n';
import { createContext, router } from '$lib/trpc';

const handleI18n: Handle = ({ event, resolve }) => {
	const lang: AvailableLanguageTag =
		(event.params.lang as AvailableLanguageTag) ?? sourceLanguageTag;

	const textDirection = getTextDirection(lang);

	return resolve(event, {
		transformPageChunk({ done, html }) {
			if (done) {
				return html.replace('%lang%', lang).replace('%textDir%', textDirection);
			}
		}
	});
};

export const handle: Handle = sequence(
	handleI18n,
	createTRPCHandle({ url: '/api', router, createContext })
);
