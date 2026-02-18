<script>
    import ArtefactDataEntry from "./ArtefactDataEntry.svelte"

    /**
     * @typedef {Object} Props
     * @property {boolean} [isNew]
     * @property {import("$lib/schemas/artefact").Artefact} [data]
     * @property {any} onsave
     */

    /** @type {Props} */
    let { isNew = false, data = {
        id: "",
        archivationDate: "",
        archiver: "",
        name: "",
        note: "",
        physicalMediaState: "",
        versionId: "",
        physicalMediaType: "",
        originalFileName: "",
        digitalizationToolId: "",
        type: ""
    }, onsave = null } = $props();
</script>

<div class="card flex flex-col">
    <ArtefactDataEntry data={data} />
    <button onclick={() => onsave(data)} type="button" class="btn float-right preset-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
