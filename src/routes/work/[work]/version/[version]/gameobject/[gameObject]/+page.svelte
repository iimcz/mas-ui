<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import GamePackageForm from "$lib/components/process/GamePackageForm.svelte";

    import { PUBLIC_API_URL as API_URL } from '$env/static/public';
    import { _ } from 'svelte-i18n'

    import { currentSidebar, currentRoute, gameObjectLinks } from "$lib/components/sidebar/links";
    import { toaster } from "$lib/toaster";
    import type { GamePackage } from "$lib/schemas/gamePackage";
    import Alert from "$lib/components/Alert.svelte";
    import Fa from "svelte-fa";
    import { faListCheck } from "@fortawesome/free-solid-svg-icons";
    $currentSidebar = gameObjectLinks;
    $currentRoute = "gameObjectDetail";

     async function update(gamePackage: GamePackage) {
        const result = await fetch(`${API_URL}/api/v1/packages/${gamePackage.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gamePackage)
        });

        if (result.ok) toaster.success({title: $_("save_success")});
        else {
            const error = await result.text();
            toaster.error({title: $_("save_fail"), description: error});
        }
    }

    let { data } = $props();
</script>

<HeaderContainer title="Metadata herního balíčku">
    <div class="grid grid-cols-[1_fr] gap-2">
        <ol class="flex items-center gap-4">
                <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
                <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
                <li><a class="opacity-60 hover:underline" href="../../../">Dílo</a></li>
                <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
                <li><a class="opacity-60 hover:underline" href="../">Verze</a></li>
                <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
                <li>Herní objekt</li>
        </ol>
        <Alert class="preset-outlined-primary-500">
            <h3 class="flex gap-2 items-center font-semibold">
                <Fa icon={faListCheck}/>
                Další kroky
            </h3>
            <p>
                Po vytvoření herního balíčku je možné spustit emulaci.<br/>
                Další možnosti se nachází v levém menu.
            </p>
            <div class="flex flex-col items-center gap-1">
                <a href="{data.id}/profile/[id]/emulator" class="btn preset-filled">Spustit emulaci</a>
            </div>
        </Alert>
        <h2 class="text-2xl mt-4">Metadata herního objektu</h2>
        <GamePackageForm data={data} onsave={update}/>
    </div>
</HeaderContainer>
