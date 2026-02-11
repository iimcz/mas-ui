<script>
    import GamePackageDataEntry from "./GamePackageDataEntry.svelte"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }



    /**
     * @typedef {Object} Props
     * @property {boolean} [isNew]
     * @property {import("$lib/schemas/gamePackage").GamePackage} [data]
     */

    /** @type {Props} */
    let { isNew = false, data = {
        id: "",
        name: "",
        versionId: "",
        emulatorId: "",
        conversionDate: "",
        includedArtefactIds: []
    } } = $props();
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <GamePackageDataEntry data={data} />
    <button onclick={dispatchSave} type="button" class="btn float-right preset-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
