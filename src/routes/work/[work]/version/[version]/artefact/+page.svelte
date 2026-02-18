<script lang="ts">
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/Datatable.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import type { Artefact } from "$lib/schemas/artefact";
    $currentSidebar = versionLinks;
    $currentRoute = "artefactList";

    const tableColumns = [
        { name: "Název", key: "name", canSort: true },
        { name: "Popis", key: "description", canSort: true },
    ]

    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<HeaderContainer title="Digitální objekty">
    <Datatable data={data.artefacts} columns={tableColumns} onrowclick={(row: Artefact) => goto(`artefact/${row.id}`)}/>
</HeaderContainer>
