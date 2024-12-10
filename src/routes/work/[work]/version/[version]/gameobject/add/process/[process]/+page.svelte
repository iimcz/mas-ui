<script>
    import { API_URL } from "$lib/config";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import GamePackageMetadata from "$lib/components/process/GamePackageMetadata.svelte";
    import Log from "$lib/components/process/Log.svelte";
	import { _ } from 'svelte-i18n'

    import Fa from "svelte-fa";
    import { faRepeat } from "@fortawesome/free-solid-svg-icons";

    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import { onMount } from "svelte";

    let interval = 0;
    onMount(() => {
        $steps = configSteps
        $currentStep = 2;
        $unlockedStep = 2;

        interval = setInterval(async () => {
            const res = await fetch(`${API_URL}/api/v1/conversion/${data.processId}/status`);
            data = await res.json();
        }, 1000)

        return () => clearInterval(interval);
    })

    async function restart() {
        const res = await fetch(`${API_URL}/api/v1/conversion/${data.processId}/restart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "true" // TODO: What?
        });

        data = await res.json();
    }

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Konverze</h1>
        <ProgressStepBar/>
        {#if data.status == "Success"}
            <hr/>
            <h1 class="text-3xl mt-4">Strukturovaný popis</h1>
            <GamePackageMetadata processId={data.processId} />
        {:else if data.status == "Failed"}
            <hr/>
            <button on:click={restart} class="btn variant-filled-error">
                <Fa icon={faRepeat}/>
                <span>Zkusit znovu</span>
            </button>
        {/if}
        <h1 class="text-3xl mt-4">Záznam z konverze</h1>
        <Log url={`${API_URL}/api/v1/conversion/${data.processId}/log`}/>
    </div>
</div>
