<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { goto } from "$app/navigation";
    import Datatable from "$lib/components/Datatable.svelte";
    import type { GamePackage } from "$lib/schemas/gamePackage";

    const tableColumns = [
        { name: "Název", key: "name", canSort: true },
        { name: "Popis", key: "description", canSort: true },
        { name: "Spustit výchozí profil", key: "", canSort: false, onClick: (row: GamePackage) => { goto(`gameobject/${row.id}/profile/test/emulator`) } },
    ]

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "gameObjectList";


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<HeaderContainer title="Herní objekty">
    <Datatable data={data.gameObjects} columns={tableColumns} onrowclick={(row: GamePackage) => goto(`gameobject/${row.id}`)}/>
</HeaderContainer>
