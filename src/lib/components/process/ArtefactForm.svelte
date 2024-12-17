<script>
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import ArtefactDataEntry from "./ArtefactDataEntry.svelte"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    export let isNew = false;
    let tabSet = 0;

    /** @type {import("$lib/schemas/artefact").Artefact} */
    export let data = {
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
        -->
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
                <ArtefactDataEntry data={data} />
                <button on:click={dispatchSave} type="button" class="btn float-right variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
                <!--
            {:else if tabSet === 1}
                <ButtonTextArea on:click={() => {}} placeholder="Vložený text bude automaticky přidán do AI databáze....">
                    <Fa icon={faSearch} />
                    <span>Vyhledat v textu</span>
                </ButtonTextArea>
            -->
            {/if}
        </svelte:fragment>
    </TabGroup>
</div>
