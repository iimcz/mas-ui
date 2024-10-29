<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ParatextCard from '$lib/components/paratext/ParatextCard.svelte';

    import { currentSidebar, currentRoute,  gameObjectLinks } from "$lib/components/sidebar/links";
    $currentSidebar = gameObjectLinks;
    $currentRoute = "paratextList";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<HeaderContainer title="Záznamy">
    <div class="grid grid-cols-3 gap-2">
        {#each data.paratexts as paratext (paratext.id)}
            <ParatextCard paratext={paratext}/>
        {/each}
        {#if data.paratexts.length == 0}
            <h2 class="text-center">Žádné záznamy</h2>
        {/if}
    </div>
</HeaderContainer>
