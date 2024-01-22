<script lang="ts" context="module">
	export type Etymology = RouterOutput['entries']['get']['etymologies'][number];
</script>

<script lang="ts">
	import Typography from '$components/Typography.svelte';

	import type { RouterOutput } from '$server/router';

	import Footer from './Footer.svelte';
	import Sense from './Sense.svelte';

	export let etymology: Etymology;

	$: checkboxID = `ety-${etymology.id}`;
</script>

<div class="rounded-2xl border border-default">
	<header class="p-8">
		<label for={checkboxID}>
			<input type="checkbox" class="peer absolute appearance-none opacity-0" id={checkboxID} />

			<Typography
				variant="body"
				color="subtle"
				size="md"
				class="line-clamp-2 peer-checked:line-clamp-none"
			>
				{@html etymology?.description}
			</Typography>

			<Typography
				variant="body"
				size="md"
				class="float-right cursor-pointer py-4 text-right text-sm text-primary"
			>
				Full etymology
			</Typography>
		</label>
	</header>

	<div class="px-8 pb-8">
		{#each etymology.senses as sense (sense.pos)}
			<Sense {sense} />
		{/each}
	</div>

	<Footer />
</div>
