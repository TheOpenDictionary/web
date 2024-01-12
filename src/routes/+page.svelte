<script>
	import Button from '../components/Button.svelte';
	import TextField from '../components/TextField.svelte';

	import Book from '~icons/od-color/book';
</script>

<div class="mx-auto flex h-full max-w-4xl flex-col gap-8 centered">
	<Book />
	<TextField placeholder="Search for any word or phrase" />
	<Button>Search</Button>
</div>
