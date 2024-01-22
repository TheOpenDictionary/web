<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';

	export const pill = cva('rounded-full inline-block px-3 pt-1 pb-1.5 text-sm', {
		variants: {
			color: {
				default: 'bg-gray-100 text-subtle'
			}
		},
		defaultVariants: {
			color: 'default'
		}
	});
</script>

<div class={pill()}>
	<slot />
</div>
