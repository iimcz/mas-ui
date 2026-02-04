<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
    import { _ } from 'svelte-i18n'

	export let handler: DataHandler;
	const rowCount = handler.getRowCount();
</script>

<aside class="text-sm leading-8 mr-6">
	{#if $rowCount.total > 0}
		<b>{$rowCount.start}</b>
		- <b>{$rowCount.end}</b>
		/ <b>{$rowCount.total}</b>
	{:else}
		{$_("table_no_entries")}
	{/if}
</aside>
