<script>
    import { createEventDispatcher } from 'svelte'
	import { _ } from 'svelte-i18n'
    import { Accordion } from "@skeletonlabs/skeleton-svelte";

    const dispatch = createEventDispatcher()








    /**
     * @typedef {Object} Props
     * @property {string[]} [steps]
     * @property {boolean} [running]
     * @property {string[]} [images]
     * @property {{title: string, content: string}[]} [faq]
     */

    /** @type {Props} */
    let {
        steps = [],
        running = false,
        images = [],
        faq = []
    } = $props();

    /**
     * @type {boolean[]}
     */
     let checkedSteps = $state([])
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
                        <Accordion.Item value={faqItem.title}>
                            <Accordion.ItemTrigger>
                                {$_(`digitalization_guides.${faqItem.title}`)}
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                {$_(`digitalization_guides.${faqItem.content}`)}
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    {/each}
                </Accordion>
            </div>
        </div>
    </div>
    {#if running == false}
        <button class="btn variant-filled mt-4" onclick={() => dispatch("start")}>Spustit digitalizaci</button>
    {/if}
</div>
