<script>
    import EmulatorCard from "$lib/components/emulatorCard.svelte";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
	import { _ } from 'svelte-i18n'

    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

    let searchText = ""

    onMount(() => {
        $steps = configSteps
        $currentStep = 0;
        $unlockedStep = 0;
    })

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { platform } from "@floating-ui/dom";
    import { goto } from "$app/navigation";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    /** @type {import('./$types').PageData} */
	export let data;

    let filteredPlatforms = data.platforms
    $: filteredPlatforms = data.platforms.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()))


    const artefactTypes = data.artefacts
        .map(a => a.physicalMediaType.toLowerCase())
        .filter((value, index, array) => array.indexOf(value) === index); // Unique

    let matchingMediaPlatforms = data.platforms.filter(p => p.physicalMediaTypes.some(t => artefactTypes.indexOf(t.toLowerCase()) != 0))
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Identifikace platformy</h1>
        <ProgressStepBar/>
        <h2 class="text-xl mt-4">Doporučené (dle typu média)</h2>
        <div class="text-center grid grid-cols-3 gap-2">
            {#each matchingMediaPlatforms as platform}
                <EmulatorCard on:select={() => goto(platform.name)} title={platform.name} description={platform.physicalMediaTypes.map(m => $_(`media_type.${m}`)).join(", ")}/>
            {/each}
        </div>
        <h2 class="text-xl mt-4">Seznam platforem</h2>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">
                <Fa icon={faMagnifyingGlass} />
            </div>

            <input bind:value={searchText} title="Vyhledat dle názvu" type="search" placeholder="Název platformy" />
        </div>
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="w-2/4">Název</th>
                        <th class="w-1/4">Typ média</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredPlatforms as platform}
                        <tr>
                            <td>{platform.name}</td>
                            <td>{platform.physicalMediaTypes.map(m => $_(`media_type.${m}`)).join(", ")}</td>
                            <td><a href="{platform.name}" class="btn variant-filled">Vybrat</a></td>
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
