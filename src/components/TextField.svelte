<script lang="ts">
	import { cn } from '$lib/utils';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLInputAttributes } from 'svelte/elements';

	const textField = cva(
		[
			'rounded-full w-full',
			'bg-gray-200 from-blue-light to-blue-dark',
			'outline-none',
			'transition-all',
			'border border-clear focus:border-default',
			'placeholder:text-muted'
		],
		{
			variants: {
				size: {
					sm: 'p-3 px-6',
					lg: 'p-3 px-8'
				}
			},
			defaultVariants: {
				size: 'sm'
			}
		}
	);

	interface $$Props extends Omit<HTMLInputAttributes, 'size'>, VariantProps<typeof textField> {
		placeholder?: string | undefined;
	}

	export let placeholder: $$Props['placeholder'] = undefined;
</script>

<input {...$$props} class={cn(textField({ class: $$props.class }))} {placeholder} />
