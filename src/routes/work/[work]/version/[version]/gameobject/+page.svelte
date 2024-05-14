<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { goto } from "$app/navigation";
    import Datatable from "$lib/components/client/Datatable.svelte";

    const tableColumns = [
        { name: "Název", key: "name", canSort: true },
        { name: "Akce", key: "name", canSort: false },
        { name: "Zobrazit", key: "name", canSort: false, onClick: () => { goto("/work/[id]/version/[id]/gameobject/[id]") } },
        { name: "Spustit výchozí profil", key: "name", canSort: false, onClick: () => { goto("/work/[id]/version/[id]/gameobject/[id]/profile/[id]/emulator") } },
    ]

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "gameObjectList";
</script>

<HeaderContainer title="Herní objekty">
    <Datatable columns={tableColumns}/>
</HeaderContainer>
