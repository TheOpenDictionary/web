<script lang="ts" context="module">
	export type SearchResult = {
		term: string;
		definitions: string;
	};
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';

	import Search from '~icons/mdi/search';

	import Card from '$components/Card.svelte';
	import { TEXTFIELD_ICON_LG } from '$components/TextField.svelte';
	import Typography from '$components/Typography.svelte';

	export let items: SearchResult[];
</script>

<div transition:fly={{ y: -10 }} class="absolute bottom-0 left-8 right-0 translate-y-full">
	<Card size="lg">
		<ul class="p-2">
			{#each items as item (item.term)}
				<li>
					<a
						href="/"
						class="group flex cursor-pointer flex-row gap-4 rounded-lg p-3 px-4 transition-all duration-300 hover:bg-gray-100 active:opacity-50"
					>
						<div>
							<Typography variant="title" size="md">{item.term}</Typography>
							<Typography variant="body" size="sm" color="subtle" class="line-clamp-1">
								{item.definitions}
							</Typography>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</Card>
</div>
