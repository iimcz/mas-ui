<script>
    import ThSort from "$lib/components/client/ThSort.svelte";
    import ThFilter from "$lib/components/client/ThFilter.svelte";
    import Search from "$lib/components/client/Search.svelte";
    import RowsPerPage from "$lib/components/client/RowsPerPage.svelte";
    import RowCount from "$lib/components/client/RowCount.svelte";
    import Pagination from "$lib/components/client/Pagination.svelte";

    /**
     * @type {any[]}
     */
    export let data;

    //Import handler from SSD
    import { DataHandler } from "@vincjo/datatables";

    /**
     * @type {{ name: string, key: string, canSort: boolean, onClick?: function(any):void }[]}
     */
    export let columns = [
        { name: "First name", key: "first_name", canSort: true },
        { name: "Last name", key: "last_name", canSort: true },
        { name: "Email", key: "email", canSort: true },
    ];

	/**
     * @param {{ name: string, key: string, canSort: boolean, onClick?: function(any):void }} column
     * @param {any} row
     */
	function clickHandler(column, row)
	{
		if (column?.onClick != null) column.onClick(row)
	}

    /**
     * @type {DataHandler<any>}
     */
    const handler = new DataHandler(data, { rowsPerPage: 20 });
    const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
    <!-- Header -->
    <header class="flex justify-between gap-4">
        <Search {handler} />
        <RowsPerPage {handler} />
    </header>
    <!-- Table -->
    <table class="table table-hover table-compact w-full table-auto">
        <thead>
            <tr>
                {#each columns as column}
                    {#if column.canSort}
                        <ThSort {handler} orderBy={column.key}>{column.name}</ThSort>
                    {:else}
                        <th>{column.name}</th>
                    {/if}
                {/each}
            </tr>
            <tr>
                {#each columns as column}
                    {#if column.canSort}
                        <ThFilter {handler} filterBy={column.key} />
                    {:else}
                        <th></th>
                    {/if}
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    {#each columns as column}
                        {#if column.onClick}
							<td>
                            	<button type="button" on:click={() => clickHandler(column, row)} class="btn variant-filled">{column.name}</button>
							</td>
                        {:else}
                            <td>{row[column.key]}</td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    <!-- Footer -->
    <footer class="flex justify-between">
        <RowCount {handler} />
        <Pagination {handler} />
    </footer>
</div>
