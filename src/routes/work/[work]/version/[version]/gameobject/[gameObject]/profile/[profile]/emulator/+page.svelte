<script>
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { faExpand, faCog, faInfoCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import { Progress } from "@skeletonlabs/skeleton-svelte";
    import Fa from "svelte-fa";

    import { currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    $currentSidebar = [];
    $currentRoute = "emulator";

    let interval = 0;
    let saving = $state(false);

    /** @type number */
    let frameW = $state(0);
    let frameH = $state(300);
    onMount(() => {
        interval = setInterval(async () => {
            const res = await fetch(`${API_URL}/api/v1/emulation/${data.state.id}/ping`);
            data.state = await res.json();
        }, 1000);

        return () => clearInterval(interval);
    });

    /**
     * @param {boolean} save
     */
    async function finishEmulation(save) {
        /** @type {import("$lib/schemas/emulationFinishRequest").EmulationFinishRequest} */
        const finishRequest = {
            keepScreenRecording: save,
            keepWebcamRecording: save,
            saveMachineState: save
        };

        saving = true;
        await fetch(`${API_URL}/api/v1/emulation/${data.state.id}/finish`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finishRequest)
        });

        goto("../..", { replaceState: false });
    }

    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data - TODO: Video
     */

    /** @type {Props} */
    let { data = $bindable() } = $props();
</script>

{#if saving}
    <div class="absolute inset-0 z-[999] flex items-center justify-center bg-surface-50-950/50">
        <div class="flex items-center justify-center gap-4 card bg-surface-100-900 p-4">
            <Progress class="w-fit items-center" value={null}>
                <Progress.Circle>
                    <Progress.CircleTrack />
                    <Progress.CircleRange />
                </Progress.Circle>
                <Progress.ValueText />
            </Progress>
            <span class="text-xl font-semibold">Probíhá ukládání záznamu</span>
        </div>
    </div>
{/if}

<div class="mx-4 mx-auto flex h-full justify-center">
    <div class="my-4 flex w-full flex-col space-y-10">
        <div class="mt-4 ml-4 flex space-x-4">
            <button
                onclick={async () => await finishEmulation(true)}
                class="btn-icon preset-filled"
            >
                <!-- TODO use:popup={backPopup} -->
                <Fa icon={faArrowLeft} />
            </button>
            <h1 class="text-3xl">Emulace</h1>
        </div>
        <div class="aspect-container space-x-5">
            <div class="h-full w-full text-surface-50">
                <div
                    bind:clientWidth={frameW}
                    bind:clientHeight={frameH}
                    class="relative mx-auto aspect-video h-full w-auto bg-surface-900"
                >
                    <iframe
                        class="absolute top-0 left-0"
                        width={frameW}
                        height={frameH}
                        title="Stream"
                        src={data.streamSource}
                    ></iframe>
                    <div class="absolute top-0 right-0 m-2">
                        <button class="btn-icon preset-filled">
                            <!-- TODO use:popup={settingsPopup} -->
                            <Fa icon={faCog} />
                        </button>
                        <button class="btn-icon preset-filled">
                            <!-- TODO use:popup={infoPopup} -->
                            <Fa icon={faInfoCircle} />
                        </button>
                        <button class="btn-icon preset-filled">
                            <Fa icon={faExpand} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div data-popup="settingsPopup">
    <div class="flex flex-col space-y-2">
        <button class="preset-filled-error btn">Reset stroje</button>
        <button onclick={async () => await finishEmulation(true)} class="preset-filled-error btn"
            >Ukončit</button
        >
        <button onclick={async () => await finishEmulation(false)} class="preset-filled-error btn"
            >Ukončit bez záznamu</button
        >
        <button class="preset-filled-primary btn">Uložit stav</button>
        <button class="preset-filled-primary btn">Načíst stav</button>
        <button class="preset-filled-primary btn">Otevřít menu emulátoru</button>
        <button class="preset-filled-secondary btn">Info o ovládání</button>
        <button class="preset-filled-secondary btn">Uložit profil</button>
        <button class="preset-filled-secondary btn">Načíst profil</button>
    </div>
</div>

<div data-popup="infoPopup">
    <div class="flex flex-col space-y-2">
        <button class="preset-filled-secondary btn">Info o ovládání</button>
        <button class="preset-filled-secondary btn">Info o zařízení</button>
    </div>
</div>

<div class="preset-filled-secondary card p-4" data-popup="backPopup">
    <p>Zpět k verzi</p>
    <p>Záznam se tvoří automaticky</p>
    <div class="arrow preset-filled-secondary"></div>
</div>

<style scoped>
    .aspect-container {
        max-height: calc(100dvh - 200px);
    }
</style>
