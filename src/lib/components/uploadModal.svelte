<script>
    import { FileUpload , Progress } from "@skeletonlabs/skeleton-svelte";


    /**
     * @typedef {Object} Props
     * @property {import('svelte').SvelteComponent} parent
     */

    /** @type {Props} */
    let { parent } = $props();

    //const modalStore = getModalStore();
    const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

    let uploaded = $state(false);
    let val = $state(0);

    function onChangeHandler() {
        uploaded = true;
        val = 100;
    }

    function onFormSubmit() {
		//modalStore.close();
	}
</script>

<div class="modal-example-form {cBase}">
    <header class={cHeader}>Nahrát soubor</header>
    <form class="modal-form {cForm}">
        {#if uploaded}
            <div class="text-center">100%</div>
            <Progress value={val}>
                <Progress.Label class="text-sm">{val}%</Progress.Label>
                <Progress.Track>
			        <Progress.Range />
		        </Progress.Track>
            </Progress>
        {:else}
            <FileUpload name="files" onchange={onChangeHandler}>
                <FileUpload.Label>Klikněte pro nahrání nebo přetáhněte soubor</FileUpload.Label>
            </FileUpload>
        {/if}
    </form>
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}">Zrušit</button> <!-- TODO onclick={modalStore.close} -->
        <button disabled={!uploaded} class="btn {parent.buttonPositive}" onclick={onFormSubmit}>Nahrát</button>
    </footer>
</div>

