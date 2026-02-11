<script>
    import { page } from "$app/stores";
    import { Accordion } from '@skeletonlabs/skeleton-svelte';
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ParatextCard from "$lib/components/paratext/ParatextCard.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";

    $currentSidebar = workLinks;
    $currentRoute = "paratextList";


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();

    const workParatexts = data.paratexts.filter(p => p.versionId == null)
    const versionParatexts = Object.entries(Object.groupBy(data.paratexts.filter(p => p.versionId != null), (p) => p.versionId ?? ""))
</script>

<HeaderContainer title="Paratexty">
    <h1>Dílo</h1>
    <div class="grid grid-cols-2 2xl:grid-cols-3 gap-2">
        {#each workParatexts as paratext (paratext.id)}
            <ParatextCard paratext={paratext}/>
        {/each}
        {#if workParatexts.length == 0}
            <h2 class="text-center col-span-3">Žádné paratexty</h2>
        {/if}
    </div>
    <h1>Verze</h1>
    <Accordion>
        {#each versionParatexts as version (version[0])}
            <div class="bg-surface-300 card">
                <!-- TODO: FIX VALUE -->
                <Accordion.Item value={"a"}>
                    <Accordion.ItemTrigger>
                        {data.versions.find(v => v.id == version[0])?.title}
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <a class="btn preset-filled-primary" href={`/work/${$page.params.work}/version/${version[0]}/paratext`}>Zobrazit paratexty herních objektů</a>
                        <div class="grid grid-cols-2 2xl:grid-cols-3 gap-2">
                            {#each version[1] ?? [] as paratext (paratext.id)}
                                <ParatextCard paratext={paratext}/>
                            {/each}
                        </div>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </div>
        {/each}
        {#if versionParatexts.length == 0}
            <h2 class="text-center col-span-3">Žádné paratexty</h2>
        {/if}
    </Accordion>
</HeaderContainer>
