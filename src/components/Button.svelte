<script lang="ts">
	import { cva } from 'class-variance-authority';
	import { twMerge } from 'tailwind-merge';

	const button = cva([
		'rounded-full',
		'bg-gradient-to-b from-blue-light to-blue-dark',
		'px-12 py-3',
		'transition-all duration-1000 [&]:[transition-timing-function:cubic-bezier(0,0,.2,1)]',
		'typography typography-title typography-sm typography-invert',
		'active:scale-95'
	]);
</script>

<button class={twMerge(button({ class: $$props.class }))}>
	<slot />
</button>
