<script>
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    $currentSidebar = workLinks;
    $currentRoute = "workDetail";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<HeaderContainer title="Metadata paratextu">
    <div class="grid grid-cols-[1fr] gap-2">
        <ParatextForm data={data}/>
    </div>
</HeaderContainer>
