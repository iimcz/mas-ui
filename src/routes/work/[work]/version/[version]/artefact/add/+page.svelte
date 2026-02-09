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
    import { goto } from "$app/navigation";
    $currentSidebar = versionLinks;
    $currentRoute = "addArtefact";

    /**
     * @param {string} toolId
     */
    async function startProcess(toolId) {
        goto(`add/guide/${toolId}`);
    }

    
    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Vyberte typ média</h1>
        <ProgressStepBar/>
        <div class="text-center grid grid-cols-2 2xl:grid-cols-3 gap-2">
            {#each data.tools as tool}
                <MediaCard
                    isAvailable={tool.isAvailable}
                    title={$_(`tool.${tool.slug}.name`)}
                    image={$_(`tool.${tool.slug}.image`)}
                    description={$_(`tool.${tool.slug}.description`)}
                    tags={[`v${tool.version}`, $_(`media_type.${tool.physicalMediaType}`)]}
                    on:click={() => startProcess(tool.id)}
                />
            {/each}
            <UploadCard />
        </div>
    </div>
</div>
