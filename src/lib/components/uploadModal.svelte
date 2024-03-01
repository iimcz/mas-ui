<script>
    import { FileDropzone, ProgressBar, getModalStore } from "@skeletonlabs/skeleton";

    /**
     * @type {import('svelte').SvelteComponent}
     */
    export let parent;

    const modalStore = getModalStore();
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

    let uploaded = false;
    let val = 0;

    function onChangeHandler() {
        uploaded = true;
        val = 100;
    }

    function onFormSubmit() {
		modalStore.close();
	}
</script>

<div class="modal-example-form {cBase}">
    <header class={cHeader}>Nahrát soubor</header>
    <form class="modal-form {cForm}">
        {#if uploaded}
            <div class="text-center">100%</div>
            <ProgressBar meter="bg-primary-500" track="bg-secondary-500" height="h-4" value={val} max={100}/>
        {:else}
            <FileDropzone name="files" on:change={onChangeHandler}>
                <svelte:fragment slot="message">
                    Klikněte pro nahrání nebo přetáhněte soubor
                </svelte:fragment>
            </FileDropzone>
        {/if}
    </form>
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={modalStore.close}>Zrušit</button>
        <button disabled={!uploaded} class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Nahrát</button>
    </footer>
</div>

