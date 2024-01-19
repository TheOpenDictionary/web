<script lang="ts">
	import Arrow from '~icons/mdi/menu-right';
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';

	import Book from '~icons/color/book';
	import LanguageSelection from '$components/LanguageSelection.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-auto flex h-full max-w-4xl flex-col gap-8 center">
	<Book />

	<div class="flex flex-row items-center">
		<LanguageSelection languages={data.sourceLanguages} />
		<Arrow class="text-2xl text-muted" />
		<LanguageSelection languages={data.targetLanguages} />
	</div>

	<TextField placeholder="Search for any word or phrase" />
	<Button>Search</Button>
</div>
