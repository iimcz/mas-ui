<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionMetadata from "./VersionMetadata.svelte";

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { _ } from "svelte-i18n";
    import Alert from "$lib/components/Alert.svelte";
    import { faDatabase, faListCheck } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";

    $currentSidebar = versionLinks;
    $currentRoute = "versionDetail";

    let { data } = $props();
</script>

<HeaderContainer title={data.label}>
    <div class="grid grid-cols-[1_fr] gap-2">
        <ol class="flex items-center gap-4">
            <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
            <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
            <li><a class="opacity-60 hover:underline" href="../">Dílo</a></li>
            <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
            <li>Verze</li>
        </ol>
        <Alert class="preset-outlined-primary-500">
            <h3 class="flex items-center gap-2 font-semibold">
                <Fa icon={faListCheck} />
                Další kroky
            </h3>
            <p>
                Po vytvoření verze je nutné vytvořit digitální objekt a herní objekt.<br />
                Další možnosti se nachází v levém menu.
            </p>
            <div class="flex flex-col items-center gap-1">
                <a href="{data.id}/artefact/add/" class="btn w-full preset-filled"
                    >Vytvořit digitální objekt</a
                >
                <a href="{data.id}/gameobject/add/platform" class="btn w-full preset-filled"
                    >Vytvořit herní objekt</a
                >
                <a
                    href="{API_URL}/api/v1/router/ca/workversion/edit/{data.id}"
                    target="_blank"
                    class="btn w-full preset-filled"
                    ><Fa class="mr-2" icon={faDatabase} />Editovat v CA</a
                >
            </div>
        </Alert>
        <h2 class="mt-4 text-2xl">Metadata verze</h2>
        <VersionMetadata {data} />
    </div>
</HeaderContainer>
