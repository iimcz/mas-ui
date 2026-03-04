<script lang="ts">
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/Datatable.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import type { Artefact } from "$lib/schemas/artefact";
    $currentSidebar = versionLinks;
    $currentRoute = "artefactList";

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Interní poznámka", key: "internalNote", canSort: true },
    ]

    let { data } = $props();
</script>

<HeaderContainer title="Digitální objekty">
    <Datatable data={data.artefacts} columns={tableColumns} onrowclick={(row: Artefact) => goto(`artefact/${row.id}`)}/>
</HeaderContainer>
