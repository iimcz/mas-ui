<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionForm from "./versionForm.svelte";

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { _ } from 'svelte-i18n'
    import Alert from "$lib/components/Alert.svelte";
    import { faChevronLeft, faDatabase } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import { API_URL } from "$lib/config";

    $currentSidebar = versionLinks;
    $currentRoute = "versionDetail";

    let { data } = $props();
</script>

<HeaderContainer title={data.label}>
    <div class="grid grid-cols-[1_fr] gap-2">
        <Alert class="preset-outlined-primary-500">
            <h3 class="flex gap-2 items-center font-semibold">
                <Fa icon={faChevronLeft}/>
                Další kroky
            </h3>
            <p>
                Po vytvoření verze je nutné vytvořit digitální objekt a herní objekt.<br/>
                Další možnosti se nachází v levém menu.
            </p>
            <div class="flex flex-col items-center gap-1">
                <a href="{data.id}/artefact/add/" class="btn preset-filled w-full">Vytvořit digitální objekt</a>
                <a href="{data.id}/gameobject/add/platform" class="btn preset-filled w-full">Vytvořit herní objekt</a>
                <a href="{API_URL}/api/v1/router/ca/workversion/edit/{data.id}" target="_blank" class="btn preset-filled w-full"><Fa class="mr-2" icon={faDatabase}/>Editovat v CA</a>
            </div>
        </Alert>
        <h2 class="text-2xl mt-4">Metadata verze</h2>
        <VersionForm data={data}/>
    </div>
</HeaderContainer>
