<script>
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
    import WorkCompare from "./workCompare.svelte";
    //import { getModalStore } from "@skeletonlabs/skeleton-svelte";
    import WorkDataEntry from "./workDataEntry.svelte";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    // TODO: FIX
    //const modalStore = getModalStore();

    const modalComponent = { ref: WorkCompare };

    function openModal() {

        const modal = {
            type: "component",
            component: modalComponent,
        };

        //modalStore.trigger(modal);
    }

    let tabSet = $state(0);


    /**
     * @typedef {Object} Props
     * @property {boolean} [isNew]
     * @property {import("$lib/schemas/work").Work} [data]
     */

    /** @type {Props} */
    let { isNew = false, data = {
        id: "",
        alternativeTitle: "",
        classificationLocation: [],
        classificationTime: [],
        description: "",
        genre: [],
        subheading: "",
        title: "",
        yearOfPublication: ""
    } } = $props();
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <Tabs>
        <Tabs.List>
            <Tabs.Trigger value="tab1">Strukturovaný popis</Tabs.Trigger>
        </Tabs.List>

        <!--
        <Tab bind:group={tabSet} name="tab2" value={1}>Volný text (AI)</Tab>
        --->
        <!-- Tab Panels --->
        <Tabs.Content value="tab1">

                {#if tabSet === 0}
                    <WorkDataEntry data={data} />
                    <button onclick={dispatchSave} type="button" class="btn variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
                    <!--
                {:else if tabSet === 1}
                    <ButtonTextArea on:click={openModal} placeholder="Vložený text bude automaticky zpracován pomocí AI...">
                        <Fa icon={faSearch} />
                        <span>Vyhledat v textu</span>
                    </ButtonTextArea>
                --->
                {/if}

        </Tabs.Content>
    </Tabs>
</div>
