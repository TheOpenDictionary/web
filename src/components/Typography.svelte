<script lang="ts" context="module">
	export const typography = cva('text tracking-normal font-sans', {
		variants: {
			variant: {
				body: '',
				title: 'font-medium font-display'
			},
			color: {
				muted: 'text-muted',
				subtle: 'text-subtle',
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
				class: 'text-sm'
			},
			{
				variant: 'title',
				size: 'md',
				class: 'text-base'
			},
			{
				variant: 'title',
				size: 'lg',
				class: 'text-3xl'
			}
		],
		defaultVariants: {
			variant: 'body',
			size: 'md'
		}
	});
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	import { cn } from '$lib/utils';

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
