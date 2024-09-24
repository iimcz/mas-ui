<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { goto } from "$app/navigation";
    import Datatable from "$lib/components/client/Datatable.svelte";

    const tableColumns = [
        { name: "Identifikátor", key: "id", canSort: true },
        { name: "Zobrazit", key: "name", canSort: false, onClick: (/** @type {import("$lib/schemas/gamePackage").GamePackage} */ row) => { goto(`gameobject/${row.id}`) } },
        { name: "Spustit výchozí profil", key: "name", canSort: false, onClick: (/** @type {import("$lib/schemas/gamePackage").GamePackage} */ row) => { goto(``) } }, // TODO: Get right profile
    ]

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "gameObjectList";

    /** @type {import('./$types').PageData} */
	export let data;

    console.log(data)
</script>

<HeaderContainer title="Herní objekty">
    <Datatable data={data.gameObjects} columns={tableColumns}/>
</HeaderContainer>
