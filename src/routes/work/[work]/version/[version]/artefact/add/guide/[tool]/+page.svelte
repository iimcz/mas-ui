<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
	import { _ } from 'svelte-i18n'

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

    /** @param {string} data */
    async function input(data) {
        const res = await fetch(`${API_URL}/api/v1/digitalization/${processId}/input`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data })
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

    /** @type {import('./$types').PageData} */
	export let data;

    const guide = digitalizationGuides[data.slug]
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Postup pro digitalizaci</h1>
        <ProgressStepBar/>
        <Guide on:start={() => startProcess($page.params.tool, $page.params.version)} running={processId != null} steps={guide.steps} images={guide.images} faq={guide.faq} />
        {#if processId != null}
            <hr/>
            <h1 class="text-3xl mt-4">Status: {$_(`process_status.${process?.status}`)}</h1>
            {#if process?.status == "WaitingForInput"}
                <div class="card p-4 flex flex-col gap-4">
                    <span class="text-3xl mt-4">{$_(`status_detail.${process?.statusDetail}.description`)}</span>
                    <button class="btn variant-filled-primary" on:click={async() => input("")}>{$_(`status_detail.${process?.statusDetail}.action`)}</button>
                </div>
            {:else if process?.status == "Success"}
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
            <h1 class="text-3xl mt-4">Záznam z digitalizace</h1>
            <Log url={`${API_URL}/api/v1/digitalization/${processId}/log`}/>
        {/if}
    </div>
</div>

