<script lang="ts">
    import { Dialog, Portal, Progress } from "@skeletonlabs/skeleton-svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { faClose } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { goto } from "$app/navigation";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { explorationSteps } from "$lib/steps";
    import { onMount } from "svelte";
    import { ExplorationStateEnum } from "$lib/schemas/exploration/exploration.js";

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    let saving = $state(false);
    let frameW = $state(0);
    let frameH = $state(300);
    let interval = $state(0);

    onMount(() => {
        interval = setInterval(async () => {
            data.process = await data.process.ping(fetch);
        }, 1000);

        return () => clearInterval(interval);
    });

    async function gotoCheck() {
        await data.process.gotoCheck(fetch);

        saving = true;
        await data.process.waitForState(fetch, ExplorationStateEnum.WaitingForCheck);

        goto(`${data.process.id}/check`);
    }

    async function abort() {
        await data.process.abort(fetch);

        goto("../../../");
    }

    let { data } = $props();
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
            <h1 class="text-3xl">Explorace</h1>
            <ProgressStepBar steps={explorationSteps} currentStep={1} unlockedStep={1} />
        </div>
        <div class="grid grid-cols-[3fr_1fr] gap-4">
            <!-- Could remove border once iframe works, otherwise it's invisible -->
            <div class="h-full w-full rounded-2xl border p-1 text-surface-50">
                <div
                    bind:clientWidth={frameW}
                    bind:clientHeight={frameH}
                    class="relative mx-auto aspect-video h-full w-auto bg-surface-900"
                >
                    {#if data.process.statusDetail.streamUrl === ""}
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
                            src={data.process.statusDetail.streamUrl}
                        ></iframe>
                    {/if}
                </div>
            </div>
            <div class="flex flex-col items-center gap-4">
                <span class="text-lg font-semibold">Ovládací panel</span>
                <div class="flex w-full flex-col space-y-4">
                    <Dialog>
                        <Dialog.Trigger class="w-full">
                            <div class="btn w-full preset-filled-primary-500">
                                Vypnout a načíst exportovaný balíček
                            </div>
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
                                            >Opravdu si přejete vypnout stroj?</Dialog.Title
                                        >
                                        <Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
                                            <Fa icon={faClose} />
                                        </Dialog.CloseTrigger>
                                    </header>
                                    <Dialog.Description>
                                        <p>
                                            Před vypnutím stroje se ujistěte, že všechny soubory
                                            byly uloženy na příslušné místo.
                                        </p>
                                    </Dialog.Description>
                                    <footer class="flex justify-end gap-2">
                                        <Dialog.CloseTrigger class="btn preset-tonal"
                                            >Zrušit</Dialog.CloseTrigger
                                        >
                                        <button class="btn preset-filled" onclick={gotoCheck}
                                            >Vypnout a načíst exportovaný balíček</button
                                        >
                                    </footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog>
                    <Dialog>
                        <Dialog.Trigger class="w-full">
                            <div class="btn w-full preset-filled-error-500">
                                Vypnout a přerušit exploraci
                            </div>
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
                                            >Opravdu si přejete vypnout stroj?</Dialog.Title
                                        >
                                        <Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
                                            <Fa icon={faClose} />
                                        </Dialog.CloseTrigger>
                                    </header>
                                    <Dialog.Description>
                                        <p>
                                            Opravdu si přejete přerušit exploraci a zahodit všechny
                                            výstupy?
                                        </p>
                                    </Dialog.Description>
                                    <footer class="flex justify-end gap-2">
                                        <Dialog.CloseTrigger class="btn preset-tonal"
                                            >Zrušit</Dialog.CloseTrigger
                                        >
                                        <button class="btn preset-filled" onclick={abort}
                                            >Vypnout a přerušit exploraci</button
                                        >
                                    </footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog>
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
                </div>
                <span class="text-lg font-semibold">Detekované objekty</span>
                <div class="flex w-full flex-col space-y-4 rounded-2xl border p-4">
                    <div>
                        Pokud budeš chtít dělat tu service na real time komunikaci, může být zde
                    </div>
                </div>
                <span class="text-lg font-semibold">Checklist</span>
                <ul class="w-full list-inside list-disc rounded-2xl border p-4">
                    <li>Ve složce /mnt/export vytvořte potřebné soubory a složky</li>
                    <li>Upravte gamePackege.json dle potřeby</li>
                    <li>??? tohle je jen placeholder</li>
                </ul>
            </div>
        </div>
    </div>
</div>
