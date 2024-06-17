<script>
    export let isAvailable = true;

    export let image = "";
    export let title = "";
    export let description = "";
    export let version = "";
    export let mediaType = "";
</script>

<button on:click class="card p-4 flex" class:disabled={!isAvailable} class:card-hover={isAvailable}>
    {#if image != ""}
        <img width="200" height="200" src={image} alt="Tool logo" class="mr-4 object-contain"/>
    {/if}

    <div class="text-left">
        <div class="text-lg font-bold">{title}</div>
        <span class="badge variant-filled">{mediaType}</span>
        <span class="badge variant-filled">v{version}</span>
        <div>
            {description}
        </div>
    </div>
</button>

<style lang="postcss">
    .disabled {
        pointer-events: none;

        color: #333333;
        @apply bg-surface-300;
    }
</style>
