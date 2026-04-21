<script>
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import Fa from "svelte-fa";
    import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

    const dispatch = createEventDispatcher();

    /**
     * @typedef {Object} Props
     * @property {string[]} [steps]
     * @property {boolean} [running]
     * @property {string[]} [images]
     * @property {{title: string, content: string}[]} [faq]
     */

    /** @type {Props} */
    let { steps = [], running = false, images = [], faq = [] } = $props();

    /**
     * @type {boolean[]}
     */
    let checkedSteps = $state([]);
</script>

<div class="flex flex-col">
    <div class="flex gap-2">
        <div class="flex flex-1 flex-col card p-2">
            <span class="p-4 text-xl font-bold">Kroky</span>
            <ol class="list space-y-2 px-4">
                {#each steps as step, index}
                    <li class="flex items-center gap-2">
                        <input
                            class="checkbox"
                            type="checkbox"
                            bind:checked={checkedSteps[index]}
                        />
                        <span
                            class:bg-primary-50-950={!checkedSteps[index]}
                            class:preset-filled-primary-950-50={checkedSteps[index]}
                            class="badge-icon p-4">{index + 1}</span
                        >
                        <span>{$_(`digitalization_guides.${step}`)}</span>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="flex flex-1 flex-col gap-2">
            <div class="flex flex-col card p-2">
                <span class="p-4 text-xl font-bold">Vizuální návod</span>
                <div class="flex justify-center gap-4">
                    {#each images as image}
                        <img
                            alt=""
                            width="200"
                            height="200"
                            src={$_(`digitalization_guides.${image}`)}
                        />
                    {/each}
                </div>
            </div>
            <div class="flex flex-col card p-2">
                <span class="p-4 text-xl font-bold">FAQ / Řešení problémů</span>
                <Accordion>
                    {#each faq as faqItem, i}
                        {#if i !== 0}
                            <hr class="hr" />
                        {/if}
                        <Accordion.Item value={faqItem.title}>
                            <Accordion.ItemTrigger
                                class="flex items-center justify-between gap-2 font-bold"
                            >
                                {$_(`digitalization_guides.${faqItem.title}`)}
                                <Accordion.ItemIndicator class="group">
                                    <Fa
                                        icon={faChevronDown}
                                        class="h-5 w-5 transition group-data-[state=open]:rotate-180"
                                    />
                                </Accordion.ItemIndicator>
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
        <button class="mt-4 btn preset-filled text-lg" onclick={() => dispatch("start")}
            >Spustit digitalizaci</button
        >
    {/if}
</div>
