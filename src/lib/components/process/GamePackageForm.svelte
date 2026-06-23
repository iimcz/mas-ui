<script lang="ts">
    import Fa from "svelte-fa";
    import GamePackageDataEntry from "./GamePackageDataEntry.svelte";
    import { faSave } from "@fortawesome/free-solid-svg-icons";
    import type { PlayableObject } from "$lib/schemas/playableObject";

    let {
        isNew = false,
        data = {
            id: "",
            label: "",
            versionId: "",
            creationDate: "",
            digitalObjectIds: [],
            emulatorSlug: "",
            note: ""
        },
        onsave
    }: {
        isNew?: boolean;
        data?: PlayableObject;
        onsave: (data: PlayableObject) => void;
    } = $props();
</script>

<div class="flex flex-col space-y-4 card p-2">
    <GamePackageDataEntry {data} />
    <button onclick={() => onsave(data)} type="button" class="float-right btn preset-filled">
        <Fa icon={faSave} />
        {isNew ? "Vytvořit" : "Uložit změny"}
    </button>
</div>
