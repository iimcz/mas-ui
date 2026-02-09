<script>
    
    /**
     * @typedef {Object} Props
     * @property {import("$lib/schemas/gamePackage").GamePackage} data
     */

    /** @type {Props} */
    let { data = $bindable() } = $props();
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název</p>
        <div class="input-group input-group-divider">
        <input type="text" bind:value={data.name} />
    </div>
</form>
