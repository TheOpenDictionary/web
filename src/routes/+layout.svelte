<script lang="ts">
	import '../app.pcss';

	import '@fontsource-variable/geologica';
	import '@fontsource-variable/noto-sans';

	import { QueryClientProvider } from '@tanstack/svelte-query';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
