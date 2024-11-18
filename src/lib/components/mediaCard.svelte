<script>
    export let isAvailable = true;

    export let image = "";
    export let title = "";
    export let description = "";
    /** @type {string[]} */
    export let tags = [];
</script>

<div class="card p-4 relative" class:card-hover={isAvailable}>
    <div class="absolute right-0">
        <slot name="sideIcon"></slot>
    </div>

    <button class="flex" on:click class:disabled={!isAvailable}>
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
</div>

<style lang="postcss">
    .disabled {
        pointer-events: none;

        color: #333333;
        @apply bg-surface-300;
    }
</style>
