<script>
    import StringListInput from "$lib/components/StringListInput.svelte";

    /** @type {import("$lib/schemas/workVersion").WorkVersion} */
    export let data;
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název verze</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.label} />
    </div>
    <p>Podnázev</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.subtitle} />
    </div>
    <p>Popis</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.description} />
    </div>
    <p>Kurátorský popis</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.curatorialDescription} />
    </div>
    <p>Ochrana proti kopírování</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.copyProtection} />
    </div>
    <p>Systém</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.system} />
    </div>
    <p>Importováno</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.importedAt} />
    </div>
</form>
