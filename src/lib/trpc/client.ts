import type { Router } from '$lib/trpc/router';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import { browser } from '$app/environment';

let browserClient: ReturnType<typeof createTRPCClient<Router>>;

export function trpc(init?: TRPCClientInit) {
	if (browser && browserClient) {
		return browserClient;
	}

	const client = createTRPCClient<Router>({ url: '/api', init });

	if (browser) {
		browserClient = client;
	}

	return client;
}
