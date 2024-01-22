import { DEFAULT_TARGET } from '$lib/constants';
import { trpc } from '$lib/trpc';

import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { queryClient } = await event.parent();

	const {
		params: { term, sourceLanguage, targetLanguage = DEFAULT_TARGET }
	} = event;

	const entry = await trpc(event, queryClient).entries.get.createServerQuery({
		term,
		language: sourceLanguage,
		target: targetLanguage
	});

	return { entry };
};
