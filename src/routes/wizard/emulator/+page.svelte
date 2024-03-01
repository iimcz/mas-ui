<script>
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { currentStep, unlockedStep } from "$lib/steps";
    import img from '$lib/mesen.png';

    import { onMount } from "svelte";
    import MediaCard from "$lib/components/mediaCard.svelte";

    let desc = "Mesen is a multi-system emulator for Windows and Linux. It supports NES, SNES, Game Boy (Color) and PC Engine games.";
    let target = "/wizard/configuration"

    onMount(() => {
        $unlockedStep = 1;
        $currentStep = 1;
    })
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">Výběr emulátoru</h1>
        <ProgressStepBar/>
        <div class="text-center grid grid-cols-3 gap-2">
            <MediaCard title="Mesen2" image={img} target={target} description={desc} />
            <MediaCard title="Mesen2" image={img} target={target} description={desc} />
            <MediaCard title="Mesen2" image={img} target={target} description={desc} />
            <MediaCard title="Mesen2" image={img} target={target} description={desc} />
            <MediaCard title="Mesen2" image={img} target={target} description={desc} />
        </div>
    </div>
</div>
