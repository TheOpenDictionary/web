<script lang="ts">
	import Arrow from '~icons/mdi/menu-right';

	import LanguageSelector from './LanguageSelector.svelte';

	export let sourceLanguage: string = 'en';
	export let targetLanguage: string = 'en';
	export let sourceLanguages: string[] = [];
	export let targetLanguages: string[] = [];
</script>

<div class="flex flex-row items-center">
	<LanguageSelector
		getLink={(language) => `/${language}/${targetLanguage}`}
		selectedLanguage={sourceLanguage}
		languages={sourceLanguages}
	/>

	<Arrow class="text-2xl text-muted" />

	<LanguageSelector
		getLink={(language) => `/${targetLanguage}/${language}`}
		selectedLanguage={targetLanguage}
		languages={targetLanguages}
	/>
</div>
