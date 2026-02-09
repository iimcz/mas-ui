<script>
    import GamePackageForm from "./GamePackageForm.svelte";

    import { currentStep, unlockedStep } from "$lib/steps";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { API_URL } from "$lib/config";

    onMount(() => {
        $currentStep = 4;
        $unlockedStep = 4;
    })

    
    /**
     * @typedef {Object} Props
     * @property {string} processId
     */

    /** @type {Props} */
    let { processId } = $props();

    /**
     * @param {CustomEvent<import("$lib/schemas/gamePackage").GamePackage>} data
     */
     async function createNew(data) {
        const res = await fetch(`${API_URL}/api/v1/conversion/${processId}/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        /**
         * @type {import("$lib/schemas/gamePackage").GamePackage}
         */
        const createdPackage = await res.json()
        goto(`/work/${$page.params.work}/version/${$page.params.version}/gameobject/${createdPackage.id}`)
    }
</script>

<GamePackageForm isNew={true} on:save={createNew}/>
