<script lang="ts" context="module">
	import type { Sense } from './Sense.svelte';

	export type Definition = Sense['definitions'][number];
</script>

<script lang="ts">
	import { cn } from '$lib/utils';

	import Typography from '$components/Typography.svelte';

	export let definition: Definition;
</script>

<li
	class={cn(
		'before:content-[counter(definition-count)]',
		'before:text-sm',
		'before:text-muted',
		'before:w-6',
		'before:h-6',
		'before:flex',
		'before:center',
		'before:mr-2',
		'flex flex-row items-center',
		'[&]:[counter-increment:definition-count]',
		'py-2',
		'first-of-type:pt-0',
		'last-of-type:pb-0'
	)}
>
	<Typography variant="body" class="inline" size="md">
		{@html definition.value}
	</Typography>
</li>
