<script>
    import VersionDataEntry from "./versionDataEntry.svelte"

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function dispatchSave() {
        dispatch("save", data)
    }

    export let isNew = false;
    let tabSet = 0;

    /** @type {import("$lib/schemas/workVersion").WorkVersion} */
    export let data = {
        id: "",
        workId: "",
        label: "",
        subtitle: "",
        description: "",
        curatorialDescription: "",
        copyProtection: "",
        system: "",
        importedAt: ""
    }
</script>

<div class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <VersionDataEntry data={data} />
</div>
