<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { goto } from "$app/navigation";
    import Datatable from "$lib/components/client/Datatable.svelte";

    const tableColumns = [
        { name: "Název", key: "name", canSort: true },
        { name: "Zobrazit", key: "", canSort: false, onClick: (/** @type {import("$lib/schemas/gamePackage").GamePackage} */ row) => { goto(`gameobject/${row.id}`) } },
        { name: "Spustit výchozí profil", key: "", canSort: false, onClick: (/** @type {import("$lib/schemas/gamePackage").GamePackage} */ row) => { goto(`gameobject/${row.id}/profile/test/emulator`) } },
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
    <Datatable data={data.gameObjects} columns={tableColumns}/>
</HeaderContainer>
