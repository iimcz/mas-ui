<script>
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/client/Datatable.svelte";

    const tableColumns = [
        { name: "Název verze", key: "title", canSort: true },
        { name: "Zobrazit", key: "name", canSort: false, onClick: (/** @type {import('$lib/schemas/version').Version} */ row) => goto(`version/${row.id}`)},
    ]

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    $currentSidebar = workLinks;
    $currentRoute = "versionList";

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<HeaderContainer title="Verze">
    <Datatable data={data.versions} columns={tableColumns}/>
</HeaderContainer>
