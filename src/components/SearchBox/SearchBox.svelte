<script lang="ts">
	import type { VariantProps } from 'class-variance-authority';
	import { onMount } from 'svelte';
	import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

	import Search from '~icons/mdi/search';

	import { sourceLanguage, targetLanguage } from '$lib/stores';
	import { trpc, type Client } from '$lib/trpc';

	import TextField, { textField } from '../TextField.svelte';
	import type { SearchResult } from './Autocomplete.svelte';
	import Autocomplete from './Autocomplete.svelte';

	export let size: VariantProps<typeof textField>['size'] = undefined;

	let results: SearchResult[] = [];
	let client: Client;

	let timeout: NodeJS.Timeout;

	async function triggerSearch(e: KeyboardEvent) {
		const query = (e.target as HTMLInputElement).value;

		if (query.trim().length === 0) {
			results = [];
			return;
		}

		clearTimeout(timeout);

		timeout = setTimeout(async () => {
			results = await client.entries.search.query({
				term: query,
				language: $sourceLanguage,
				target: $targetLanguage
			});
		}, 100);
	}

	onMount(() => {
		client = trpc().createUtils().client;
	});
</script>

<div class="relative w-full">
	<TextField
		on:keyup={triggerSearch}
		icon={Search}
		{size}
		placeholder="Search for any word or phrase"
	/>

	{#if results.length > 0}
		<Autocomplete items={results} />
	{/if}
</div>
