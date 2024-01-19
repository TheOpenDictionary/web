import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (page) => {
	const list = trpc(page).languages.list.query;

	const sourceLanguages = await list({ sourceLanguage: 'en' });
	const targetLanguages = await list({ targetLanguage: 'en' });

	return { sourceLanguages, targetLanguages };
};
