import type { QueryClient } from '@tanstack/svelte-query';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

import { browser } from '$app/environment';

import type { Router } from '$server/router';

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

export type Client = ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit, queryClient?: QueryClient) {
	if (browser && browserClient) {
		return browserClient;
	}

	const client = svelteQueryWrapper<Router>({
		queryClient,
		client: createTRPCClient<Router>({ url: '/api', init })
	});

	if (browser) {
		browserClient = client;
	}

	return client;
}
