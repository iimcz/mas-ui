<script>
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentSidebar, currentRoute, workLinks, versionLinks, routeOverrides } from "$lib/components/sidebar/links";
    $currentRoute = "paratextList";


    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
    $routeOverrides["work"] = data.workId;

    if (data.versionId != null) {
        $currentSidebar = versionLinks;
        $routeOverrides["version"] = data.versionId;
    }
    else {
        $currentSidebar = workLinks;
    }
</script>

<HeaderContainer title="Metadata paratextu">
    <div class="grid grid-cols-[1fr] gap-2">
        <ParatextForm data={data}/>
    </div>
</HeaderContainer>
