<script lang="ts">
	import Typography from '$components/Typography.svelte';

	import type { RouterOutput } from '$server/router';

	type Etymology = RouterOutput['entries']['get']['etymologies'][number];

	export let etymology: Etymology;
</script>

<div class="rounded-2xl border border-default">
	<header class="p-8">
		<div class="line-clamp-3">
			<Typography variant="body" size="md">
				{@html etymology?.description}
			</Typography>
		</div>
	</header>
</div>
