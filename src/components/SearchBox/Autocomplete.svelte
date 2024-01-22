<script lang="ts" context="module">
	export type SearchResult = {
		term: string;
		definitions: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { goto } from '$app/navigation';

	import { sourceLanguage, targetLanguage } from '$lib/stores';

	import Card from '$components/Card.svelte';
	import Typography from '$components/Typography.svelte';

	export let items: SearchResult[];

	const dispatch = createEventDispatcher();

	let selectedIndex = -1;

	function getLink(item: SearchResult) {
		return '/' + [$sourceLanguage, $targetLanguage, 'entry', item.term].join('/');
	}

	onMount(() => {
		async function handleKey(e: KeyboardEvent) {
			if (e.key === 'ArrowDown') {
				selectedIndex =
					selectedIndex === items.length - 1 ? 0 : Math.min(selectedIndex + 1, items.length - 1);
			} else if (e.key === 'ArrowUp') {
				selectedIndex = selectedIndex === 0 ? items.length - 1 : Math.max(selectedIndex - 1, 0);
			} else if (e.key === 'Enter') {
				await goto(getLink(items[selectedIndex]));
				dispatch('click');
			}
		}

		function handleMouse() {
			selectedIndex = -1;
		}

		document.addEventListener('keyup', handleKey);
		document.addEventListener('mousemove', handleMouse);

		return () => {
			document.removeEventListener('keyup', handleKey);
			document.removeEventListener('mousemove', handleMouse);
		};
	});
</script>

<div transition:fly={{ y: -10 }} class="absolute -bottom-1 left-8 right-0 translate-y-full">
	<Card size="lg">
		<ul class="p-2">
			{#each items as item, idx (item.term)}
				<li>
					<a
						on:click
						href={getLink(item)}
						class="group flex cursor-pointer flex-row gap-4 rounded-lg p-3 px-4 transition-opacity duration-300 hover:bg-gray-100 active:opacity-50"
						class:!bg-blue-dark={idx === selectedIndex}
						class:selected={idx === selectedIndex}
					>
						<div>
							<Typography class="group-[.selected]:text-inverted" as="h6" variant="title" size="md">
								{item.term}
							</Typography>
							<Typography
								class="line-clamp-1 group-[.selected]:text-inverted/80"
								variant="body"
								size="sm"
								color="subtle"
							>
								{item.definitions}
							</Typography>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</Card>
</div>
