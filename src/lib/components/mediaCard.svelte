<script>
    export let isAvailable = true;

    export let image = "";
    export let title = "";
    export let description = "";
    /** @type {string[]} */
    export let tags = [];
</script>

<button on:click class="card p-4 flex" class:disabled={!isAvailable} class:card-hover={isAvailable}>
    {#if image != ""}
        <img width="130" height="130" src={image} alt="Tool logo" class="mr-4 object-contain"/>
    {/if}

    <div class="text-left">
        <div class="text-lg font-bold">{title}</div>
        {#each tags as tag}
            <span class="badge variant-filled">{tag}</span>
        {/each}
        <div>
            <slot></slot>
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
