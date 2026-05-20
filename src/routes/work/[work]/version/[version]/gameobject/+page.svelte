<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { goto } from "$app/navigation";
    import Datatable from "$lib/components/Datatable.svelte";
    import type { GamePackage } from "$lib/schemas/gamePackage";

    const tableColumns = [
        { name: "Název", key: "name", canSort: true },
        { name: "Popis", key: "description", canSort: true },
        {
            name: "Spustit emulaci",
            key: "",
            canSort: false,
            onClick: (row: GamePackage) => {
                goto(`gameobject/${row.id}/emulator`);
            }
        }
    ];

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "gameObjectList";

    interface Props {
        data: import('./$types').PageData;
    }

    /** @type {Props} */
    let { data } = $props();
</script>

<HeaderContainer title="Herní balíčky">
    <Datatable
        data={data.gameObjects}
        columns={tableColumns}
        onrowclick={(row: GamePackage) => goto(`gameobject/${row.id}`)}
    />
</HeaderContainer>
