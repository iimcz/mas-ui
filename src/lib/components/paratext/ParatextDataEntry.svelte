<script lang="ts">
    import type { Paratext } from "$lib/schemas/paratext";
    import Blockquote from "../Blockquote.svelte";

    let { data = $bindable() }: { data: Partial<Paratext> } = $props();
</script>

<div class="form m-2 flex flex-col space-y-2 card preset-outlined-surface-300-700 p-4">
    <input name="id" type="hidden" bind:value={data.id} />

    <div>Kurátorský popis</div>
    <div class="input-group-divider input-group">
        <input class="input" name="name" type="text" bind:value={data.label} />
    </div>

    <div>Jazyk</div>
    <div class="input-group-divider input-group">
        <input class="input" name="language" type="text" bind:value={data.language} />
    </div>

    <div>Datum</div>
    <div class="input-group-divider input-group">
        <input class="input" name="date" type="text" bind:value={data.date} />
    </div>

    <div>Interní poznámka</div>
    <div class="input-group-divider input-group">
        <input class="input" name="internalNote" type="text" bind:value={data.internalNote} />
    </div>

    <div>Vyplněno</div>
    <div class="input-group-divider input-group">
        <input class="input" name="filledOutBy" type="text" bind:value={data.filledOutBy} />
    </div>

    <div>URL Stránky</div>
    <div class="input-group-divider input-group">
        <input class="input" name="websiteUrl" type="text" bind:value={data.websiteUrl} />
    </div>

    <div>Velikost</div>
    <div class="input-group-divider input-group">
        <input class="input" name="emissionSize" type="text" bind:value={data.emissionSize} />
    </div>

    <div>Identifikační číslo</div>
    <div class="input-group-divider input-group">
        <input
            class="input"
            name="identificationNumber"
            type="text"
            bind:value={data.identificationNumber}
        />
    </div>

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
