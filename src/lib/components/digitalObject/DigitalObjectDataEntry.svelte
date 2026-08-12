<script lang="ts">
    import type { DigitalObject } from "$lib/schemas/digitalObject";
    import Blockquote from "../Blockquote.svelte";

    let { data = $bindable() }: { data: Partial<DigitalObject> } = $props();
</script>

<div class="form m-2 flex flex-col space-y-2 card preset-outlined-surface-300-700 p-4">
    <input name="id" type="hidden" bind:value={data.id} />

    <div>Kurátorský popis</div>
    <div class="input-group-divider input-group">
        <input class="input" name="label" type="text" bind:value={data.label} />
    </div>

    <div>Verze</div>
    <div class="input-group-divider input-group">
        <input class="input" name="version" type="text" bind:value={data.version} />
    </div>

    <div>Název souboru</div>
    <div class="input-group-divider input-group">
        <input class="input" name="fileName" type="text" bind:value={data.fileName} />
    </div>

    <div>URL repozitáře</div>
    <div class="input-group-divider input-group">
        <input class="input" name="repoUrl" type="text" bind:value={data.repoUrl} />
    </div>

    <div>Formát</div>
    <div class="input-group-divider input-group">
        <input class="input" name="format" type="text" bind:value={data.format} />
    </div>

    <div>Velikost souboru</div>
    <div class="input-group-divider input-group">
        <input class="input" name="fileSize" type="text" bind:value={data.fileSize} />
    </div>

    <div>MediaInfo report</div>
    <div class="input-group-divider input-group">
        <input class="input" name="mediaInfoReport" type="text" bind:value={data.mediaInfoReport} />
    </div>

    <div>Interní poznámka</div>
    <div class="input-group-divider input-group">
        <input class="input" name="internalNote" type="text" bind:value={data.internalNote} />
    </div>

    <div>Typ digitálního objektu</div>
    <Blockquote>{data.digitalObjectType}</Blockquote>

    <div>Importováno</div>
    <Blockquote
        >{data.importedAt == null ? "" : new Date(data.importedAt).toLocaleString()}</Blockquote
    >

    <div>Exportováno</div>
    <Blockquote
        >{data.exportedAt == null || data.exportedAt === "0001-01-01T00:00:00"
            ? ""
            : new Date(data.exportedAt).toLocaleString()}</Blockquote
    >
</div>
