<script>
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    import { currentStep, unlockedStep } from "$lib/steps";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { onMount } from "svelte";

    /**
     * @type {boolean[]}
     */
    let checkedSteps = []

    onMount(() => {
        $currentStep = 1;
        $unlockedStep = 1;
    })
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Postup pro digitalizaci</h1>
        <ProgressStepBar/>
        <div class="flex gap-2">
            <div class="card flex flex-1 p-2 flex-col">
                <span class="text-xl font-bold p-4">Kroky</span>
                <ol class="list px-4 space-y-2">
                    {#each Array(10).fill(1).map((x, y) => x + y) as v}
                        <li>
                            <input class="checkbox" type="checkbox" bind:checked={checkedSteps[v]} />
                            <span class:variant-soft-surface={!checkedSteps[v]} class:variant-soft-primary={checkedSteps[v]} class="badge-icon p-4">{v}</span>
                            <span>Vložte disketu do jednotky dle obrázku 1</span>
                        </li>
                    {/each}
                </ol>
                <a class="btn variant-filled mt-4" href="/work/[id]/version/[id]/artefact/add/log">Simulovat vložení disku</a>
            </div>
            <div class="flex flex-col flex-1 gap-2">
                <div class="card flex flex-col p-2">
                    <span class="text-xl font-bold p-4">Vizuální návod</span>
                    <div class="flex justify-center gap-4">
                        <img width="200" height="200" />
                        <img width="200" height="200" />
                    </div>
                </div>
                <div class="card flex p-2 flex-col">
                    <span class="text-xl font-bold p-4">FAQ / Řešení problémů</span>
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="summary">Disketová mechanika po vložení disku nereaguje</svelte:fragment>
                            <svelte:fragment slot="content">Pro vyřešení problému zkuste...</svelte:fragment>
                        </AccordionItem>
                        <AccordionItem>
                            <svelte:fragment slot="summary">Disk se nevejde do mechaniky</svelte:fragment>
                            <svelte:fragment slot="content">Pro vyřešení problému zkuste...</svelte:fragment>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
</div>
