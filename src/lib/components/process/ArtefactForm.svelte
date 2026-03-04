<script>
    import { ArtefactTypeEnum, PhysicalMediaStateEnum, PhysicalMediaTypeEnum } from "$lib/schemas/artefact";
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
        fileName: "",
        fileSize: 0,
        digitalObjectType: "",
        format: "",
        internalNote: "",
        paratextIds: [],
        quality: "",
        versionIds: [],
        websiteUrl: "",
        physicalMediaState: PhysicalMediaStateEnum.Good,
        physicalMediaType: PhysicalMediaTypeEnum.Unknow,
        type: ArtefactTypeEnum.Unknown
    }, onsave = null } = $props();
</script>

<div class="card flex flex-col">
    <ArtefactDataEntry data={data} />
    <button onclick={() => onsave(data)} type="button" class="btn float-right preset-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</div>
