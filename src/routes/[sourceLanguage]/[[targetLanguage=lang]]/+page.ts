import { DEFAULT_TARGET } from '$lib/constants';
import { trpc } from '$lib/trpc';

import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { queryClient } = await event.parent();
	const { sourceLanguage, targetLanguage = DEFAULT_TARGET } = event.params;

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
