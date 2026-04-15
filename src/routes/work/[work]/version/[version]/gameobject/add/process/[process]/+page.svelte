<script>
    import { PUBLIC_API_URL as API_URL } from '$env/static/public';
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import GamePackageMetadata from "$lib/components/process/GamePackageMetadata.svelte";
    import Log from "$lib/components/process/Log.svelte";
	import { _ } from 'svelte-i18n'
    import Fa from "svelte-fa";
    import { faRepeat } from "@fortawesome/free-solid-svg-icons";

    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import { onMount } from "svelte";

    let interval = 0;
    let isFinished = false;
    let finalizing = $state(false)

    onMount(() => {
        $steps = configSteps
        $currentStep = 2;
        $unlockedStep = 2;

        interval = setInterval(async () => {
            const res = await fetch(`${API_URL}/api/v1/conversion/${data.processId}/status`);
            data = await res.json();

            // Status is no longer valid, just waiting for finalize
            if (!res.ok) {
                clearInterval(interval);
                return;
            }

            if (isFinished) return;

            if (data.status == "Success") {
                isFinished = true;
                toaster.success({title: $_("conversion_success")});
                info.scrollIntoView({ behavior: 'smooth' });
            }

            if (data.status == "Failed") {
                isFinished = true;
                toaster.error({title: $_("conversion_failed")});
            }
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
    import { toaster } from "$lib/toaster";
    import { Progress } from '@skeletonlabs/skeleton-svelte';
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data = $bindable() } = $props();
    let info = $state();
</script>

{#if finalizing}
<div class="absolute inset-0 flex bg-surface-50-950/50 items-center justify-center z-[999]">
    <div class="flex justify-center items-center gap-4 card p-4 bg-surface-100-900">
        <Progress class="items-center w-fit" value={null}>
            <Progress.Circle>
                <Progress.CircleTrack />
                <Progress.CircleRange />
            </Progress.Circle>
            <Progress.ValueText />
        </Progress>
        <span class="text-xl font-semibold">Probíhá finalizace herního objektu</span>
    </div>
</div>
{/if}

<div class="container h-full flex">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Konverze</h1>
        <ProgressStepBar/>
        <div>
            <h1 class="text-3xl">1. Záznam z konverze</h1>
            <Log url={`${API_URL}/api/v1/conversion/${data.processId}/log`}/>
        </div>
        {#if data.status == "Success"}
            <hr/>
            <div>
                <h1 bind:this={info} class="text-3xl">2. Strukturovaný popis herního objektu</h1>
                <GamePackageMetadata onCreateNew={() => finalizing = true} processId={data.processId} />
            </div>
        {:else if data.status == "Failed"}
            <hr/>
            <button onclick={restart} class="btn preset-filled-error">
                <Fa icon={faRepeat}/>
                <span>Zkusit znovu</span>
            </button>
        {/if}
    </div>
</div>
