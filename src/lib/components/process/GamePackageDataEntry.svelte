<script>
    /** @type {import("$lib/schemas/gamePackage").GamePackage} */
    export let data;
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <input type="text" bind:value={data.id} />
    </div>
</form>
