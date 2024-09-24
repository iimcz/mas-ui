<script>
    import EmulatorCard from "$lib/components/emulatorCard.svelte";
    import img from '$lib/floppy.jpg';
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
	import { _ } from 'svelte-i18n'

    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
    import { goto } from '$app/navigation';

    let searchText = ""

    onMount(() => {
        $steps = configSteps
        $currentStep = 0;
        $unlockedStep = 0;
    })

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Identifikace platformy</h1>
        <ProgressStepBar/>
        <h2 class="text-xl mt-4">Doporučené</h2>
        <div class="text-center grid grid-cols-3 gap-2">
            <EmulatorCard on:select={(e) => goto(`emulator`, { replaceState: false }) } title="Atari 800" image={img} description="Krátký popis" />
            <EmulatorCard on:select={(e) => goto(`emulator`, { replaceState: false }) } title="Atari 400" image={img} description="Krátký popis" />
        </div>
        <h2 class="text-xl mt-4">Seznam platforem</h2>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">
                <Fa icon={faMagnifyingGlass} />
            </div>

            <input bind:value={searchText} title="Vyhledat dle názvu" type="search" placeholder="Název platformy" />
            <button class="variant-filled-secondary">Vyhledat</button>
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
                    {#each data.platforms as platform}
                        <tr>
                            <td>{platform.name}</td>
                            <td>{platform.physicalMediaTypes.map(m => $_(`media_type.${m}`)).join(", ")}</td>
                            <td><a href="{platform.name}" class="btn variant-filled">Vybrat</a></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
