import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import { initTRPC } from '@trpc/server';
import { MeiliSearch } from 'meilisearch';

import { MEILISEARCH_HOST, MEILISEARCH_KEY } from '$env/static/private';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
	return {
		meilisearch: new MeiliSearch({
			host: MEILISEARCH_HOST,
			apiKey: MEILISEARCH_KEY
		})
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const { router, procedure } = t;
