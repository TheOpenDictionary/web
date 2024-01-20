<script lang="ts">
	import LanguageSelection from '$components/LanguageSelection';
	import TextField from '$components/TextField.svelte';
	import Typography from '$components/Typography.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const entryStore = data.entry();

	$: entry = $entryStore.data;
</script>

<nav class="shadow-sm p-3">
	<div class="container flex flex-row items-center gap-8">
		<LanguageSelection sourceLanguage="en" targetLanguage="en" />
		<TextField placeholder="Search here" />
	</div>
</nav>

<main class="container p-4">
	<Typography variant="title">
		{entry?.term}
	</Typography>
</main>
