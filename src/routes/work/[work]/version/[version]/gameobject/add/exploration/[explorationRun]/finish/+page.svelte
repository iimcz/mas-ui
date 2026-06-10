<script lang="ts">
    import { versionLinks, currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { explorationSteps } from "$lib/steps";
    import { goto } from "$app/navigation";

    let packageName = $state("");
    let packageNote = $state("");

    async function finish() {
        data.process = await data.process.finish(fetch, packageName, packageNote);
        goto(`../../../`);
    }

    async function gotoCheck() {
        await data.process.gotoCheck(fetch);
        goto(`check`);
    }

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    let { data } = $props();
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-5">
        <h1 class="mt-4 text-3xl">Uložení hratelného herního balíčku</h1>
        <ProgressStepBar steps={explorationSteps} currentStep={4} unlockedStep={4} />
        <div class="card preset-outlined-surface-300-700 p-4">
            <form class="space-y-4">
                <label class="label">
                    <span class="label-text">Název herního balíčku</span>
                    <input required class="input" type="text" bind:value={packageName} />
                </label>
                <label class="label">
                    <span class="label-text">Poznámka</span>
                    <input class="input" type="text" bind:value={packageNote} />
                </label>
            </form>
        </div>
        <div class="flex justify-end gap-2">
            <button class="btn preset-filled" onclick={finish}>Uložit a dokončit exploraci</button>
            <button class="btn preset-filled" onclick={gotoCheck}>Zpět k obsahu balíčku</button>
        </div>
    </div>
</div>
