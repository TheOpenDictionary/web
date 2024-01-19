<script lang="ts">
	import { cva } from 'class-variance-authority';

	const card = cva('rounded-lg border bg-white shadow-md');
</script>

<div class={card({ class: $$props.class })}>
	<slot />
</div>
