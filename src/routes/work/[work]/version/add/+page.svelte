<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionForm from "../[version]/versionForm.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    $currentSidebar = workLinks;
    $currentRoute = "addVersion";

    /**
     * @param {CustomEvent<import("$lib/schemas/version").Version>} data
     */
     async function createNew(data) {
        data.detail.workId = $page.params.work

        const res = await fetch(`${API_URL}/api/v1/versions`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        /**
         * @type {import("$lib/schemas/version").Version}
         */
        const createdVersion = await res.json()
        goto(`/work/${createdVersion.workId}/version/${createdVersion.id}`)
    }
</script>

<HeaderContainer title="Nová verze">
    <VersionForm on:save={createNew} isNew={true}></VersionForm>
</HeaderContainer>
