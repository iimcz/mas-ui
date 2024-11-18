<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "addParatext";
</script>

<HeaderContainer title="Nový paratext verze">
    <ParatextForm isNew={true}/>
</HeaderContainer>
