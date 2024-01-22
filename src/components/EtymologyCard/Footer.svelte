<script lang="ts">
	import Bookmark from '~icons/mdi/bookmark-outline';
	import Edit from '~icons/mdi/text-box-edit-outline';

	import Button from '../Button.svelte';
</script>

<div class="mt-4 flex flex-row items-center justify-end border-t border-default p-2 px-6">
	<Button variant="link" color="secondary" icon={Bookmark} size="sm">Save</Button>
	<Button variant="link" color="secondary" icon={Edit} size="sm">Edit</Button>
</div>
