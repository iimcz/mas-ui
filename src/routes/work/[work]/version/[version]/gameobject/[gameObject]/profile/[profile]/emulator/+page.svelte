<script>
    import { API_URL } from "$lib/config";
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
        }, 1000)

        return () => clearInterval(interval);
    })

    /**
     * @param {boolean} save
     */
    async function finishEmulation(save) {
        /** @type {import("$lib/schemas/emulationFinishRequest").EmulationFinishRequest} */
        const finishRequest = {
            keepScreenRecording: save,
            keepWebcamRecording: save,
            saveMachineState: save
        }

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
<div class="absolute inset-0 flex bg-surface-backdrop-token items-center justify-center z-[999]">
    <div class="flex justify-center items-center gap-4 card p-4 bg-surface-100">
        <Progress class="items-center w-fit w-16" value={null}>
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

<div class="mx-4 h-full mx-auto flex justify-center">
    <div class="flex w-full space-y-10 flex-col my-4">
        <div class="ml-4 mt-4 flex space-x-4">
            <button onclick={async () => await finishEmulation(true)} class="btn-icon variant-filled"> <!-- TODO use:popup={backPopup} -->
                <Fa icon={faArrowLeft}/>
            </button>
            <h1 class="text-3xl">Emulace</h1>
        </div>
        <div class="space-x-5 aspect-container">
            <div class="w-full h-full text-surface-50">
                <div bind:clientWidth={frameW} bind:clientHeight={frameH} class="relative bg-surface-900 aspect-video w-auto h-full mx-auto">
                    <iframe class="absolute left-0 top-0" width={frameW} height={frameH} title="Stream" src={data.streamSource}></iframe>
                    <div class="absolute right-0 top-0 m-2">
                        <button class="btn-icon variant-filled"> <!-- TODO use:popup={settingsPopup} -->
                            <Fa icon={faCog}/>
                        </button>
                        <button class="btn-icon variant-filled"> <!-- TODO use:popup={infoPopup} -->
                            <Fa icon={faInfoCircle}/>
                        </button>
                        <button class="btn-icon variant-filled">
                            <Fa icon={faExpand}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div data-popup="settingsPopup">
    <div class="flex flex-col space-y-2">
        <button class="btn variant-filled-error">Reset stroje</button>
        <button onclick={async () => await finishEmulation(true)} class="btn variant-filled-error">Ukončit</button>
        <button onclick={async () => await finishEmulation(false)} class="btn variant-filled-error">Ukončit bez záznamu</button>
        <button class="btn variant-filled-primary">Uložit stav</button>
        <button class="btn variant-filled-primary">Načíst stav</button>
        <button class="btn variant-filled-primary">Otevřít menu emulátoru</button>
        <button class="btn variant-filled-secondary">Info o ovládání</button>
        <button class="btn variant-filled-secondary">Uložit profil</button>
        <button class="btn variant-filled-secondary">Načíst profil</button>
    </div>
</div>

<div data-popup="infoPopup">
    <div class="flex flex-col space-y-2">
        <button class="btn variant-filled-secondary">Info o ovládání</button>
        <button class="btn variant-filled-secondary">Info o zařízení</button>
    </div>
</div>

<div class="card p-4 variant-filled-secondary" data-popup="backPopup">
	<p>Zpět k verzi</p>
    <p>Záznam se tvoří automaticky</p>
	<div class="arrow variant-filled-secondary"></div>
</div>

<style>
    .aspect-container {
        max-height: calc(100dvh - 200px);
    }
</style>
