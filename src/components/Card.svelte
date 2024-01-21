<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	const card = cva('border bg-white shadow-md', {
		variants: {
			size: {
				md: 'rounded-lg',
				lg: 'rounded-xl'
			}
		},
		defaultVariants: {
			size: 'md'
		}
	});

	interface $$Props extends VariantProps<typeof card> {
		class?: string;
	}

	export let size: $$Props['size'] = undefined;
</script>

<div class={card({ size, class: $$props.class })}>
	<slot />
</div>
