<script>
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import WorkCompare from "./workCompare.svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import WorkDataEntry from "./workDataEntry.svelte";
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
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <TabGroup>
        <Tab bind:group={tabSet} name="tab1" value={0}>
            <span>Strukturovaný popis</span>
        </Tab>
        <Tab bind:group={tabSet} name="tab2" value={1}>Volný text (AI)</Tab>
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
                <WorkDataEntry />
                <a href="/work/[id]" type="button" class="btn variant-filled">{isNew ? "Vytvořit" : "Upravit"}</a>
            {:else if tabSet === 1}
                <textarea class="textarea resize-none" rows="8" placeholder="Vložený text bude automaticky přidán do AI databáze..." />
                <button on:click={openModal} type="button" class="btn variant-filled">Odeslat</button>
            {/if}
        </svelte:fragment>
    </TabGroup>
</div>
