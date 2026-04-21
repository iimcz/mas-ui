<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Fa from "svelte-fa";
    import { faSave, faPlay } from "@fortawesome/free-solid-svg-icons";

    import { currentSidebar, currentRoute, gameObjectLinks } from "$lib/components/sidebar/links";
    import Placeholder from "$lib/components/placeholder.svelte";
    $currentSidebar = gameObjectLinks;
    $currentRoute = "addProfile";
</script>

<HeaderContainer title="Nový profil">
    <Placeholder />
    <div class="flex justify-end space-x-2">
        <a class="preset-filled-primary btn" href="/work/[id]/version/[id]/gameobject/[id]/profile">
            <Fa icon={faSave} />
            <span>Dokončit</span>
        </a>
        <a
            class="preset-filled-primary btn"
            href="/work/[id]/version/[id]/gameobject/[id]/profile/[id]/emulator"
        >
            <Fa icon={faPlay} />
            <span>Spustit</span>
        </a>
    </div>
</HeaderContainer>
