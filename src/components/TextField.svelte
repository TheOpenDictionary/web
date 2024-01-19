<script lang="ts">
	import { cn } from '$lib/utils';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLInputAttributes } from 'svelte/elements';

	const textField = cva([
		'rounded-full w-full',
		'bg-gray-100 from-blue-light to-blue-dark',
		'p-3 px-8',
		'outline-none',
		'transition-all',
		'border border-clear focus:border-default',
		'placeholder:typography-muted typography-sm'
	]);

	interface $$Props extends HTMLInputAttributes, VariantProps<typeof textField> {
		placeholder?: string | undefined;
	}

	export let placeholder: $$Props['placeholder'] = undefined;
</script>

<input {...$$props} class={cn(textField({ class: $$props.class }))} {placeholder} />
