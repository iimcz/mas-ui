<script lang="ts">
    import { Dialog, Portal, Progress } from "@skeletonlabs/skeleton-svelte";
    import { currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    import { faClose } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { versionLinks } from "$lib/components/sidebar/links";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { explorationSteps } from "$lib/steps";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { ExplorationProcess, ExplorationStateEnum } from "$lib/schemas/exploration/exploration.js";

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    let saving = $state(false);
    let frameW = $state(0);
    let frameH = $state(300);
    let interval = $state(0);

    onMount(() => {
        interval = setInterval(async () => {
            updatedState = await process.ping(fetch);
        }, 1000);

        return () => clearInterval(interval);
    });

    async function gotoExploration() {
        await process.gotoExploration(fetch);
        await process.waitForState(fetch, ExplorationStateEnum.ExplorationEnvironmentRunning);

        goto(`.`);
    }

    let updatedState: ExplorationProcess | null = $state(null);
    let { data } = $props();

    let process = $derived(updatedState ?? data.process);
</script>

{#if saving}
    <div class="absolute inset-0 z-999 flex items-center justify-center bg-surface-50-950/50">
        <div class="flex items-center justify-center gap-4 card bg-surface-100-900 p-4">
            <Progress class="w-fit items-center" value={null}>
                <Progress.Circle>
                    <Progress.CircleTrack />
                    <Progress.CircleRange />
                </Progress.Circle>
                <Progress.ValueText />
            </Progress>
            <span class="text-xl font-semibold">Probíhá vypínání exploratiního prostředí</span>
        </div>
    </div>
{/if}

<div class="mx-auto flex h-full justify-center">
    <div class="my-4 flex w-full flex-col space-y-10">
        <div class="mt-4 ml-4 flex w-4/5 flex-col gap-4">
            <h1 class="text-3xl">Ověření</h1>
            <ProgressStepBar steps={explorationSteps} currentStep={3} unlockedStep={3} />
        </div>
        <div class="grid grid-cols-[3fr_1fr] gap-4">
            <!-- Could remove border once iframe works, otherwise it's invisible -->
            <div class="h-full w-full rounded-2xl border p-1 text-surface-50">
                <div
                    bind:clientWidth={frameW}
                    bind:clientHeight={frameH}
                    class="relative mx-auto aspect-video h-full w-auto bg-surface-900"
                >
                    {#if process.statusDetail.streamUrl === ""}
                        <Progress class="w-fit items-center" value={null}>
                            <Progress.Circle>
                                <Progress.CircleTrack />
                                <Progress.CircleRange />
                            </Progress.Circle>
                            <Progress.ValueText />
                        </Progress>
                        <span class="text-xl font-semibold"
                            >Probíhá start exploratiního prostředí</span
                        >
                    {:else}
                        <iframe
                            class="absolute top-0 left-0"
                            width={frameW - 100}
                            height={frameH}
                            title="Stream"
                            src={process.statusDetail.streamUrl}
                        ></iframe>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col items-center gap-4">
                <span class="text-lg font-semibold">Ovládací panel</span>
                <div class="flex w-full flex-col space-y-4">
                    <a class="btn preset-filled-success-500" href="finish"
                        >Označit balíček jako hratelný</a
                    >
                    <a class="btn preset-filled" href="save">Uložit rozpracovaný balíček</a>
                    <Dialog>
                        <Dialog.Trigger class="w-full">
                            <div class="btn w-full preset-filled">Přepnout HDMI Switcher</div>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
                            <Dialog.Positioner
                                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                            >
                                <Dialog.Content
                                    class="w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl"
                                >
                                    <header class="flex items-center justify-between">
                                        <Dialog.Title class="text-lg font-bold"
                                            >Informace pro přepnutí HDMI Switcheru</Dialog.Title
                                        >
                                        <Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
                                            <Fa icon={faClose} />
                                        </Dialog.CloseTrigger>
                                    </header>
                                    <Dialog.Description>
                                        <p>
                                            Pro přepnutí zpět využijte fyzické tlačítko na HDMI
                                            switcheru.
                                        </p>
                                    </Dialog.Description>
                                    <footer class="flex justify-end gap-2">
                                        <Dialog.CloseTrigger class="btn preset-tonal"
                                            >Zrušit</Dialog.CloseTrigger
                                        >
                                        <button class="btn preset-filled" onclick={() => {}}
                                            >Přepnout</button
                                        >
                                    </footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog>
                    <button class="btn preset-filled" onclick={gotoExploration}
                        >Zpět k exploraci</button
                    >
                </div>
                <span class="text-lg font-semibold">Checklist</span>
                <ul class="w-full list-inside list-disc rounded-2xl border p-4">
                    <li>Hra se sama spustí nebo otevře menu pro výběr</li>
                    <li>Emulace neobsahuje žádné zásadní chyby</li>
                    <li>??? tohle je jen placeholder</li>
                </ul>
            </div>
        </div>
    </div>
</div>
