<script lang="ts">
	import LanguageSelection from '$components/LanguageSelection';
	import SearchBox from '$components/SearchBox/SearchBox.svelte';
	import TextField from '$components/TextField.svelte';
	import Typography from '$components/Typography.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const entryStore = data.entry();

	$: entry = $entryStore.data;
</script>

<nav class="p-3 shadow-sm">
	<div class="container flex flex-row items-center gap-8">
		<LanguageSelection sourceLanguage="en" targetLanguage="en" />
		<SearchBox />
	</div>
</nav>

<main class="container p-4">
	<Typography variant="title">
		{entry?.term}
	</Typography>
</main>
