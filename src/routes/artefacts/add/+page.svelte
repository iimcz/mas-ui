<script>
    import MediaCard from "../../../components/mediaCard.svelte";
    import img from '$lib/floppy.jpg';
    import UploadCard from "../../../components/uploadCard.svelte";
    import ProgressStepBar from "../../../components/progressStepBar.svelte";

    import { currentStep, unlockedStep, steps, artefactSteps } from "$lib/steps";
    import { onMount } from "svelte";
    onMount(() => {
        $steps = artefactSteps
        $currentStep = 0;
        $unlockedStep = 0;
    })
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Vyberte typ média</h1>
        <ProgressStepBar/>
        <div class="text-center grid grid-cols-3 gap-2">
            <MediaCard title="Disketa 3.5" image={img} description="Popis média" />
            <MediaCard title="Disketa 3.5" image={img} description="Popis média" />
            <MediaCard title="Disketa 3.5" image={img} description="Popis média" />
            <MediaCard title="Disketa 3.5" image={img} description="Popis média" />
            <MediaCard title="Disketa 3.5" image={img} description="Popis média" />
            <UploadCard />
        </div>
    </div>
</div>

<style lang="postcss">
</style>
