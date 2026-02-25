<script lang="ts">
    import type { GamePackage } from "$lib/schemas/gamePackage";
    import GamePackageDataEntry from "./GamePackageDataEntry.svelte"

    let { isNew = false, data = {
        id: "",
        name: "",
        versionId: "",
        emulatorId: "",
        conversionDate: "",
        includedDigitalObjectIds: []
    }, onsave } : {
        isNew?: boolean
        data?: GamePackage,
        onsave: (data: GamePackage) => void
    } = $props();
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <GamePackageDataEntry data={data} />
    <button onclick={() => onsave(data)} type="button" class="btn float-right preset-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
