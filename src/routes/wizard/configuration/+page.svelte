<script>
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import { onMount } from "svelte";

    onMount(() => {
        $steps = configSteps
        $unlockedStep = 3;
        $currentStep = 3;
    })
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Konfigurace emulátoru</h1>
        <ProgressStepBar/>
    </div>
</div>
