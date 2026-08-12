<script>
    import ParatextDataView from "$lib/components/paratext/ParatextDataView.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];

    let { data } = $props();
</script>

<HeaderContainer title={data.paratext.label}>
    <div class="grid grid-cols-[1fr] gap-2">
        <ParatextDataView data={data.paratext} />
    </div>
</HeaderContainer>
