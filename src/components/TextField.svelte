<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	const textField = cva([
		'rounded-full w-full',
		'bg-gray-100 from-blue-light to-blue-dark',
		'p-3 px-8',
		'outline-none',
		'transition-all',
		'border border-clear focus:border-gray-200',
		'typography typography-md',
		'placeholder:typography-muted'
	]);

	interface $$Props extends HTMLInputAttributes, VariantProps<typeof textField> {
		placeholder?: string | undefined;
	}

	export let placeholder: $$Props['placeholder'] = undefined;
</script>

<input {...$$props} class={twMerge(textField({ class: $$props.class }))} {placeholder} />
