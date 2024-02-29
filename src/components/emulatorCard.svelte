<script>
    import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    import PlatformInfoModal from '../components/platformInfoModal.svelte';
    /**
     * @type {import('@skeletonlabs/skeleton').ModalComponent}
     */
    const modalComponent = { ref: PlatformInfoModal };

    function openModal() {
        /**
         * @type {import('@skeletonlabs/skeleton').ModalSettings}
         */
        const modal = {
            type: 'component',
            component: modalComponent
        };

        modalStore.trigger(modal);
    }

    export let image = "";
    export let title = "";
    export let description = "";

    function select() {
        dispatch('select', { title })
    }
</script>

<div class="card p-4 flex">
    {#if image != ""}
        <button class="mr-4" on:click={select}>
            <img width="200" height="200" src="{image}"/>
        </button>
    {/if}

    <div class="text-left w-full">
        <div class="text-lg font-bold flex justify-between items-center">
            <button on:click={select}>{title}</button>
            <button on:click={openModal}>
                <Fa size="lg" color={"cornflowerblue"} icon={faInfoCircle}/>
            </button>
        </div>
        <div>
            {description}
        </div>
    </div>
</div>
