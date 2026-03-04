<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ArtefactForm from "$lib/components/process/ArtefactForm.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { PUBLIC_API_URL as API_URL } from '$env/static/public';
    import type { Artefact } from "$lib/schemas/artefact";
    import { toaster } from "$lib/toaster";
    import { _ } from 'svelte-i18n'
    import Alert from "$lib/components/Alert.svelte";
    import Fa from "svelte-fa";
    import { faListCheck } from "@fortawesome/free-solid-svg-icons";

    let { data } = $props();

    $currentSidebar = versionLinks;
    $currentRoute = "artefactDetail";

     async function update(artefact: Artefact) {
        const result = await fetch(`${API_URL}/api/v1/artefacts/${artefact.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(artefact)
        });

        if (result.ok) toaster.success({title: $_("save_success")});
        else {
            const error = await result.text();
            toaster.error({title: $_("save_fail"), description: error});
        }
    }
</script>

<HeaderContainer title={data.fileName}>
    <div class="grid grid-cols-[1_fr] gap-2">
        <ol class="flex items-center gap-4">
                <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
                <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
                <li><a class="opacity-60 hover:underline" href="../../../">Dílo</a></li>
                <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
                <li><a class="opacity-60 hover:underline" href="../">Verze</a></li>
                <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
                <li>Digitální objekt</li>
        </ol>
        <Alert class="preset-outlined-primary-500">
            <h3 class="flex gap-2 items-center font-semibold">
                <Fa icon={faListCheck}/>
                Další kroky
            </h3>
            <p>
                Po vytvoření digitálního objektu je nutné vytvořit herní objekt.<br/>
                Další možnosti se nachází v levém menu.
            </p>
            <div class="flex flex-col items-center gap-1">
                <a href="../gameobject/add/platform" class="btn preset-filled">Vytvořit herní balíček</a>
            </div>
        </Alert>
        <h2 class="text-2xl mt-4">Metadata digitálního objektu</h2>
        <ArtefactForm data={data} onsave={update}/>
    </div>
</HeaderContainer>
