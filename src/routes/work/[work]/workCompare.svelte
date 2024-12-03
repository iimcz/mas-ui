<script>
    import { SlideToggle, getModalStore } from "@skeletonlabs/skeleton";
    import WorkDataEntry from "./workDataEntry.svelte";

    const modalStore = getModalStore();
    const cBase = 'card p-4 w-modal-wide shadow-xl space-y-5';
	const cHeader = 'text-2xl font-bold';

    const exampleData = {
		alternativeTitle: "",
		classificationLocation: [],
		classificationTime: [],
		description: "",
		genre: [],
		id: "",
		subheading: "",
		title: "",
		yearOfPublication: "",
	}
</script>

<div class={cBase}>
    <header class={cHeader}>Vyberte které hodnoty použít</header>
    <div class="flex">
        <div class="flex-grow">
            <h2 class="text-center">Originál</h2>
            <WorkDataEntry data={exampleData}/>
        </div>
        <div>
            <h2 class="text-center text-2xl">↔</h2>
            <form class="flex flex-col form border border-surface-500 p-4 space-y-12 mt-11 rounded-container-token">
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
                <SlideToggle name="slide"/>
            </form>
        </div>
        <!--
        <div class="flex-grow">
            <h2 class="text-center">AI Detekce</h2>
            <WorkDataEntry data={exampleData}/>
        </div>
        -->
    </div>
    <div class="space-x-2 flex justify-end">
        <button class="btn variant-filled-secondary" on:click={modalStore.close}>Invertovat výběr</button>
        <button class="btn variant-filled-error" on:click={modalStore.close}>Zrušit</button>
        <button class="btn variant-filled-secondary" on:click={modalStore.close}>Použít vybrané</button>
        <button class="btn variant-filled-primary" on:click={modalStore.close}>Použít vše</button>
    </div>
</div>
