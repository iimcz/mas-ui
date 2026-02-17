<script>
    import WorkCompare from "./workCompare.svelte";
    import WorkDataEntry from "./workDataEntry.svelte";

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    export let isNew = false;
    let tabSet = 0;

    /** @type {import("$lib/schemas/work").Work} */
    export let data = {
        id: "",
        label: "",
        typeOfWork: "",
        internalNote: "",
        importedAt: ""
    }
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <WorkDataEntry data={data} />
    <button on:click={dispatchSave} type="button" class="btn variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
