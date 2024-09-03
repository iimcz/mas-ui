<script>
    /** @type {import("$lib/schemas/artefact").Artefact} */
    export let data;
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input type="text" bind:value={data.name} />
    </div>
    <p>Stav nosiče</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input type="text" bind:value={data.physicalMediaState} />
    </div>
    <p>Datum archivace</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input type="text" bind:value={data.archivationDate} />
    </div>
    <p>Archivoval</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input type="text" bind:value={data.archiver} />
    </div>
    <p>Poznámka</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input type="text" bind:value={data.note} />
    </div>
</form>
