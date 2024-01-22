<script lang="ts">
	import Book from '~icons/color/book';

	import { sourceLanguage, targetLanguage } from '$lib/stores';

	import LanguageSelection from './LanguageSelection';
	import SearchBox from './SearchBox';
</script>

<nav class="justify-center-center flex p-3 shadow-sm">
	<div class="container flex flex-row items-center justify-start gap-8">
		<a href={`/${$sourceLanguage}/${$targetLanguage}`}>
			<Book width={32} height={32} />
		</a>
		<LanguageSelection size="sm" sourceLanguage="en" targetLanguage="en" />
		<SearchBox size="sm" />
	</div>
</nav>
