<script>
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import WorkCompare from "./workCompare.svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import WorkDataEntry from "./workDataEntry.svelte";
    import ButtonTextArea from "$lib/components/ButtonTextArea.svelte";
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    const modalStore = getModalStore();

    /**
     * @type {import('@skeletonlabs/skeleton').ModalComponent}
     */
    const modalComponent = { ref: WorkCompare };

    function openModal() {
        /**
         * @type {import('@skeletonlabs/skeleton').ModalSettings}
         */
        const modal = {
            type: "component",
            component: modalComponent,
        };

        modalStore.trigger(modal);
    }

    export let isNew = false;
    let tabSet = 0;

    /** @type {import("$lib/schemas/work").Work} */
    export let data = {
        id: "",
        alternativeTitle: "",
        classificationLocation: [],
        classificationTime: [],
        description: "",
        genre: [],
        subheading: "",
        title: "",
        yearOfPublication: ""
    }
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <TabGroup>
        <Tab bind:group={tabSet} name="tab1" value={0}>
            <span>Strukturovaný popis</span>
        </Tab>
        <!--
        <Tab bind:group={tabSet} name="tab2" value={1}>Volný text (AI)</Tab>
        --->
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
                <WorkDataEntry data={data} />
                <button on:click={dispatchSave} type="button" class="btn variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
                <!--
            {:else if tabSet === 1}
                <ButtonTextArea on:click={openModal} placeholder="Vložený text bude automaticky zpracován pomocí AI...">
                    <Fa icon={faSearch} />
                    <span>Vyhledat v textu</span>
                </ButtonTextArea>
            --->
            {/if}
        </svelte:fragment>
    </TabGroup>
</div>
