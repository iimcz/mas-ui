<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import Fa from "svelte-fa";
    import { faRepeat } from "@fortawesome/free-solid-svg-icons";

    import ArtefactMetadata from "$lib/components/process/ArtefactMetadata.svelte";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import Guide from "$lib/components/process/Guide.svelte";
    import Log from "$lib/components/process/Log.svelte";

    import { API_URL } from "$lib/config";
    import { digitalizationGuides } from "$lib/digitalizationGuides";
    import { currentStep, unlockedStep, steps, artefactSteps } from "$lib/steps";

    let interval = 0;
    onMount(() => {
        $steps = artefactSteps
        $currentStep = 1;
        $unlockedStep = 1;
        return () => clearInterval(interval);
    })

    /**
     * @param {string} toolId
     * @param {string} versionId
     */
     async function startProcess(toolId, versionId) {
        const res = await fetch(`${API_URL}/api/v1/digitalization/start`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ toolId, versionId })
        });

        process = await res.json();
        processId = process?.processId ?? null;

        interval = setInterval(async () => {
            const res = await fetch(`${API_URL}/api/v1/digitalization/${processId}/status`);
            process = await res.json();
        }, 1000)
    }

    async function restart() {
        const res = await fetch(`${API_URL}/api/v1/digitalization/${processId}/restart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "true" // TODO: What?
        });

        process = await res.json();
        processId = process?.processId ?? null;
    }

    /**
     * @type {import("$lib/schemas/digitalizationProcess").DigitalizationProcess?}
     */
    let process = null;

    /**
     * @type {string?}
     */
    let processId = null;
    const guide = digitalizationGuides[$page.params.tool]
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Postup pro digitalizaci</h1>
        <ProgressStepBar/>
        <Guide on:start={() => startProcess($page.params.tool, $page.params.version)} running={processId != null} steps={guide.steps} images={guide.images} faq={guide.faq} />
        {#if processId != null}
            <hr/>
            <h1 class="text-3xl mt-4">Záznam z digitalizace</h1>
            <Log url={`${API_URL}/api/v1/digitalization/${processId}/log`}/>
            {#if process?.status == "Success"}
                <hr/>
                <h1 class="text-3xl mt-4">Strukturovaný popis</h1>
                <ArtefactMetadata processId={processId} />
            {:else if process?.status == "Failed"}
                <hr/>
                <button on:click={restart} class="btn variant-filled-error">
                    <Fa icon={faRepeat}/>
                    <span>Zkusit znovu</span>
                </button>
            {/if}
        {/if}
    </div>
</div>

