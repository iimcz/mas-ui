<script lang="ts">
    import { versionLinks, currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { explorationSteps } from "$lib/steps";

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-5">
        <h1 class="mt-4 text-3xl">Uložení hratelného herního balíčku</h1>
        <ProgressStepBar steps={explorationSteps} currentStep={4} unlockedStep={4} />
        <div class="card preset-outlined-surface-300-700 p-4">
            <form class="space-y-4">
                <label class="label">
                    <span class="label-text">Název herního balíčku</span>
                    <input class="input" type="text" />
                </label>
                <label class="label">
                    <span class="label-text">Poznámka</span>
                    <input class="input" type="text" />
                </label>
            </form>
        </div>
        <div class="flex justify-end gap-2">
            <a class="btn preset-filled" href="../../../">Uložit a dokončit exploraci</a>
            <a class="btn preset-filled" href="extract">Zpět k obsahu balíčku</a>
        </div>
    </div>
</div>
