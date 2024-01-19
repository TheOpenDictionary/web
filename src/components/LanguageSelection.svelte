<script lang="ts">
	import En from '~icons/twemoji/flag-united-states';

	import { cn } from '$lib/utils';

	import Card from './Card.svelte';

	let inputRef: HTMLInputElement;

	function handleSelect() {
		inputRef.checked = !inputRef.checked;
	}

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node)) {
				inputRef.checked = false;
			}
		};

		document.addEventListener('click', handleClick);

		return {
			destroy() {
				document.removeEventListener('click', handleClick);
			}
		};
	}

	export let languages: string[];
</script>

<div class="group relative flex flex-row items-center gap-3 px-4 py-2" use:clickOutside>
	<En class="transition-opacity group-active:opacity-50" width={16} height={16} />

	<span
		class="font-display font-light text-subtle transition-opacity group-active:opacity-50 group-has-[:checked]:text"
	>
		English
	</span>

	<input
		bind:this={inputRef}
		type="checkbox"
		class="peer absolute h-full w-full cursor-pointer appearance-none opacity-0"
	/>

	<Card
		class={cn(
			'absolute -bottom-2 -left-1 translate-y-full scale-95 transform-gpu opacity-0',
			'transition-all duration-300',
			'origin-top-left',
			'pointer-events-none',
			'peer-checked:pointer-events-auto peer-checked:scale-100 peer-checked:opacity-100'
		)}
	>
		<ul class="p-1">
			<li>
				<button
					on:click={handleSelect}
					class={cn(
						'flex flex-row items-center gap-3 font-display font-light text-subtle',
						'rounded-md px-4 py-2',
						'hover:bg-gray-100 hover:text',
						'cursor-pointer',
						'pr-16',
						'w-full'
					)}
				>
					<En width={16} height={16} />
					Poop
				</button>
			</li>
			<li
				class={cn(
					'flex flex-row items-center gap-3 font-sans font-normal text-subtle',
					'rounded-md px-4 py-2',
					'hover:bg-gray-100',
					'cursor-pointer',
					'pr-16'
				)}
			>
				<En width={16} height={16} />
				Vietnamese
			</li>
			<li
				class={cn(
					'flex flex-row items-center gap-3 font-display font-light text-subtle',
					'rounded-md px-4 py-2',
					'hover:bg-gray-100',
					'cursor-pointer',
					'pr-16'
				)}
			>
				<En width={16} height={16} />
				Poop
			</li>
		</ul>
	</Card>
</div>
