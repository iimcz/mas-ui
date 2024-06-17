<script>
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { Datatable } from "@vincjo/datatables";
    $currentSidebar = versionLinks;
    $currentRoute = "artefactList";

    const tableColumns = [
        { name: "Název verze", key: "title", canSort: true },
        { name: "Zobrazit", key: "name", canSort: false, onClick: (/** @type {import('$lib/schemas/artefact').Artefact} */ row) => goto(`TODO`)},
    ]

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<HeaderContainer title="Artefakty">
    <Datatable data={data.artefacts} columns={tableColumns}/>
</HeaderContainer>
