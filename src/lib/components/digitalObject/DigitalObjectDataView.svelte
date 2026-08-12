<script lang="ts">
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import type { DigitalObject } from "$lib/schemas/digitalObject";
    import Blockquote from "../Blockquote.svelte";

    let { data }: { data: DigitalObject } = $props();

    const parsedInfo = JSON.parse(data.mediaInfoReport);
    const formattedInfo = JSON.stringify(parsedInfo, null, 2);
    const downloadUrl = `${API_URL}/api/v1/digitalobjects/${data.id}/download`;
</script>

<div class="form m-2 flex flex-col space-y-2 card preset-outlined-surface-300-700 p-4">
    <div>ID</div>
    <Blockquote>{data.id}</Blockquote>

    <div>Kurátorský popis</div>
    <Blockquote>{data.label}</Blockquote>

    <div>Verze</div>
    <Blockquote>{data.version}</Blockquote>

    <div>Název souboru</div>
    <Blockquote>{data.fileName}</Blockquote>

    <div>URL repozitáře</div>
    <Blockquote>{data.repoUrl}</Blockquote>

    <div>Typ digitálního objektu</div>
    <Blockquote>{data.digitalObjectType}</Blockquote>

    <div>Formát</div>
    <Blockquote>{data.format}</Blockquote>

    <div>Velikost souboru</div>
    <Blockquote>{data.fileSize}</Blockquote>

    <div>MediaInfo report</div>
    <Blockquote><pre class="max-w-125 overflow-x-auto">{formattedInfo}</pre></Blockquote>

    <div>Interní poznámka</div>
    <Blockquote>{data.internalNote}</Blockquote>

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

    <a
        class="btn preset-outlined-primary-500"
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer">Stáhnout</a
    >
</div>
