<script>
    import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();

    import UploadModal from '$lib/components/uploadModal.svelte';
    /**
     * @type {import('@skeletonlabs/skeleton').ModalComponent}
     */
    const modalComponent = { ref: UploadModal };

    function openModal() {
        /**
         * @type {import('@skeletonlabs/skeleton').ModalSettings}
         */
        const modal = {
            type: 'component',
            title: 'Nahrát soubor',
            component: modalComponent
        };

        modalStore.trigger(modal);
    }
</script>

<button on:click={openModal} class="card p-4 flex">
    <div class="text-left">
        <div class="text-lg font-bold">Nahrát soubor</div>
        <div>
            Nahrajte existující soubor s autodetekcí formátu
        </div>
    </div>
</button>
