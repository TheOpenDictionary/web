<script lang="ts">
	import type { VariantProps } from 'class-variance-authority';
	import { onMount } from 'svelte';
	import type { KeyboardEventHandler, MouseEventHandler } from 'svelte/elements';

	import Search from '~icons/mdi/search';

	import { goto } from '$app/navigation';

	import { clickOutside } from '$lib/actions';
	import { sourceLanguage, targetLanguage } from '$lib/stores';
	import { trpc, type Client } from '$lib/trpc';

	import TextField, { textField } from '../TextField.svelte';
	import type { SearchResult } from './Autocomplete.svelte';
	import Autocomplete from './Autocomplete.svelte';

	export let size: VariantProps<typeof textField>['size'] = undefined;

	let value: string;
	let results: SearchResult[] = [];
	let client: Client;
	let isFocused = false;

	let timeout: NodeJS.Timeout;

	async function goToSearch(query: string) {
		await goto(`/${$sourceLanguage}/${$targetLanguage}/search/${query}`);
	}

	async function triggerSearch(e: KeyboardEvent) {
		const query = (e.target as HTMLInputElement).value;

		if (e.key === 'Enter') {
			return goToSearch(query);
		}

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

<div class="relative flex w-full items-center" use:clickOutside={() => (isFocused = false)}>
	<TextField
		on:focus={() => (isFocused = true)}
		on:keyup={triggerSearch}
		icon={Search}
		{size}
		bind:value
		placeholder="Search for any word or phrase"
	/>

	{#if isFocused && results.length > 0}
		<Autocomplete
			on:click={() => {
				isFocused = false;
				value = '';
			}}
			items={results}
		/>
	{/if}
</div>
