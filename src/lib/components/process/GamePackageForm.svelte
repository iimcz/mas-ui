<script lang="ts">
    import type { GamePackage } from "$lib/schemas/gamePackage";
    import Fa from "svelte-fa";
    import GamePackageDataEntry from "./GamePackageDataEntry.svelte";
    import { faSave } from "@fortawesome/free-solid-svg-icons";

    let {
        isNew = false,
        data = {
            id: "",
            name: "",
            versionId: "",
            emulatorId: "",
            conversionDate: "",
            includedDigitalObjectIds: []
        },
        onsave
    }: {
        isNew?: boolean;
        data?: GamePackage;
        onsave: (data: GamePackage) => void;
    } = $props();
</script>

<div class="flex flex-col card p-2">
    <span class="p-4 text-xl font-bold">Popis</span>
    <GamePackageDataEntry {data} />
    <button onclick={() => onsave(data)} type="button" class="float-right btn preset-filled">
        <Fa icon={faSave} />
        {isNew ? "Vytvořit" : "Uložit změny"}
    </button>
</div>
