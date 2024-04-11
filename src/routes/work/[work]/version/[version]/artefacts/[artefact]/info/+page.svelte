<script>
    import { faArrowRight, faCancel, faDownload, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import { currentStep, unlockedStep } from "$lib/steps";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        $currentStep = 3;
        $unlockedStep = 3;
    })
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Informace o artefaktu</h1>
        <ProgressStepBar/>
        <div class="flex gap-2">
            <div class="card flex flex-1 p-2 flex-col">
                <span class="text-xl font-bold p-4">Strukturovaný popis</span>
                <form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
                    <p>Název</p>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <input type="text" placeholder="" />
                    </div>
                    <p>Stav nosiče</p>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <input type="text" placeholder="" />
                    </div>
                    <p>Datum archivace</p>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <input disabled type="text" value="29. 02. 2024" />
                    </div>
                    <p>Archivoval</p>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                        <input type="text" value="J. Novák" />
                    </div>
                </form>
            </div>
            <div class="flex flex-col flex-1 gap-2">
                <div class="card flex flex-col p-2">
                    <span class="text-xl font-bold p-4">Info o digitalizaci</span>
                    <div class="flex flex-col p-4">
                        <span>Velikost artefaktu: 145 kB</span>
                        <span>Kontrolní součet (MD5): 1d86c2605355313944c895831e9533a6</span>
                        <button class="btn variant-filled mt-2">
                            <Fa icon={faDownload}/>
                            <span>Stáhnout log</span>
                        </button>
                    </div>
                </div>
                <div class="h-full flex flex-col">
                    <div class="flex-1"></div>
                    <div class="flex justify-end gap-2">
                        <a class="btn variant-filled-secondary" href="/artefacts/add">
                            <Fa icon={faPlus}/>
                            <span>Přidat další artefakt</span>
                        </a>
                        <a class="btn variant-filled-error" href="/gameobjects/info">
                            <Fa icon={faCancel}/>
                            <span>Pokračovat bez uložení</span>
                        </a>
                        <a class="btn variant-filled-primary" href="/gameobjects/info">
                            <Fa icon={faArrowRight}/>
                            <span>Uložit a pokračovat</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
