<script lang="ts">
	import '../app.pcss';
	import '@fontsource-variable/geologica';
	import '@fontsource-variable/noto-sans';

	import { QueryClientProvider } from '@tanstack/svelte-query';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import { getTextDirection } from '$lib/i18n.js';

	import { setLanguageTag, sourceLanguageTag, type AvailableLanguageTag } from '$i18n/runtime';

	import type { LayoutData } from './$types';

	$: lang = ($page.params.lang as AvailableLanguageTag) ?? sourceLanguageTag;

	$: setLanguageTag(lang);

	$: textDirection = getTextDirection(lang);

	$: {
		if (browser) {
			document.documentElement.dir = textDirection;
			document.documentElement.lang = lang;
		}
	}

	export let data: LayoutData;
</script>

{#key lang}
	<QueryClientProvider client={data.queryClient}>
		{#key $page.url.pathname}
			<slot />
		{/key}
	</QueryClientProvider>
{/key}
