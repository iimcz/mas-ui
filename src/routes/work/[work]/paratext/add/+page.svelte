<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import { currentSidebar, currentRoute,  workLinks } from "$lib/components/sidebar/links";

    $currentSidebar = workLinks;
    $currentRoute = "addParatext";
</script>

<HeaderContainer title="Nový paratext díla">
    <ParatextForm isNew={true}/>
</HeaderContainer>
