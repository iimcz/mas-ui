<script lang="ts">
    import type { GamePackage } from "$lib/schemas/gamePackage";
    import Fa from "svelte-fa";
    import GamePackageDataEntry from "./GamePackageDataEntry.svelte"
    import { faSave } from "@fortawesome/free-solid-svg-icons";

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
    <button onclick={() => onsave(data)} type="button" class="btn float-right preset-filled">
        <Fa icon={faSave}/>
        {isNew ? "Vytvořit" : "Uložit změny"}
    </button>
</div>
