<script lang="ts">
	import EtymologyCard from '$components/EtymologyCard';
	import Navigation from '$components/Navigation.svelte';
	import Typography from '$components/Typography.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: entryStore = data.entry();

	$: entry = $entryStore.data;
</script>

<div>
	<Navigation />

	<main class="container grid grid-cols-[1fr,350px] gap-4 px-10 py-4">
		<div>
			<header class="p-4">
				<Typography variant="headline" size="lg">
					{entry?.term}
				</Typography>
			</header>

			<div class="flex flex-col gap-4">
				{#each entry?.etymologies ?? [] as etymology}
					<EtymologyCard {etymology} />
				{/each}
			</div>
		</div>

		<aside>hey</aside>
	</main>
</div>
