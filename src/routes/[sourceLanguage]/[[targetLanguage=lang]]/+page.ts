import { trpc } from '$lib/trpc/client';

import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { queryClient } = await event.parent();
	const { sourceLanguage, targetLanguage = 'en' } = event.params;

	const list = trpc(event, queryClient).languages.list.createServerQuery;

	const sourceLanguages = await list({ targetLanguage });
	const targetLanguages = await list({ sourceLanguage });

	return {
		sourceLanguages,
		targetLanguages,
		sourceLanguage,
		targetLanguage
	};
};
