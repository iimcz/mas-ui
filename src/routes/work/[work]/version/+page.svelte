<script lang="ts">
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import type { WorkVersion } from "$lib/schemas/workVersion";
    import Datatable from "$lib/components/Datatable.svelte";

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Popis", key: "description", canSort: true }
    ]

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    $currentSidebar = workLinks;
    $currentRoute = "versionList";

    let { data } = $props();
</script>

<HeaderContainer title="Verze">
    <Datatable data={data.versions} columns={tableColumns} onrowclick={(row: WorkVersion) => goto(`version/${row.id}`)}/>
</HeaderContainer>
