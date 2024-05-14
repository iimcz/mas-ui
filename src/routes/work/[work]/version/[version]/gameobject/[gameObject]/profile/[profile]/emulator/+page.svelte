<script>
    import { faExpand, faCog, faInfoCircle, faBackward, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
    import { popup } from "@skeletonlabs/skeleton";
    import Fa from "svelte-fa";

    /**
     * @type {import("@skeletonlabs/skeleton").PopupSettings}
     */
    const settingsPopup = {
        event: 'click',
        target: 'settingsPopup',
        placement: 'bottom'
    };

    /**
     * @type {import("@skeletonlabs/skeleton").PopupSettings}
     */
     const infoPopup = {
        event: 'click',
        target: 'infoPopup',
        placement: 'bottom'
    };

    /**
     * @type {import("@skeletonlabs/skeleton").PopupSettings}
     */
     const backPopup = {
        event: 'hover',
        target: 'backPopup',
        placement: 'bottom'
    };

    import { currentSidebar, currentRoute } from "$lib/components/sidebar/links";
    import { goto } from "$app/navigation";
    $currentSidebar = [];
    $currentRoute = "emulator";
</script>

<div class="mx-4 h-full mx-auto flex justify-center">
    <div class="flex w-full space-y-10 flex-col my-4">
        <div class="ml-4 mt-4 flex space-x-4">
            <button on:click={() => goto("/work/%5Bid%5D/version/%5Bid%5D/gameobject/[id]/profile", { replaceState: false })} use:popup={backPopup} class="btn-icon variant-filled">
                <Fa icon={faArrowLeft}/>
            </button>
            <h1 class="text-3xl">Emulace</h1>
        </div>
        <div class="space-x-5 aspect-container">
            <div class="w-full h-full text-surface-50">
                <div class="relative bg-surface-900 aspect-video w-auto h-full mx-auto">
                    <h1 class="p-4 text-xl">Stream placeholder</h1>
                    <div class="absolute right-0 top-0 m-2">
                        <button use:popup={settingsPopup} class="btn-icon variant-filled">
                            <Fa icon={faCog}/>
                        </button>
                        <button use:popup={infoPopup} class="btn-icon variant-filled">
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
        <button class="btn variant-filled-error">Ukončit bez záznamu</button>
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
	<div class="arrow variant-filled-secondary" />
</div>

<style>
    .aspect-container {
        max-height: calc(100dvh - 200px);
    }
</style>
