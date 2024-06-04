<script>
    import StringListInput from "$lib/components/StringListInput.svelte";

    /** @type {import("$lib/schemas/version").Version} */
    export let data;
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název verze</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.title} />
    </div>
    <p>Alternativní názvy</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.alternativeTitle} />
    </div>
    <p>Rok vydání</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.yearOfPublication} />
    </div>
    <p>Status</p>
    <StringListInput bind:values={data.status} />
    <p>Systémy</p>
    <StringListInput bind:values={data.system} />
    <p>Systémové požadavky</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.systemRequirements} />
    </div>
    <p>Poznámka</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.note} />
    </div>
</form>
