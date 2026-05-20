<script>
    import MediaCard from "$lib/components/mediaCard.svelte";
    import { _ } from "svelte-i18n";

    import { currentStep, unlockedStep, steps, artefactSteps } from "$lib/steps";
    import { onMount } from "svelte";
    onMount(() => {
        $steps = artefactSteps;
        $currentStep = 0;
        $unlockedStep = 0;
    });

    import { currentSidebar, currentRoute, gameObjectLinks } from "$lib/components/sidebar/links";
    import { goto } from "$app/navigation";

    $currentSidebar = gameObjectLinks;
    $currentRoute = "environmentList";
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-10">
        <h1 class="mt-4 text-3xl">Doporučené verze prostředí</h1>
        <div class="3xl:grid-cols-3 grid grid-cols-2 gap-4 text-center">
            <MediaCard
                    isAvailable={true}
                    title={"CachyOS + DosBox v1.1"}
                    tags={["Nejnovější", "v1.1", "CachyOS"]}
                    onclick={() => goto("emulator")}
                />
            <MediaCard
                    isAvailable={true}
                    title={"Ubuntu + DosBox v0.9"}
                    tags={["Originální", "v0.9", "Ubuntu"]}
                    onclick={() => goto("emulator")}
                />
        </div>
        <h1 class="mt-4 text-3xl">Všechny verze prostředí</h1>
        <div class="3xl:grid-cols-3 grid grid-cols-2 gap-4 text-center">
                    <MediaCard
                    isAvailable={true}
                    title={"CachyOS + DosBox v1.1"}
                    tags={["Nejnovější", "v1.1", "CachyOS"]}
                    onclick={() => goto("emulator")}
                />
            <MediaCard
                    isAvailable={true}
                    title={"CachyOS + DosBox v1.0"}
                    tags={["v1.0", "CachyOS"]}
                    onclick={() => goto("emulator")}
                />
            <MediaCard
                    isAvailable={true}
                    title={"Ubuntu + DosBox v0.9"}
                    tags={["Originální", "v0.9", "Ubuntu"]}
                    onclick={() => goto("emulator")}
                />
                </div>
    </div>
</div>
