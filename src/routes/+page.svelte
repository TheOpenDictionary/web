<script lang="ts">
	import Arrow from '~icons/mdi/menu-right';
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';

	import Book from '~icons/color/book';
	import LanguageSelection from '$components/LanguageSelection.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const sourceLanguages = data.sourceLanguages();
	const targetLanguages = data.targetLanguages();
</script>

<div class="mx-auto flex h-full max-w-4xl flex-col gap-8 center">
	<Book />

	<div class="flex flex-row items-center">
		<LanguageSelection languages={$sourceLanguages.data ?? []} />
		<Arrow class="text-2xl text-muted" />
		<LanguageSelection languages={$targetLanguages.data ?? []} />
	</div>

	<TextField placeholder="Search for any word or phrase" />
	<Button>Search</Button>
</div>
