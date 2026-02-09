<script>
    import { API_URL } from "$lib/config";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { currentStep, unlockedStep } from "$lib/steps";
    import { goto } from "$app/navigation";
    import { _ } from 'svelte-i18n'

    import { onMount } from "svelte";
    import MediaCard from "$lib/components/mediaCard.svelte";

    // TODO: FIX import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    // TODO: FIX const toastStore = getToastStore();
    onMount(() => {
        $unlockedStep = 1;
        $currentStep = 1;
    })

    /**
     * @param {string} emulatorId
     */
     async function startConversion(emulatorId) {
        const artefactIds = data.artefacts.filter((a, i) => selectedArtefacts[i] == true).map(a => a.id)
        if (artefactIds.length == 0) {
            toastStore.trigger({message: $_("must_select_artefact"), background: 'variant-filled-error'})
            return;
        }
        const res = await fetch(`${API_URL}/api/v1/conversion/start`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emulatorId, artefactIds })
        });

        /**
         * @type {import('$lib/schemas/conversionProcess').ConversionProcess}
         */
        const process = await res.json();
        goto(`process/${process.processId}`);
    }

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    /**
     * @type {boolean[]}
     */
    const selectedArtefacts = $state([])


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Výběr artefaktů a emulátoru</h1>
        <ProgressStepBar/>
        <div class="mb-4">
            <span class="text-lg font-bold">1. Vyberte artefakty ke konverzi</span>
            {#if data.artefacts.length == 0}
                <div class="alert variant-filled-error flex justify-around">
                    <h1>K tomuto dílu neexistují žádné artefakty. Před vytvořením herního objektu je nutné digitalizovat kopii média, nebo nahrát soubor.</h1>
                    <a href="../../artefact/add" class="btn variant-filled">Přidat artefakt</a>
                </div>
            {/if}
            <ol class="list px-4 space-y-2">
                {#each data.artefacts as artefact, index}
                    <li>
                        <input class="checkbox" type="checkbox" bind:checked={selectedArtefacts[index]} />
                        <span>{artefact.name}</span>
                    </li>
                {/each}
            </ol>
        </div>
        <span class="text-lg font-bold">2. Vyberte emulátor</span>
        <div class="text-center grid grid-cols-2 2xl:grid-cols-3 gap-2">
            {#each data.emulators as emulator}
                <MediaCard
                    on:click={async () => await startConversion(emulator.id)}
                    title={$_(`emulator.${emulator.name}.name`)}
                    description={$_(`emulator.${emulator.name}.description`)}
                    tags={[`v${emulator.version}`]} />
            {/each}
        </div>
    </div>
</div>
