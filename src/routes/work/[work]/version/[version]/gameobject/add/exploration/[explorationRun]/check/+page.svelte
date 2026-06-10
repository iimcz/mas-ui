<script lang="ts">
    import { versionLinks, currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { explorationSteps } from "$lib/steps";
    import { goto } from "$app/navigation";
    import { ExplorationStateEnum } from "$lib/schemas/exploration/exploration";

    async function gotoKiosk() {
        await data.process.gotoKiosk(fetch);
        await data.process.waitForState(fetch, ExplorationStateEnum.KioskEnvironmentRunning);

        goto(`kiosk`);
    }

    async function gotoExploration() {
        await data.process.gotoExploration(fetch);
        await data.process.waitForState(fetch, ExplorationStateEnum.ExplorationEnvironmentRunning);

        goto(`.`);
    }

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    let { data } = $props();
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-5">
        <h1 class="mt-4 text-3xl">Obsah exportovaného balíčku</h1>
        <ProgressStepBar steps={explorationSteps} currentStep={2} unlockedStep={2} />
        <div class="rounded-2xl border bg-surface-900 p-4">
            <span class="text-lg font-bold">Zde bude zobrazen obsah exportovaného balíčku.</span>
        </div>
        <div class="flex justify-end gap-2">
            <button class="btn preset-filled" onclick={gotoExploration}>Zpět k exploraci</button>
            <a class="btn preset-filled" href="save">Uložit rozpracovaný balíček</a>
            <button class="btn preset-filled-primary-500" onclick={gotoKiosk}
                >Ověřit v kioskovém režimu</button
            >
        </div>
    </div>
</div>
