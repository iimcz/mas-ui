<script>
    // TODO: FIX MODAL
    //import { getModalStore } from '@skeletonlabs/skeleton-svelte';
    //const modalStore = getModalStore();

    import UploadModal from '$lib/components/uploadModal.svelte';

    const modalComponent = { ref: UploadModal };

    function openModal() {

        const modal = {
            type: 'component',
            title: 'Nahrát soubor',
            component: modalComponent
        };

        //modalStore.trigger(modal);
    }
</script>

<button onclick={openModal} class="card card-hover p-4 flex">
    <div class="text-left">
        <div class="text-lg font-bold">Nahrát soubor</div>
        <div>
            Nahrajte existující soubor s autodetekcí formátu
        </div>
    </div>
</button>
