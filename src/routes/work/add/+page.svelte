<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import WorkForm from "../[work]/workForm.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    $currentSidebar = [];

    /**
     * @param {CustomEvent<import("$lib/schemas/work").Work>} data
     */
    async function createNew(data) {
        const res = await fetch(`${API_URL}/api/v1/works`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        /**
         * @type {import("$lib/schemas/work").Work}
         */
        const createdWork = await res.json()
        goto(`/work/${createdWork.id}`)
    }
</script>

<HeaderContainer title="Nové dílo">
    <WorkForm on:save={createNew} isNew={true}></WorkForm>
</HeaderContainer>
