<script>
    import ArtefactForm from "./ArtefactForm.svelte";

    import { currentStep, unlockedStep } from "$lib/steps";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { API_URL } from "$lib/config";

    onMount(() => {
        $currentStep = 3;
        $unlockedStep = 3;
    })

    /**
     * @type {string}
     */
    export let processId;

    /**
     * @param {CustomEvent<import("$lib/schemas/artefact").Artefact>} data
     */
     async function createNew(data) {
        const res = await fetch(`${API_URL}/api/v1/digitalization/${processId}/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        /**
         * @type {import("$lib/schemas/artefact").Artefact}
         */
        const createdArtefact = await res.json() // TODO: Didn't get redirected during testing
        goto(`/work/${$page.params.work}/version/${$page.params.version}/artefact/${createdArtefact.id}`)
    }
</script>

<ArtefactForm isNew={true} on:save={createNew}/>
