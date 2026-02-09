<script>
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    

    
    /**
     * @typedef {Object} Props
     * @property {string} placeholder
     * @property {string} [value]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { placeholder, value = $bindable(""), children } = $props();
</script>

<div class="relative">
    <textarea bind:value={value} class="textarea resize-none" rows="8" placeholder={placeholder}></textarea>
    <button onclick={bubble('click')} class="absolute right-0 bottom-0 m-4 btn variant-filled">
        {@render children?.()}
    </button>
</div>
