<script>
    //import { getModalStore } from "@skeletonlabs/skeleton-svelte";


    /**
     * @typedef {Object} Props
     * @property {import('svelte').SvelteComponent} parent
     */

    /** @type {Props} */
    let { parent } = $props();

    //const modalStore = getModalStore();
    const cBase = 'card p-4 w-modal shadow-xl space-y-5';
	const cHeader = 'text-2xl font-bold';
</script>

<div class="modal-example-form {cBase}">
    <header class={cHeader}>Atari 800</header>
    <div class="flex justify-around">
        <div>
            <span class="font-bold text-lg">Ukázka zařízení</span>
            <img alt="device unit" width="200" height="200" />
        </div>
        <div>
            <span class="font-bold text-lg">Ukázka média</span>
            <img alt="media example" width="200" height="200" />
        </div>
    </div>
    <span class="font-bold text-lg">Popis</span>
    <div class="border border-surface-500 p-4 space-y-4 rounded-container-token">
        Zde bude detailní popis zařízení pro identifikaci platformy
    </div>
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" >Zavřít</button> <!-- TODO: onclick={modalStore.close} -->
    </footer>
</div>

