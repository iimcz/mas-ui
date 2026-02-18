<script>
    import { run } from 'svelte/legacy';

    import EmulatorCard from "$lib/components/emulatorCard.svelte";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
	import { _ } from 'svelte-i18n'

    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

    let searchText = $state("")

    onMount(() => {
        $steps = configSteps
        $currentStep = 0;
        $unlockedStep = 0;
    })

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { goto } from "$app/navigation";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();

    let filteredPlatforms = $derived(data.platforms.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())))


    const artefactTypes = data.artefacts
        .map(a => a.physicalMediaType.toLowerCase())
        .filter((value, index, array) => array.indexOf(value) === index); // Unique

    let matchingMediaPlatforms = data.platforms.filter(p => p.physicalMediaTypes.some(t => artefactTypes.indexOf(t.toLowerCase()) != -1))
</script>

<div class="container h-full flex">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Identifikace platformy</h1>
        <ProgressStepBar/>
        {#if matchingMediaPlatforms.length != 0}
            <h2 class="text-xl mt-4">Doporučené (dle typu média)</h2>
            <div class="text-center grid grid-cols-3 gap-2">
                {#each matchingMediaPlatforms as platform}
                    <EmulatorCard on:select={() => goto(platform.name)} title={platform.name} description={platform.physicalMediaTypes.map(m => $_(`media_type.${m}`)).join(", ")}/>
                {/each}
            </div>
        {/if}
        <h2 class="text-xl mt-4">Seznam platforem</h2>
        <div class="input-group grid-cols-[auto_1fr_auto]">
            <div class="ig-cell preset-tonal">
                <Fa icon={faMagnifyingGlass} />
            </div>

            <input class="ig-input" bind:value={searchText} title="Vyhledat dle názvu" type="search" placeholder="Název platformy" />
        </div>
        <div class="table-wrap">
            <table class="table">
                <thead>
                    <tr>
                        <th class="w-1/2">Název</th>
                        <th class="w-1/2">Typ média</th>
                    </tr>
                </thead>
                <tbody class="[&>tr]:hover:preset-tonal-primary">
                    {#each filteredPlatforms as platform}
                        <tr class="cursor-pointer select-none" onclick={() => goto(platform.name)}>
                            <td class="underline">{platform.name}</td>
                            <td>{platform.physicalMediaTypes.map(m => $_(`media_type.${m}`)).join(", ")}</td>
                        </tr>
                    {/each}
                    {#if filteredPlatforms.length == 0}
                    <tr>
                        <td colspan="3">Zadanému dotazu neodpovídají žádné platformy</td>
                    </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>
