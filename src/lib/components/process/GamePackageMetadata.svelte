<script lang="ts">
    import GamePackageForm from "./GamePackageForm.svelte";

    import { currentStep, unlockedStep } from "$lib/steps";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { PUBLIC_API_URL as API_URL } from '$env/static/public';
    import { toaster } from "$lib/toaster";
    import { _ } from 'svelte-i18n'
    import type { GamePackage } from "$lib/schemas/gamePackage";

    onMount(() => {
        $currentStep = 4;
        $unlockedStep = 4;
    })

    let { processId, onCreateNew }: { processId: string, onCreateNew?: (data: GamePackage) => void } = $props();

     async function createNew(data : GamePackage) {
        if (onCreateNew) onCreateNew(data);

        const result = await fetch(`${API_URL}/api/v1/conversion/${processId}/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (result.ok)
        {
            toaster.success({title: $_("save_success")});

            const createdPackage = await result.json() as GamePackage;
            goto(`/work/${page.params.work}/version/${page.params.version}/gameobject/${createdPackage.id}`)
        }
        else {
            const error = await result.text();
            toaster.error({title: $_("save_fail"), description: error});
        }
    }
</script>

<GamePackageForm isNew={true} onsave={createNew}/>
