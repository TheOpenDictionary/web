import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
import type { QueryClient } from '@tanstack/svelte-query';

import type { Router } from '$lib/trpc/router';

import { browser } from '$app/environment';

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

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
