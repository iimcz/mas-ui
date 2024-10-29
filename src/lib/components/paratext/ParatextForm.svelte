<script>
    import ParatextDataEntry from "./ParatextDataEntry.svelte"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    export let isNew = false;

    /** @type {import("$lib/schemas/paratext").Paratext} */
    export let data = {
        id: "",
        workId: "",
        versionId: null,
        packageId: null,
        name: "",
        description: "",
        source: "",
        sourceUrl: "",
        downloadable: false,
        thumbnail: ""

    }
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <ParatextDataEntry data={data} />
    <button on:click={dispatchSave} type="button" class="btn float-right variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
