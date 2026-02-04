<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ArtefactForm from "$lib/components/process/ArtefactForm.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { _ } from 'svelte-i18n'

    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();

    /** @type {import('./$types').PageData} */
	export let data;

    $currentSidebar = versionLinks;
    $currentRoute = "artefactDetail";

    /**
     * @param {CustomEvent<import("$lib/schemas/artefact").Artefact>} formData
     */
     async function update(formData) {
        const result = await fetch(`${API_URL}/api/v1/artefacts/${formData.detail.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });

        if (result.ok) toastStore.trigger({message: $_("save_success"), background: 'variant-filled-success'});
        else {
            const error = await result.text();
            toastStore.trigger({message: $_("save_fail") + error, background: 'variant-filled-error'});
        }
    }
</script>

<HeaderContainer title="Metadata artefaktu">
    <div class="grid grid-cols-[1_fr] gap-2">
        <div class="alert variant-outline">
            <div class="alert-message">
                <h3>← Další kroky</h3>
                <p>
                    Po vytvoření artefaktu je nutné vytvořit herní balíček.<br/>
                    Další možnosti se nachází v levém menu.
                </p>
                <div>
                    <a href="../gameobject/add/platform" class="btn variant-filled">Přidat herní balíček</a>
                </div>
            </div>
        </div>
        <ArtefactForm data={data} on:save={update}/>
    </div>
</HeaderContainer>
