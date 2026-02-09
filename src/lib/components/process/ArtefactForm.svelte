<script>
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
    import ArtefactDataEntry from "./ArtefactDataEntry.svelte"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    let tabSet = $state(0);


    /**
     * @typedef {Object} Props
     * @property {boolean} [isNew]
     * @property {import("$lib/schemas/artefact").Artefact} [data]
     */

    /** @type {Props} */
    let { isNew = false, data = {
        id: "",
        archivationDate: "",
        archiver: "",
        name: "",
        note: "",
        physicalMediaState: "",
        versionId: "",
        physicalMediaType: "",
        originalFileName: "",
        digitalizationToolId: "",
        type: ""
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
        -->
        <!-- Tab Panels --->
         <Tabs.Content value="tab1">
            {#if tabSet === 0}
                <ArtefactDataEntry data={data} />
                <button onclick={dispatchSave} type="button" class="btn float-right variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
                <!--
            {:else if tabSet === 1}
                <ButtonTextArea on:click={() => {}} placeholder="Vložený text bude automaticky přidán do AI databáze....">
                    <Fa icon={faSearch} />
                    <span>Vyhledat v textu</span>
                </ButtonTextArea>
            -->
            {/if}
        </Tabs.Content>
    </Tabs>
</div>
