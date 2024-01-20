<script lang="ts" context="module">
	export const typography = cva('text font-sans', {
		variants: {
			variant: {
				body: '',
				title: ''
			},
			color: {
				muted: 'text-muted',
				inverted: 'text-inverted'
			},
			size: {
				sm: '',
				md: '',
				lg: ''
			}
		},
		compoundVariants: [
			{
				variant: 'title',
				size: 'sm',
				class: 'text-title-sm'
			},
			{
				variant: 'title',
				size: 'md',
				class: 'text-3xl'
			},
			{
				variant: 'title',
				size: 'lg',
				class: 'text-title-lg'
			}
		],
		defaultVariants: {
			variant: 'body',
			size: 'md'
		}
	});
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { cva, type VariantProps } from 'class-variance-authority';

	interface $$Props extends VariantProps<typeof typography> {
		class?: string;
	}

	type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

	export let variant: $$Props['variant'] | undefined = undefined;
	export let size: $$Props['size'] | undefined = undefined;
	export let color: $$Props['color'] | undefined = undefined;
	export let as: TypographyTag = 'p';
</script>

<svelte:element
	this={as}
	class={cn(typography({ color, variant, size, className: $$props.class }))}
>
	<slot />
</svelte:element>
