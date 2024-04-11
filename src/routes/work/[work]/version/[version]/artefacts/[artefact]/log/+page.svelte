<script>
    import { onMount } from "svelte";
    import { ProgressBar } from '@skeletonlabs/skeleton';

    import Fa from "svelte-fa";
    import { faArrowRight, faDownload, faRepeat } from "@fortawesome/free-solid-svg-icons";

    let log = ""

    let failed = true
    let completed = true

    onMount(async () => {
        let res = await fetch("log.txt")
        log = await res.text()
    })

    import { currentStep, unlockedStep } from "$lib/steps";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";

    onMount(() => {
        $currentStep = 2;
        $unlockedStep = 2;
    })
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="flex w-5/6 space-y-10 flex-col m-4">
		<h1 class="text-3xl mt-4">Probíhá digitalizace</h1>
        <ProgressStepBar/>
        <textarea disabled bind:value={log} class="textarea resize-none cursor-override" rows="15" />
        <ProgressBar meter="bg-primary-500" track="bg-secondary-500" height="h-4" value={50} max={100} />
        <div>
            {#if failed}
                <button class="btn variant-filled-error">
                    <Fa icon={faRepeat}/>
                    <span>Zkusit znovu</span>
                </button>
            {/if}

            {#if completed}
                <a href="/artefacts/info" class="float-right ml-2 variant-filled-secondary btn">
                    <Fa icon={faArrowRight}/>
                    <span>Pokračovat</span>
                </a>
            {/if}

            {#if completed || failed}
                <button class="float-right variant-filled-primary btn">
                    <Fa icon={faDownload}/>
                    <span>Stáhnout log</span>
                </button>
            {/if}
        </div>
	</div>
</div>

<style>
    .cursor-override {
        cursor: text !important;
    }
</style>
