<script lang="ts" context="module">
	export const TEXTFIELD_ICON_SM = 20;
	export const TEXTFIELD_ICON_LG = 22;

	export const textField = cva(
		[
			'inline-flex flex-row items-center',
			'bg-clear outline-none placeholder:text-muted',
			'rounded-full w-full',
			'bg-gray-100 from-blue-light to-blue-dark',
			'transition-all duration-300 ease-in-out',
			'border border-clear focus-within:border-default',
			'group',
			'gap-4'
		],
		{
			variants: {
				size: {
					sm: 'h-12 px-5',
					lg: 'h-[52px] px-6'
				}
			},
			defaultVariants: {
				size: 'sm'
			}
		}
	);
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentType } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface $$Props extends Omit<HTMLInputAttributes, 'size'>, VariantProps<typeof textField> {
		placeholder?: string | undefined;
		icon?: ComponentType;
	}

	export let placeholder: $$Props['placeholder'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let icon: $$Props['icon'] = undefined;
	export let value: string = '';
</script>

<div class={cn(textField({ size, class: $$props.class }))}>
	{#if icon}
		<svelte:component
			this={icon}
			class="h-full text-muted transition-all duration-300 group-focus-within:text-subtle"
			width={size === 'lg' ? TEXTFIELD_ICON_LG : TEXTFIELD_ICON_SM}
			height={size === 'lg' ? TEXTFIELD_ICON_LG : TEXTFIELD_ICON_SM}
		/>
	{/if}
	<input
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:change
		bind:value
		class="h-full flex-grow bg-clear outline-none placeholder:text-muted"
		{placeholder}
	/>
</div>
