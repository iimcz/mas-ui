<script>
    import { faArrowRight, faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { currentStep, unlockedStep } from "$lib/steps";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { onMount } from "svelte";
    import ArtefactForm from "../../../[artefact]/artefactForm.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { API_URL } from "$lib/config";

    onMount(() => {
        $currentStep = 3;
        $unlockedStep = 3;
    })

    async function downloadLog() {
        const res = await fetch(`${API_URL}/api/v1/digitalization/${$page.params.process}/log`);
        const blob = await res.blob()
        const file = window.URL.createObjectURL(blob);

        window.location.assign(file);
    }

    /**
     * @param {CustomEvent<import("$lib/schemas/artefact").Artefact>} data
     */
     async function createNew(data) {
        const res = await fetch(`${API_URL}/api/v1/digitalization/${$page.params.process}/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        /**
         * @type {import("$lib/schemas/artefact").Artefact}
         */
        const createdArtefact = await res.json()
        goto(`/work/${$page.params.work}/version/${$page.params.version}/artefact/${createdArtefact.id}`)
    }
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Informace o artefaktu</h1>
        <ProgressStepBar/>
        <div class="flex gap-2">
            <div class="card flex flex-1 p-2 flex-col">
                <span class="text-xl font-bold p-4">Strukturovaný popis</span>
                <ArtefactForm isNew={true} on:save={createNew}/>
            </div>
            <div class="flex flex-col flex-1 gap-2">
                <div class="card flex flex-col p-2">
                    <span class="text-xl font-bold p-4">Info o digitalizaci</span>
                    <div class="flex flex-col p-4">
                        <span>Velikost artefaktu: 145 kB</span>
                        <span>Kontrolní součet (MD5): 1d86c2605355313944c895831e9533a6</span>
                        <button on:click={downloadLog} class="btn variant-filled mt-2">
                            <Fa icon={faDownload}/>
                            <span>Stáhnout log</span>
                        </button>
                    </div>
                </div>
                <!-- TODO: this doesn't really work with how the form works, either use data entry directly or make workaround -->
                <div class="h-full flex flex-col">
                    <div class="flex-1"></div>
                    <div class="flex justify-end gap-2">
                        <a class="btn variant-filled-secondary" href={`/work/${$page.params.work}/version/${$page.params.version}/artefact/add`}>
                            <Fa icon={faPlus}/>
                            <span>Přidat další artefakt</span>
                        </a>
                        <a class="btn variant-filled-primary" href="/work/[id]/version/[id]/artefact">
                            <Fa icon={faArrowRight}/>
                            <span>Uložit</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
