import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { queryClient } = await event.parent();

	const list = trpc(event, queryClient).languages.list.createServerQuery;

	const sourceLanguages = await list({ sourceLanguage: 'en' });
	const targetLanguages = await list({ targetLanguage: 'en' });

	return { sourceLanguages, targetLanguages };
};
