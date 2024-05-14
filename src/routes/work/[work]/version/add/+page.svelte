<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionForm from "../[version]/versionForm.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    $currentSidebar = workLinks;
    $currentRoute = "addVersion";
</script>

<HeaderContainer title="Nová verze">
    <VersionForm isNew={true}></VersionForm>
</HeaderContainer>
