<script lang="ts">
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { _ } from "svelte-i18n";
    import MediaCard from "$lib/components/mediaCard.svelte";
    import type { ExplorationEnvironment } from "$lib/schemas/exploration/explorationEnvironment";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import Alert from "$lib/components/Alert.svelte";
    import Fa from "svelte-fa";
    import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
    import { toaster } from "$lib/toaster";
    import { explorationSteps } from "$lib/steps.js";
    import { ExplorationProcess } from "$lib/schemas/exploration/exploration.js";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";

    async function startConversion(environment: ExplorationEnvironment) {
        const artefactIds = data.artefactsIds
            .filter((_, i) => selectedArtefacts[i] == true)
            .map((a) => a.id);

        const playableObjectIds = data.playableObjectsIds
            .filter((_, i) => selectedPlayableObjects[i] == true)
            .map((a) => a.id);

        if (artefactIds.length == 0 && playableObjectIds.length == 0) {
            toaster.error({ title: $_("must_select_artefact") });
            return;
        }

        try {
            const process = await ExplorationProcess.start(fetch, {
                environmentId: environment.id,
                versionId: page.params.version!,
                digitalObjectIds: [...artefactIds, ...playableObjectIds]
            });

            goto(`add/exploration/${process.id}`);
        } catch (e) {
            toaster.error({ title: $_("exploration_start_failed") });
            return;
        }
    }

    const selectedArtefacts: boolean[] = $state([]);
    const selectedPlayableObjects: boolean[] = $state([]);

    let { data } = $props();
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-6">
        <h1 class="mt-4 text-3xl">Výběr digitálních objektů a explorativního prostředí</h1>
        <ProgressStepBar steps={explorationSteps} currentStep={0} unlockedStep={0} />
        <div class="flex flex-col">
            <span class="mb-4 text-lg font-bold">1. Vyberte digitální objekty ke exploraci</span>
            {#if data.artefactsIds.length == 0 && data.playableObjectsIds.length == 0}
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
            {:else}
                <h2 class="text-lg font-bold">Digitální objekty</h2>
                <ol class="list mb-4 space-y-2 px-4">
                    {#each data.artefactsIds as artefact, index}
                        <li>
                            <label class="flex items-center space-x-2">
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    bind:checked={selectedArtefacts[index]}
                                />
                                <p>{artefact.label}</p>
                            </label>
                        </li>
                    {/each}
                </ol>
                <h2 class="text-lg font-bold">Hratelné objekty</h2>
                <ol class="list space-y-2 px-4">
                    {#each data.playableObjectsIds as playableObject, index}
                        <li>
                            <label class="flex items-center space-x-2">
                                <input
                                    class="checkbox"
                                    type="checkbox"
                                    bind:checked={selectedPlayableObjects[index]}
                                />
                                <p>{playableObject.label}</p>
                            </label>
                        </li>
                    {/each}
                </ol>
            {/if}
        </div>
        <div>
            <span class="text-lg font-bold">2. Vyberte explorativní prostředí</span>
            <div class="grid grid-cols-2 gap-2 text-center 2xl:grid-cols-3">
                {#each data.environments as environment}
                    <MediaCard
                        onclick={async () => await startConversion(environment)}
                        title={$_(`environment.${environment.name}.name`)}
                        description={$_(`environment.${environment.name}.description`)}
                        tags={[`v${environment.version}`]}
                    />
                {/each}
            </div>
        </div>
    </div>
</div>
