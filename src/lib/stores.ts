import { derived, writable } from 'svelte/store';

import { page } from '$app/stores';

import { DEFAULT_TARGET } from './constants';

export const sourceLanguage = derived(page, ({ params }) => params.sourceLanguage);

export const targetLanguage = derived(
	page,
	({ params }) => params.targetLanguage ?? DEFAULT_TARGET
);
