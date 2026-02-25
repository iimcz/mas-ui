<script lang="ts">
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ArtefactForm from "$lib/components/process/ArtefactForm.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import type { Artefact } from "$lib/schemas/artefact";
    import { toaster } from "$lib/toaster";
    import { _ } from 'svelte-i18n'

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

<HeaderContainer title="Metadata artefaktu">
    <div class="grid grid-cols-[1_fr] gap-2">
        <div class="alert preset-outline">
            <div class="alert-message">
                <h3>← Další kroky</h3>
                <p>
                    Po vytvoření digitálního objektu je nutné vytvořit herní balíček.<br/>
                    Další možnosti se nachází v levém menu.
                </p>
                <div>
                    <a href="../gameobject/add/platform" class="btn preset-filled">Přidat herní balíček</a>
                </div>
            </div>
        </div>
        <ArtefactForm data={data} onsave={update}/>
    </div>
</HeaderContainer>
