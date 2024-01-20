<script lang="ts">
	import * as m from '$i18n/messages';

	import { FLAGS } from '$lib/constants';
	import { cn } from '$lib/utils';
	import { clickOutside } from '$lib/actions';

	import Card from '../Card.svelte';

	let inputRef: HTMLInputElement;

	function handleSelect() {
		inputRef.checked = !inputRef.checked;
	}

	function getLanguageName(language: string) {
		try {
			return m[`languages_${language}` as keyof typeof m]();
		} catch (e) {
			throw new Error(`Couldn't find language name for ${language}`);
		}
	}

	export let languages: string[];
	export let selectedLanguage: string;
	export let getLink: (language: string) => string;

	$: namedLanguages = languages
		.filter((language) => language !== selectedLanguage)
		.map((language) => [language, getLanguageName(language)]) as [string, string][];
</script>

<div
	class="group relative flex flex-row items-center gap-3 px-4 py-2"
	use:clickOutside={() => (inputRef.checked = false)}
>
	<svelte:component
		this={FLAGS[selectedLanguage]}
		class="transition-opacity group-active:opacity-50"
		width={16}
		height={16}
	/>

	<span
		class="font-display font-light text-subtle transition-opacity group-active:opacity-50 group-has-[:checked]:text"
	>
		{getLanguageName(selectedLanguage)}
	</span>

	<input
		bind:this={inputRef}
		type="checkbox"
		class="peer absolute h-full w-full cursor-pointer appearance-none opacity-0"
	/>

	<Card
		class={cn(
			'absolute -bottom-1 -left-1 translate-y-full scale-95 transform-gpu opacity-0',
			'transition-all duration-300',
			'origin-top-left',
			'pointer-events-none',
			'peer-checked:pointer-events-auto peer-checked:scale-100 peer-checked:opacity-100'
		)}
	>
		<ul class="max-h-48 overflow-auto p-1">
			{#each namedLanguages.sort(([, a], [, b]) => a.localeCompare(b)) as [language, name]}
				<li>
					<a
						href={getLink(language)}
						on:click={handleSelect}
						class={cn(
							'flex flex-row items-center gap-3 font-display font-light text-subtle',
							'rounded-md px-4 py-2',
							'hover:bg-gray-100 hover:text',
							'cursor-pointer',
							'pr-16',
							'w-full'
						)}
					>
						<svelte:component this={FLAGS[language]} width={16} height={16} />
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</Card>
</div>
