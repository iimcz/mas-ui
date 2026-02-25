<script lang="ts">
    import ArtefactForm from "./ArtefactForm.svelte";

    import { currentStep, unlockedStep } from "$lib/steps";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { API_URL } from "$lib/config";
    import type { Artefact } from "$lib/schemas/artefact";
    import { toaster } from "$lib/toaster";
    import { _ } from 'svelte-i18n'

    onMount(() => {
        $currentStep = 3;
        $unlockedStep = 3;
    })


    /**
     * @typedef {Object} Props
     * @property {string} processId
     */

    /** @type {Props} */
    let { processId } = $props();

    /**
     * @param {CustomEvent<import("$lib/schemas/artefact").Artefact>} data
     */
     async function createNew(data: Artefact) {
        const result = await fetch(`${API_URL}/api/v1/digitalization/${processId}/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (result.ok)
        {
            toaster.success({title: $_("save_success")});

            const createdArtefact = await result.json() as Artefact;
            goto(`/work/${page.params.work}/version/${page.params.version}/artefact/${createdArtefact.id}`)
        }
        else {
            const error = await result.text();
            toaster.error({title: $_("save_fail"), description: error});
        }
    }
</script>

<ArtefactForm isNew={true} onsave={createNew}/>
