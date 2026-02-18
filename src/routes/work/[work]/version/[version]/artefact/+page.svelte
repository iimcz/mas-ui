<script>
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/Datatable.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "artefactList";

    const tableColumns = [
        { name: "Název verze", key: "name", canSort: true },
        { name: "Zobrazit", key: "name", canSort: false, onClick: (/** @type {import('$lib/schemas/artefact').Artefact} */ row) => goto(`artefact/${row.id}`)},
    ]


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<HeaderContainer title="Artefakty">
    <Datatable data={data.artefacts} columns={tableColumns}/>
</HeaderContainer>
