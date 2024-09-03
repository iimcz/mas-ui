<script>
    import { createEventDispatcher } from 'svelte'
	import { _ } from 'svelte-i18n'
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    const dispatch = createEventDispatcher()

    /**
     * @type {string[]}
     */
    export let steps = [];

    /**
     * @type {boolean}
     */
     export let running = false;

    /**
     * @type {string[]}
     */
     export let images = [];

    /**
     * @type {{title: string, content: string}[]}
     */
     export let faq = [];

    /**
     * @type {boolean[]}
     */
     let checkedSteps = []
</script>

<div class="flex flex-col">
    <div class="flex gap-2">
        <div class="card flex flex-1 p-2 flex-col">
            <span class="text-xl font-bold p-4">Kroky</span>
            <ol class="list px-4 space-y-2">
                {#each steps as step, index}
                    <li>
                        <input class="checkbox" type="checkbox" bind:checked={checkedSteps[index]} />
                        <span class:variant-soft-surface={!checkedSteps[index]} class:variant-soft-primary={checkedSteps[index]} class="badge-icon p-4">{index + 1}</span>
                        <span>{$_(`digitalization_guides.${step}`)}</span>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="flex flex-col flex-1 gap-2">
            <div class="card flex flex-col p-2">
                <span class="text-xl font-bold p-4">Vizuální návod</span>
                <div class="flex justify-center gap-4">
                    {#each images as image}
                        <img alt="" width="200" height="200" src={$_(`digitalization_guides.${image}`)} />
                    {/each}
                </div>
            </div>
            <div class="card flex p-2 flex-col">
                <span class="text-xl font-bold p-4">FAQ / Řešení problémů</span>
                <Accordion>
                    {#each faq as faqItem}
                        <AccordionItem>
                            <svelte:fragment slot="summary">{$_(`digitalization_guides.${faqItem.title}`)}</svelte:fragment>
                            <svelte:fragment slot="content">{$_(`digitalization_guides.${faqItem.content}`)}</svelte:fragment>
                        </AccordionItem>
                    {/each}
                </Accordion>
            </div>
        </div>
    </div>
    {#if running == false}
        <button class="btn variant-filled mt-4" on:click={() => dispatch("start")}>Spustit digitalizaci</button>
    {/if}
</div>
