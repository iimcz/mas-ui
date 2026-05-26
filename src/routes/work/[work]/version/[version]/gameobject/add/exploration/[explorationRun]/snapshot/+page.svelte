<script lang="ts">
    import { versionLinks, currentSidebar, currentRoute } from "$lib/components/sidebar/links";

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-5">
        <h1 class="mt-4 text-3xl">Uložení rozpracovaného balíčku</h1>
        <p>
            Uložením rozpracovaného balíčku se vytvoří herní balíček bez ověření. Tento balíček není
            určen k nahrání do emulačního centra. Tento balíček lze kdykoliv načíst zpět do
            explorativního prostředí.
        </p>
        <p class="font-semibold">
            Uložen bude pouze obsah exportovaného balíčku, stav explorativního prostředí nebude
            zachován.
        </p>
        <div class="card preset-outlined-surface-300-700 p-4">
            <form class="space-y-4">
                <label class="label">
                    <span class="label-text">Název rozpracovaného balíčku</span>
                    <input class="input" type="text" />
                </label>
                <label class="label">
                    <span class="label-text">Poznámka</span>
                    <input class="input" type="text" />
                </label>
            </form>
        </div>
        <div class="flex justify-end gap-2">
            <a class="btn preset-filled" href="../../../">Uložit a dokončit exploraci</a>
            <a class="btn preset-filled" href="extract">Zpět k obsahu balíčku</a>
        </div>
    </div>
</div>
