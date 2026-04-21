<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    //import { getModalStore } from '@skeletonlabs/skeleton-svelte';
    //const modalStore = getModalStore();

    import PlatformInfoModal from "$lib/components/platformInfoModal.svelte";

    const modalComponent = { ref: PlatformInfoModal };

    function openModal() {
        const modal = {
            type: "component",
            component: modalComponent
        };

        //modalStore.trigger(modal);
    }

    /**
     * @typedef {Object} Props
     * @property {string} [image]
     * @property {string} [title]
     * @property {string} [description]
     */

    /** @type {Props} */
    let { image = "", title = "", description = "" } = $props();

    function select() {
        dispatch("select", { title });
    }
</script>

<div class="flex card p-4">
    {#if image != ""}
        <button class="mr-4" onclick={select}>
            <img alt="emulator logo" width="200" height="200" src={image} />
        </button>
    {/if}

    <div class="w-full text-left">
        <div class="flex items-center justify-between text-lg font-bold">
            <button onclick={select}>{title}</button>
            <!-- TODO: Re-enable once modal works properly
            <button on:click={openModal}>
                <Fa size="lg" color={"cornflowerblue"} icon={faInfoCircle}/>
            </button>
            -->
        </div>
        <div>
            {description}
        </div>
        <button class="mt-2 btn preset-filled" onclick={select}>Vybrat</button>
    </div>
</div>
