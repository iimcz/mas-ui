<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Placeholder from "$lib/components/placeholder.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "artefactDetail";
</script>

<HeaderContainer title="Metadata artefaktu">
    <Placeholder/>
</HeaderContainer>
