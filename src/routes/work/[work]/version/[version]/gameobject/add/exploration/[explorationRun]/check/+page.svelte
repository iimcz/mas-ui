<script lang="ts">
    import { versionLinks, currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { explorationSteps } from "$lib/steps";
    import { goto } from "$app/navigation";
    import { ExplorationStateEnum } from "$lib/schemas/exploration/exploration";
    import Blockquote from "$lib/components/Blockquote.svelte";

    async function gotoKiosk() {
        await data.process.gotoKiosk(fetch);
        await data.process.waitForState(fetch, ExplorationStateEnum.KioskEnvironmentRunning);

        goto(`kiosk`);
    }

    async function gotoExploration() {
        await data.process.gotoExploration(fetch);
        await data.process.waitForState(fetch, ExplorationStateEnum.ExplorationEnvironmentRunning);

        goto(`../${data.process.id}`);
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
            {#if data.process.statusDetail.latestParsedPlayable}
                <form class="form m-2 space-y-2 p-4">
                    <div>Název</div>
                    <Blockquote>{data.process.statusDetail.latestParsedPlayable.label}</Blockquote>
                    <div>Poznámka</div>
                    <Blockquote>{data.process.statusDetail.latestParsedPlayable.note}</Blockquote>
                    <div>Kiosek</div>
                    <Blockquote
                        >{data.process.statusDetail.latestParsedPlayable.emulatorSlug}</Blockquote
                    >
                    <div>Vytvořeno</div>
                    <Blockquote
                        >{data.process.statusDetail.latestParsedPlayable.creationDate}</Blockquote
                    >
                </form>
            {:else}
                <span class="text-lg font-bold text-error-50"
                    >Balíček se nepodařilo načíst. Vraťte se do explorativního režimu a zkontrolujte
                    soubor game.json ve výstupním disku.</span
                >
            {/if}
        </div>
        <div class="flex justify-end gap-2">
            <button class="btn preset-filled" onclick={gotoExploration}>Zpět k exploraci</button>
            {#if data.process.statusDetail.latestParsedPlayable}
                <a class="btn preset-filled" href="save">Uložit rozpracovaný balíček</a>
                <button class="btn preset-filled-primary-500" onclick={gotoKiosk}
                    >Ověřit v kioskovém režimu</button
                >
            {/if}
        </div>
    </div>
</div>
