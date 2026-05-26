<script lang="ts">
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { goto } from "$app/navigation";
    import { _ } from "svelte-i18n";
    import MediaCard from "$lib/components/mediaCard.svelte";

    /**
     * @param {string} emulatorId
     */
    async function startConversion(emulatorId: string) {
        const artefactIds = data.artefacts
            .filter((a, i) => selectedArtefacts[i] == true)
            .map((a) => a.id);
        if (artefactIds.length == 0) {
            toaster.error({ title: $_("must_select_artefact") });
            return;
        }

        // TODO: Point to correct endpoint when ready
        /*
        const res = await fetch(`${API_URL}/api/v1/conversion/start`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emulatorId: emulatorId,
                versionId: page.params.version,
                digitalObjectIds: artefactIds
            })
        });
        */

        /**
         * @type {import('$lib/schemas/conversionProcess').ConversionProcess}
         */
        //const process = await res.json();
        //goto(`process/${process.processId}`);
    }

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import Alert from "$lib/components/Alert.svelte";
    import Fa from "svelte-fa";
    import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
    import { toaster } from "$lib/toaster";
    import { page } from "$app/state";
    import { explorationSteps } from "$lib/steps.js";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    /**
     * @type {boolean[]}
     */
    const selectedArtefacts = $state([]);

    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-5">
        <h1 class="mt-4 text-3xl">Výběr digitálních objektů a explorativního prostředí</h1>
        <ProgressStepBar steps={explorationSteps} currentStep={0} unlockedStep={0} />
        <div class="mb-4">
            <span class="text-lg font-bold">1. Vyberte digitální objekty ke exploraci</span>
            {#if data.artefacts.length == 0}
                <Alert class="preset-outlined-error-500">
                    <h3 class="flex items-center gap-2 font-semibold">
                        <Fa icon={faExclamationTriangle} />
                    </h3>
                    <h1>
                        K tomuto dílu neexistují žádné digitální objekty. Před vytvořením herního
                        balíčku je nutné digitalizovat kopii média, nebo nahrát soubor.
                    </h1>
                    <a href="../../artefact/add" class="btn preset-filled"
                        >Vytvořit digitální objekt</a
                    >
                </Alert>
            {/if}
            <ol class="list space-y-2 px-4">
                {#each data.artefacts as artefact, index}
                    <li>
                        <input
                            class="checkbox"
                            type="checkbox"
                            bind:checked={selectedArtefacts[index]}
                        />
                        <span>{artefact.label}</span>
                    </li>
                {/each}
            </ol>
        </div>
        <span class="text-lg font-bold">2. Vyberte explorativní prostředí</span>
        <div class="grid grid-cols-2 gap-2 text-center 2xl:grid-cols-3">
            <!-- TODO: Remove placeholder -->
            <MediaCard
                onclick={async () => goto("add/exploration/test")}
                title={"CachyOS Explorer Retro"}
                description={"Linuxová distribuce CachyOS pro exploraci retro her"}
                tags={["v1.0", "ZX Spectrum", "C64"]}
            />
            {#each data.environments as environment}
                <MediaCard
                    onclick={async () => await startConversion(environment.id)}
                    title={$_(`environment.${environment.name}.name`)}
                    description={$_(`environment.${environment.name}.description`)}
                    tags={[`v${environment.version}`]}
                />
            {/each}
        </div>
    </div>
</div>
