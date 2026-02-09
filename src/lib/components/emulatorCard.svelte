<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    //import { getModalStore } from '@skeletonlabs/skeleton-svelte';
    //const modalStore = getModalStore();

    import PlatformInfoModal from '$lib/components/platformInfoModal.svelte';

    const modalComponent = { ref: PlatformInfoModal };

    function openModal() {

        const modal = {
            type: 'component',
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
        dispatch('select', { title })
    }
</script>

<div class="card p-4 flex">
    {#if image != ""}
        <button class="mr-4" onclick={select}>
            <img alt="emulator logo" width="200" height="200" src="{image}"/>
        </button>
    {/if}

    <div class="text-left w-full">
        <div class="text-lg font-bold flex justify-between items-center">
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
        <button class="btn variant-filled mt-2" onclick={select}>Vybrat</button>
    </div>
</div>
