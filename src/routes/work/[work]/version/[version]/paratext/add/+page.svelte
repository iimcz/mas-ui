<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { _ } from "svelte-i18n";
    import { toaster } from "$lib/toaster";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import type { Paratext } from "$lib/schemas/paratext";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    $currentSidebar = versionLinks;
    $currentRoute = "addParatext";

    let paratext = $state({
        label: "",
        language: "",
        date: "",
        internalNote: "",
        filledOutBy: "",
        websiteUrl: "",
        paratextType: ""
    } as Partial<Paratext>);

    async function createParatext() {
        const res = await fetch(`${API_URL}/api/v1/paratexts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paratext,
                workVersions: [page.params.version]
            })
        });

        if (!res.ok) {
            toaster.error({ title: "Vytvoreni se nezdarilo" });
            return;
        }

        const created = (await res.json()) as Paratext;
        goto(`${created.id}`);
    }
</script>

<HeaderContainer title="Vytvořit paratext">
    <div class="grid grid-cols-[1_fr] gap-2">
        <ol class="flex items-center gap-4">
            <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
            <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
            <li><a class="opacity-60 hover:underline" href="../../../">Dílo</a></li>
            <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
            <li><a class="opacity-60 hover:underline" href="../">Verze</a></li>
            <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
            <li>Paratext</li>
        </ol>
        <form class="form m-2 space-y-2 rounded-container border border-surface-500 p-4">
            <label class="label">
                <span class="label-text text-lg">Kurátorský popis</span>
                <input class="input" type="text" bind:value={paratext.label} />
            </label>

            <label class="label">
                <span class="label-text text-lg">Jazyk</span>
                <input class="input" type="text" bind:value={paratext.language} />
            </label>

            <label class="label">
                <span class="label-text text-lg">Datum</span>
                <input class="input" type="text" bind:value={paratext.date} />
            </label>

            <label class="label">
                <span class="label-text text-lg">Služební poznámka</span>
                <input class="input" type="text" bind:value={paratext.internalNote} />
            </label>

            <label class="label">
                <span class="label-text text-lg">Vyplněno</span>
                <input class="input" type="text" bind:value={paratext.filledOutBy} />
            </label>

            <label class="label">
                <span class="label-text text-lg">URL Stránky</span>
                <input class="input" type="text" bind:value={paratext.websiteUrl} />
            </label>

            <label class="label">
                <span class="label-text text-lg">Typ paratextu</span>
                <input class="input" type="text" bind:value={paratext.paratextType} />
            </label>
        </form>

        <button class="float-right btn preset-filled" onclick={createParatext}> Vytvořit </button>
    </div>
</HeaderContainer>
