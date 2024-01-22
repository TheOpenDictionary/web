<script lang="ts">
	import Etymology from '$components/Etymology';
	import Navigation from '$components/Navigation.svelte';
	import Typography from '$components/Typography.svelte';

	import { etymologies } from '../../../../../db/schema';
	import type { PageData } from './$types';

	export let data: PageData;

	$: entryStore = data.entry();

	$: entry = $entryStore.data;
</script>

<div>
	<Navigation />

	<main class="container px-10 py-4">
		<Typography variant="headline" size="lg">
			{entry?.term}
		</Typography>

		<div class="flex flex-col gap-4">
			{#each entry?.etymologies ?? [] as etymology}
				<Etymology {etymology} />
			{/each}
		</div>
	</main>
</div>
