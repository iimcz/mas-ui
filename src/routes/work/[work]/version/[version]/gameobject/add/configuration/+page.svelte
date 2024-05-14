<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ProgressStepBar from "$lib/components/progressStepBar.svelte";
    import { currentStep, unlockedStep, steps, configSteps } from "$lib/steps";
    import Fa from "svelte-fa";
    import { faSave, faPlay } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";

    onMount(() => {
        $steps = configSteps
        $unlockedStep = 3;
        $currentStep = 3;
    })

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import Placeholder from "$lib/components/placeholder.svelte";
    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";
</script>

<HeaderContainer title="Konfigurace emulátoru">
    <ProgressStepBar/>
    <Placeholder/>
    <div class="flex space-x-2 justify-end">
        <a class="btn variant-filled-secondary" href="https://emulation.gametechwiki.com/index.php/Mesen" target="_blank">Návod k emulátoru</a>
        <a class="btn variant-filled-primary" href="/work/[id]/version/[id]/gameobject">
            <Fa icon={faSave} />
            <span>Dokončit</span>
        </a>
        <a class="btn variant-filled-primary" href="/work/[id]/version/[id]/gameobject/[id]/profile/add">
            <Fa icon={faPlay} />
            <span>Spustit</span>
        </a>
    </div>
</HeaderContainer>
