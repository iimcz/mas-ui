<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionForm from "./versionForm.svelte";

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { _ } from 'svelte-i18n'

    // TODO: FIX import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    // TODO: FIX const toastStore = getToastStore();
    $currentSidebar = versionLinks;
    $currentRoute = "versionDetail";


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();

    /**
     * @param {CustomEvent<import("$lib/schemas/workVersion").WorkVersion>} formData
     */
    async function update(formData) {
        const result = await fetch(`${API_URL}/api/v1/work/${data.workId}/version/${data.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });

        /*
        TODO: FIX
        if (result.ok) toastStore.trigger({message: $_("save_success"), background: 'preset-filled-success'});
        else {
            const error = await result.text();
            toastStore.trigger({message: $_("save_fail") + error, background: 'preset-filled-error'});
        }
        */
    }
</script>

<HeaderContainer title="Metadata verze">
    <div class="grid grid-cols-[1_fr] gap-2">
        <div class="alert variant-outline">
            <div class="alert-message">
                <h3>← Další kroky</h3>
                <p>
                    Po vytvoření verze je nutné vytvořit artefakt (digitalizovaná verze média) a herní objekt (spustitelná verze).<br/>
                    Další možnosti se nachází v levém menu.
                </p>
                <div>
                    <a href="{data.id}/artefact/add/" class="btn preset-filled">Přidat artefakt</a>
                    <span class="mx-2">a následně</span>
                    <a href="{data.id}/gameobject/add/platform" class="btn preset-filled">Přidat herní objekt</a>
                </div>
            </div>
        </div>
        <VersionForm data={data} on:save={update}/>
    </div>
</HeaderContainer>
