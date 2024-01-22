import { error, redirect } from '@sveltejs/kit';

import { trpc } from '$lib/trpc';

import type { PageLoad } from '../../$types';

export const load: PageLoad = async (event) => {
	const { queryClient } = await event.parent();
	const {
		params: { term, sourceLanguage, targetLanguage }
	} = event;

	const getEntry = trpc(event, queryClient).createUtils().client.entries.get.query;

	const entry = await getEntry({
		term,
		language: sourceLanguage,
		target: targetLanguage
	});

	if (!entry) {
		throw error(404, '/404');
	}

	throw redirect(301, `/${sourceLanguage}/${targetLanguage}/entry/${entry.term}`);
};
