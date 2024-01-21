<script lang="ts">
	import { cva } from 'class-variance-authority';

	import { cn } from '$lib/utils';

	const button = cva([
		'rounded-full',
		'bg-gradient-to-b from-blue-light to-blue-dark',
		'px-12 py-3',
		'transition-all duration-1000 [&]:[transition-timing-function:cubic-bezier(0,0,.2,1)]',
		'active:scale-95',
		'text text-inverted font-display font-light',
		'shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]'
	]);
</script>

<button class={cn(button(), $$props.class)}>
	<slot />
</button>
