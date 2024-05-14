<script>
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import ButtonTextArea from "$lib/components/ButtonTextArea.svelte";
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import VersionDataEntry from "./versionDataEntry.svelte"

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
                <VersionDataEntry />
                <a href="[workId]" type="button" class="btn variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</a>
            {:else if tabSet === 1}
                <ButtonTextArea on:click={() => {}} placeholder="Vložený text bude automaticky přidán do AI databáze....">
                    <Fa icon={faSearch} />
                    <span>Vyhledat v textu</span>
                </ButtonTextArea>
            {/if}
        </svelte:fragment>
    </TabGroup>
</div>
