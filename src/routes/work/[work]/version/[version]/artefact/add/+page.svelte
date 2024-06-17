<script>
    import MediaCard from "$lib/components/mediaCard.svelte";
    import UploadCard from "$lib/components/uploadCard.svelte";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
	import { _ } from 'svelte-i18n'

    import { currentStep, unlockedStep, steps, artefactSteps } from "$lib/steps";
    import { onMount } from "svelte";
    onMount(() => {
        $steps = artefactSteps
        $currentStep = 0;
        $unlockedStep = 0;
    })

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    $currentSidebar = versionLinks;
    $currentRoute = "addArtefact";

    /**
     * @param {string} toolId
     * @param {string} versionId
     */
    async function startProcess(toolId, versionId) {
        const res = await fetch(`${API_URL}/api/v1/versions`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toolId, versionId })
        });

        /**
         * @type {import("$lib/schemas/digitalizationProcess").DigitalizationProcess}
         */
        const process = await res.json();

        goto(`${process.processId}/digitalizationguide`);
    }

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Vyberte typ média</h1>
        <ProgressStepBar/>
        <div class="text-center grid grid-cols-3 gap-2">
            {#each data.tools as tool}
                <MediaCard
                    isAvailable={tool.isAvailable}
                    title={$_(`tool.${tool.name}.name`)}
                    image={$_(`tool.${tool.name}.image`)}
                    description={$_(`tool.${tool.name}.description`)}
                    version={tool.version}
                    mediaType={$_(tool.physicalMediaType)}
                    on:click={() => startProcess(tool.id, tool.version)}
                />
            {/each}
            <UploadCard />
        </div>
    </div>
</div>
