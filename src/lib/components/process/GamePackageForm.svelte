<script>
    import GamePackageDataEntry from "./GamePackageDataEntry.svelte"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    export let isNew = false;

    /** @type {import("$lib/schemas/gamePackage").GamePackage} */
    export let data = {
        id: "",
        versionId: "",
        emulatorId: "",
        conversionDate: "",
        includedArtefactIds: []
    }
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <span>Strukturovaný popis</span>
    <GamePackageDataEntry data={data} />
    <button on:click={dispatchSave} type="button" class="btn float-right variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
