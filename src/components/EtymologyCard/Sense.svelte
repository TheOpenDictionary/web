<script lang="ts" context="module">
	import type { Etymology } from './EtymologyCard.svelte';

	export type Sense = Etymology['senses'][number];
</script>

<script lang="ts">
	import Pill from '$components/Pill.svelte';

	import * as m from '$i18n/messages';

	import Definition from './Definition.svelte';

	export let sense: Sense;

	$: posLabel = m[`pos_${sense.pos}` as keyof typeof m]?.() ?? sense.pos;
</script>

<div class="my-8 first-of-type:mt-0">
	<Pill>{posLabel}</Pill>
</div>

<ul>
	{#each sense.definitions as definition}
		<Definition {definition} />
	{/each}
</ul>
