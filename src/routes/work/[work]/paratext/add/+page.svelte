<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import { currentSidebar, currentRoute,  workLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";

    $currentSidebar = workLinks;
    $currentRoute = "addParatext";

    /** @param {CustomEvent<import("$lib/schemas/artefact").Artefact>} e */
    async function createNew(e) {
        await fetch(`${API_URL}/api/v1/works/${$page.params.work}/paratexts`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(e.detail)
        });

        goto(`.`)
    }
</script>

<HeaderContainer title="Nový paratext díla">
    <ParatextForm isNew={true} on:save={createNew}/>
</HeaderContainer>
