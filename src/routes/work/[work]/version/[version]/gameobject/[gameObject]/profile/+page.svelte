<script>
    import { goto } from "$app/navigation";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/Datatable.svelte";

    const tableColumns = [
        { name: "Název", key: "name", canSort: true },
        { name: "Spustit", key: "name", canSort: false, onClick: () => { goto("/work/[id]/version/[id]/gameobject/[id]/profile/[id]/emulator") } },
        { name: "Zobrazit", key: "name", canSort: false, onClick: () => { goto("/work/[id]/version/[id]/gameobject/[id]/profile/[id]") } },
    ]

    import { currentSidebar, currentRoute, gameObjectLinks } from "$lib/components/sidebar/links";
    $currentSidebar = gameObjectLinks;
    $currentRoute = "profileList";
</script>


<HeaderContainer title="Profily">
        <Datatable columns={tableColumns}/>
</HeaderContainer>
