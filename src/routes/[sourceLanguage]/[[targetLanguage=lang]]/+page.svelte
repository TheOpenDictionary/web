<script lang="ts">
	import Book from '~icons/color/book';

	import Button from '$components/Button.svelte';
	import LanguageSelection from '$components/LanguageSelection';
	import SearchBox from '$components/SearchBox';

	import type { PageData } from './$types';

	export let data: PageData;

	const sourceLanguages = data.sourceLanguages();
	const targetLanguages = data.targetLanguages();
</script>

<div class="mx-auto flex h-full max-w-4xl flex-col gap-8 center">
	<Book />

	<LanguageSelection
		sourceLanguages={$sourceLanguages.data ?? []}
		targetLanguages={$targetLanguages.data ?? []}
		targetLanguage={data.targetLanguage}
		sourceLanguage={data.sourceLanguage}
	/>

	<SearchBox size="lg" />

	<Button>Search</Button>
</div>
