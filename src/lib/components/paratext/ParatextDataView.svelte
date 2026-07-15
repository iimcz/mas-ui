<script lang="ts">
    import type { Paratext } from "$lib/schemas/paratext";
    import Blockquote from "../Blockquote.svelte";

    let { data = $bindable() }: { data: Partial<Paratext> } = $props();
</script>

<div class="form m-2 flex flex-col space-y-2 card preset-outlined-surface-300-700 p-4">
    <div>Kurátorský popis</div>
    <Blockquote>{data.label}</Blockquote>

    <div>Jazyk</div>
    <Blockquote>{data.language}</Blockquote>

    <div>Datum</div>
    <Blockquote>{data.date}</Blockquote>

    <div>Interní poznámka</div>
    <Blockquote>{data.internalNote}</Blockquote>

    <div>Vyplněno</div>
    <Blockquote>{data.filledOutBy}</Blockquote>

    <div>URL Stránky</div>
    <Blockquote>{data.websiteUrl}</Blockquote>

    <div>Velikost</div>
    <Blockquote>{data.emissionSize}</Blockquote>

    <div>Identifikační číslo</div>
    <Blockquote>{data.identificationNumber}</Blockquote>

    <div>Typ paratextu</div>
    <Blockquote>{data.paratextType}</Blockquote>

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
