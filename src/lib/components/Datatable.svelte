<script lang="ts">
    import { RowCount, TableHandler, ThFilter, ThSort, Pagination } from "@vincjo/datatables";

    let { data, columns, onrowclick } : {
        data: any[],
        columns: {
            name: string,
            key: string,
            canSort?: boolean,
            onClick?: any
        }[],
        onrowclick?: any
    } = $props();

	function clickHandler(column: any, row: any)
	{
		if (column?.onClick != null) column.onClick(row)
	}

    const i18n = {
        search: "Hledat...",
        show: "Zobrazit",
        entries: "záznamů",
        filter: "Filtrovat",
        rowCount: "Zobrazeno {start} až {end} z {total} záznamů",
        noRows: "Žádné výsledky",
        previous: "Předchozí",
        next: "Další"
    }
    const table = $derived(new TableHandler(data, { rowsPerPage: 20, i18n }));
</script>


<section bind:clientWidth={table.clientWidth}>
    <article bind:this={table.element} class="thin-scrollbar">
        <div class="table-wrap">
            <table class="table">
                <thead>
                    <tr>
                        {#each columns as column}
                            {#if column.canSort}
                                <ThSort {table} field={column.key}>{column.name}</ThSort>
                            {:else if column.onClick}
                                <th></th>
                            {:else}
                                <th>{column.name}</th>
                            {/if}
                        {/each}
                    </tr>
                    <tr>
                        {#each columns as column}
                            {#if column.canSort}
                                <ThFilter {table} field={column.key} />
                            {:else}
                                <th></th>
                            {/if}
                        {/each}
                    </tr>
                </thead>
                <tbody class={onrowclick ? "[&>tr]:hover:preset-tonal-primary" : ""}>
                    {#each table.rows as row}
                        <tr onclick={() => onrowclick(row)} class={onrowclick ? "cursor-pointer select-none" : ""}>
                            {#each columns as column, i}
                                {#if column.onClick}
                                    <td>
                                        <button type="button" onclick={() => clickHandler(column, row)} class="btn preset-filled">{column.name}</button>
                                    </td>
                                {:else}
                                    <td class:underline={onrowclick && i == 0}>{row[column.key]}</td>
                                {/if}
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </article>

    <footer>
        <RowCount {table}/>
        <Pagination {table}/>
    </footer>
</section>

<style>
    @reference "#layout.css";

    section {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: inherit;
        border-radius: inherit;
    }

    footer {
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    article {
        position: relative;
        height: 100%;
        overflow: auto;
        background: inherit;
    }

    :root {
        --font-grey: var(--base-font-color);

        @variant dark {
            --font-grey: var(--base-font-color-dark);
        }
    }
</style>
