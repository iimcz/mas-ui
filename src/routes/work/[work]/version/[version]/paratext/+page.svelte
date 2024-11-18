<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ParatextCard from '$lib/components/paratext/ParatextCard.svelte';

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "paratextList";

    /** @type {import('./$types').PageData} */
	export let data;

    const versionParatexts = data.paratexts.filter(p => p.packageId == null)
    const gamePackageParatexts = Object.entries(Object.groupBy(data.paratexts.filter(p => p.packageId != null), (p) => p.packageId ?? ""))
</script>

<HeaderContainer title="Paratexty">
    <h1>Verze</h1>
    <div class="grid grid-cols-3 gap-2">
        {#each versionParatexts as paratext (paratext.id)}
            <ParatextCard paratext={paratext}/>
        {/each}
        {#if versionParatexts.length == 0}
            <h2 class="text-center">Žádné paratexty</h2>
        {/if}
    </div>
    <h1>Záznamy</h1>
    <Accordion>
        {#each gamePackageParatexts as version (version[0])}
            <div class="bg-surface-300 card">
                <AccordionItem>
                    <svelte:fragment slot="summary">{data.gamePackages.find(v => v.id == version[0])?.name}</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="grid grid-cols-3 gap-2">
                            {#each version[1] ?? [] as paratext (paratext.id)}
                                <ParatextCard paratext={paratext}/>
                            {/each}
                        </div>
                    </svelte:fragment>
                </AccordionItem>
            </div>
        {/each}
        {#if versionParatexts.length == 0}
            <h2 class="text-center">Žádné paratexty</h2>
        {/if}
    </Accordion>
</HeaderContainer>
