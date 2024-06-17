<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionForm from "./versionForm.svelte";

    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    $currentSidebar = versionLinks;
    $currentRoute = "versionDetail";

    /** @type {import('./$types').PageData} */
	export let data;

    /**
     * @param {CustomEvent<import("$lib/schemas/version").Version>} formData
     */
    async function update(formData) {
        await fetch(`${API_URL}/api/v1/work/${data.workId}/version/${data.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });
    }
</script>

<HeaderContainer title="Metadata verze">
    <div class="grid grid-cols-[1_fr] gap-2">
        <VersionForm data={data} on:save={update}/>
    </div>
</HeaderContainer>
