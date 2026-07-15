<script>
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentRoute, currentSidebar, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "paratextList";

    let { data } = $props();
</script>

<HeaderContainer title={data.paratext.label}>
    <div class="grid grid-cols-[1fr] gap-2">
        <ParatextForm data={data.paratext} />
    </div>
</HeaderContainer>
