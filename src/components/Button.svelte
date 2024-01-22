<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentType } from 'svelte';

	import { cn } from '$lib/utils';

	const button = cva(
		[
			'rounded-full',
			'transition-all duration-300 ease-in-out',
			'flex flex-row items-center gap-2',
			'group'
		],
		{
			variants: {
				variant: {
					contained: [
						'text-inverted font-display font-light',
						'shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]',
						'active:scale-[.98]'
					],
					link: ['text active:opacity-50']
				},
				size: {
					sm: 'text-sm icon-sm px-6 py-2',
					md: 'text-base px-12 py-3'
				},
				color: {
					primary: '',
					secondary: ''
				}
			},
			compoundVariants: [
				{
					variant: 'contained',
					color: 'primary',
					class: 'bg-gradient-to-b from-blue-light to-blue-dark'
				},
				{
					variant: 'link',
					color: 'primary',
					class: 'text-primary'
				},
				{
					variant: 'link',
					color: 'secondary',
					class: 'text-muted hover:text-subtle'
				}
			]
		}
	);

	interface $$Props extends VariantProps<typeof button> {
		class?: string;
		icon?: ComponentType;
	}

	export let variant: $$Props['variant'] = 'contained';
	export let color: $$Props['color'] = 'primary';
	export let size: $$Props['size'] = 'md';
	export let icon: ComponentType | undefined = undefined;
</script>

<button class={cn(button({ variant, color, size, class: $$props.class }), $$props.class)}>
	{#if icon}
		<svelte:component this={icon} class="group-[.icon-sm]:text-sm" />
	{/if}
	<slot />
</button>
