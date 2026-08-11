<script lang="ts">
    import type { Paratext } from "$lib/schemas/paratext";
    import Datatable from "$lib/components/Datatable.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { goto } from "$app/navigation";
    $currentSidebar = versionLinks;
    $currentRoute = "paratextList";

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Kurátorský popis", key: "note", canSort: true },
        { name: "Idno", key: "idno", canSort: true },
        { name: "Typ", key: "type", canSort: true }
    ];

    let { data } = $props();
</script>

<HeaderContainer title="Paratexty">
    <Datatable
        data={data.paratexts}
        columns={tableColumns}
        onrowclick={(row: Paratext) => goto(`paratext/${row.id}`)}
    />
</HeaderContainer>
