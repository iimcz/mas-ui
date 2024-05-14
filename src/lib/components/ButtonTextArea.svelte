<script>
    /**
     * @type {string}
     */
    export let placeholder;

    /**
     * @type {string}
     */
    export let value = "";
</script>

<div class="relative">
    <textarea bind:value={value} class="textarea resize-none" rows="8" placeholder={placeholder} />
    <button on:click class="absolute right-0 bottom-0 m-4 btn variant-filled">
        <slot/>
    </button>
</div>
