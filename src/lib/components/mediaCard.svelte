<script>
    /**
     * @typedef {Object} Props
     * @property {boolean} [isAvailable]
     * @property {string} [image]
     * @property {string} [title]
     * @property {string} [description]
     * @property {string[]} [tags]
     * @property {any} [onclick]
     * @property {import('svelte').Snippet} [sideIcon]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let {
        isAvailable = true,
        image = "",
        title = "",
        description = "",
        tags = [],
        sideIcon,
        onclick,
        children
    } = $props();
</script>

<div class="card preset-outlined-primary-300-700 p-4 hover:scale-105 relative" class:card-hover={isAvailable}>
    <div class="absolute right-0">
        {@render sideIcon?.()}
    </div>

    <button class="flex h-full" {onclick} class:disabled={!isAvailable}>
        {#if image != ""}
            <img width="130" height="130" src={image} alt="Tool logo" class="mr-4 object-fill rounded-lg"/>
        {/if}

        <div class="text-left space-y-1">
            <div class="text-lg font-bold">{title}</div>
            <div class="flex gap-1">
                {#each tags as tag}
                    <span class="badge preset-filled">{tag}</span>
                {/each}
            </div>
            <div>
                {@render children?.()}
                {description}
            </div>
        </div>
    </button>
</div>

<style>
    @reference "#layout.css";

    .disabled {
        pointer-events: none;

        color: #333333;
        @apply bg-surface-300;
    }
</style>
