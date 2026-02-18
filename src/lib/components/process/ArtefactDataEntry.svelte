<script lang="ts">
    import type { Artefact } from "$lib/schemas/artefact";
    let { data = $bindable() }: { data: Artefact } = $props();
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container">
    <div>Název</div>
    <input class="input" type="text" bind:value={data.name} />

    <div>Stav nosiče</div>
    <input class="input" type="text" bind:value={data.physicalMediaState} />

    {#if data.archivationDate}
    <div>Datum archivace</div>
    <input class="input" type="text" readonly disabled bind:value={data.archivationDate} />
    {/if}

    <div>Archivoval</div>
    <input class="input" type="text" bind:value={data.archiver} />

    <div>Poznámka</div>
    <input class="input" type="text" bind:value={data.note} />
</form>
