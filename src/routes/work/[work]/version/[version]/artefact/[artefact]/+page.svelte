<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import ArtefactForm from "./artefactForm.svelte";

    /** @type {import('./$types').PageData} */
	export let data;

    $currentSidebar = versionLinks;
    $currentRoute = "artefactDetail";

    /**
     * @param {CustomEvent<import("$lib/schemas/artefact").Artefact>} formData
     */
     async function update(formData) {
        await fetch(`${API_URL}/api/v1/artefacts/${formData.detail.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });
    }
</script>

<HeaderContainer title="Metadata artefaktu">
    <div class="grid grid-cols-[1_fr] gap-2">
        <ArtefactForm data={data} on:save={update}/>
    </div>
</HeaderContainer>
