<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/Datatable.svelte";
    import { goto } from "$app/navigation";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import type { PlayableObject } from "$lib/schemas/playableObject.js";

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Poznámka", key: "note", canSort: true },
        {
            name: "Spustit emulaci",
            key: "",
            canSort: false,
            onClick: (row: PlayableObject) => {
                goto(`gameobject/${row.id}/emulator`);
            }
        }
    ];

    $currentSidebar = versionLinks;
    $currentRoute = "gameObjectList";

    let { data } = $props();
</script>

<HeaderContainer title="Herní balíčky">
    <Datatable
        data={data.playableObjects}
        columns={tableColumns}
        onrowclick={(row: PlayableObject) => goto(`gameobject/${row.id}`)}
    />
</HeaderContainer>
